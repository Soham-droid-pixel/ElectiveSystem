import React, { useState } from 'react';
import axios from '../services/api';

const FileUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setErrorMsg('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setErrorMsg('');
      setSuccess(false);

      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      if (onUploadComplete) {
        onUploadComplete(res.data);
      }
    } catch (err) {
      setErrorMsg('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">📄 Upload Elective CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full px-4 py-2 rounded text-white transition duration-200 ${
          uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload & Process'}
      </button>

      {success && (
        <p className="mt-4 text-green-600 text-sm text-center">✅ File uploaded successfully!</p>
      )}

      {errorMsg && (
        <p className="mt-4 text-red-600 text-sm text-center">{errorMsg}</p>
      )}
    </div>
  );
};

export default FileUploader;
