const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      projectId: "webdev-cd3a2",
    });
    console.log('🔥 Firebase Admin SDK initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error.message);
    process.exit(1);
  }
}

const db = admin.firestore();

async function addTestData() {
  try {
    console.log('📝 Adding test campaign...');
    
    const testCampaign = {
      title: "Clean Water Initiative",
      description: "Providing clean water access to rural communities",
      goal: 5000,
      category: "environment",
      location: "Rural Village",
      status: "active",
      createdAt: new Date().toISOString(),
      raised: 1500,
      supporters: 25
    };

    const docRef = await db.collection('campaigns').add(testCampaign);
    console.log('✅ Test campaign added with ID:', docRef.id);

    console.log('📝 Adding test donation...');
    
    const testDonation = {
      campaignId: docRef.id,
      amount: 100,
      donorName: "John Doe",
      donorEmail: "john@example.com",
      transactionId: `TXN${Date.now()}`,
      status: "completed",
      paymentStatus: "verified",
      createdAt: new Date().toISOString()
    };

    const donationRef = await db.collection('donations').add(testDonation);
    console.log('✅ Test donation added with ID:', donationRef.id);

    console.log('🎉 Test data added successfully! Check your Firebase Console now.');
    
  } catch (error) {
    console.error('❌ Error adding test data:', error);
  }
}

addTestData();
