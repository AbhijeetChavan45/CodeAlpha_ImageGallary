// --- Element Selection ---
const allImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const buttons = document.querySelectorAll(".filter-btns button");

// --- State Variables ---
let currentImages = []; // Will hold the *visible* images
let currentIndex = 0;   // Index for the visible images

// --- Functions ---

function showLightbox(clickedImg) {
  // 1. Get all *visible* images from the gallery
  // We use Array.from to convert the NodeList to an array for filtering
  currentImages = Array.from(allImages).filter(
    (img) => img.style.display !== "none"
  );
  
  // 2. Find the index of the *clicked* image within that visible list
  currentIndex = currentImages.indexOf(clickedImg);

  // 3. Show the image in the lightbox
  lightbox.classList.add("show");
  lightboxImg.src = clickedImg.src;
  lightboxImg.alt = clickedImg.alt; // Set alt text for enlarged image
}

function showNextImage() {
  // Use modulo (%) to wrap around to the first image
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].alt;
}

function showPrevImage() {
  // Use modulo (%) to wrap around to the last image
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].alt;
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

// --- Event Listeners ---

// Gallery Image Clicks
allImages.forEach((img) => {
  img.addEventListener("click", () => {
    showLightbox(img); // Pass the specific image that was clicked
  });
});

// Lightbox Control Clicks
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

// Filter Button Clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    
    // Update visibility for each image
    allImages.forEach((img) => {
      img.style.display =
        filter === "all" || img.dataset.category === filter ? "block" : "none";
    });
  });
});
// --- Keyboard Navigation ---
window.addEventListener("keydown", (e) => {
  // Check if the lightbox is currently open
  if (lightbox.classList.contains("show")) {
    
    // Check which key was pressed
    if (e.key === "Escape") {
      closeLightbox(); // Use the existing close function
    } else if (e.key === "ArrowLeft") {
      showPrevImage(); // Use the existing prev function
    } else if (e.key === "ArrowRight") {
      showNextImage(); // Use the existing next function
    }
  }
});