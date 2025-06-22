
// import React, { useState, useEffect, useRef } from 'react';
// import PersonalInfo from './PersonalInfo';
// import EducationList from './EducationList';
// import ExperienceList from './ExperienceList';
// import SkillsInput from './SkillsInput';
// import AISuggestions from './AISuggestions';
// import ResumePreview from './ResumePreview';
// import PdfExportButton from './PdfExportButton';

// export default function ResumeBuilder() {
//   const initialResume = {
//     personal: {
//       fullName: '',
//       email: '',
//       phone: '',
//       linkedin: '',
//       website: '',
//       summary: '',
//     },
//     education: [
//       { id: crypto.randomUUID(), institution: '', degree: '', startYear: '', endYear: '', details: '' },
//     ],
//     experience: [
//       { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' },
//     ],
//     skills: '',
//   };

//   const [resume, setResume] = useState(() => {
//     const saved = localStorage.getItem('resumeData');
//     return saved ? JSON.parse(saved) : initialResume;
//   });

//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [suggestions, setSuggestions] = useState('');
//   const previewRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem('resumeData', JSON.stringify(resume));
//   }, [resume]);

//   const saveResumeToDB = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/resumes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(resume),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert(`✅ Resume saved! ID: ${data._id}`);
//         setResume((prev) => ({ ...prev, _id: data._id }));
//       } else {
//         alert(`❌ Failed to save resume: ${data.error}`);
//       }
//     } catch (err) {
//       console.error('❌ Error saving resume:', err);
//       alert('❌ Failed to save resume. See console for details.');
//     }
//   };

//   const updatePersonal = (field, value) => {
//     setResume((prev) => ({
//       ...prev,
//       personal: { ...prev.personal, [field]: value },
//     }));
//   };

//   const updateEducation = (updatedList) => {
//     setResume((prev) => ({ ...prev, education: updatedList }));
//   };

//   const updateExperience = (updatedList) => {
//     setResume((prev) => ({ ...prev, experience: updatedList }));
//   };

//   const updateSkills = (value) => {
//     setResume((prev) => ({ ...prev, skills: value }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 text-black p-4 md:p-8 font-sans">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
//         Smart Resume Builder with AI Suggestions
//       </h1>

//       {/* Form Section */}
//       <section className="bg-white p-6 rounded-xl shadow-md mb-10 space-y-6 max-w-4xl mx-auto">
//         <PersonalInfo data={resume.personal} updateField={updatePersonal} />
//         <EducationList data={resume.education} updateList={updateEducation} />
//         <ExperienceList data={resume.experience} updateList={updateExperience} />
//         <SkillsInput data={resume.skills} updateSkills={updateSkills} />

//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={saveResumeToDB}
//             className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Save Resume
//           </button>

//           <PdfExportButton previewRef={previewRef} />

//           <AISuggestions
//             resume={resume}
//             setSuggestions={setSuggestions}
//             loading={loadingSuggestions}
//             setLoading={setLoadingSuggestions}
//           />
//         </div>

//         {suggestions && (
//           <div className="bg-blue-50 border-l-4 border-blue-400 text-black p-4 rounded-md">
//             <h2 className="font-semibold mb-2">AI Suggestions:</h2>
//             <pre className="whitespace-pre-wrap">{suggestions}</pre>
//           </div>
//         )}
//       </section>

//       {/* Resume Preview Section */}
//       <section className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4 text-blue-800">Resume Preview</h2>
//         <ResumePreview data={resume} previewRef={previewRef} />
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PersonalInfo from './PersonalInfo';
import EducationList from './EducationList';
import ExperienceList from './ExperienceList';
import SkillsInput from './SkillsInput';
import AISuggestions from './AISuggestions';
import ResumePreview from './ResumePreview';
import PdfExportButton from './PdfExportButton';

export default function ResumeBuilder() {
  const initialResume = useMemo(() => ({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    education: [
      { id: crypto.randomUUID(), institution: '', degree: '', startYear: '', endYear: '', details: '' },
    ],
    experience: [
      { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' },
    ],
    skills: '',
  }), []);

  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : initialResume;
    } catch {
      return initialResume;
    }
  });

  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const previewRef = useRef(null);

  // Debounced save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resume));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [resume]);

  const saveResumeToDB = useCallback(async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('http://localhost:4000/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume),
      });
      const data = await response.json();
      if (response.ok) {
        setSaveStatus('success');
        setResume((prev) => ({ ...prev, _id: data._id }));
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      console.error('Error saving resume:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  }, [resume]);

  const updatePersonal = useCallback((field, value) => {
    setResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  }, []);

  const updateEducation = useCallback((updatedList) => {
    setResume((prev) => ({ ...prev, education: updatedList }));
  }, []);

  const updateExperience = useCallback((updatedList) => {
    setResume((prev) => ({ ...prev, experience: updatedList }));
  }, []);

  const updateSkills = useCallback((value) => {
    setResume((prev) => ({ ...prev, skills: value }));
  }, []);

  // Enhanced styles with modern design
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
      zIndex: 0
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      animation: 'fadeInDown 0.8s ease-out'
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: '800',
      color: '#fff',
      marginBottom: '1rem',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '400',
      maxWidth: '600px',
      margin: '0 auto'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr'
      }
    },
    formPanel: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'slideInLeft 0.8s ease-out',
      height: 'fit-content'
    },
    previewPanel: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'slideInRight 0.8s ease-out',
      position: 'sticky',
      top: '2rem',
      maxHeight: 'calc(100vh - 4rem)',
      overflow: 'auto'
    },
    sectionNav: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      padding: '0.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '16px',
      overflow: 'auto'
    },
    navButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '600',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      whiteSpace: 'nowrap',
      minWidth: 'fit-content'
    },
    navButtonActive: {
      backgroundColor: '#667eea',
      color: '#fff',
      transform: 'translateY(-1px)',
      boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)'
    },
    navButtonInactive: {
      backgroundColor: 'transparent',
      color: '#6b7280',
      '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        color: '#667eea'
      }
    },
    section: {
      marginBottom: '2rem',
      opacity: 0,
      animation: 'fadeInUp 0.6s ease-out forwards'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: '1px solid rgba(0, 0, 0, 0.1)'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      border: 'none',
      padding: '0.875rem 2rem',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      position: 'relative',
      overflow: 'hidden'
    },
    secondaryButton: {
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      padding: '0.875rem 2rem',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    successButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#fff'
    },
    errorButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: '#fff'
    },
    loadingButton: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#fff'
    },
    suggestionsContainer: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginTop: '2rem',
      animation: 'slideInUp 0.5s ease-out'
    },
    suggestionsTitle: {
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem',
      fontSize: '1.1rem'
    },
    suggestionsText: {
      whiteSpace: 'pre-wrap',
      fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      color: '#374151',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '1rem',
      borderRadius: '8px'
    },
    previewTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    statusIndicator: {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.875rem',
      zIndex: 1000,
      animation: 'slideInRight 0.3s ease-out'
    },
    mobileOnly: {
      '@media (min-width: 1025px)': {
        display: 'none'
      }
    }
  };

  const sections = [
    { id: 'personal', label: '👤 Personal', icon: '👤' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'experience', label: '💼 Experience', icon: '💼' },
    { id: 'skills', label: '⚡ Skills', icon: '⚡' }
  ];

  const getSaveButtonStyle = () => {
    const baseStyle = { ...styles.primaryButton };
    switch (saveStatus) {
      case 'saving':
        return { ...baseStyle, ...styles.loadingButton };
      case 'success':
        return { ...baseStyle, ...styles.successButton };
      case 'error':
        return { ...baseStyle, ...styles.errorButton };
      default:
        return baseStyle;
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return '⏳ Saving...';
      case 'success':
        return '✅ Saved!';
      case 'error':
        return '❌ Error';
      default:
        return '💾 Save Resume';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      {saveStatus && (
        <div style={{
          ...styles.statusIndicator,
          backgroundColor: saveStatus === 'success' ? '#10b981' : saveStatus === 'error' ? '#ef4444' : '#f59e0b',
          color: '#fff'
        }}>
          {getSaveButtonText()}
        </div>
      )}

      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            ✨ Smart Resume Builder
          </h1>
          <p style={styles.subtitle}>
            Create professional resumes with AI-powered suggestions and real-time preview
          </p>
        </header>

        <div style={window.innerWidth > 1024 ? styles.mainGrid : {}}>
          {/* Form Panel */}
          <div style={styles.formPanel}>
            {/* Section Navigation */}
            <nav style={styles.sectionNav}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    ...styles.navButton,
                    ...(activeSection === section.id ? styles.navButtonActive : styles.navButtonInactive)
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                      e.target.style.color = '#667eea';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6b7280';
                    }
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            {/* Dynamic Sections */}
            {activeSection === 'personal' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  👤 Personal Information
                </h2>
                <PersonalInfo data={resume.personal} updateField={updatePersonal} />
              </div>
            )}

            {activeSection === 'education' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  🎓 Education
                </h2>
                <EducationList data={resume.education} updateList={updateEducation} />
              </div>
            )}

            {activeSection === 'experience' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  💼 Work Experience
                </h2>
                <ExperienceList data={resume.experience} updateList={updateExperience} />
              </div>
            )}

            {activeSection === 'skills' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  ⚡ Skills & Expertise
                </h2>
                <SkillsInput data={resume.skills} updateSkills={updateSkills} />
              </div>
            )}

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
              <button
                onClick={saveResumeToDB}
                style={getSaveButtonStyle()}
                disabled={saveStatus === 'saving'}
                onMouseEnter={(e) => {
                  if (saveStatus === '') {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (saveStatus === '') {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {getSaveButtonText()}
              </button>

              <PdfExportButton previewRef={previewRef} />

              <AISuggestions
                resume={resume}
                setSuggestions={setSuggestions}
                loading={loadingSuggestions}
                setLoading={setLoadingSuggestions}
              />
            </div>

            {/* AI Suggestions */}
            {suggestions && (
              <div style={styles.suggestionsContainer}>
                <h3 style={styles.suggestionsTitle}>🤖 AI Suggestions</h3>
                <pre style={styles.suggestionsText}>{suggestions}</pre>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div style={styles.previewPanel}>
            <h2 style={styles.previewTitle}>
              👁️ Live Preview
            </h2>
            <ResumePreview data={resume} previewRef={previewRef} />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 1024px) {
            .main-grid {
              grid-template-columns: 1fr !important;
            }
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}