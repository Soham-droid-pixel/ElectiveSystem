import React, { useState } from 'react';
import axios from '../services/api';

const FileUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData);
      onUploadComplete(res.data);
    } catch (err) {
      alert('Upload failed!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-md">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload & Process</button>
    </div>
  );
};

export default FileUploader;
