import React, { useRef, useState, type ChangeEvent, type DragEvent } from "react";

export interface CVFormData {
  file?: File;
}

interface UploadCVSectionProps {
  formData: CVFormData;
  setFormData: (data: CVFormData) => void;
}

export default function UploadCVSection({ formData, setFormData }: UploadCVSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type === "application/pdf") setFormData({ ...formData, file });
  };

  return (
    <>
      <h5 className="font-bold mb-5 text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-[#7C3AED]">description</span>
        1. Quick Setup: Upload CV
      </h5>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragging
            ? "border-[#7C3AED] bg-[#7C3AED]/10"
            : "border-white/[0.1] bg-[#0A0A0F]"
        }`}
        style={{ cursor: "pointer" }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div
          className="bg-[#7C3AED]/15 rounded-full flex items-center justify-center mx-auto mb-4 w-13 h-13"
        >
          <svg width="24" height="24" fill="none" stroke="#7C3AED" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 16l-4-4-4 4M12 12v8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 16.5a4.5 4.5 0 00-3.5-4.39A5 5 0 005 13a4 4 0 000 8h11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {formData.file ? (
          <p className="font-semibold text-[#10B981] mb-3">✓ {formData.file.name}</p>
        ) : (
          <>
            <p className="font-semibold mb-1 text-white">Drag and drop your PDF CV here</p>
            <p className="text-[#71717A] text-sm mb-4">Maximum file size 5MB. Supports .pdf only.</p>
          </>
        )}
        <button
          type="button"
          className="bg-[#7C3AED] text-white px-6 py-2.5 font-semibold rounded-lg hover:bg-[#6D28D9] transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          Browse Files
        </button>
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
      </div>
    </>
  );
}
