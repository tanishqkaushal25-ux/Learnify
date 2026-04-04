import React from 'react';
import CertificateCard from './CertificateCard';
import './certificates.css';

const Certificates = () => {
  const certificatesData = [
    {
      title: "Data Science with Python",
      date: "Mar 15, 2026",
      studentName: "Alex Johnson"
    },
    {
      title: "JavaScript Essentials",
      date: "Feb 22, 2026",
      studentName: "Alex Johnson"
    },
    {
      title: "UI/UX Design Principles",
      date: "Jan 30, 2026",
      studentName: "Alex Johnson"
    },
    {
      title: "Advanced React Patterns",
      date: "Dec 10, 2025",
      studentName: "Alex Johnson"
    },
    {
      title: "Backend Development with Node.js",
      date: "Nov 05, 2025",
      studentName: "Alex Johnson"
    },
    {
      title: "Cloud Computing Fundamentals",
      date: "Oct 18, 2025",
      studentName: "Alex Johnson"
    }
  ];

  return (
    <div className="certificates-container">
      <div className="page-header">
        <h1 className="page-title">Your Certificates</h1>
        <p className="page-subtitle">Download and share your achievements.</p>
      </div>

      <div className="certificates-grid">
        {certificatesData.map((cert, index) => (
          <CertificateCard key={index} {...cert} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
