import React from 'react';

export default function SkillsInput({ data, updateSkills }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 select-none">Skills</h2>
      <textarea
        value={data}
        onChange={(e) => updateSkills(e.target.value)}
        placeholder="List your skills (comma separated)"
        rows="2"
        className="w-full px-3 py-2 rounded-md text-black border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
