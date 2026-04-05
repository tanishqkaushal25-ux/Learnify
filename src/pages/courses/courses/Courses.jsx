import React, { useState, useEffect } from 'react';
import PlaylistSection from './PlaylistSection';
import './courses.css';

const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

const LEVEL_KEYWORDS = {
  "Complete Beginner":  "for beginners crash course",
  "Some Experience":   "fundamentals tutorial",
  "Intermediate":      "complete guide project",
  "Advanced":          "advanced deep dive production",
};

const VIDEOS_PER_PLAYLIST = 6;

// Converts ISO 8601 duration (PT1H2M3S) to total seconds
function toSeconds(iso) {
  if (!iso) return 0;
  const h = iso.match(/(\d+)H/)?.[1] || 0;
  const m = iso.match(/(\d+)M/)?.[1] || 0;
  const s = iso.match(/(\d+)S/)?.[1] || 0;
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
}

// Formats total seconds into human-readable string e.g. "12:34" or "1:02:34"
function toHMS(secs) {
  if (!secs || secs === 0) return "0:00";
  const h   = Math.floor(secs / 3600);
  const min = Math.floor((secs % 3600) / 60);
  const s   = secs % 60;
  if (h > 0) {
    return `${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${min}:${String(s).padStart(2, '0')}`;
}

// Formats large numbers e.g. 1200000 -> "1.2M"
function formatCount(n) {
  const num = parseInt(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000)     return `${(num / 1_000).toFixed(0)}K`;
  return String(num);
}

// Scores a video based on engagement metrics
function scoreVideo(stats, durationSecs) {
  const views    = parseInt(stats?.viewCount    || 0);
  const likes    = parseInt(stats?.likeCount    || 0);
  const comments = parseInt(stats?.commentCount || 0);
  const normViews    = Math.min(views    / 1_000_000, 1);
  const normLikes    = Math.min(likes    / 50_000,    1);
  const normComments = Math.min(comments / 5_000,     1);
  const diffDur      = Math.abs(durationSecs / 60 - 15);
  const normDur      = Math.max(0, 1 - diffDur / 60);
  return 0.4 * normViews + 0.3 * normLikes + 0.15 * normComments + 0.15 * normDur;
}

async function fetchPlaylistForTopic(topic, level) {
  const levelKw = LEVEL_KEYWORDS[level] || "tutorial";
  const query   = `${topic} ${levelKw}`;

  // Step 1: Search YouTube for videos
  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("q", query);
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("relevanceLanguage", "en");
  searchUrl.searchParams.set("maxResults", "20");
  searchUrl.searchParams.set("key", YT_API_KEY);

  const searchRes  = await fetch(searchUrl.toString());
  const searchData = await searchRes.json();

  if (!searchData.items || searchData.items.length === 0) {
    console.log("No search results for:", query);
    return [];
  }

  const ids = searchData.items.map(v => v.id.videoId).filter(Boolean).join(",");
  if (!ids) return [];

  // Step 2: Get full details for each video
  const detailsUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  detailsUrl.searchParams.set("part", "statistics,contentDetails,snippet");
  detailsUrl.searchParams.set("id", ids);
  detailsUrl.searchParams.set("key", YT_API_KEY);

  const detailsRes  = await fetch(detailsUrl.toString());
  const detailsData = await detailsRes.json();

  if (!detailsData.items || detailsData.items.length === 0) {
    console.log("No details found");
    return [];
  }

  // Step 3: Map, score and sort videos
  const videos = detailsData.items.map(item => {
    const isoDuration = item.contentDetails?.duration || "";
    const secs        = toSeconds(isoDuration);
    const fmt         = toHMS(secs);

    return {
      id:           item.id,
      title:        item.snippet?.title || "Untitled",
      channel:      item.snippet?.channelTitle || "",
      thumbnail:    item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
      duration:     fmt,
      durationSecs: secs,
      views:        formatCount(item.statistics?.viewCount),
      likes:        formatCount(item.statistics?.likeCount),
      comments:     formatCount(item.statistics?.commentCount),
      url:          `https://www.youtube.com/watch?v=${item.id}`,
      score:        scoreVideo(item.statistics, secs),
    };
  });

  // Step 4: Filter out very short clips (under 2 min)
  const filtered = videos.filter(v => v.durationSecs > 120);

  // Step 5: Sort by score and take top N
  return filtered
    .sort((a, b) => b.score - a.score)
    .slice(0, VIDEOS_PER_PLAYLIST);
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Courses = ({ studentProfile }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [completed, setCompleted] = useState({});

  const profile = studentProfile || {
    topic: "Python Programming",
    level: "Complete Beginner",
    goal:  "Get a job / switch careers",
    hoursPerWeek: 5,
  };

  const topics = [
    profile.topic,
    `${profile.topic} projects`,
  ];

  useEffect(() => {
    setLoading(true);
    setError("");

    Promise.all(topics.map(t => fetchPlaylistForTopic(t, profile.level)))
      .then(results => {
        const built = results.map((courses, i) => ({
          title:      i === 0 ? profile.topic : `${profile.topic} — Hands-on Projects`,
          videoCount: courses.length,
          progress:   0,
          courses,
        }));
        setPlaylists(built);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      });
  }, [profile.topic, profile.level]);

  const toggleComplete = (videoId) => {
    setCompleted(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const playlistsWithProgress = playlists.map(pl => {
    const total    = pl.courses.length;
    const done     = pl.courses.filter(c => completed[c.id]).length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;
    return { ...pl, progress };
  });

  if (loading) {
    return (
      <div className="courses-container">
        <div className="page-header">
          <h1 className="page-title">Your Courses</h1>
          <p className="page-subtitle">Finding the best free content for you…</p>
        </div>
        <div className="courses-loading">
          <div className="loading-spinner" />
          <p>Searching YouTube for {profile.topic} courses…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-container">
        <div className="page-header">
          <h1 className="page-title">Your Courses</h1>
        </div>
        <div className="courses-error">
          <p>⚠ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container">
      <div className="page-header">
        <h1 className="page-title">Your Courses</h1>
        <p className="page-subtitle">
          Personalised for <strong>{profile.level}</strong> · Goal: {profile.goal}
        </p>
      </div>

      {playlistsWithProgress.map((playlist, index) => (
        <PlaylistSection
          key={index}
          {...playlist}
          completed={completed}
          onToggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default Courses;