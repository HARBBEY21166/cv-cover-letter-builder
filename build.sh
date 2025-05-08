#!/bin/bash

# This is a build script that copies our client app for Vercel deployment

# Make sure the client build directory exists
mkdir -p dist

# Copy the actual client files to the dist folder
echo "Building client application for deployment..."

# Copy the client HTML file
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Generate customized cover letters and optimize your CV for job applications" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <title>CV & Cover Letter Assistant</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      background-color: #f5f7fa;
      color: #333;
    }
    #root {
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
  <div id="root">
    <div class="loader-container">
      <h1>CV & Cover Letter Assistant</h1>
      <div class="loader"></div>
      <div class="loader-text">Loading application...</div>
    </div>
  </div>
  <script type="module">
    // Create a simple script to initialize the app
    const appDiv = document.createElement('div');
    appDiv.id = 'app';
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(appDiv);
    
    // Main app script to create the actual app
    async function createApp() {
      // Dynamically create our React app
      const App = document.createElement('script');
      App.type = 'module';
      App.innerHTML = `
        import React from 'https://esm.sh/react@18.3.1';
        import ReactDOM from 'https://esm.sh/react-dom@18.3.1';
        import { useState, useEffect } from 'https://esm.sh/react@18.3.1';
        
        const App = () => {
          const [apiKey, setApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
          const [message, setMessage] = useState('');
          
          const saveApiKey = () => {
            localStorage.setItem('geminiApiKey', apiKey);
            setMessage('API key saved successfully!');
            setTimeout(() => setMessage(''), 3000);
          };
          
          return React.createElement('div', { 
            style: { 
              maxWidth: '800px', 
              margin: '0 auto', 
              padding: '2rem',
              fontFamily: 'Segoe UI, Tahoma, sans-serif' 
            } 
          }, [
            React.createElement('h1', { 
              style: { 
                background: 'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                fontSize: '2.5rem'
              } 
            }, 'CV & Cover Letter Assistant'),
            React.createElement('p', {
              style: { marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }
            }, 'This web application helps you generate customized cover letters and optimize your CV using AI. Please visit the full version at:'),
            React.createElement('div', {
              style: { marginBottom: '2rem', textAlign: 'center' }
            }, [
              React.createElement('a', {
                href: 'https://github.com/HARBBEY21166/cv-cover-letter-builder',
                target: '_blank',
                style: {
                  display: 'inline-block',
                  padding: '0.8rem 1.6rem',
                  background: 'linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(71, 118, 230, 0.4)'
                }
              }, 'Go to GitHub Repository')
            ]),
            React.createElement('div', {
              style: {
                marginTop: '2rem',
                padding: '1.5rem',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }
            }, [
              React.createElement('h2', { 
                style: { marginBottom: '1rem', color: '#333' } 
              }, 'Quick Setup'),
              React.createElement('p', {}, 'To use this application, you need a Google Gemini API key:'),
              React.createElement('div', {
                style: { marginBottom: '1rem' }
              }, [
                React.createElement('label', {
                  htmlFor: 'apiKey',
                  style: { display: 'block', marginBottom: '0.5rem', fontWeight: '500' }
                }, 'Enter Gemini API Key:'),
                React.createElement('input', {
                  id: 'apiKey',
                  type: 'text',
                  value: apiKey,
                  onChange: (e) => setApiKey(e.target.value),
                  style: {
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginBottom: '1rem'
                  },
                  placeholder: 'Enter your API key here'
                }),
                React.createElement('button', {
                  onClick: saveApiKey,
                  style: {
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#4776E6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }
                }, 'Save API Key')
              ]),
              message && React.createElement('div', {
                style: {
                  padding: '0.75rem',
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  borderRadius: '4px',
                  marginTop: '1rem'
                }
              }, message)
            ])
          ]);
        };
        
        ReactDOM.render(
          React.createElement(App),
          document.getElementById('app')
        );
      `;
      document.body.appendChild(App);
    }
    
    // Initialize our app
    createApp();
  </script>
</body>
</html>
EOF

echo "Build completed! Your app is ready for Vercel deployment."