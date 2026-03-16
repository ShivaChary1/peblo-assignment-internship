import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, ChevronLeft, ArrowRight } from 'lucide-react';
import { ingestService } from '../api/ingestService';
import Loader from '../components/Loader';

const IngestPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ grade: '', subject: '', topic: '' });
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');
  const [chunksCreated, setChunksCreated] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setStatus('idle');
      setMessage('');
    } else {
      setFile(null);
      setMessage('Please select a valid PDF file.');
    }
  };

  const handleIngest = async (e) => {
    e.preventDefault();
    if (!file) return;

    setStatus('uploading');
    try {
      const result = await ingestService.ingestPDF(file, metadata);
      setStatus('success');
      setMessage(result.message || 'PDF ingested successfully!');
      setChunksCreated(result.chunks_created || 0);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to process PDF. Please try again.');
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
      <header style={{ marginBottom: '2rem' }}>
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
          <ChevronLeft size={20} /> Back to Home
        </button>
      </header>

      <main style={{ flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
          style={{ padding: '3rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>
              PDF <span style={{ color: 'var(--color-primary)' }}>Ingestion</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Upload learning materials to generate adaptive quiz questions.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'uploading' ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader message="Processing and chunking PDF..." />
              </motion.div>
            ) : status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                <CheckCircle size={64} color="var(--color-success)" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Great Success!</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                  {message} <br />
                  <strong>{chunksCreated} chunks</strong> created from your document.
                </p>
                <button 
                  onClick={() => {
                    setFile(null);
                    setStatus('idle');
                    setMetadata({ grade: '', subject: '', topic: '' });
                  }}
                  style={{
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Upload Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleIngest} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* File Dropzone */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  />
                  <div style={{
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem',
                    textAlign: 'center',
                    background: file ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                    borderColor: file ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s'
                  }}>
                    {file ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={48} color="var(--color-primary)" />
                        <span style={{ fontWeight: '600' }}>{file.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          padding: '1rem', 
                          borderRadius: '50%', 
                          background: 'rgba(255,255,255,0.03)' 
                        }}>
                          <Upload size={32} color="var(--color-text-muted)" />
                        </div>
                        <div>
                          <p style={{ fontWeight: '600' }}>Click to upload or drag & drop</p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Only PDF files are supported</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Grade</label>
                    <input
                      type="text"
                      placeholder="e.g. 10th"
                      value={metadata.grade}
                      onChange={(e) => setMetadata({ ...metadata, grade: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Science"
                      value={metadata.subject}
                      onChange={(e) => setMetadata({ ...metadata, subject: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Topic</label>
                    <input
                      type="text"
                      placeholder="e.g. Electricity"
                      value={metadata.topic}
                      onChange={(e) => setMetadata({ ...metadata, topic: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white'
                      }}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    color: 'var(--color-error)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem'
                  }}>
                    <AlertCircle size={18} /> {message}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!file}
                  type="submit"
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: file ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' : 'rgba(255,255,255,0.05)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: file ? 'var(--shadow-glow)' : 'none',
                    marginTop: '1rem'
                  }}
                >
                  Start Processing <ArrowRight size={20} />
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default IngestPage;
