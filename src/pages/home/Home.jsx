import React from 'react';
import { Sparkles, ArrowRight, BookOpen, CheckCircle, Award, TrendingUp } from 'lucide-react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="ai-badge">
          <Sparkles size={14} />
          <span>AI-POWERED LEARNING</span>
        </div>
        
        <h1 className="hero-title heading-serif">
          Master Anything, <span className="highlight-text">One Playlist</span> at a Time
        </h1>
        
        <p className="hero-description">
          Personalized courses, smart assignments, and real-time progress tracking — all powered by AI to accelerate your learning journey.
        </p>
        
        <div className="hero-actions">
          <button className="btn btn-primary">
            Start Learning <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary">
            Explore Topics
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div>
          <h2 className="welcome-text">Welcome back, Alex <span role="img" aria-label="wave">👋</span></h2>
          <p className="welcome-subtext">Here's a snapshot of your learning journey.</p>
        </div>

        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-icon-wrapper icon-purple">
              <BookOpen size={20} />
            </div>
            <div className="stat-value">12</div>
            <div className="stat-label">Courses Enrolled</div>
          </div>

          <div className="card stat-card">
            <div className="stat-icon-wrapper icon-green">
              <CheckCircle size={20} />
            </div>
            <div className="stat-value">7</div>
            <div className="stat-label">Completed</div>
          </div>

          <div className="card stat-card">
            <div className="stat-icon-wrapper icon-gold">
              <Award size={20} />
            </div>
            <div className="stat-value">5</div>
            <div className="stat-label">Certificates</div>
          </div>

          <div className="card stat-card">
            <div className="stat-icon-wrapper icon-blue">
              <TrendingUp size={20} />
            </div>
            <div className="stat-value">68%</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
