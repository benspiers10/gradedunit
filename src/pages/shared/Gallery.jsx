import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import ImageGallery from 'react-image-gallery'; // Import react-image-gallery for displaying image gallery

// Gallery component
const Gallery = () => {
  // State variables for managing gallery data, loading status, errors, lightbox visibility, current index, user role, and pending images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [setCurrentIndex] = useState(0);
  const [userRole, setUserRole] = useState(0); // Default to Scout role
  const [pendingImages, setPendingImages] = useState([]);

  // useEffect hook to fetch images and user role on component mount
  useEffect(() => {
    // Function to fetch images
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors
        let response;
        const role = parseInt(localStorage.getItem("role")); // Get user role from localStorage
        setUserRole(role); // Set user role state
        // Fetch pending images if user is admin
        if (role === 3) {
          response = await axios.get('http://localhost:8081/gallery/pending');
          setPendingImages(response.data);
        }
        // Fetch approved images
        response = await axios.get('http://localhost:8081/gallery/approved');
        // Set images state with mapped image data
        setImages(response.data.map(image => ({
          original: image.gal_img,
          thumbnail: image.gal_img,
          description: image.title,
        })));
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images. Please try again later.');
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchImages(); // Call fetchImages function
  }, []);

  // Function to handle approval of pending images
  const handleApproval = async (id, approvalStatus) => {
    try {
      // Send PATCH request to update image approval status
      await axios.patch(`http://localhost:8081/gallery/${id}`, { approvalStatus });
      // Remove the approved image from pendingImages state
      setPendingImages(prevImages => prevImages.filter(image => image.gallery_id !== id));
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };
  
  // Function to handle deletion of images
  const handleDelete = async id => {
    try {
      // Send DELETE request to delete image
      await axios.delete(`http://localhost:8081/gallery/${id}`);
      // Remove the deleted image from pendingImages state
      setPendingImages(prevImages => prevImages.filter(image => image.gallery_id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Function to toggle lightbox visibility and set current index
  const toggleLightbox = (index) => {
    setShowLightbox(!showLightbox); // Toggle lightbox visibility
    setCurrentIndex(index); // Set current index
  };

  // JSX rendering
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Render pending images section if user is admin */}
      {userRole === 3 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Pending Images</h2>
          {/* Render loading message, error message, or pending images */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Map over pendingImages and render each image with approval buttons */}
              {pendingImages.map(image => (
                <div key={image.gallery_id} className="relative group overflow-hidden rounded-lg">
                  <img src={image.gal_img} alt={image.content} className="w-full h-40 object-cover cursor-pointer" onClick={() => toggleLightbox(image.gallery_id)} />
                  <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="text-lg font-bold text-white mb-2">{image.title}</p>
                    <p className="text-sm text-white">{image.location}</p>
                    <div className="flex mt-2">
                      {/* Button to approve image */}
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2" onClick={() => handleApproval(image.gallery_id, 0)}>Approve</button>
                      {/* Button to delete image */}
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(image.gallery_id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gallery Section */}
      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
      {/* Render loading message, error message, or image gallery */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {/* Render ImageGallery component with images data */}
          <ImageGallery
            items={images}
            showThumbnails={true}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery; // Export Gallery component
