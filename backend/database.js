require('dotenv').config();

// Simple in-memory database for development
class InMemoryDatabaseService {
  constructor() {
    this.isConnected = false;
    this.users = new Map();
    this.campaigns = new Map();
    this.donations = new Map();
    this.volunteers = new Map();
    this.volunteerApplications = new Map(); // New: volunteer applications
    this.equipment = new Map();
    this.userIdCounter = 1;
    this.campaignIdCounter = 1;
    this.donationIdCounter = 1;
    this.volunteerIdCounter = 1;
    this.volunteerApplicationIdCounter = 1; // New counter
    this.equipmentIdCounter = 1;
  }

  async connect() {
    if (this.isConnected) {
      return true;
    }
    console.log('🔍 Initializing in-memory database...');
    this.isConnected = true;
    console.log('✅ In-memory database ready');
    return true;
  }

  async disconnect() {
    this.isConnected = false;
    console.log('📴 Database disconnected');
  }

  generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  // Campaign operations
  async addCampaign(campaignData) {
    try {
      await this.connect();
      const id = String(this.campaignIdCounter++);
      const campaign = {
        id,
        _id: { toString: () => id },
        ...campaignData,
        createdAt: new Date().toISOString(),
        status: campaignData.status || 'active',
        raised: campaignData.raised || 0
      };
      this.campaigns.set(id, campaign);
      return { success: true, id };
    } catch (error) {
      console.error('Error adding campaign:', error);
      return { success: false, error: error.message };
    }
  }

  async getCampaigns() {
    try {
      await this.connect();
      const campaigns = Array.from(this.campaigns.values());
      return { success: true, campaigns };
    } catch (error) {
      console.error('Error getting campaigns:', error);
      return { success: false, error: error.message };
    }
  }

  async getCampaignById(id) {
    try {
      await this.connect();
      const campaign = this.campaigns.get(id);
      if (campaign) {
        return { success: true, campaign };
      } else {
        return { success: false, error: 'Campaign not found' };
      }
    } catch (error) {
      console.error('Error getting campaign by ID:', error);
      return { success: false, error: error.message };
    }
  }

  async updateCampaign(id, updates) {
    try {
      await this.connect();
      const campaign = this.campaigns.get(id);
      if (campaign) {
        const updatedCampaign = {
          ...campaign,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.campaigns.set(id, updatedCampaign);
        return { success: true };
      }
      return { success: false, error: 'Campaign not found' };
    } catch (error) {
      console.error('Error updating campaign:', error);
      return { success: false, error: error.message };
    }
  }

  // Donation operations
  async addDonation(donationData) {
    try {
      await this.connect();
      const id = String(this.donationIdCounter++);
      const transactionId = donationData.transactionId || `TXN${Date.now()}${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      const donation = {
        id,
        _id: { toString: () => id },
        ...donationData,
        transactionId,
        createdAt: new Date().toISOString(),
        status: donationData.status || 'completed',
        paymentStatus: donationData.paymentStatus || 'verified'
      };
      this.donations.set(id, donation);
      return { success: true, id, transactionId };
    } catch (error) {
      console.error('Error adding donation:', error);
      return { success: false, error: error.message };
    }
  }

  async getDonations(campaignId = null) {
    try {
      await this.connect();
      let donations = Array.from(this.donations.values());
      if (campaignId) {
        donations = donations.filter(d => d.campaignId === campaignId);
      }
      return { success: true, donations };
    } catch (error) {
      console.error('Error getting donations:', error);
      return { success: false, error: error.message };
    }
  }

  async getDonationByTransactionId(transactionId) {
    try {
      await this.connect();
      const donation = Array.from(this.donations.values()).find(d => d.transactionId === transactionId);
      if (donation) {
        return { success: true, donation };
      } else {
        return { success: false, error: 'Donation not found' };
      }
    } catch (error) {
      console.error('Error getting donation by transaction ID:', error);
      return { success: false, error: error.message };
    }
  }

  // Volunteer operations
  async addVolunteer(volunteerData) {
    try {
      await this.connect();
      const id = String(this.volunteerIdCounter++);
      const volunteer = {
        id,
        _id: { toString: () => id },
        ...volunteerData,
        joinedAt: new Date().toISOString(),
        status: volunteerData.status || 'active'
      };
      this.volunteers.set(id, volunteer);
      return { success: true, id };
    } catch (error) {
      console.error('Error adding volunteer:', error);
      return { success: false, error: error.message };
    }
  }

  async getVolunteers(campaignId = null) {
    try {
      await this.connect();
      let volunteers = Array.from(this.volunteers.values());
      if (campaignId) {
        volunteers = volunteers.filter(v => v.campaignId === campaignId);
      }
      return { success: true, volunteers };
    } catch (error) {
      console.error('Error getting volunteers:', error);
      return { success: false, error: error.message };
    }
  }

  // Volunteer Application operations
  async addVolunteerApplication(applicationData) {
    try {
      await this.connect();
      const id = String(this.volunteerApplicationIdCounter++);
      const application = {
        id,
        _id: { toString: () => id },
        ...applicationData,
        appliedAt: new Date().toISOString(),
        status: 'pending' // pending, approved, rejected
      };
      this.volunteerApplications.set(id, application);
      return { success: true, id, application };
    } catch (error) {
      console.error('Error adding volunteer application:', error);
      return { success: false, error: error.message };
    }
  }

  async getVolunteerApplications(filters = {}) {
    try {
      await this.connect();
      let applications = Array.from(this.volunteerApplications.values());
      
      if (filters.status) {
        applications = applications.filter(a => a.status === filters.status);
      }
      if (filters.userId) {
        applications = applications.filter(a => a.userId === filters.userId);
      }
      if (filters.campaignId) {
        applications = applications.filter(a => a.campaignId === filters.campaignId);
      }
      
      return { success: true, applications };
    } catch (error) {
      console.error('Error getting volunteer applications:', error);
      return { success: false, error: error.message };
    }
  }

  async updateVolunteerApplication(id, updates) {
    try {
      await this.connect();
      const application = this.volunteerApplications.get(id);
      if (application) {
        const updated = {
          ...application,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.volunteerApplications.set(id, updated);
        return { success: true, application: updated };
      }
      return { success: false, error: 'Application not found' };
    } catch (error) {
      console.error('Error updating volunteer application:', error);
      return { success: false, error: error.message };
    }
  }

  // Equipment operations
  async addEquipment(equipmentData) {
    try {
      await this.connect();
      const id = String(this.equipmentIdCounter++);
      const equipmentItem = {
        id,
        _id: { toString: () => id },
        ...equipmentData,
        createdAt: new Date().toISOString(),
        status: equipmentData.status || 'pending',
        allocatedFunds: 0,
        remainingFunds: equipmentData.totalCost
      };
      this.equipment.set(id, equipmentItem);
      return { success: true, id };
    } catch (error) {
      console.error('Error adding equipment:', error);
      return { success: false, error: error.message };
    }
  }

  async getEquipment(campaignId = null) {
    try {
      await this.connect();
      let equipment = Array.from(this.equipment.values());
      if (campaignId) {
        equipment = equipment.filter(e => e.campaignId === campaignId);
      }
      return { success: true, equipment };
    } catch (error) {
      console.error('Error getting equipment:', error);
      return { success: false, error: error.message };
    }
  }

  async updateEquipment(id, updates) {
    try {
      await this.connect();
      const equipmentItem = this.equipment.get(id);
      if (equipmentItem) {
        const updated = {
          ...equipmentItem,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.equipment.set(id, updated);
        return { success: true };
      }
      return { success: false, error: 'Equipment not found' };
    } catch (error) {
      console.error('Error updating equipment:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteEquipment(id) {
    try {
      await this.connect();
      if (this.equipment.has(id)) {
        this.equipment.delete(id);
        return { success: true };
      }
      return { success: false, error: 'Equipment not found' };
    } catch (error) {
      console.error('Error deleting equipment:', error);
      return { success: false, error: error.message };
    }
  }

  // User operations
  async addUser(userData) {
    try {
      await this.connect();
      const id = String(this.userIdCounter++);
      const user = {
        id,
        _id: { toString: () => id },
        ...userData,
        createdAt: new Date().toISOString(),
        verified: Boolean(userData.verified)
      };
      this.users.set(id, user);
      this.users.set(userData.email, user); // Also index by email
      return { success: true, id };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserById(id) {
    try {
      await this.connect();
      const user = this.users.get(id);
      if (user && user.id) {
        return { success: true, user };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return { success: false, error: error.message };
    }
  }

  async getUserByEmail(email) {
    try {
      await this.connect();
      const user = this.users.get(email);
      if (user) {
        return { success: true, user };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error getting user by email:', error);
      return { success: false, error: error.message };
    }
  }

  async updateUser(id, updates) {
    try {
      await this.connect();
      const user = this.users.get(id);
      if (user && user.id) {
        const updated = {
          ...user,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.users.set(id, updated);
        this.users.set(user.email, updated);
        return { success: true };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new InMemoryDatabaseService();
