
import React from 'react';

export default function EducationItem({ item, updateItem, removeItem }) {
  return (
    <div className="mb-4 border border-indigo-300 rounded-lg p-3 bg-indigo-900 bg-opacity-50">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold">Education Entry</h3>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="material-icons text-red-500 cursor-pointer select-none"
          aria-label="Remove Education"
          title="Remove Education"
        >
          close
        </button>
      </div>

      {/* Form Fields */}
      <input
        type="text"
        value={item.institution}
        placeholder="Institution"
        onChange={(e) => updateItem(item.id, 'institution', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black mb-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="text"
        value={item.degree}
        placeholder="Degree"
        onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black mb-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="flex space-x-2 mb-1">
        <input
          type="text"
          value={item.startYear}
          placeholder="Start Year"
          onChange={(e) => updateItem(item.id, 'startYear', e.target.value)}
          className="flex-1 px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          value={item.endYear}
          placeholder="End Year"
          onChange={(e) => updateItem(item.id, 'endYear', e.target.value)}
          className="flex-1 px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <textarea
        value={item.details}
        placeholder="Details (optional)"
        rows="2"
        onChange={(e) => updateItem(item.id, 'details', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

