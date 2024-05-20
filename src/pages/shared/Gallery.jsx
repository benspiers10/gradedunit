import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const role = parseInt(localStorage.getItem("role")); // Get user role from localStorage

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null); // Reset the error state before making the request
        let response;
        if (role === 2) {
          response = await axios.get('http://localhost:8081/gallery/pending'); // Fetch pending images for role 2
        } else {
          response = await axios.get('http://localhost:8081/gallery/approved'); // Fetch approved images for other roles
        }
        console.log("Response:", response); // Log the response
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages(); // Call fetchImages
  }, [role]);

  const handleApproval = async (id, approvalStatus) => {
    try {
      await axios.patch(`http://localhost:8081/gallery/${id}`, { approvalStatus });
      setImages(prevImages =>
        prevImages.map(image =>
          image.gallery_id === id ? { ...image, pending: approvalStatus } : image
        )
      );
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };
  
  const handleDelete = async id => {
    try {
        await axios.delete(`http://localhost:8081/gallery/${id}`);
        setImages(prevImages => prevImages.filter(image => image.gallery_id !== id));
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};


  return (
    <div>
      <h2>Gallery</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {images.map(image => (
            <div key={image.gallery_id}>
              <img src={image.gal_img} alt={image.content} />
              <p>{image.title}</p>
              <p>{image.location}</p>
              {role === 2 && image.pending === 1 && (
                <div>
                  <p>Status: {image.pending === 1 ? 'Pending' : 'Approved'}</p>
                  <button className='px-3 py-3 rounded-sm bg-cyan-400' onClick={() => handleApproval(image.gallery_id, 0)}>Approve</button>
                  <button className='px-3 py-3 rounded-sm bg-red-400' onClick={() => handleDelete(image.gallery_id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
