// Certification System Logic

document.addEventListener('DOMContentLoaded', () => {
    // Select input elements
    const nameInput = document.getElementById('recipient-name');
    const courseInput = document.getElementById('course-title');
    const scoreInput = document.getElementById('course-score');
    const dateInput = document.getElementById('completion-date');
    const issuerInput = document.getElementById('issuer-name');

    // Select preview elements
    const previewName = document.getElementById('preview-name');
    const previewCourse = document.getElementById('preview-course');
    const previewScore = document.getElementById('preview-score');
    const previewDate = document.getElementById('preview-date');

    // Select action button
    const downloadBtn = document.getElementById('download-btn');

    // Initialize with default values
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    updateDatePreview(today);
    previewScore.textContent = "A"; // Default Grade Placeholder

    // Event listeners for real-time updates
    nameInput.addEventListener('input', (e) => {
        previewName.textContent = e.target.value || "Recipient Name";
    });

    courseInput.addEventListener('input', (e) => {
        previewCourse.textContent = e.target.value || "Course Name";
    });

    scoreInput.addEventListener('input', (e) => {
        previewScore.textContent = e.target.value || "XX";
    });

    dateInput.addEventListener('change', (e) => {
        updateDatePreview(e.target.value);
    });

    // Function to format date for preview
    function updateDatePreview(dateString) {
        if (!dateString) return;
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        previewDate.textContent = date.toLocaleDateString('en-US', options);
    }

    // Download functionality using html2canvas
    downloadBtn.addEventListener('click', async () => {
        const certificate = document.getElementById('certificate-element');
        
        // Add loading state
        const originalBtnText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = `<span class="material-icons-round rotating">sync</span> Generating...`;
        downloadBtn.disabled = true;

        try {
            // Options for high quality
            const options = {
                scale: 3, // High DPI for crisp printing/sharing
                useCORS: true,
                backgroundColor: null,
                logging: false,
                letterRendering: true
            };

            const canvas = await html2canvas(certificate, options);
            const image = canvas.toDataURL('image/png', 1.0);
            
            // Create download link
            const link = document.createElement('a');
            const fileName = (nameInput.value || "Certificate").replace(/\s+/g, '_');
            link.download = `Learnify_Certificate_${fileName}.png`;
            link.href = image;
            link.click();
            
            // Visual feedback
            downloadBtn.innerHTML = `<span class="material-icons-round">check_circle</span> Success!`;
            setTimeout(() => {
                downloadBtn.innerHTML = originalBtnText;
                downloadBtn.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('Error generating certificate:', error);
            alert('Failed to generate certificate. Please try again.');
            downloadBtn.innerHTML = originalBtnText;
            downloadBtn.disabled = false;
        }
    });

    // Simple fade-in effect on form load
    document.querySelector('.sidebar').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.sidebar').style.transition = 'opacity 1s ease-in-out';
        document.querySelector('.sidebar').style.opacity = '1';
    }, 100);
});
