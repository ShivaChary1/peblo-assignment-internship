import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const quizService = {
  /**
   * Fetch a single quiz question for a given student
   */
  fetchNextQuestion: async (student_id, subject = null) => {
    try {
      const params = { student_id, limit: 1 };
      if (subject) params.subject = subject;
      
      const response = await apiClient.get('/quiz', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  },

  /**
   * Submit an answer and get real-time difficulty feedback
   */
  submitAnswer: async (student_id, question_id, selected_answer) => {
    try {
      const payload = {
        student_id,
        question_id,
        selected_answer
      };
      const response = await apiClient.post('/submit-answer', payload);
      return response.data;
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    }
  }
};
