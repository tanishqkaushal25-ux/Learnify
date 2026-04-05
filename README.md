# Learnify – YouTube Learning Platform

## How to Run:
Open the terminal in the project folder, then run:

npm install

npm run dev

## Project Overview

Learnify is an AI-powered educational platform that makes YouTube learning structured and effective. It filters the best YouTube videos for any topic you search, curates a personalized learning playlist, tests knowledge through assignments with anti-cheat systems, and provides verified certificates upon completion—ensuring high-quality learning with proof of mastery.

## Key features:

Personalized learning dashboards with curated YouTube content.
Assignment testing with anti-cheat logic to ensure fair evaluation.
Automatic certificate generation upon completion of courses.
Trackable learning progress and achievement records.
Clean and interactive user interface for seamless learning experience.
Project Structure
/src
  /components   # React components (CertificateCard, TestPanel, etc.)
  /pages        # App pages (Courses, Certificates, Dashboard, etc.)
  /assets       # Images, icons, and fonts
  /styles       # CSS files
  main.jsx      # Entry point

## Installation
Clone the repository:
git clone <repo-url>
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser at http://localhost:5173 (or the port Vite shows).

## Usage
Browse courses and start learning.
Complete assignments to test your knowledge.
Earn certificates upon successful completion.
Certificates can be downloaded or shared directly.

## Tech Stack
Frontend: React, Vite, Lucide-React icons
Storage: LocalStorage for storing certificate/course data
Styling: CSS, Google Fonts for typography
Notes
Make sure your browser allows pop-ups for the certificate download feature.
The platform currently works fully on desktop browsers.
