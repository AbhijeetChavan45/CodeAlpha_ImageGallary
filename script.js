
const allImages = document.querySelectorAll(".gallery img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const buttons = document.querySelectorAll(".filter-btns button");


let currentImages = []; 
let currentIndex = 0; 

function showLightbox(clickedImg) {
  currentImages = Array.from(allImages).filter(
    (img) => img.style.display !== "none"
  );
  
  
  currentIndex = currentImages.indexOf(clickedImg);

  lightbox.classList.add("show");
  lightboxImg.src = clickedImg.src;
  lightboxImg.alt = clickedImg.alt; 
}

function showNextImage() {
  
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].alt;
}

function showPrevImage() {
 
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].alt;
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

allImages.forEach((img) => {
  img.addEventListener("click", () => {
    showLightbox(img);
  });
});
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrevImage);
nextBtn.addEventListener("click", showNextImage);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    
   
    allImages.forEach((img) => {
      img.style.display =
        filter === "all" || img.dataset.category === filter ? "block" : "none";
    });
  });
});

// --- Keyboard Navigation ---
window.addEventListener("keydown", (e) => {

  if (lightbox.classList.contains("show")) {
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showPrevImage(); 
    } else if (e.key === "ArrowRight") {
      showNextImage(); 
    }
  }

});
