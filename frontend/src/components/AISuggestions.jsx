import React from 'react';

export default function AISuggestions({ resume, setSuggestions, loading, setLoading }) {
  const fetchSuggestions = async () => {
    if (loading) return;

    if (!resume || !resume._id) {
      setSuggestions('❌ Resume ID is missing. Please save the resume first.');
      return;
    }

    setLoading(true);
    setSuggestions('');

    try {
      const response = await fetch(`http://localhost:4000/api/resumes/${resume._id}/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ No body needed — backend uses only :id
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions || '⚠️ No suggestions received.');
      } else {
        setSuggestions(`❌ Server error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setSuggestions('❌ Failed to fetch AI suggestions. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={fetchSuggestions}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Loading Suggestions...' : 'Get AI Suggestions'}
      </button>
    </div>
  );
}


