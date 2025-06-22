import React from 'react';

export default function ResumePreview({ data, previewRef }) {
  const { personal, education, experience, skills } = data;

  return (
    <section
      ref={previewRef}
      className="md:w-1/2 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-md shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 select-none text-white">Resume Preview</h2>
      <div className="text-black">
        <h3 className="text-xl font-bold">{personal.fullName || 'Full Name'}</h3>
        <p>{personal.email} | {personal.phone}</p>
        <p>{personal.linkedin} | {personal.website}</p>
        <p className="mt-2">{personal.summary}</p>

        <h4 className="text-lg font-semibold mt-4">Education</h4>
        {education.length === 0 && <p>No education information.</p>}
        {education.map((ed) => (
          <div key={ed.id}>
            <p>{ed.degree || 'Degree'} from {ed.institution || 'Institution'} ({ed.startYear || '?'} - {ed.endYear || '?'})</p>
            {ed.details && <p>{ed.details}</p>}
          </div>
        ))}

        <h4 className="text-lg font-semibold mt-4">Experience</h4>
        {experience.length === 0 && <p>No experience information.</p>}
        {experience.map((exp) => (
          <div key={exp.id}>
            <p>{exp.position || 'Position'} at {exp.company || 'Company'} ({exp.startDate || '?'} - {exp.endDate || '?'})</p>
            {exp.description && <p>{exp.description}</p>}
          </div>
        ))}

        <h4 className="text-lg font-semibold mt-4">Skills</h4>
        <p>{skills || 'List your skills here'}</p>
      </div>
    </section>
  );
}
