import React, { useState } from 'react'

export default function ImageUploadOne() {
    const [uploadStatus, setUploadStatus] = useState('idle');
    const handleImageUpload = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData.get('title'),formData.get('image') );
        setUploadStatus('uploading');
        try {
            const response = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                setUploadStatus('success');
                form.reset();
            } else {
                setUploadStatus('error');
            }
        } catch (error) {
            console.error(error);
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
                <input type='file' name='image'  className='p-2 my-2 border border-gray-300 rounded-md' />
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
