import React from 'react';
import ExperienceItem from './ExperienceItem';

export default function ExperienceList({ data, updateList }) {
  const addExperience = () => {
    updateList([
      ...data,
      { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const updateExperienceItem = (id, field, value) => {
    const updated = data.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    updateList(updated);
  };

  const removeExperience = (id) => {
    updateList(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 select-none flex justify-between items-center">
        Experience
        <button
          type="button"
          onClick={addExperience}
          className="material-icons text-indigo-400 cursor-pointer select-none"
          aria-label="Add Experience"
          title="Add Experience"
        >
          add_circle
        </button>
      </h2>
      {data.map((exp) => (
        <ExperienceItem
          key={exp.id}
          item={exp}
          updateItem={updateExperienceItem}
          removeItem={removeExperience}
        />
      ))}
    </div>
  );
}
