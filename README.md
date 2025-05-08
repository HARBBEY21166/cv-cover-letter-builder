# CV & Cover Letter Assistant

A React application for generating customized cover letters and updating CVs based on job descriptions using Google Gemini API.

## Features

- Generate tailored cover letters using AI based on your CV and job details
- Update your CV to better match specific job requirements 
- User-friendly interface with real-time generation
- Secure client-side processing (your data never leaves your browser except for API calls to Google)
- Responsive design that works on mobile and desktop

## How It Works

1. Enter your current CV content
2. Provide job details (company, position, requirements)
3. Generate a personalized cover letter or updated CV with one click
4. Copy or download the results

## Demo

Visit the live application at: [Your Vercel/Netlify URL]

## Local Development

```bash
# Clone the repository
git clone https://github.com/HARBBEY21166/cv-cover-letter-builder.git
cd cv-cover-letter-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Key

This application requires a Google Gemini API key to function. You can get one at [https://ai.google.dev/](https://ai.google.dev/).

Once you have your API key, enter it in the application's configuration section to enable the generation features.

## Technology Stack

- React with TypeScript
- Tailwind CSS + shadcn/ui for styling
- Google Gemini API for AI text generation
- Vite for fast development and building

## Deployment

The application is client-side only and can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## License

[MIT](LICENSE)