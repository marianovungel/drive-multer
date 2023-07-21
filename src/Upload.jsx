import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const uploadImage = () => {
    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .post('http://localhost:8080/upload/upload', formData)
      .then((response) => {
        setUploadStatus('Image uploaded successfully.');
        console.log(response.data)
      })
      .catch((error) => {
        setUploadStatus('Error uploading image.');
        console.error('Error uploading image:', error);
      })
      .finally(() => {
        setUploading(false);
        setSelectedFile(null);
      });
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} accept="image/*" disabled={uploading}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '2px dashed black', padding: '20px' }}>
            <input {...getInputProps()} />
            <p>Drag and drop an image here, or click to select an image.</p>
          </div>
        )}
      </Dropzone>
      {selectedFile && (
        <div>
          <h4>Selected Image:</h4>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" height="200" />
          <button onClick={uploadImage} disabled={uploading}>
            Upload Image
          </button>
        </div>
      )}
      {uploading && <p>Uploading image...</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      <img className='www' src="https://einvestidor.estadao.com.br/wp-content/uploads/2022/08/dinaprates_020820220731.jpg" alt=""/>

    </div>
  );
};

export default ImageUploader;
