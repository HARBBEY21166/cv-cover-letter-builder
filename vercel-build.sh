#!/bin/bash

# This is a dedicated build script for Vercel deployment

# Make sure build directory exists
mkdir -p dist

# Create a basic static HTML file that will redirect to the live version
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%);
      color: #333;
      text-align: center;
    }
    .container {
      max-width: 800px;
      padding: 2rem;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .button {
      display: inline-block;
      padding: 0.8rem 1.6rem;
      background: linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(71, 118, 230, 0.4);
    }
    .button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(71, 118, 230, 0.6);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>CV & Cover Letter Assistant</h1>
    <p>This application helps you generate tailored cover letters and optimize your CV using AI, powered by Google's Gemini API.</p>
    <p>The application requires a Google Gemini API key to function. You'll need to provide your own API key when using the app.</p>
    <a href="https://cv-cover-letter-assistant.netlify.app" class="button">Launch Application</a>
  </div>
</body>
</html>
EOF

echo "Static build for Vercel created!"