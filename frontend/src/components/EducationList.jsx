import React from 'react';
import EducationItem from './EducationItem';

export default function EducationList({ data, updateList }) {
  const addEducation = () => {
    updateList([
      ...data,
      { id: crypto.randomUUID(), institution: '', degree: '', startYear: '', endYear: '', details: '' },
    ]);
  };

  const updateEducationItem = (id, field, value) => {
    const updated = data.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    updateList(updated);
  };

  const removeEducation = (id) => {
    updateList(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 select-none flex justify-between items-center">
        Education
        <button
          type="button"
          onClick={addEducation}
          className="material-icons text-indigo-400 cursor-pointer select-none"
          aria-label="Add Education"
          title="Add Education"
        >
          add_circle
        </button>
      </h2>
      {data.map((ed) => (
        <EducationItem
          key={ed.id}
          item={ed}
          updateItem={updateEducationItem}
          removeItem={removeEducation}
        />
      ))}
    </div>
  );
}
