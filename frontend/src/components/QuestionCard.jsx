import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionCard = ({ question, onSelect, disabled }) => {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="glass-panel"
      style={{
        width: '100%',
        padding: '2.5rem',
        marginTop: '2rem'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1rem',
          color: 'var(--color-primary)',
          fontWeight: '700'
        }}>
          Question
        </span>
        <h2 style={{ 
          fontSize: '1.5rem', 
          lineHeight: '1.4', 
          marginTop: '0.5rem',
          fontWeight: '600'
        }}>
          {question.question}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.01, backgroundColor: 'var(--color-surface-hover)' } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            onClick={() => onSelect(option)}
            style={{
              textAlign: 'left',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--color-text)',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              color: 'var(--color-text-muted)'
            }}>
              {String.fromCharCode(65 + index)}
            </div>
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
