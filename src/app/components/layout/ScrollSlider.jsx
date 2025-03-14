import React, { useState } from "react";

const ScrollSlider = ({ setGenerateBookId, openGenerateBookModal, item }) => {
  const [uploadProgress, setUploadProgress] = useState(10); // Example: 10% uploaded

  const handleUpload = () => {
    let progress = uploadProgress;
    const interval = setInterval(() => {
      progress += 10;
      if (progress > 100) {
        clearInterval(interval);
      } else {
        setUploadProgress(progress);
      }
    }, 1000); // Simulating upload every 1s
  };

  return (
    <div style={{ width: "140px" }}>
      <input
        type="range"
        min="0"
        max="100"
        value={uploadProgress}
        readOnly
        style={{ width: "100%" }}
      />
      <p>{uploadProgress}% Generated</p>
      <button
        disabled={uploadProgress < 100}
        style={{ cursor: "pointer" }}
      >
        Generate remaining
      </button>
    </div>
  );
};

export default ScrollSlider;
