import React, { useRef, useState, type ChangeEvent, type DragEvent } from "react";

export interface CVFormData {
    file?: File;
}

interface UploadCVSectionProps {
    formData: CVFormData;
    setFormData: (data: CVFormData) => void;
}

const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #faf5ff, #f0f9ff)",
    border: "1px solid rgba(124,58,237,0.1)",
    borderRadius: "20px",
    padding: "28px",
    marginBottom: "16px",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
};

const UploadCVSection: React.FC<UploadCVSectionProps> = ({ formData, setFormData }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);

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
        <div
            style={{
                ...cardStyle,
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered ? "0 12px 32px rgba(124,58,237,0.15)" : "0 2px 12px rgba(124,58,237,0.06)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div style={{
                    width: 40, height: 40,
                    background: "linear-gradient(135deg, #ede9fe, #f3e8ff)",
                    borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <svg width="20" height="20" fill="none" stroke="#7c3aed" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#1a1033" }}>Quick Setup: Upload CV</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#a78bfa", fontWeight: 500 }}>PDF only · Max 5MB</p>
                </div>
            </div>

            {/* Drop Zone */}
            <div
                style={{
                    border: `2px dashed ${dragging ? "#7c3aed" : "#d8b4fe"}`,
                    borderRadius: 16,
                    padding: "36px 20px",
                    textAlign: "center",
                    background: dragging
                        ? "linear-gradient(135deg, #ede9fe, #f3e8ff)"
                        : "linear-gradient(135deg, #faf5ff, #fdf4ff)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <div style={{
                    width: 58, height: 58,
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    borderRadius: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                    boxShadow: "0 6px 18px rgba(124,58,237,0.3)",
                }}>
                    <svg width="26" height="26" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M16 16l-4-4-4 4M12 12v8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 16.5a4.5 4.5 0 00-3.5-4.39A5 5 0 005 13a4 4 0 000 8h11" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {formData.file ? (
                    <p style={{ fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>✓ {formData.file.name}</p>
                ) : (
                    <>
                        <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1033", marginBottom: 6 }}>
                            Drag &amp; drop your PDF CV here
                        </p>
                        <p style={{ fontSize: 13, color: "#a78bfa", marginBottom: 18 }}>
                            Maximum file size 5MB. Supports .pdf only.
                        </p>
                    </>
                )}

                <button
                    type="button"
                    style={{
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        border: "none",
                        borderRadius: 12,
                        color: "white",
                        padding: "11px 26px",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                    }}
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                >
                    Browse Files
                </button>

                <input ref={inputRef} type="file" accept=".pdf" className="d-none" onChange={handleFileChange} />
            </div>
        </div>
    );
};

export default UploadCVSection;