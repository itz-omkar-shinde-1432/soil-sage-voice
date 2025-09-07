# Smart Crop Advisory System

> AI-powered farming guidance for small and marginal farmers with voice-first multilingual interface

## 🌾 Project Overview

The Smart Crop Advisory System is a comprehensive agricultural platform designed to empower small and marginal farmers with:

- **AI Disease Detection**: Advanced image recognition for instant crop disease identification
- **Voice-First Interface**: Multilingual voice support in English, Hindi, and Marathi
- **Expert Advisory**: Personalized farming guidance and treatment recommendations
- **Market Intelligence**: Real-time crop prices and market forecasts
- **Progressive Web App**: Offline-capable mobile-first design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ System Architecture

### Frontend Stack
- **React 18** with TypeScript
- **TailwindCSS** with custom agricultural design system
- **shadcn/ui** components with custom variants
- **Web Speech API** for voice recognition and synthesis
- **React Router** for navigation
- **TanStack Query** for data fetching

### Key Features Implemented
- 🎤 **Voice Recording**: Multi-language speech-to-text
- 📸 **Image Upload**: Drag-and-drop crop image analysis
- 🌍 **Internationalization**: English, Hindi, Marathi support
- 📱 **Responsive Design**: Mobile-first PWA architecture
- 🎨 **Design System**: Earth-tone agricultural theme
- 🔊 **Text-to-Speech**: Accessibility-focused voice output

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── VoiceRecorder.tsx    # Voice input/output handler
│   ├── LanguageSwitcher.tsx # Multi-language support
│   ├── CropDemoForm.tsx     # Main analysis form
│   ├── ResultsPage.tsx      # Analysis results display
│   └── HeroSection.tsx      # Landing page hero
├── pages/               # Route components
│   ├── Index.tsx        # Landing page
│   ├── Demo.tsx         # Analysis demo
│   ├── Results.tsx      # Results display
│   └── Admin.tsx        # Admin dashboard
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/             # Images and static assets
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Colors**: Earth-inspired agricultural palette
- **Typography**: Accessible font hierarchy
- **Components**: Custom shadcn/ui variants
- **Animations**: Smooth transitions and micro-interactions
- **Voice States**: Visual feedback for recording/listening

### Color Palette
- **Primary Green**: Agricultural trust and growth
- **Earth Tones**: Natural browns and warm neutrals  
- **Golden Accent**: Premium highlights and CTAs
- **Status Colors**: Success, warning, and error states

## 🔧 Backend Architecture (Planned)

### Tech Stack
- **Node.js + TypeScript** with Express/Fastify
- **PostgreSQL** for user data and crop history
- **Redis** for caching and real-time alerts
- **Python FastAPI** ML microservice for disease detection

### API Endpoints (Design)
```
POST /api/predict        # Image analysis
POST /api/advice         # Crop advisory
GET  /api/market         # Market prices  
WS   /ws/alerts         # Real-time notifications
```

### ML Microservice (Design)
```python
# Disease Detection Model
POST /predict
{
  "image": "base64_encoded_image",
  "crop_type": "tomato",
  "location": "maharashtra"
}

# Response
{
  "disease": "leaf_blight",
  "confidence": 0.92,
  "treatment": {
    "chemical": "Copper Hydroxide 77% WP",
    "organic": "Neem Oil + Baking Soda",
    "dosage": "2.5kg per acre"
  }
}
```

## 🌐 Deployment

### Docker Setup (Planned)
```yaml
# docker-compose.yml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
  
  backend:
    build: ./backend  
    ports: ["8000:8000"]
    
  ml-service:
    build: ./ml-service
    ports: ["8001:8001"]
    
  postgres:
    image: postgres:15
    
  redis:
    image: redis:7-alpine
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests  
npm run test:e2e

# Type checking
npm run type-check
```

## 🌍 Internationalization

The application supports:
- **English (en-US)**: Default language
- **Hindi (hi-IN)**: हिंदी interface
- **Marathi (mr-IN)**: मराठी interface

Voice recognition and synthesis work in all supported languages using the Web Speech API.

## 📱 Progressive Web App

Features:
- **Offline Support**: Critical features work without internet
- **Installation**: Add to home screen capability
- **Push Notifications**: Weather and market alerts
- **Background Sync**: Queue analysis requests when offline

## 🚨 Current Status

**✅ Completed:**
- Modern React frontend with TypeScript
- Voice recording and multilingual support
- Responsive design with agricultural theme
- Mock disease detection workflow
- Admin dashboard skeleton
- Progressive Web App foundation

**🔄 In Progress:**
- Backend API development
- ML model integration
- Real-time notifications
- Market price feeds

**📋 Planned:**
- Production deployment
- SMS/IVR integration
- Advanced analytics
- Mobile app packaging

## 🤝 Contributing

This is a Smart India Hackathon project focused on empowering small farmers with accessible AI technology.

## 📄 License

Built for SIH 2024 - Smart Crop Advisory for Rural Development