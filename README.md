# Smart Resume Builder

A modern, AI-powered resume builder that helps you create professional, ATS-friendly resumes with intelligent suggestions and real-time optimization.

## ✨ Features

- **AI-Powered Content Suggestions**: Get intelligent recommendations for skills, experience descriptions, and keywords
- **ATS Optimization**: Built-in scanner to ensure your resume passes Applicant Tracking Systems
- **Multiple Templates**: Choose from 15+ professional, industry-specific templates
- **Real-time Preview**: See changes instantly as you build your resume
- **Export Options**: Download as PDF, DOCX, or plain text formats
- **Skill Matching**: Match your skills to job descriptions automatically
- **Grammar & Spell Check**: Built-in proofreading with suggestions
- **Dark/Light Mode**: Customizable interface themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices



## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-resume-builder.git
   cd smart-resume-builder
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Set up environment variables**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```
   
   Create `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENVIRONMENT=development
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm start
   # Backend will run on http://localhost:5000
   ```

7. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Frontend will run on http://localhost:3000
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗 Project Structure

```
smart-resume-builder/
├── backend/               # Backend API server
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   │   └── resumeController.js
│   │   └── routes/       # API routes
│   │       ├── resumes.js
│   │       └── db.js
│   ├── package.json      # Backend dependencies
│   └── server.js         # Express server entry point
├── frontend/             # React frontend application
│   ├── node_modules/     # Frontend dependencies
│   ├── public/           # Static assets
│   ├── src/
│   │   └── components/   # React components
│   │       ├── AISuggestions.jsx
│   │       ├── EducationItem.jsx
│   │       ├── EducationList.jsx
│   │       ├── ExperienceItem.jsx
│   │       ├── ExperienceList.jsx
│   │       ├── PdfExportButton.jsx
│   │       ├── PersonalInfo.jsx
│   │       ├── ResumeBuilder.jsx
│   │       ├── ResumePreview.jsx
│   │       └── SkillsInput.jsx
│   └── package.json      # Frontend dependencies
├── .gitignore
├── package-lock.json
└── package.json          # Root package.json
```

## 🔧 Available Scripts

### Root Scripts
- `npm install` - Install all dependencies (root, frontend, backend)
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start both frontend and backend in production mode

### Backend Scripts (cd backend)
- `npm start` - Start Express server
- `npm run dev` - Start server with nodemon for development
- `npm test` - Run backend tests
- `npm run lint` - Run ESLint for backend

### Frontend Scripts (cd frontend)
- `npm start` - Start React development server
- `npm run build` - Build React app for production
- `npm test` - Run frontend tests
- `npm run eject` - Eject from Create React App (irreversible)
- `npm run lint` - Run ESLint for frontend

## 🎨 Templates

Our resume builder includes various professional templates:

- **Classic** - Traditional, clean design
- **Modern** - Contemporary with subtle colors
- **Creative** - Bold design for creative fields
- **Technical** - Optimized for tech professionals
- **Executive** - Sophisticated for senior roles
- **Academic** - Structured for education sector
- **Minimalist** - Clean, distraction-free design

##  AI Features

### Content Suggestions
- Smart bullet point generation based on job titles
- Industry-specific keyword recommendations
- Achievement quantification suggestions

### ATS Optimization
- Real-time ATS compatibility scoring
- Keyword density analysis
- Format optimization alerts

### Job Matching
- Upload job descriptions for targeted optimization
- Skill gap analysis
- Tailored content recommendations

## 📱 API Reference

### Base URL
```
Backend: http://localhost:5000/api
Frontend: http://localhost:3000
```

### Resume Management
```javascript
GET    /api/resumes          # Get all resumes
POST   /api/resumes          # Create new resume
PUT    /api/resumes/:id      # Update resume
DELETE /api/resumes/:id      # Delete resume
GET    /api/resumes/:id      # Get specific resume
```

### AI Features
```javascript
POST /api/ai/suggestions     # Get AI content suggestions
POST /api/ai/optimize        # Optimize resume content
POST /api/ai/skills         # Get skill recommendations
```

### Export Features
```javascript
POST /api/export/pdf         # Export resume as PDF
POST /api/export/docx        # Export resume as DOCX
POST /api/export/json        # Export resume data as JSON
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                    # Run React tests
npm test -- --coverage     # Run tests with coverage
npm test -- --watchAll     # Run tests in watch mode
```

### Backend Testing
```bash
cd backend
npm test                    # Run Express/Node.js tests
npm run test:integration    # Run integration tests
npm run test:unit          # Run unit tests
```

### Full Stack Testing
```bash
# From root directory
npm run test:all           # Run both frontend and backend tests
```

## 🚀 Deployment

### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

### Production Build
```bash
# Build both frontend and backend
npm run build

# Start production servers
npm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Manual Deployment

**Backend Deployment:**
```bash
cd backend
npm install --production
npm start
```

**Frontend Deployment:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



##  Acknowledgments

- OpenAI for AI content generation
- PDF-lib for PDF generation
- React-PDF for PDF preview
- Tailwind CSS for styling
- Next.js for the framework



---

