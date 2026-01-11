import axios from 'axios';

async function testAPI() {
  const API_BASE_URL = 'http://localhost:5000/api';
  
  console.log('Testing API endpoints...\n');
  
  // Test health endpoint
  try {
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✓ Health check:', healthResponse.data);
  } catch (error) {
    console.log('✗ Health check failed:', error.message);
  }
  
  // Test registration with a temporary user
  try {
    const registerResponse = await axios.post(`${API_BASE_URL}/users/register`, {
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test User'
    });
    console.log('✓ Registration:', registerResponse.data.message);
    
    // Extract token for subsequent requests
    const token = registerResponse.data.token;
    
    // Test profile endpoint with token
    try {
      const profileResponse = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✓ Profile access:', profileResponse.data.name);
    } catch (error) {
      console.log('✗ Profile access failed:', error.message);
    }
    
  } catch (error) {
    console.log('✗ Registration failed:', error.message);
  }
  
  console.log('\nAPI testing completed.');
}

testAPI();