import React from 'react';
import { Award, FileText, Download } from 'lucide-react';

const CertificateCard = ({ title, date, studentName }) => {
  return (
    <div className="certificate-card">
      <div className="certificate-preview">
        <div className="award-icon-wrapper">
          <Award size={48} strokeWidth={1.5} />
        </div>
        <div className="cert-label">Certificate of Completion</div>
        <div className="cert-title-internal">{title}</div>
        <div className="cert-awarded-to">Awarded to {studentName}</div>
      </div>
      
      <div className="certificate-content">
        <div className="cert-info">
          <h4>{title}</h4>
          <div className="cert-meta">Completed on {date}</div>
          <div className="cert-scorecard">
            <FileText size={14} /> Scorecard available on 2nd page
          </div>
        </div>
        
        <button className="btn-download">
          <Download size={16} /> Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;
