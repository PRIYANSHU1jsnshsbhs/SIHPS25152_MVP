import React, { useState, useRef } from "react";
import api from "../api/api";

export default function FileUpload({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null); // success / error text
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles);
    // avoid duplicates by name+size
    const merged = [...files];
    arr.forEach((f) => {
      if (!merged.some((m) => m.name === f.name && m.size === f.size))
        merged.push(f);
    });
    setFiles(merged);
  };

  const handleFiles = (e) => addFiles(e.target.files);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
  };

  const upload = async () => {
    if (!files.length) return setMessage({ type: "error", text: "Select files first." });
    const fd = new FormData();
    files.forEach((f) => fd.append("documents", f));
    setLoading(true);
    setProgress(10);
    setMessage(null);
    try {
      const res = await api.post("/user/submit", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded / evt.total) * 100);
            setProgress(pct);
          }
        },
      });
      onUploaded?.(res.data.user);
      setMessage({ type: "success", text: "Documents submitted successfully." });
      setFiles([]);
      setProgress(100);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err?.response?.data?.message || "Upload failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  return (
    <div className="space-y-4" aria-live="polite">
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 h-56 md:h-60 flex flex-col items-center justify-center cursor-pointer transition ${
          dragOver
            ? "border-gov-navy bg-gov-gold-soft"
            : "border-gov-ash bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0l4-4m-4 4-4-4"
          />
        </svg>
        <div className="text-sm text-gray-700 font-medium text-center">
          Drag & drop documents<br className="hidden sm:block" /> or{" "}
          <span className="text-gov-navy underline">browse</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Accepted: PDF, JPG, PNG (multiple files allowed)
        </div>
      </div>

      {progress > 0 && (
        <div className="w-full h-2 rounded-full bg-gov-ash overflow-hidden">
          <div
            className="h-full bg-gov-navy transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium flex items-center justify-between">
            <span>Files ({files.length})</span>
            <button
              type="button"
              onClick={() => setFiles([])}
              className="text-[11px] text-gray-500 hover:text-gray-700 underline"
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-2 max-h-40 overflow-auto pr-1 thin-scroll">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${f.size}`}
                className="flex items-center gap-3 bg-white p-2 rounded-md border border-gov-ash text-xs sm:text-[13px]"
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded bg-gov-ash text-gray-600 text-[10px] font-medium">
                  {f.name.split(".").pop().toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate" title={f.name}>
                    {f.name}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {(f.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="text-gov-danger hover:underline flex-shrink-0"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={upload}
          disabled={loading || files.length === 0}
          className={`gov-btn px-4 py-2 font-medium ${
            files.length === 0
              ? "bg-gray-300 cursor-not-allowed text-white"
              : "gov-btn-primary"
          }`}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Documents"
          )}
        </button>
        <button
          onClick={() => setFiles([])}
          disabled={files.length === 0 || loading}
          className="gov-btn gov-btn-secondary px-3 py-2 text-sm"
        >
          Clear
        </button>
      </div>

      {message && (
        <div
          className={`text-sm rounded-md px-3 py-2 border flex items-start gap-2 ${
            message.type === "success"
              ? "bg-gov-success-soft text-gov-success border border-gov-success"
              : "bg-red-50 text-gov-danger border border-gov-danger/50"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
