#!/bin/bash

# Create standalone build for static hosting
echo "Creating a static build for deployment..."

# Navigate to client directory
cd client

# Run Vite build
echo "Building client..."
NODE_ENV=production ../node_modules/.bin/vite build

# Create a simple index.js file for Vercel to recognize the project
echo "Creating index.js for Vercel..."
echo 'export default function handler(req, res) {
  res.status(200).send("API routes not used in this application");
}' > ../api/index.js

# Move back to root
cd ..

echo "Build completed! Files ready in dist/public"
echo "You can now deploy the dist/public directory to any static hosting service."