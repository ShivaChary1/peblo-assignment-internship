import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizService } from '../api/quizService';
import QuestionCard from '../components/QuestionCard';
import Loader from '../components/Loader';
import { ChevronLeft, Zap, Trophy, TrendingUp, TrendingDown, AlertCircle, Upload } from 'lucide-react';

const QuizPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const studentId = state?.studentId;
  const subject = state?.subject;

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [feedback, setFeedback] = useState(null); // { correct: bool, nextDifficulty: string }
  const [stats, setStats] = useState({ total: 0, correct: 0 });

  useEffect(() => {
    if (!studentId) {
      navigate('/');
      return;
    }
    loadNextQuestion();
  }, [studentId]);

  const loadNextQuestion = async () => {
    setLoading(true);
    try {
      const data = await quizService.fetchNextQuestion(studentId, subject);
      if (data.questions && data.questions.length > 0) {
        setQuestion(data.questions[0]);
        setDifficulty(data.difficulty);
      } else {
        setQuestion(null);
      }
    } catch (error) {
      console.error("Failed to load question", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelection = async (answer) => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
      const response = await quizService.submitAnswer(studentId, question._id, answer);
      
      setFeedback({
        correct: response.correct,
        nextDifficulty: response.next_difficulty
      });
      
      setStats(prev => ({
        total: prev.total + 1,
        correct: response.correct ? prev.correct + 1 : prev.correct
      }));

      // Wait a moment for the user to see feedback, then load next
      setTimeout(() => {
        setFeedback(null);
        loadNextQuestion();
        setSubmitting(false);
      }, 1200);

    } catch (error) {
      console.error("Failed to submit answer", error);
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'hard': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'easy': default: return '#10b981';
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem 0',
        marginBottom: '2rem'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--color-text-muted)',
            fontWeight: '500'
          }}
        >
          <ChevronLeft size={20} /> Quit
        </button>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Student</div>
            <div style={{ fontWeight: '600' }}>{studentId}</div>
          </div>
          <div className="glass-panel" style={{ 
            padding: '0.5rem 1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            borderColor: getDifficultyColor(difficulty) + '44'
          }}>
            <Zap size={16} color={getDifficultyColor(difficulty)} fill={getDifficultyColor(difficulty)} />
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: '700', 
              textTransform: 'uppercase',
              color: getDifficultyColor(difficulty)
            }}>
              {difficulty}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          ) : question ? (
            <div key="question-content">
              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    style={{
                      position: 'fixed',
                      top: '20%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 100,
                      padding: '1rem 2rem',
                      borderRadius: 'var(--radius-full)',
                      background: feedback.correct ? 'var(--color-success)' : 'var(--color-error)',
                      color: 'white',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: feedback.correct ? 'var(--shadow-success-glow)' : 'var(--shadow-error-glow)'
                    }}
                  >
                    {feedback.correct ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    {feedback.correct ? 'Correct! Difficulty Increasing' : 'Wrong! Difficulty Decreasing'}
                  </motion.div>
                )}
              </AnimatePresence>

              <QuestionCard 
                question={question} 
                onSelect={handleAnswerSelection} 
                disabled={submitting} 
              />
              
              <footer style={{ marginTop: '3rem', textAlign: 'center' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  gap: '2rem', 
                  padding: '1rem 2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Attempted</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.total}</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Accuracy</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          ) : stats.total === 0 ? (
            <motion.div 
              key="no-questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel"
              style={{ textAlign: 'center', padding: '4rem 2rem' }}
            >
              <AlertCircle size={64} color="var(--color-primary)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Questions Found</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                We couldn't find any questions for <strong>{subject || 'this subject'}</strong>. 
                Upload a PDF to generate personalized questions!
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => navigate('/ingest')}
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Upload size={20} /> Upload Material
                </button>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel"
              style={{ textAlign: 'center', padding: '4rem 2rem' }}
            >
              <Trophy size={64} color="#fbbf24" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Session Complete!</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                You've cleared all available questions for your current level.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Score</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stats.correct}/{stats.total}</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Level</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: getDifficultyColor(difficulty) }}>{difficulty}</div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/')}
                style={{
                  marginTop: '2.5rem',
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuizPage;
