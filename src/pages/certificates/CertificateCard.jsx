import React from 'react';
import { Award, FileText, Download } from 'lucide-react';

const CertificateCard = ({ title, date, studentName = "Tanishq Kaushal" }) => {
  const handleDownload = () => {

    const certificateHTML = `

    <html>

      <head>

        <title>Certificate of Completion</title>

        <style>

          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Great+Vibes&display=swap');



          body {

            margin: 0;

            padding: 0;

            display: flex;

            justify-content: center;

            align-items: center;

            height: 100vh;

            background-color: #e2e8f0;

            font-family: 'Libre Baskerville', serif;

          }



          .certificate {

            width: 900px;

            height: 600px;

            background: white;

            position: relative;

            box-sizing: border-box;

            border: 1px solid #ccc;

            box-shadow: 0 20px 40px rgba(0,0,0,0.2);

            overflow: hidden;

            text-align: center;

            color: #1a202c;

          }



          /* Top Decorative Bar */

          .top-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* or whatever height you chose */
  background: #002d5b; /* blue bar */
  border-bottom: 4px solid #d4af37; /* Gold Line */
  font-family: 'Great Vibes', cursive;
  font-size: 45px; /* adjust size if needed */
  color: #d4af37;  /* GOLD COLOR */
  display: flex;
  justify-content: center;
  align-items: center; /* centers vertically */
}



          /* Gold Seal (Top Right) */

          .seal {

            position: absolute;

            top: 30px;

            right: 50px;

            width: 90px;

            height: 90px;

            background: radial-gradient(circle, #f9df7b, #d4af37);

            border-radius: 50%;

            z-index: 5;

            box-shadow: 0 4px 8px rgba(0,0,0,0.2);

          }

          /* Seal Ribbons */

          .seal::before, .seal::after {

            content: "";

            position: absolute;

            top: 70px;

            width: 30px;

            height: 50px;

            background: #d4af37;

            z-index: -1;

          }

          .seal::before { left: 15px; transform: rotate(15deg); }

          .seal::after { right: 15px; transform: rotate(-15deg); }



          /* Bottom Corner Triangles */

          .triangle-left {

            position: absolute;

            bottom: -20px; /* shifted more outward */

            left: -30px;   /* shifted more outward */

            width: 0;

            height: 0;

            border-style: solid;

            border-width: 140px 0 0 250px;

            border-color: transparent transparent transparent #002d5b;

          }



          .triangle-right {

            position: absolute;

            bottom: -20px; /* shifted more outward */

            right: -30px;  /* shifted more outward */

            width: 0;

            height: 0;

            border-style: solid;

            border-width: 0 0 140px 250px;

            border-color: transparent transparent #002d5b transparent;

          }



          /* Content Layout */

          .content {

            padding-top: 120px; /* pushed down a bit for more space */

            position: relative;

            z-index: 2;

          }



          h1 {

            font-size: 60px;

            margin: 0;

            letter-spacing: 4px;

            font-weight: 800;

            color: #000;

          }



          .sub-text {

            font-size: 22px;

            margin-bottom: 30px;

          }



          .certify {

            font-style: italic;

            font-size: 18px;

            margin-bottom: 5px;

          }



          .name {

            font-family: 'Great Vibes', cursive;

            font-size: 70px;

            margin: 10px auto;

            border-bottom: 2px solid #000;

            width: 65%;

            display: inline-block;

          }



          .course-container {

            margin-top: 25px;

          }



          .course-label {

            font-size: 16px;

            margin-bottom: 5px;

          }



          .course-name {

            font-size: 35px; /* reduced font size */

            font-weight: bold;

            margin: 0;

            text-transform: none;

          }



          .description {

            font-size: 15px;

            width: 80%;

            margin: 30px auto 0;

            font-style: italic;

            line-height: 1.4;

          }



          .footer {

            position: absolute;

            bottom: 40px;

            width: 100%;

            z-index: 10;

          }



        </style>

      </head>

      <body>

        <div class="certificate">

          <div class="top-bar">Learnify</div>

          <div class="seal"></div>

          

          <div class="content">

            <h1>CERTIFICATE</h1>

            <div class="sub-text">Of Completion</div>

            

            <p class="certify">This is to certify that</p>

            <div class="name">${studentName}</div>

            

            <div class="course-container">

              <p class="course-label">has successfully completed the course</p>

              <p class="course-name">${title
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      }</p>

            </div>

            

            <p class="description">

              This certificate recognizes the achievement and commitment to continuous learning and <br/>

              skill development, with a grade of <strong>A</strong>, awarded on <strong>${date}</strong>.

            </p>

          </div>



          <div class="triangle-left"></div>

          <div class="triangle-right"></div>

        </div>

      </body>

    </html>

  `;



    const printWindow = window.open('', '_blank');

    printWindow.document.write(certificateHTML);

    printWindow.document.close();



    setTimeout(() => {

      printWindow.print();

    }, 700);

  };

  return (
    <div className="certificate-card">
      <div className="certificate-preview">
        <div className="award-icon-wrapper">
          <Award size={48} strokeWidth={1.5} />
        </div>

        <div className="cert-label">
          Certificate of Completion
        </div>

        <div className="cert-title-internal">
          {title}
        </div>

        <div className="cert-awarded-to">
          Awarded to {studentName}
        </div>
      </div>

      <div className="certificate-content">
        <div className="cert-info">
          <h4>{title}</h4>

          <div className="cert-meta">
            Completed on {date}
          </div>

          <div className="cert-scorecard">
            <FileText size={14} />
            Scorecard available on 2nd page
          </div>
        </div>

        <button
          className="btn-download"
          onClick={handleDownload}
        >
          <Download size={16} />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;