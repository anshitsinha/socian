"use client";

import { useState, useEffect } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/scrape-images");
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
        } else {
          setError("Failed to fetch images");
        }
      } catch (err) {
        setError("Error fetching images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="m-10 text-center">{error}</div>;
  }

  // Filter out the first image (logo)
  const imagesWithoutLogo = images.slice(1);

  return (
    <div
      className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 p-6"
      style={{ columnGap: "1.5rem" }}
    >
      {imagesWithoutLogo.length === 0 ? (
        <p className="col-span-full text-center">No images available</p>
      ) : (
        imagesWithoutLogo.map((imageUrl, index) => (
          <div key={index} className="mb-6">
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
