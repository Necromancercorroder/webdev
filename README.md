# Social Impact Platform

A comprehensive web-based platform that connects NGOs, donors, and volunteers to create meaningful social impact with complete transparency and accountability.

## 🌟 Features

### For NGOs
- **Campaign Management**: Create and manage donation and volunteer campaigns
- **Resource Tracking**: Monitor donations, volunteer engagement, and campaign progress
- **Transparency Tools**: Real-time reporting and impact visualization
- **Verification System**: Build trust through verified organization status

### For Donors
- **Secure Donations**: Safe and transparent donation processing
- **Impact Tracking**: Real-time updates on fund utilization and campaign progress
- **Campaign Discovery**: Browse verified campaigns by category and location
- **Donation History**: Complete record of all contributions and their impact

### For Volunteers
- **Opportunity Discovery**: Find local and relevant social impact activities
- **Easy Registration**: Simple signup and campaign participation
- **Skill Matching**: Connect with campaigns that match your skills and interests
- **Impact Tracking**: See the difference your volunteer work makes

### Platform Features
- **Transparent System**: Complete visibility into donations, volunteer efforts, and impact
- **Real-time Updates**: Live progress tracking and reporting
- **Data Visualization**: Charts and graphs showing social impact metrics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Secure login system for all user types

## 🚀 Technology Stack

- **Frontend**: React 18 with Vite
- **Backend**: Express.js with Node.js
- **Database**: MongoDB
- **Authentication**: JWT with bcryptjs
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API
- **Build Tool**: Vite

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-impact-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - **Option A**: Install MongoDB locally and start the service
   - **Option B**: Use MongoDB Atlas (cloud) and update `backend/.env` with your connection string

4. **Start the backend server**
   ```bash
   npm run server
   ```

5. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```

6. **Or start both together**
   ```bash
   npm run dev:full
   ```

7. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

8. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Navbar.jsx
│       └── Footer.jsx
├── contexts/
│   ├── AuthContext.jsx
│   └── CampaignContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Campaigns.jsx
│   ├── CampaignDetail.jsx
│   ├── CreateCampaign.jsx
│   ├── Profile.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🔐 User Types

### NGO (Non-Governmental Organization)
- Create and manage campaigns
- Track donations and volunteer engagement
- View detailed analytics and impact reports
- Manage organization profile and verification

### Donor
- Browse and support campaigns
- Make secure donations
- Track donation history and impact
- Receive updates on supported campaigns

### Volunteer
- Discover volunteer opportunities
- Register for campaigns
- Track volunteer hours and impact
- Manage volunteer profile

## 🎨 Design System

The platform uses a comprehensive design system built on Tailwind CSS with custom color palettes:

- **Primary**: Blue tones for main actions and branding
- **Secondary**: Gray tones for text and backgrounds
- **Success**: Green tones for positive actions and states
- **Warning**: Yellow/Orange tones for alerts and attention
- **Danger**: Red tones for errors and destructive actions

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:full` - Start both frontend and backend together
- `npm run seed` - Seed database with sample data
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email**: demo@example.com
- **Password**: password123
- **User Types**: Try different user types (NGO, Donor, Volunteer) during login

## 📊 Key Features Implemented

### Authentication System
- Multi-user type authentication (NGO, Donor, Volunteer)
- Secure login and registration
- User profile management
- Session persistence

### Campaign Management
- Create, edit, and manage campaigns
- Image upload and management
- Category and location filtering
- Progress tracking and reporting

### Donation System
- Secure donation processing (simulated)
- Real-time progress updates
- Donation history tracking
- Impact visualization

### Volunteer System
- Volunteer registration and management
- Skill-based matching
- Volunteer hour tracking
- Impact reporting

### Transparency Features
- Real-time progress tracking
- Detailed analytics and reporting
- Transparent fund utilization
- Impact metrics and visualization

## 🚀 Future Enhancements

- Real payment processing integration
- Advanced analytics and reporting
- Mobile app development
- AI-powered campaign recommendations
- Multi-language support
- Advanced volunteer matching algorithms
- Integration with social media platforms
- Advanced security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email contact@socialimpact.org or visit our contact page at `/contact`.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- All the open-source contributors who made this project possible

---

**Built with ❤️ for social impact**
