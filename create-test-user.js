const bcrypt = require('bcryptjs');

async function createTestUser() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  console.log('Test User Data for Firebase:');
  console.log('========================');
  console.log('Collection: users');
  console.log('Fields:');
  console.log(`name (string): "Test User"`);
  console.log(`email (string): "test@example.com"`);
  console.log(`password (string): "${hashedPassword}"`);
  console.log(`userType (string): "admin"`);
  console.log(`avatar (string): "https://ui-avatars.com/api/?name=Test User&background=0ea5e9&color=fff"`);
  console.log(`verified (boolean): true`);
  console.log(`createdAt (string): "${new Date().toISOString()}"`);
  console.log('');
  console.log('Login credentials:');
  console.log('Email: test@example.com');
  console.log('Password: password123');
}

createTestUser();
