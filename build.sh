#!/bin/bash

# This is the main build script for Vercel or other hosting platforms

# Create build directory if it doesn't exist
mkdir -p dist

# Create a basic static HTML file that will load the application
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV & Cover Letter Assistant</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      background-color: #f5f7fa;
      color: #333;
    }
    #app {
      min-height: 100vh;
    }
    .loader-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .loader {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(71, 118, 230, 0.2);
      border-top: 5px solid #4776E6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    .loader-text {
      font-size: 1.2rem;
      color: #4776E6;
      font-weight: 500;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="loader-container">
      <h1>CV & Cover Letter Assistant</h1>
      <div class="loader"></div>
      <div class="loader-text">Loading application...</div>
    </div>
  </div>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      // Redirect to the live site (replace with your actual deployment URL)
      window.location.href = 'https://cv-cover-letter-assistant.netlify.app';
    });
  </script>
</body>
</html>
EOF

# Create a README.md file for vercel
cat > README.md << 'EOF'
# CV & Cover Letter Assistant

This application helps you generate tailored cover letters and optimize your CV using AI, powered by Google's Gemini API.

## Features
- Generate customized cover letters based on your CV and job details
- Update your CV to match specific job requirements
- Simple and intuitive UI with real-time generation
- Secure - your data never leaves your browser (except for API calls to Google Gemini)

## Live Application
Visit the live application at [cv-cover-letter-assistant.netlify.app](https://cv-cover-letter-assistant.netlify.app)

## API Key
You'll need a Google Gemini API key to use this application. Get one at [ai.google.dev](https://ai.google.dev/).
EOF

echo "Build completed successfully!"