
import React from 'react';

export default function PersonalInfo({ data, updateField }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-4 border-b border-white pb-2 select-none">
        Personal Information
      </h2>

      <form className="space-y-4">
        {['fullName', 'email', 'phone', 'linkedin', 'website'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={data[field]}
            onChange={(e) => updateField(field, e.target.value)}
            placeholder={field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
        ))}

        <textarea
          name="summary"
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Professional Summary"
          rows="4"
          className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />
      </form>
    </div>
  );
}
