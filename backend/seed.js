const db = require('./database');

const seedData = async () => {
  try {
    console.log('🌱 Initializing database...');

    await db.connect();

    const campaignData = [
      {
        title: "Clean Water for Rural Communities",
        description: "Providing clean drinking water to 5 rural communities in need. This project will install water purification systems and train local volunteers for maintenance.",
        ngo: {
          name: "Water for All Foundation",
          id: "ngo-1",
          verified: true
        },
        category: "Health & Environment",
        targetAmount: 50000,
        currentAmount: 32500,
        targetVolunteers: 25,
        currentVolunteers: 18,
        location: "Rural Maharashtra, India",
        startDate: "2024-01-15",
        endDate: "2024-06-15",
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
        ],
        requirements: ["Water purification systems", "Volunteer training", "Community engagement"],
        progress: 65
      },
      {
        title: "Education for Street Children",
        description: "Setting up mobile learning centers to provide education and basic literacy to street children in urban areas.",
        ngo: {
          name: "Hope for Children NGO",
          id: "ngo-2",
          verified: true
        },
        category: "Education",
        targetAmount: 30000,
        currentAmount: 18750,
        targetVolunteers: 40,
        currentVolunteers: 32,
        location: "Mumbai, India",
        startDate: "2024-02-01",
        endDate: "2024-08-01",
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500"
        ],
        requirements: ["Educational materials", "Mobile learning equipment", "Volunteer teachers"],
        progress: 62.5
      },
      {
        title: "Disaster Relief Fund",
        description: "Emergency relief fund for recent flood victims. Providing immediate food, shelter, and medical assistance.",
        ngo: {
          name: "Disaster Relief Foundation",
          id: "ngo-3",
          verified: true
        },
        category: "Disaster Relief",
        targetAmount: 100000,
        currentAmount: 100000,
        targetVolunteers: 50,
        currentVolunteers: 50,
        location: "Kerala, India",
        startDate: "2024-01-10",
        endDate: "2024-03-10",
        status: "completed",
        images: [
          "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500"
        ],
        requirements: ["Emergency supplies", "Medical aid", "Volunteer coordination"],
        progress: 100
      }
    ];

    const campaignIds = [];
    for (const campaign of campaignData) {
      const result = await db.addCampaign(campaign);
      if (result.success) {
        campaignIds.push(result.id);
        console.log(`✅ Added campaign: ${campaign.title}`);
      } else {
        console.error(`❌ Failed to add campaign: ${campaign.title}`, result.error);
      }
    }

    const donationData = [
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "user-1",
        userName: "Rajesh Kumar",
        amount: 5000,
        paymentMethod: "upi",
        transactionId: "TXN001",
        message: "Keep up the great work!",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "user-2",
        userName: "Priya Sharma",
        amount: 2500,
        paymentMethod: "card",
        transactionId: "TXN002",
        message: "Hope this helps the community",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "user-3",
        userName: "Amit Patel",
        amount: 10000,
        paymentMethod: "bank",
        transactionId: "TXN003",
        message: "Great cause!",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "user-4",
        userName: "Sneha Reddy",
        amount: 7500,
        paymentMethod: "upi",
        transactionId: "TXN004",
        message: "Happy to contribute",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "user-5",
        userName: "Vikram Singh",
        amount: 8000,
        paymentMethod: "card",
        transactionId: "TXN005",
        message: "Education is the key to a better future",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "user-6",
        userName: "Anjali Gupta",
        amount: 3500,
        paymentMethod: "upi",
        transactionId: "TXN006",
        message: "Supporting education",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "user-7",
        userName: "Rahul Verma",
        amount: 12000,
        paymentMethod: "paypal",
        transactionId: "TXN007",
        message: "Every child deserves education",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[2] || "campaign-3",
        userId: "user-8",
        userName: "Meera Iyer",
        amount: 15000,
        paymentMethod: "bank",
        transactionId: "TXN008",
        message: "Stay strong!",
        paymentStatus: "COMPLETED"
      },
      {
        campaignId: campaignIds[2] || "campaign-3",
        userId: "user-9",
        userName: "Karthik Nair",
        amount: 20000,
        paymentMethod: "card",
        transactionId: "TXN009",
        message: "For disaster relief",
        paymentStatus: "COMPLETED"
      }
    ];

    for (const donation of donationData) {
      const result = await db.addDonation(donation);
      if (result.success) {
        console.log(`✅ Added donation: ${donation.userName} - ₹${donation.amount}`);
      } else {
        console.error(`❌ Failed to add donation: ${donation.userName}`, result.error);
      }
    }

    const volunteerData = [
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "vol-1",
        userName: "Arjun Kapoor",
        email: "arjun@example.com",
        phone: "+91-9876543210",
        skills: ["Water systems", "Community outreach"],
        availability: "Weekends",
        status: "approved"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "vol-2",
        userName: "Divya Menon",
        email: "divya@example.com",
        phone: "+91-9876543211",
        skills: ["Engineering", "Project management"],
        availability: "Full-time",
        status: "approved"
      },
      {
        campaignId: campaignIds[0] || "campaign-1",
        userId: "vol-3",
        userName: "Sanjay Desai",
        email: "sanjay@example.com",
        phone: "+91-9876543212",
        skills: ["Construction", "Maintenance"],
        availability: "Weekends",
        status: "approved"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "vol-4",
        userName: "Kavya Krishnan",
        email: "kavya@example.com",
        phone: "+91-9876543213",
        skills: ["Teaching", "Child development"],
        availability: "Evenings",
        status: "approved"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "vol-5",
        userName: "Rohan Joshi",
        email: "rohan@example.com",
        phone: "+91-9876543214",
        skills: ["Mathematics", "Science teaching"],
        availability: "Weekdays",
        status: "approved"
      },
      {
        campaignId: campaignIds[1] || "campaign-2",
        userId: "vol-6",
        userName: "Pooja Bhat",
        email: "pooja@example.com",
        phone: "+91-9876543215",
        skills: ["Arts & Crafts", "Creative teaching"],
        availability: "Weekends",
        status: "approved"
      },
      {
        campaignId: campaignIds[2] || "campaign-3",
        userId: "vol-7",
        userName: "Aditya Rao",
        email: "aditya@example.com",
        phone: "+91-9876543216",
        skills: ["Emergency response", "First aid"],
        availability: "Full-time",
        status: "approved"
      },
      {
        campaignId: campaignIds[2] || "campaign-3",
        userId: "vol-8",
        userName: "Nisha Pillai",
        email: "nisha@example.com",
        phone: "+91-9876543217",
        skills: ["Medical assistance", "Nursing"],
        availability: "Full-time",
        status: "approved"
      }
    ];

    for (const volunteer of volunteerData) {
      const result = await db.addVolunteer(volunteer);
      if (result.success) {
        console.log(`✅ Added volunteer: ${volunteer.userName}`);
      } else {
        console.error(`❌ Failed to add volunteer: ${volunteer.userName}`, result.error);
      }
    }

    const userData = [
      {
        name: "John Smith",
        email: "john@example.com",
        userType: "donor",
        avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff",
        verified: true
      },
      {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        userType: "ngo",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0ea5e9&color=fff",
        verified: true
      },
      {
        name: "Mike Wilson",
        email: "mike@example.com",
        userType: "volunteer",
        avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=0ea5e9&color=fff",
        verified: true
      }
    ];

    for (const user of userData) {
      const result = await db.addUser(user);
      if (result.success) {
        console.log(`✅ Added user: ${user.name}`);
      } else {
        console.error(`❌ Failed to add user: ${user.name}`, result.error);
      }
    }

    console.log('🎉 Database initialized successfully');
    return { success: true, message: 'Sample data added successfully' };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, error: error.message };
  } finally {
    await db.disconnect();
  }
};

// Run the seed function
seedData()
  .then((result) => {
    if (result.success) {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    } else {
      console.error('❌ Seeding failed:', result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });

