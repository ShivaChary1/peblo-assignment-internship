# Peblo Frontend - Interactive Quiz UI

A modern, responsive React application built with Vite that provides an intuitive interface for students to take AI-generated quizzes and for teachers/admins to ingest PDF content.

## 🚀 Local Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure API URL
By default, the frontend expects the backend to be running at `http://localhost:5000/api`. You can override this by creating a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://your-backend-url/api
```

### 3. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## ✨ Key Features
- **PDF Ingestion UI**: Upload academic PDFs and trigger AI quiz generation.
- **Adaptive Quiz Interface**: Smooth, animated quiz taking experience with Framer Motion.
- **Real-time Feedback**: Get instant results after submitting answers.
- **Responsive Design**: Built to work seamlessly on desktops and mobile devices.

## 🛠️ Tech Stack
- **React 19**: Modern UI development.
- **Vite**: Ultra-fast build tool and development server.
- **Framer Motion**: High-performance animations and transitions.
- **Axios**: Promised-based HTTP client for API requests.
- **React Router 7**: Declarative routing for navigation.
- **Lucide React**: Beautifully simple pixel-perfect icons.

## 📁 Project Structure
- `src/api/`: Service layers for backend communication (`ingestService`, `quizService`).
- `src/components/`: Reusable UI components like buttons, inputs, and layout wrappers.
- `src/pages/`: Main views (Home, Quiz, Ingest).
- `src/assets/`: Static images and global styles.
- `App.jsx`: Main application routing and entry point.
- `index.css`: Global styles using modern CSS features.
