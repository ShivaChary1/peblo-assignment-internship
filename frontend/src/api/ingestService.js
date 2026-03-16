import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const ingestService = {

  ingestPDF: async (file, metadata) => {

    const formData = new FormData();

    formData.append('file', file);

    if (metadata.grade) formData.append('grade', metadata.grade);
    if (metadata.subject) formData.append('subject', metadata.subject);
    if (metadata.topic) formData.append('topic', metadata.topic);

    try {

      const response = await apiClient.post('/ingest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const sourceId = response.data.source._id;

      console.log("Source created:", sourceId);

      const quizResponse = await apiClient.post('/generate-quiz', {
        source_id: sourceId
      });

      console.log("Quiz result:", quizResponse.data);

      return {
        ...response.data,
        quiz: quizResponse.data
      };

    } catch (error) {

      console.error('Backend error:', error.response?.data || error.message);

      throw error;

    }

  }

};