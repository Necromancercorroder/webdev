const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));
app.use(express.json());

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const existingUser = await db.getUserByEmail(email);
    if (existingUser.success) {
      return res.status(400).json({ 
        success: false, 
        error: 'User already exists with this email' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      userType: userType || 'donor', // donor, ngo, volunteer, platform_admin
      avatar: `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff`,
      verified: false
    };

    const result = await db.addUser(userData);
    if (result.success) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: result.id, email, userType: userData.userType },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        user: {
          id: result.id,
          name,
          email,
          userType: userData.userType,
          avatar: userData.avatar,
          verified: false
        },
        token
      });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.getUserByEmail(email);
    if (!result.success) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    const user = result.user;

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: (user.id || (user._id && user._id.toString())), email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: (user.id || (user._id && user._id.toString())),
        name: user.name,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar,
        verified: user.verified
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const result = await db.getUserByEmail(email);
    if (!result.success) {
      return res.status(404).json({ 
        success: false, 
        error: 'No account found with this email' 
      });
    }

    // In a real application, send password reset email
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const updateResult = await db.updateUser(result.user.id, { 
      resetCode, 
      resetCodeExpiry: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });

    if (updateResult.success) {
      res.json({
        success: true,
        message: 'Password reset code sent',
        resetCode
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to generate reset code' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    const result = await db.getUserByEmail(email);
    if (!result.success) {
      return res.status(404).json({ 
        success: false, 
        error: 'Invalid email' 
      });
    }

    const user = result.user;

    // Verify reset code and expiry
    if (!user.resetCode || user.resetCode !== resetCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid reset code' 
      });
    }

    if (user.resetCodeExpiry && new Date(user.resetCodeExpiry) < new Date()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Reset code has expired. Please request a new one.' 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateResult = await db.updateUser(user.id, {
      password: hashedPassword,
      resetCode: null,
      resetCodeExpiry: null
    });

    if (updateResult.success) {
      res.json({
        success: true,
        message: 'Password reset successful'
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to reset password' });
    }
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Google OAuth simulation (for demo purposes)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    let result = await db.getUserByEmail(email);
    let user;

    if (!result.success) {
      const userData = {
        name,
        email,
        avatar: avatar || `https://ui-avatars.com/api/?name=${name}&background=0ea5e9&color=fff`,
        userType: 'donor',
        verified: true,
        googleId: true
      };

      result = await db.addUser(userData);
      if (result.success) {
        user = {
          id: result.id,
          name,
          email,
          avatar: userData.avatar,
          userType: userData.userType,
          verified: true
        };
      }
    } else {
      user = {
        id: (result.user.id || (result.user._id && result.user._id.toString())),
        name: result.user.name,
        email: result.user.email,
        avatar: result.user.avatar,
        userType: result.user.userType,
        verified: result.user.verified
      };
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Campaign routes
app.get('/api/campaigns', async (req, res) => {
  try {
    const result = await db.getCampaigns();
    res.json(result);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.getCampaignById(id);
    res.json(result);
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/campaigns', authenticateToken, async (req, res) => {
  try {
    const result = await db.addCampaign(req.body);
    res.json(result);
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/campaigns/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.updateCampaign(id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Donation routes
app.get('/api/donations', async (req, res) => {
  try {
    const { campaignId } = req.query;
    const result = await db.getDonations(campaignId);
    res.json(result);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/donations/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const result = await db.getDonationByTransactionId(transactionId);
    res.json(result);
  } catch (error) {
    console.error('Get donation by transaction ID error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const result = await db.addDonation(req.body);
    res.json(result);
  } catch (error) {
    console.error('Add donation error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Volunteer routes
app.get('/api/volunteers', async (req, res) => {
  try {
    const { campaignId } = req.query;
    const result = await db.getVolunteers(campaignId);
    res.json(result);
  } catch (error) {
    console.error('Get volunteers error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/volunteers', async (req, res) => {
  try {
    const result = await db.addVolunteer(req.body);
    res.json(result);
  } catch (error) {
    console.error('Add volunteer error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Equipment routes
app.get('/api/equipment', async (req, res) => {
  try {
    const { campaignId } = req.query;
    const result = await db.getEquipment(campaignId);
    res.json(result);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.post('/api/equipment', authenticateToken, async (req, res) => {
  try {
    const result = await db.addEquipment(req.body);
    res.json(result);
  } catch (error) {
    console.error('Add equipment error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/equipment/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.updateEquipment(id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update equipment error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.delete('/api/equipment/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.deleteEquipment(id);
    res.json(result);
  } catch (error) {
    console.error('Delete equipment error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// User routes
app.get('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.getUserById(id);
    res.json(result);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.updateUser(id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Volunteer Application routes
app.post('/api/volunteer-applications', authenticateToken, async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
      userId: req.user.userId
    };
    const result = await db.addVolunteerApplication(applicationData);
    res.json(result);
  } catch (error) {
    console.error('Add volunteer application error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/volunteer-applications', authenticateToken, async (req, res) => {
  try {
    const { status, userId, campaignId } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (userId) filters.userId = userId;
    if (campaignId) filters.campaignId = campaignId;
    
    const result = await db.getVolunteerApplications(filters);
    res.json(result);
  } catch (error) {
    console.error('Get volunteer applications error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.put('/api/volunteer-applications/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.updateVolunteerApplication(id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update volunteer application error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await db.connect();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
});

setInterval(() => {}, 30000);

// Handle errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
});

// Initialize database
const initializeDatabase = async () => {
  try {
    await db.connect();
    
    const campaignsResult = await db.getCampaigns();
    
    if (campaignsResult.success && campaignsResult.campaigns.length === 0) {
      console.log('🌱 Initializing database...');
      
      const campaigns = [
        {
          title: "Clean Water for Rural Communities",
          description: "Providing clean drinking water to 5 rural communities in need. This project will install water purification systems and train local volunteers for maintenance.",
          category: "health",
          goal: 50000,
          raised: 25000,
          location: "Rural Maharashtra, India",
          organizationName: "Water for All Foundation",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500"
        },
        {
          title: "Education for Street Children",
          description: "Setting up mobile learning centers to provide education and basic literacy to street children in urban areas.",
          category: "education",
          goal: 30000,
          raised: 23500,
          location: "Mumbai, India",
          organizationName: "Hope for Children NGO",
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500"
        },
        {
          title: "Women Empowerment & Skill Training",
          description: "Vocational training programs for women to become financially independent through tailoring, handicrafts, and digital skills.",
          category: "empowerment",
          goal: 250000,
          raised: 170000,
          location: "Uttar Pradesh, India",
          organizationName: "Women Rise Together",
          image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=500"
        }
      ];
      
      const campaignIds = [];
      for (const campaign of campaigns) {
        const result = await db.addCampaign(campaign);
        if (result.success) {
          campaignIds.push(result.id);
          console.log(`  ✅ Added campaign: ${campaign.title}`);
        }
      }
      
      // Add sample donations
      const donations = [
        { campaignId: campaignIds[0], userId: "user-1", userName: "Rajesh Kumar", amount: 5000, paymentMethod: "upi", transactionId: "TXN001", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[0], userId: "user-2", userName: "Priya Sharma", amount: 2500, paymentMethod: "card", transactionId: "TXN002", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[0], userId: "user-3", userName: "Amit Patel", amount: 10000, paymentMethod: "bank", transactionId: "TXN003", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[0], userId: "user-4", userName: "Sneha Reddy", amount: 7500, paymentMethod: "upi", transactionId: "TXN004", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[1], userId: "user-5", userName: "Vikram Singh", amount: 8000, paymentMethod: "card", transactionId: "TXN005", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[1], userId: "user-6", userName: "Anjali Gupta", amount: 3500, paymentMethod: "upi", transactionId: "TXN006", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[1], userId: "user-7", userName: "Rahul Verma", amount: 12000, paymentMethod: "paypal", transactionId: "TXN007", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[2], userId: "user-8", userName: "Meera Iyer", amount: 15000, paymentMethod: "bank", transactionId: "TXN008", paymentStatus: "COMPLETED" },
        { campaignId: campaignIds[2], userId: "user-9", userName: "Karthik Nair", amount: 20000, paymentMethod: "card", transactionId: "TXN009", paymentStatus: "COMPLETED" }
      ];
      
      for (const donation of donations) {
        await db.addDonation(donation);
      }
      console.log(`  ✅ Added ${donations.length} donations`);
      
      const volunteers = [
        { campaignId: campaignIds[0], userId: "vol-1", userName: "Arjun Kapoor", email: "arjun@example.com", status: "approved" },
        { campaignId: campaignIds[0], userId: "vol-2", userName: "Divya Menon", email: "divya@example.com", status: "approved" },
        { campaignId: campaignIds[0], userId: "vol-3", userName: "Sanjay Desai", email: "sanjay@example.com", status: "approved" },
        { campaignId: campaignIds[1], userId: "vol-4", userName: "Kavya Krishnan", email: "kavya@example.com", status: "approved" },
        { campaignId: campaignIds[1], userId: "vol-5", userName: "Rohan Joshi", email: "rohan@example.com", status: "approved" },
        { campaignId: campaignIds[1], userId: "vol-6", userName: "Pooja Bhat", email: "pooja@example.com", status: "approved" },
        { campaignId: campaignIds[2], userId: "vol-7", userName: "Aditya Rao", email: "aditya@example.com", status: "approved" },
        { campaignId: campaignIds[2], userId: "vol-8", userName: "Nisha Pillai", email: "nisha@example.com", status: "approved" }
      ];
      
      for (const volunteer of volunteers) {
        await db.addVolunteer(volunteer);
      }
      console.log(`  ✅ Added ${volunteers.length} volunteers`);
      console.log('🎉 Database initialized successfully!');
    } else {
      console.log('📊 Database already contains data');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
};

// Initialize on server start
initializeDatabase();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await db.disconnect();
  process.exit(0);
});

module.exports = app;
