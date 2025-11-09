// Test script to verify API endpoints work
const API_BASE_URL = 'http://localhost:5000/api';

const testAPI = async () => {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test campaigns endpoint
    console.log('Testing campaigns endpoint...');
    const campaignsResponse = await fetch(`${API_BASE_URL}/campaigns`);
    const campaignsData = await campaignsResponse.json();
    console.log('✅ Campaigns:', campaignsData);
    
    // Test donations endpoint
    console.log('Testing donations endpoint...');
    const donationsResponse = await fetch(`${API_BASE_URL}/donations`);
    const donationsData = await donationsResponse.json();
    console.log('✅ Donations:', donationsData);
    
    // Test volunteers endpoint
    console.log('Testing volunteers endpoint...');
    const volunteersResponse = await fetch(`${API_BASE_URL}/volunteers`);
    const volunteersData = await volunteersResponse.json();
    console.log('✅ Volunteers:', volunteersData);
    
    console.log('🎉 All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Run tests if this script is executed directly
if (typeof window === 'undefined') {
  testAPI();
}

export { testAPI };

