import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = "Loading next question..." }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '4rem'
    }}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '4px solid rgba(139, 92, 246, 0.1)',
            borderTopColor: 'var(--color-primary)'
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '15%',
            width: '70%',
            height: '70%',
            borderRadius: '50%',
            border: '4px solid rgba(236, 72, 153, 0.1)',
            borderTopColor: 'var(--color-secondary)'
          }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;
