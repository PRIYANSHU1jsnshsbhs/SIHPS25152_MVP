import React, { useState, useRef } from "react";
import api from "../api/api";

export default function FileUpload({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
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
    if (!files.length) return alert("Choose files first");
    const fd = new FormData();
    files.forEach((f) => fd.append("documents", f));
    setLoading(true);
    try {
      const res = await api.post("/user/submit", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploaded?.(res.data.user);
      alert("Uploaded & submitted!");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition ${
          dragOver
            ? "border-indigo-400 bg-indigo-50"
            : "border-gray-200 bg-white"
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
        <div className="text-sm text-gray-600">
          Drag & drop documents here, or click to select
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Accepted: PDF, JPG, PNG (multiple files allowed)
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Files ({files.length})</div>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${f.size}`}
                className="flex items-center justify-between bg-white p-2 rounded-md border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 text-xs">
                    {f.name.split(".").pop().toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {f.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(f.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFile(i)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={upload}
          disabled={loading || files.length === 0}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            files.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-emerald-500"
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
              Uploading...
            </span>
          ) : (
            "Upload & Submit"
          )}
        </button>
        <button
          onClick={() => setFiles([])}
          disabled={files.length === 0 || loading}
          className="px-3 py-2 rounded-md border text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
