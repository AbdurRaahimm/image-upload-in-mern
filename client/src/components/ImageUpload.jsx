import React, { useState } from 'react'
import axios from 'axios';


export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUploadStatus('uploading');
    const title = e.target.title.value;
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    try {
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('success');
      // reset the form
      e.target.reset();

    } catch (error) {
      setUploadStatus('error');
    }
  }

  return (
    <section className='p-3 shadow-md w-8/12 mx-auto '>
        <h1 className='text-center text-2xl capitalize font-bold '> image upload </h1>
        <form className='' onSubmit={handleImageUpload}>
          <label htmlFor='title' className='text-lg text-left'> Image Title: </label>
            <input type='text' name='title' placeholder='Image Title' className='p-2 my-2 border border-gray-300 rounded-md' />
            <label htmlFor='image' className='text-lg text-left'> Choose an image: </label>
            <input type='file' name='image' className='p-2 my-2 border border-gray-300 rounded-md' />
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md w-full capitalize'> 
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Image'}
             </button>
        </form>
        {/* show success message */}
        {uploadStatus === 'success' && <p className='text-green-500 text-center mt-2'> Image uploaded successfully! </p>}
        {/* show error message */}
        {uploadStatus === 'error' && <p className='text-red-500 text-center mt-2'> Error uploading image! </p>}
    </section>
  )
}
