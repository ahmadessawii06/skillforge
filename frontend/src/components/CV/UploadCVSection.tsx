import React, { useRef, useState, type ChangeEvent, type DragEvent } from "react";

export interface CVFormData {
    file?: File;
}

interface UploadCVSectionProps {
    formData: CVFormData;
    setFormData: (data: CVFormData) => void;
}

const UploadCVSection: React.FC<UploadCVSectionProps> = ({ formData, setFormData }) => {
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
            <h5 className="fw-bold mb-4">📄 1. Quick Setup: Upload CV</h5>
            <div
                className={`border border-2 border-dashed rounded-3 p-5 text-center ${
                    dragging ? "border-primary bg-primary bg-opacity-10" : "border-secondary-subtle bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <div
                    className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "52px", height: "52px" }}
                >
                    <svg width="24" height="24" fill="none" stroke="#0d6efd" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M16 16l-4-4-4 4M12 12v8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 16.5a4.5 4.5 0 00-3.5-4.39A5 5 0 005 13a4 4 0 000 8h11" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                {formData.file ? (
                    <p className="fw-semibold text-success mb-2">✓ {formData.file.name}</p>
                ) : (
                    <>
                        <p className="fw-semibold mb-1">Drag and drop your PDF CV here</p>
                        <p className="text-muted small mb-3">Maximum file size 5MB. Supports .pdf only.</p>
                    </>
                )}
                <button
                    type="button"
                    className="btn btn-primary px-4 py-2 fw-semibold"
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                >
                    Browse Files
                </button>
                <input ref={inputRef} type="file" accept=".pdf" className="d-none" onChange={handleFileChange} />
            </div>
        </>
    );
};

export default UploadCVSection;