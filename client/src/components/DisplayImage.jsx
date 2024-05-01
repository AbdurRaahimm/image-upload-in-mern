import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function DisplayImage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get('http://localhost:3001/api/images');
            // console.log(response.data);
            setImages(response.data);
        };
        fetchImages();
    }, []);

  return (
    <div className='py-3'>
        <h1 className='text-center text-2xl font-bold'>Images display</h1>

        <div className='grid grid-cols-3 gap-4'>
            {images.map((image) => (
                <div key={image._id} className='shadow-md p-3 rounded-md'>
                    <img src={image.imagePath.url} alt={image.title} loading="lazy" className='w-full h-64 object-cover rounded-md' />
                    <p className='text-center text-lg font-bold my-2'>{image.title}</p>
                </div>
            ))}
          </div>

    </div>
  )
}
