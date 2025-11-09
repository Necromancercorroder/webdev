# MongoDB Setup Instructions

## 🚀 Quick Setup

### 1. Install MongoDB

#### Option A: Local MongoDB Installation
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install MongoDB following the installation wizard
3. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string (mongodb+srv://...)
4. Update `backend/.env` with your Atlas connection string

### 2. Backend Setup

The backend is already configured with the necessary dependencies:
- `mongodb` - MongoDB driver
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables

### 3. Environment Configuration

The backend uses environment variables in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/social-impact-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-impact-platform
```

### 4. Start the Application

#### Start Backend Only:
```bash
npm run server
```

#### Start Frontend Only:
```bash
npm run dev
```

#### Start Both Frontend and Backend:
```bash
npm run dev:full
```

### 5. Seed Database with Sample Data

```bash
npm run seed
```

## 🗄️ Database Structure

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: "User Name",
  email: "user@example.com",
  password: "hashed_password",
  userType: "donor", // 'ngo', 'donor', 'volunteer'
  avatar: "https://ui-avatars.com/api/...",
  verified: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

#### Campaigns Collection
```javascript
{
  _id: ObjectId,
  title: "Campaign Title",
  description: "Campaign description",
  ngo: {
    name: "NGO Name",
    id: "ngo-id",
    verified: true
  },
  category: "Health & Environment",
  targetAmount: 50000,
  currentAmount: 0,
  targetVolunteers: 25,
  currentVolunteers: 0,
  location: "City, State",
  startDate: "2024-01-15",
  endDate: "2024-06-15",
  status: "active",
  images: ["url1", "url2"],
  requirements: ["req1", "req2"],
  progress: 0,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

#### Donations Collection
```javascript
{
  _id: ObjectId,
  campaignId: "campaign-id",
  donorId: "user-id",
  amount: 5000,
  donorName: "Donor Name",
  message: "Donation message",
  transactionId: "TXN123456789",
  status: "completed",
  paymentStatus: "verified",
  createdAt: "2024-01-20T10:30:00Z"
}
```

#### Volunteers Collection
```javascript
{
  _id: ObjectId,
  campaignId: "campaign-id",
  volunteerId: "user-id",
  volunteerName: "Volunteer Name",
  skills: ["skill1", "skill2"],
  status: "active",
  joinedAt: "2024-01-18T12:00:00Z"
}
```

#### Equipment Collection
```javascript
{
  _id: ObjectId,
  campaignId: "campaign-id",
  name: "Equipment Name",
  description: "Equipment description",
  totalCost: 10000,
  allocatedFunds: 0,
  remainingFunds: 10000,
  status: "pending",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth (simulated)

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `POST /api/campaigns` - Create campaign (authenticated)
- `PUT /api/campaigns/:id` - Update campaign (authenticated)

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations?campaignId=:id` - Get donations by campaign
- `GET /api/donations/transaction/:transactionId` - Get donation by transaction ID
- `POST /api/donations` - Create donation

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers?campaignId=:id` - Get volunteers by campaign
- `POST /api/volunteers` - Register volunteer

### Equipment
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment?campaignId=:id` - Get equipment by campaign
- `POST /api/equipment` - Add equipment (authenticated)
- `PUT /api/equipment/:id` - Update equipment (authenticated)
- `DELETE /api/equipment/:id` - Delete equipment (authenticated)

### Users
- `GET /api/users/:id` - Get user by ID (authenticated)
- `PUT /api/users/:id` - Update user (authenticated)

## 🔒 Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware

### CORS Configuration
- Configured for frontend URL
- Credentials support enabled

### Environment Variables
- Sensitive data stored in environment variables
- Separate development and production configurations

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check if MongoDB service is running
   - Verify connection string in `.env`
   - Ensure MongoDB is accessible

2. **API Requests Failing**
   - Check if backend server is running on port 5000
   - Verify CORS configuration
   - Check browser console for errors

3. **Authentication Issues**
   - Verify JWT_SECRET is set in `.env`
   - Check token expiration
   - Ensure proper headers in API requests

4. **Data Not Persisting**
   - Check MongoDB connection
   - Verify database permissions
   - Check API error responses

## 🎯 Next Steps

1. **Production Setup**:
   - Use MongoDB Atlas for production
   - Set up proper environment variables
   - Configure production CORS settings
   - Set up SSL certificates

2. **Additional Features**:
   - Real-time notifications with WebSockets
   - File upload for images
   - Advanced search and filtering
   - Email notifications

3. **Security Enhancements**:
   - Rate limiting
   - Input validation
   - SQL injection prevention
   - Audit logging

4. **Performance Optimization**:
   - Database indexing
   - Caching strategies
   - API response optimization

## 📞 Support

If you encounter any issues:
1. Check the backend console for errors
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check network connectivity
5. Review environment configuration

---

**Your Social Impact Platform is now powered by MongoDB! 🍃**

