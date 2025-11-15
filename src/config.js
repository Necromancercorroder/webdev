// API Configuration
const config = {
  // Use environment variable or fallback to localhost for development
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
};

export default config;
