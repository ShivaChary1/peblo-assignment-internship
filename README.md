# Peblo Assignment - PDF Quiz Generator

This project is a full-stack web application that allows users to upload PDF documents, extract their content using AI, and generate interactive quizzes based on the extracted information. It features an adaptive quiz system that adjusts difficulty based on student performance.

## 🏗️ Project Architecture

The project is split into two main components:
- **[Frontend](./frontend)**: A modern React application built with Vite, Framer Motion for animations, and Axios for API interaction.
- **[Backend](./backend)**: A Node.js Express server integrated with MongoDB for data persistence and Google Gemini AI for content analysis and quiz generation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Peblo-Assignment
   ```

2. **Setup the Backend:**
   Navigate to the backend directory, install dependencies, and configure environment variables.
   ```bash
   cd backend
   npm install
   # Create .env file based on .env.example
   ```
   *Follow the [Backend README](./backend/README.md) for detailed setup.*

3. **Setup the Frontend:**
   Navigate to the frontend directory and install dependencies.
   ```bash
   cd ../frontend
   npm install
   ```
   *Follow the [Frontend README](./frontend/README.md) for detailed setup.*

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **Vite** - Build Tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP Client
- **React Router** - Navigation

### Backend
- **Node.js & Express** - Server Framework
- **MongoDB & Mongoose** - Database & ORM
- **Google Gemini AI** - Question Generation & AI Logic
- **Multer** - File Upload Handling
- **PDF-Parse** - PDF Text Extraction

## 📂 Folder Structure

```text
Peblo-Assignment/
├── backend/            # Express server & AI integration
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── controllers/# Request handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── services/   # Business logic & AI services
│   └── uploads/        # Temporary storage for uploaded PDFs
├── frontend/           # React application
│   └── src/
│       ├── api/        # Axios service layers
│       ├── components/ # Reusable UI components
│       ├── pages/      # Route components (Home, Quiz, Ingest)
│       └── assets/     # Static assets
└── README.md           # This file
```

## 📝 License
This project is licensed under the ISC License.
