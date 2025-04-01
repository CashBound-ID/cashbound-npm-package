/**
 * Prefetches an image by creating an Image object and loading it from the provided URL.
 * This method can be used to preload images to improve loading performance.
 *
 * @param {string} url - The URL of the image to prefetch.
 * @returns {Promise<void>} A promise that resolves when the image is successfully loaded, or rejects on error.
 *
 * @example
 * prefetchImageFromURL('https://example.com/image.jpg')
 *   .then(() => console.log('Image preloaded'))
 *   .catch((error) => console.error('Failed to preload image', error));
 */
export const prefetchImageFromURL = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = (error) => reject(error);
  });
};

/**
 * Converts an image file to a base64-encoded string.
 * Useful for encoding images before uploading them or displaying inline in web pages.
 *
 * @param {File} image - The image file to convert to base64 format.
 * @returns {Promise<string>} A promise that resolves to the base64-encoded string of the image, or rejects with an error.
 *
 * @example
 * convertImageToBase64(fileInput.files[0])
 *   .then((base64) => console.log(base64))
 *   .catch((error) => console.error('Failed to convert image to base64', error));
 */
export const convertImageToBase64 = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!image) {
      reject(new Error('No image provided'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = String(event.target?.result);
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(image);
  });
};
