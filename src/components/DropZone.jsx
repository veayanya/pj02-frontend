import { useRef } from "react";

export default function DropZone({ currentMode, files, dragging, onFiles, onDragStart, onDragEnd }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    onDragEnd();
    if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`dropzone${dragging ? " dropzone-active" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        onDragStart();
      }}
      onDragLeave={onDragEnd}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={currentMode.accept}
        className="dropzone-input"
        onChange={(e) => e.target.files?.length && onFiles(e.target.files)}
      />
      <div className="dropzone-icon">{currentMode.icon}</div>
      {files.length ? (
        <p className="dropzone-text">
          <strong>{files.length}</strong> file dipilih — {files.map((f) => f.name).join(", ")}
        </p>
      ) : (
        <p className="dropzone-text">
          Seret file <strong>{currentMode.from}</strong> ke sini, atau klik untuk memilih
        </p>
      )}
    </div>
  );
}
