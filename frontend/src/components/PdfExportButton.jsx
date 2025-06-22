import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfExportButton({ previewRef }) {
  const generatePDF = () => {
    const input = previewRef.current;
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('resume.pdf');
    });
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Export to PDF
    </button>
  );
}
