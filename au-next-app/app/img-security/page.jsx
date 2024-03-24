import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const OCRPage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const recognizeText = async () => {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image);
    setResult(text);
    await worker.terminate();
  };

  return (
    <div>
      <h1>Image OCR with Tesseract.js</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={recognizeText}>Recognize Text</button>
      {image && <img src={image} alt="Selected" />}
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default OCRPage;
