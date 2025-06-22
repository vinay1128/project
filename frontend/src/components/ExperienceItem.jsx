
import React from 'react';

export default function ExperienceItem({ item, updateItem, removeItem }) {
  return (
    <div className="mb-4 border border-indigo-300 rounded-lg p-3 bg-indigo-900 bg-opacity-50">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold">Experience Entry</h3>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="material-icons text-red-500 cursor-pointer select-none"
          aria-label="Remove Experience"
          title="Remove Experience"
        >
          close
        </button>
      </div>

      <input
        type="text"
        value={item.company}
        placeholder="Company"
        onChange={(e) => updateItem(item.id, 'company', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black mb-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="text"
        value={item.position}
        placeholder="Position"
        onChange={(e) => updateItem(item.id, 'position', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black mb-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="flex space-x-2 mb-1">
        <input
          type="text"
          value={item.startDate}
          placeholder="Start Date"
          onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
          className="flex-1 px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          value={item.endDate}
          placeholder="End Date"
          onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
          className="flex-1 px-2 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <textarea
        value={item.description}
        placeholder="Description"
        rows="2"
        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
        className="w-full px-2 py-1 rounded-md text-black border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
