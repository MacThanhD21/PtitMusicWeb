// JavaScript to handle file input change and display preview
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('avatar__display');

imageUpload.addEventListener('change', function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      avatar__display.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%;">`;
    };

    reader.readAsDataURL(file);
  }
});