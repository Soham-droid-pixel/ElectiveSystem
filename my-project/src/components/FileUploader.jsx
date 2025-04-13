import React, { useState } from 'react';
import axios from '../services/api';

const FileUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setSuccess(false);

      const res = await axios.post('/upload', formData);
      setSuccess(true);
      onUploadComplete(res.data);
    } catch (err) {
      alert('Upload failed!');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Upload Elective Choices CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full px-4 py-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {uploading ? 'Uploading...' : 'Upload & Process'}
      </button>

      {success && (
        <p className="mt-2 text-green-600 text-sm text-center">✅ File uploaded successfully!</p>
      )}
    </div>
  );
};

export default FileUploader;
