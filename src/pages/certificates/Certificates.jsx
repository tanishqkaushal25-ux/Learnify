import React from 'react';
import CertificateCard from './CertificateCard';
import './certificates.css';

const Certificates = () => {
  const storedCertificate = JSON.parse(
    localStorage.getItem('certificateData')
  );

  const certificatesData = storedCertificate
    ? [storedCertificate]
    : [];

  return (
    <div className="certificates-container">
      <div className="page-header">
        <h1 className="page-title">Your Certificates</h1>
        <p className="page-subtitle">
          Download and share your achievements.
        </p>
      </div>

      <div className="certificates-grid">
        {certificatesData.length > 0 ? (
          certificatesData.map((cert, index) => (
            <CertificateCard
              key={index}
              {...cert}
            />
          ))
        ) : (
          <p>No certificates earned yet.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;