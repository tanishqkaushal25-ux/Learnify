import React, { useState, useEffect } from 'react';
import PlaylistSection from './PlaylistSection';
import './courses.css';

const YT_API_KEY = import.meta.env.VITE_YT_API_KEY;

// Keywords for level filtering
const LEVEL_KEYWORDS = {
  "Complete Beginner": "for beginners crash course",
  "Some Experience": "fundamentals tutorial",
  "Intermediate": "complete guide project",
  "Advanced": "advanced deep dive production",
};

// Converts ISO 8601 duration (PT1H2M3S) to seconds
function toSeconds(iso) {
  if (!iso) return 0;
  const h = iso.match(/(\d+)H/)?.[1] || 0;
  const m = iso.match(/(\d+)M/)?.[1] || 0;
  const s = iso.match(/(\d+)S/)?.[1] || 0;
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
}

// Format seconds as HH:MM:SS or MM:SS
function toHMS(secs) {
  if (!secs || secs === 0) return "0:00";
  const h = Math.floor(secs / 3600);
  const min = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${min}:${String(s).padStart(2, '0')}`;
}

// Format counts
function formatCount(n) {
  const num = parseInt(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return String(num);
}

// Score a video for ranking
function scoreVideo(stats, durationSecs) {
  const views = parseInt(stats?.viewCount || 0);
  const likes = parseInt(stats?.likeCount || 0);
  const comments = parseInt(stats?.commentCount || 0);
  const normViews = Math.min(views / 1_000_000, 1);
  const normLikes = Math.min(likes / 50_000, 1);
  const normComments = Math.min(comments / 5_000, 1);
  const diffDur = Math.abs(durationSecs / 60 - 15);
  const normDur = Math.max(0, 1 - diffDur / 60);
  return 0.4 * normViews + 0.3 * normLikes + 0.15 * normComments + 0.15 * normDur;
}

// Fetch videos inside a playlist
async function fetchVideosFromPlaylist(playlistId) {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.set('part', 'snippet,contentDetails');
  url.searchParams.set('maxResults', '50');
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('key', YT_API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();
  if (!data.items) return [];

  return data.items.map(item => ({
    id: item.contentDetails.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    channel: item.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
  }));
}

// Try to find the top playlist for topic
async function fetchPlaylistForTopic(topic, level) {
  const levelKw = LEVEL_KEYWORDS[level] || 'tutorial';
  const query = `${topic} ${levelKw}`;

  // Search playlists
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('q', query);
  searchUrl.searchParams.set('type', 'playlist');
  searchUrl.searchParams.set('maxResults', '5');
  searchUrl.searchParams.set('order', 'relevance');
  searchUrl.searchParams.set('key', YT_API_KEY);

  const searchRes = await fetch(searchUrl.toString());
  const searchData = await searchRes.json();
  if (!searchData.items || searchData.items.length === 0) {
    // No playlists, fallback to top videos
    return await fetchTopVideosForTopic(topic, level);
  }

  // Take top playlist only
  const topPlaylist = searchData.items[0];
  const videos = await fetchVideosFromPlaylist(topPlaylist.id.playlistId);
  return videos.slice(0, 6); // top 6 videos
}

// Fallback: handpick top videos if no playlist
async function fetchTopVideosForTopic(topic, level) {
  const levelKw = LEVEL_KEYWORDS[level] || 'tutorial';
  const query = `${topic} ${levelKw}`;

  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('q', query);
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('maxResults', '10');
  searchUrl.searchParams.set('order', 'viewCount');
  searchUrl.searchParams.set('key', YT_API_KEY);

  const res = await fetch(searchUrl.toString());
  const data = await res.json();
  if (!data.items) return [];

  return data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    channel: item.snippet.channelTitle,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  })).slice(0, 6);
}

// ─── Courses Component ────────────────────────────────────────────────────────
const Courses = ({ studentProfile }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState({});

  const profile = studentProfile || {
    topic: 'Python Programming',
    level: 'Complete Beginner',
    goal: 'Get a job / switch careers',
    hoursPerWeek: 5,
  };

  const topics = [profile.topic, `${profile.topic} projects`];

  useEffect(() => {
    setLoading(true);
    setError('');

    Promise.all(topics.map(t => fetchPlaylistForTopic(t, profile.level)))
      .then(results => {
        const built = results.map((courses, i) => ({
          title: i === 0 ? profile.topic : `${profile.topic} — Hands-on Projects`,
          videoCount: courses.length,
          progress: 0,
          courses,
        }));
        setPlaylists(built);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(`Error: ${err.message}`);
        setLoading(false);
      });
  }, [profile.topic, profile.level]);

  const toggleComplete = videoId => {
    setCompleted(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const playlistsWithProgress = playlists.map(pl => {
    const total = pl.courses?.length || 0;
    const done = total > 0 ? pl.courses.filter(c => completed[c.id]).length : 0;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;
    return { ...pl, progress };
  });

  if (loading) {
    return (
      <div className="courses-container">
        <div className="page-header">
          <h1 className="page-title">Your Courses</h1>
          <p className="page-subtitle">Finding the best content for you…</p>
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
        <div key={index}>
          <PlaylistSection
            {...playlist}
            completed={completed}
            onToggleComplete={toggleComplete}
          />

          {/* ─── MOVE TO ASSIGNMENT BUTTON ─── */}
          {playlist.progress === 100 && playlist.videoCount > 0 && (
            <div
              className="move-to-assignment-container"
              style={{ marginTop: '16px', textAlign: 'center' }}
            >
              <button
                className="move-to-assignment-btn"
                onClick={() => {
                  const assignmentVideos = playlists.flatMap(pl =>
                    pl.courses.map(c => ({
                      title: c.title,
                      url: c.url
                    }))
                  );

                  console.log("Sending videos to assignment:", assignmentVideos);

                  localStorage.setItem(
                    "currentAssignment",
                    JSON.stringify({
                      topic: profile.topic,
                      videos: assignmentVideos
                    })
                  );

                  window.location.href = "/assignments";
                }}
              >
                Move to Assignment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Courses;