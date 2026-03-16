import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, BookOpen, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    
    // Pass state to the quiz page
    navigate('/quiz', { state: { studentId, subject } });
  };

  return (
    <div className="landing-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '100vh'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '3rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{
          display: 'inline-flex',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(139, 92, 246, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <BrainCircuit size={40} color="var(--color-primary)" />
        </div>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
          Peblo <span style={{ color: 'var(--color-primary)' }}>AI</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Your personalized adaptive learning companion.
        </p>

        {/* Priority Action: Ingest Content */}
        <div style={{ marginBottom: '3rem' }}>
           <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/ingest')}
            style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '2px dashed var(--color-primary)',
              color: 'var(--color-primary)',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer'
            }}
          >
            <BookOpen size={22} /> Upload Learning Material
          </motion.button>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
            Upload PDF to generate adaptive quiz questions first!
          </p>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}></div>

        {/* Quiz Start Form */}
        <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.6rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Student ID
            </label>
            <input 
              type="text" 
              placeholder="e.g. STU123"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1.1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'all 0.2s',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.6rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Enter Subject
            </label>
            <input 
              type="text" 
              placeholder="e.g. Quantum Physics, History..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '1.1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'all 0.2s',
                fontSize: '1rem'
              }}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!studentId.trim()}
            style={{
              marginTop: '1rem',
              padding: '1.1rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-glow)',
              opacity: studentId.trim() ? 1 : 0.6
            }}
          >
            Go to Quiz <ArrowRight size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LandingPage;
