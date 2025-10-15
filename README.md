"# 🇮🇳 SIHPS25152_MVP - Government Welfare Scheme Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

A comprehensive full-stack web application for managing government welfare schemes, beneficiary applications, and administrative analytics. Built with modern web technologies and featuring a beautiful Indian-themed design inspired by the national flag colors.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Design System](#-design-system)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👥 Multi-Role System
- **Users/Beneficiaries**: Apply for schemes, track applications, view eligibility
- **Organizations**: Manage scheme offerings, review applications
- **Admins**: Complete oversight, analytics, user management

### 🎯 Core Functionality

#### For Beneficiaries
- 📝 Browse and apply for government schemes
- 📊 Real-time application status tracking
- 🎯 Eligibility scoring system
- 📍 Interactive map showing scheme distribution
- 📄 Document upload (Aadhaar, Income Certificate, etc.)
- 🔔 Application notifications

#### For Organizations
- 📋 Scheme creation and management
- 📥 Application review and processing
- ✅ Approve/Reject applications with remarks
- 📈 Organization-specific analytics

#### For Admins
- 👨‍💼 User and organization management
- 📊 Comprehensive analytics dashboard
  - Applications trends (Line Chart)
  - Status distribution (Pie Chart)
  - Income group analysis (Bar Chart)
  - Eligibility distribution (Histogram)
  - Top performing districts (Leaderboard)
  - Blockchain activity tracking (Area Chart)
  - Admin actions monitoring (Bar Chart)
- 🗺️ Geographic visualization with Mapbox
- 📈 Real-time statistics

### 🎨 Advanced Features
- 🔐 JWT-based authentication
- 🔒 Role-based access control
- 📱 Responsive design (Mobile, Tablet, Desktop)
- 🌈 Modern Indian-themed UI
- ☁️ Cloudinary integration for file uploads
- 🗺️ Mapbox GL JS for geographic visualization
- 📊 Interactive charts with Recharts
- ⚡ Fast loading with optimized build
- 🔄 Real-time data updates

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 6.14
- **Charts**: Recharts 2.12
- **Maps**: Mapbox GL JS 3.15
- **HTTP Client**: Axios 1.4
- **Auth**: JWT Decode 3.1

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.19
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose 8.3
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer 1.4
- **Cloud Storage**: Cloudinary
- **CORS**: Enabled for cross-origin requests

### Development Tools
- **Dev Server**: Nodemon
- **Linting**: ESLint
- **Environment**: dotenv

## 📁 Project Structure

```
SIHPS25152_MVP/
│
├── client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js              # API configuration & endpoints
│   │   ├── assets/                 # Images, icons, etc.
│   │   ├── components/
│   │   │   ├── BeneficiaryMap.jsx  # Geographic visualization
│   │   │   ├── FileUpload.jsx      # Document upload component
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── RequireAuth.jsx     # Protected route wrapper
│   │   │   ├── ResizableNavbar.jsx # Responsive navigation
│   │   │   ├── ScoreGauge.jsx      # Eligibility score display
│   │   │   ├── charts/             # Analytics charts
│   │   │   │   ├── AdminActionsBarChart.jsx
│   │   │   │   ├── ApplicationsLineChart.jsx
│   │   │   │   ├── BlockchainActivityAreaChart.jsx
│   │   │   │   ├── EligibilityHistogram.jsx
│   │   │   │   ├── IncomeGroupsBarChart.jsx
│   │   │   │   ├── StatusPieChart.jsx
│   │   │   │   └── TopDistrictsLeaderboard.jsx
│   │   │   └── dashboard/
│   │   │       ├── ProfileSummary.jsx
│   │   │       ├── SchemeCard.jsx
│   │   │       └── SchemeSkeleton.jsx
│   │   ├── hooks/
│   │   │   └── useAnalyticsData.js # Custom analytics hook
│   │   ├── pages/
│   │   │   ├── AdminAnalytics.jsx  # Admin analytics dashboard
│   │   │   ├── AdminDashboard.jsx  # Admin main dashboard
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── OrgDashboard.jsx    # Organization dashboard
│   │   │   ├── Register.jsx        # Registration page
│   │   │   └── UserDashboard.jsx   # User/Beneficiary dashboard
│   │   ├── utils/
│   │   │   └── auth.js             # Authentication utilities
│   │   ├── App.jsx                 # Main App component
│   │   ├── App.css                 # Global styles
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Base styles
│   ├── .env                        # Environment variables
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite configuration
│   └── eslint.config.js            # ESLint configuration
│
├── server/                          # Backend Node.js Application
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js      # Admin business logic
│   │   ├── analyticsController.js  # Analytics data processing
│   │   ├── authController.js       # Authentication logic
│   │   ├── orgController.js        # Organization logic
│   │   └── userController.js       # User/Beneficiary logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── upload.js               # Multer file upload config
│   ├── models/
│   │   ├── Application.js          # Application schema
│   │   ├── Scheme.js               # Scheme schema
│   │   └── User.js                 # User schema
│   ├── routes/
│   │   ├── adminRoutes.js          # Admin endpoints
│   │   ├── analyticsRoutes.js      # Analytics endpoints
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── orgRoutes.js            # Organization endpoints
│   │   └── userRoutes.js           # User endpoints
│   ├── uploads/                    # Local file storage
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies
│   └── server.js                   # Entry point
│
├── THEME_CHANGES.md                # Design system documentation
└── README.md                       # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **MongoDB**: Atlas account or local installation ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**: For version control ([Download](https://git-scm.com/))
- **Cloudinary Account**: For image hosting ([Sign Up](https://cloudinary.com/))
- **Mapbox Account**: For map visualization ([Sign Up](https://www.mapbox.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/PRIYANSHU1jsnshsbhs/SIHPS25152_MVP.git
cd SIHPS25152_MVP
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT Secret (Use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox Token
VITE_MAPBOX_TOKEN=your_mapbox_token

# Server Configuration
PORT=8080
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# Mapbox Token
VITE_MAPBOX_TOKEN=your_mapbox_token

# API Base URL (optional, defaults to localhost:8080)
VITE_API_URL=http://localhost:8080
```

### Getting API Keys

#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" button
4. Replace `<username>`, `<password>`, and `<database_name>`

#### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### Mapbox
1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Go to Account → Tokens
3. Create a new token or use the default public token

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd server
npm run dev
```

The backend will start on `http://localhost:8080`

#### Start Frontend Development Server

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

### Production Build

#### Build Frontend

```bash
cd client
npm run build
```

#### Start Production Server

```bash
cd server
npm start
```

Serve the `client/dist` folder using a static file server or configure your backend to serve it.

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user" | "organization" | "admin",
  "phone": "9876543210",
  "aadhaar": "123456789012"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### User/Beneficiary Endpoints

#### Get All Schemes
```http
GET /api/user/schemes
Authorization: Bearer <token>
```

#### Apply for Scheme
```http
POST /api/user/apply
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "schemeId": "scheme_id",
  "documents": [files],
  "additionalInfo": {}
}
```

#### Get User Applications
```http
GET /api/user/applications
Authorization: Bearer <token>
```

### Organization Endpoints

#### Create Scheme
```http
POST /api/org/schemes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Education Grant",
  "description": "Financial assistance for students",
  "eligibilityCriteria": {
    "minIncome": 0,
    "maxIncome": 200000,
    "age": { "min": 18, "max": 25 }
  },
  "benefits": "₹50,000 per year"
}
```

#### Get Applications for Organization
```http
GET /api/org/applications
Authorization: Bearer <token>
```

#### Update Application Status
```http
PUT /api/org/applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved" | "rejected",
  "remarks": "Application approved after verification"
}
```

### Admin Endpoints

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <token>
```

#### Get Analytics Data
```http
GET /api/analytics/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalApplications": 1500,
  "approvedApplications": 850,
  "pendingApplications": 450,
  "rejectedApplications": 200,
  "applicationsTimeline": [...],
  "statusDistribution": {...},
  "incomeGroups": {...},
  "topDistricts": [...],
  "eligibilityScores": [...]
}
```

## 👥 User Roles

### 🙋 User/Beneficiary
- Browse available schemes
- Apply for schemes with document upload
- Track application status
- View eligibility scores
- Update profile information

### 🏢 Organization
- Create and manage schemes
- Review applications
- Approve/Reject applications
- Add remarks and feedback
- View organization analytics

### 👨‍💼 Admin
- Full system oversight
- User and organization management
- Comprehensive analytics dashboard
- System configuration
- Monitor all activities

## 🎨 Design System

### Color Palette

#### Primary Colors (Indian Flag Inspired)
- **Saffron**: `#FF9933` - Primary actions, emphasis
- **White**: `#FFFFFF` - Backgrounds, cards
- **Green**: `#138808` - Success, approved status
- **Navy Blue**: `#000080` - Links, information

#### Accent Colors
- **Gold**: `#FFD700` - Premium features
- **Emerald**: `#50C878` - Active states
- **Ruby Red**: `#E0115F` - Rejected, errors
- **Info Blue**: `#00B4D8` - Information

### Typography
- **Primary Font**: Inter - Body text, UI elements
- **Display Font**: Poppins - Headings, buttons
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Gradient backgrounds for visual depth
- Card-based layouts with shadows
- Smooth transitions and animations
- Responsive grid system
- Accessible color contrasts (WCAG AA compliant)

For detailed design documentation, see [THEME_CHANGES.md](./THEME_CHANGES.md)

## 📸 Screenshots

### Landing Page
Beautiful home page with scheme overview and quick actions

### User Dashboard
- View available schemes
- Track application status
- Interactive eligibility scoring

### Admin Analytics
- 7+ interactive charts
- Real-time statistics
- Geographic visualization
- Comprehensive insights

### Organization Panel
- Manage schemes
- Review applications
- Approve/Reject workflow

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: Route protection by user role
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data in .env files
- **File Upload Validation**: Type and size restrictions

## 🧪 Testing

### Run Frontend Tests
```bash
cd client
npm run test
```

### Run Backend Tests
```bash
cd server
npm run test
```

## 📦 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

### Backend Deployment (Railway/Render/Heroku)

1. Ensure environment variables are set in hosting platform
2. Push code to repository
3. Configure build command: `npm install`
4. Configure start command: `npm start`

### Environment Variables for Production
Update all environment variables with production values (database URLs, API keys, etc.)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow ESLint rules
- Use meaningful variable names
- Comment complex logic
- Write clean, readable code
- Follow React best practices

## 🐛 Known Issues

- File upload size limited to 10MB
- Map requires internet connection
- Charts may take time to load with large datasets

## 📝 Future Enhancements

- [ ] Multi-language support (Hindi, regional languages)
- [ ] SMS/Email notifications
- [ ] Biometric verification integration
- [ ] Offline mode with PWA
- [ ] Advanced search and filters
- [ ] Export reports to PDF/Excel
- [ ] Mobile app (React Native)
- [ ] Blockchain integration for transparency
- [ ] AI-based eligibility prediction
- [ ] Video KYC support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Priyanshu** - [PRIYANSHU1jsnshsbhs](https://github.com/PRIYANSHU1jsnshsbhs)

## 🙏 Acknowledgments

- Smart India Hackathon 2025
- Government of India for the initiative
- MongoDB Atlas for database hosting
- Cloudinary for media management
- Mapbox for geographic visualization
- All open-source contributors

## 📞 Support

For support, email: support@sihps25152.com or raise an issue in the repository.

## 🔗 Links

- **GitHub Repository**: [SIHPS25152_MVP](https://github.com/PRIYANSHU1jsnshsbhs/SIHPS25152_MVP)
- **Live Demo**: Coming Soon
- **Documentation**: [Wiki](https://github.com/PRIYANSHU1jsnshsbhs/SIHPS25152_MVP/wiki)

---

<div align="center">
  <p>Made with ❤️ for Smart India Hackathon 2025</p>
  <p>🇮🇳 Proudly Made in India 🇮🇳</p>
</div>" 
