# Peblo Backend - AI Ingestion & Quiz Service

The backend of the Peblo project handles PDF ingestion, content extraction, and AI-powered quiz generation using Google's Gemini AI.

## 🚀 Local Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory and populate it with the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```
You can use the `.env.example` file as a template.

### 3. Run the Server
- **Development mode (with nodemon):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```

## 🛠️ API Endpoints

### Ingestion
- `POST /api/ingest` - Upload a PDF and extract text.
- `POST /api/generate-quiz` - Generate a quiz based on an ingested source ID.

### Quiz Management
- `GET /api/quiz` - Fetch questions for a quiz.
- `POST /api/submit-answer` - Submit a student's answer and get feedback.


## 🧠 Key Technologies
- **Express.js**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling.
- **@google/genai**: Interface with Google Gemini models for quiz generation.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **pdf-parse**: Extracts text from PDF files.

## 📁 Source Code Overview
- `src/server.js`: Entry point of the application.
- `src/app.js`: Express app configuration and middleware.
- `src/controllers/`: Contains logic for handling API requests.
- `src/services/`: Contains complex business logic, such as interactions with Gemini AI and PDF parsing.
- `src/models/`: Defines the MongoDB schemas for Sources, Questions, Quizzes, and Students.
- `src/routes/`: Defines the API endpoint structures.
- `src/utils/`: Helper functions used across the application.
