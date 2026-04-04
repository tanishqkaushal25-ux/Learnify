import React from 'react';
import PlaylistSection from './PlaylistSection';
import './courses.css';

// Using the generated assets
import codeSnippetImg from '../../assets/code_snippet.png';
import laptopTypingImg from '../../assets/laptop_typing.png';
import dataChartsImg from '../../assets/data_charts.png';

const Courses = () => {
  const playlists = [
    {
      title: "Machine Learning Fundamentals",
      videoCount: 8,
      progress: 75,
      courses: [
        {
          title: "Introduction to ML: What, Why, and How",
          thumbnail: codeSnippetImg,
          duration: "12:34",
          views: "24K",
          likes: "1.8K",
          comments: "234"
        },
        {
          title: "Supervised vs Unsupervised Learning",
          thumbnail: laptopTypingImg,
          duration: "18:22",
          views: "19K",
          likes: "1.2K",
          comments: "189"
        },
        {
          title: "Linear Regression Deep Dive",
          thumbnail: dataChartsImg,
          duration: "24:10",
          views: "15K",
          likes: "980",
          comments: "156"
        },
        {
          title: "Decision Trees & Random Forests",
          thumbnail: codeSnippetImg,
          duration: "21:05",
          views: "12K",
          likes: "890",
          comments: "134"
        }
      ]
    },
    {
      title: "Web Development with React",
      videoCount: 10,
      progress: 40,
      courses: [
        {
          title: "React Components and Props",
          thumbnail: codeSnippetImg,
          duration: "15:20",
          views: "30K",
          likes: "2.1K",
          comments: "340"
        },
        {
          title: "State Management with Hooks",
          thumbnail: dataChartsImg,
          duration: "22:15",
          views: "25K",
          likes: "1.9K",
          comments: "280"
        },
        {
          title: "Building Custom Hooks",
          thumbnail: laptopTypingImg,
          duration: "19:45",
          views: "20K",
          likes: "1.5K",
          comments: "210"
        }
      ]
    }
  ];

  return (
    <div className="courses-container">
      <div className="page-header">
        <h1 className="page-title">Your Courses</h1>
        <p className="page-subtitle">Continue where you left off or explore new playlists.</p>
      </div>

      {playlists.map((playlist, index) => (
        <PlaylistSection key={index} {...playlist} />
      ))}
    </div>
  );
};

export default Courses;
