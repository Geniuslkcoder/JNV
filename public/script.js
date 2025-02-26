const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#666';
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '#ccc';
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#ccc';
  const file = e.dataTransfer.files[0];
  handleFileUpload(file);
});

// File input functionality
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleFileUpload(file);
});

// Upload file to backend
async function handleFileUpload(file) {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.url) {
      addImageToGallery(data.url);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// Add image to gallery
function addImageToGallery(url) {
  const img = document.createElement('img');
  img.src = url;
  gallery.appendChild(img);
}
