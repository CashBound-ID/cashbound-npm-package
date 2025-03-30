# Image Utils

This document explains two utility functions for handling images in JavaScript: `prefetchImageFromURL` and `convertImageToBase64`. These methods can improve loading performance and facilitate image processing.

## How to Use
### Importing image

First, import the utilities from your module:

```typescript
import { prefetchImageFromURL, convertImageToBase64 } from '@cashbound-id/utils/image';
```

## Available Methods
### 1. `prefetchImageFromURL`

This method prefetches an image by loading it from a provided URL. It can be used to improve loading performance by preloading images before they are needed.

#### Signature

```typescript
prefetchImageFromURL(url: string): Promise<void>
```
#### Parameters
- url: The URL of the image to prefetch (string).
#### Returns
- A Promise that resolves when the image is successfully loaded, or rejects on error.

#### Example Usage
```typescript
prefetchImageFromURL('https://example.com/image.jpg')
  .then(() => console.log('Image preloaded'))
  .catch((error) => console.error('Failed to preload image', error));
```

### 2. `convertImageToBase64`
This method converts an image file to a base64-encoded string. It is useful for encoding images before uploading or displaying them inline in web pages.

#### Signature
```typescript
convertImageToBase64(image: File): Promise<string>
```

#### Parameters
- image: The image file to convert to base64 format (File).

#### Returns
- A Promise that resolves to the base64-encoded string of the image, or rejects with an error.

#### Example Usage
```typescript
const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

if (fileInput.files && fileInput.files.length > 0) {
  convertImageToBase64(fileInput.files[0])
    .then((base64) => console.log(base64))
    .catch((error) => console.error('Failed to convert image to base64', error));
}
```