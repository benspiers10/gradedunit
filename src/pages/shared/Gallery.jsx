import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRole, setUserRole] = useState(0); // Default to Scout role
  const [pendingImages, setPendingImages] = useState([]);

  useEffect(() => {
    const role = parseInt(localStorage.getItem("role"));
    setUserRole(role);

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;
        if (role === 3) {
          response = await axios.get('http://localhost:8081/gallery/pending');
          setPendingImages(response.data);
        }
        response = await axios.get('http://localhost:8081/gallery/approved');
        setImages(response.data.map(image => ({
          original: image.gal_img,
          thumbnail: image.gal_img,
          description: image.title,
        })));
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleApproval = async (id, approvalStatus) => {
    try {
      await axios.patch(`http://localhost:8081/gallery/${id}`, { approvalStatus });
      setPendingImages(prevImages => prevImages.filter(image => image.gallery_id !== id));
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };
  
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8081/gallery/${id}`);
      setPendingImages(prevImages => prevImages.filter(image => image.gallery_id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const toggleLightbox = (index) => {
    setShowLightbox(!showLightbox);
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {userRole === 3 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Pending Images</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pendingImages.map(image => (
                <div key={image.gallery_id} className="relative group overflow-hidden rounded-lg">
                  <img src={image.gal_img} alt={image.content} className="w-full h-40 object-cover cursor-pointer" onClick={() => toggleLightbox(image.gallery_id)} />
                  <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="text-lg font-bold text-white mb-2">{image.title}</p>
                    <p className="text-sm text-white">{image.location}</p>
                    <div className="flex mt-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2" onClick={() => handleApproval(image.gallery_id, 0)}>Approve</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(image.gallery_id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <ImageGallery
            items={images}
            showThumbnails={true}
            
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
