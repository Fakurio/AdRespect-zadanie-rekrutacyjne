const searchIcon = document.querySelector(".search-icon");
const searchBar = document.querySelector(".search-bar");
const grid = document.querySelector(".grid");
const masonryOverlay = document.querySelector(".portfolio-gallery__overlay");
const portfolioGallery = document.querySelector(".portfolio-gallery");
const extendGalleryButton = document.querySelector(
  ".portfolio-gallery__extend"
);
const modalBody = document.querySelector(".modal-body");
const modalNextButton = document.querySelector(
  ".modal-body .carousel-control-next"
);
const modalPrevButton = document.querySelector(
  ".modal-body .carousel-control-prev"
);

const MasonryImageCount = 21;

searchIcon.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  imagesLoaded(grid, () => {
    let masonry = new Masonry(grid, {
      itemSelector: ".grid-item",
      gutter: 33,
      fitWidth: true,
    });

    let flag = true;
    document.addEventListener("lazyloaded", () => {
      masonry.layout();
      if (flag) {
        masonryOverlay.style.height = "500px";
        portfolioGallery.style.height = "500px";
        flag = false;
      }
    });

    lazySizes.init();
  });
});

let isGalleryExtended = false;

const extendGallery = () => {
  extendGalleryButton.style.bottom = "-30px";
  extendGalleryButton.firstElementChild.textContent = "Zwiń";
  extendGalleryButton.lastElementChild.setAttribute("transform", "rotate(180)");
  masonryOverlay.style.height = "auto";
  masonryOverlay.style.bottom = "0";
  portfolioGallery.style.height = "auto";
  portfolioGallery.style.overflow = "visible";
  extendGalleryButton.removeEventListener("click", extendGallery);
  extendGalleryButton.addEventListener("click", collapseGallery);
  isGalleryExtended = true;
};

const collapseGallery = () => {
  extendGalleryButton.style.bottom = "0";
  extendGalleryButton.firstElementChild.textContent = "Rozwiń";
  extendGalleryButton.lastElementChild.setAttribute("transform", "rotate(0)");
  masonryOverlay.style.height = `${grid.offsetHeight * 0.3}px`;
  masonryOverlay.style.bottom = "auto";
  portfolioGallery.style.height = `${grid.offsetHeight * 0.3}px`;
  portfolioGallery.style.overflow = "hidden";
  extendGalleryButton.removeEventListener("click", collapseGallery);
  extendGalleryButton.addEventListener("click", extendGallery);
  document
    .querySelector(".portfolio-content__heading")
    .scrollIntoView({ block: "center" });
  isGalleryExtended = false;
};

extendGalleryButton.addEventListener("click", extendGallery);

extendGalleryButton.addEventListener("mouseenter", () => {
  if (isGalleryExtended) {
    extendGalleryButton.lastElementChild.style.marginTop = "-7px";
  } else {
    extendGalleryButton.lastElementChild.style.marginTop = "7px";
  }
});

extendGalleryButton.addEventListener("mouseleave", () => {
  extendGalleryButton.lastElementChild.style.marginTop = "0";
});

portfolioGallery.addEventListener("click", (e) => {
  if (e.target.src) {
    let image = document.createElement("img");
    image.style.width = "100%";
    image.src = e.target.src;

    if (modalBody.lastChild) {
      modalBody.removeChild(modalBody.lastChild);
    }
    modalBody.appendChild(image);
  }
});

modalPrevButton.addEventListener("click", () => {
  let currentImageSrc = modalBody.lastElementChild.src;
  let currentImageNumber = Number(
    currentImageSrc.slice(currentImageSrc.lastIndexOf("/") + 4, -4)
  );
  if (currentImageNumber === 1) {
    modalBody.lastElementChild.src = `./images/masonry/img${MasonryImageCount}.jpg`;
  } else {
    modalBody.lastElementChild.src = `./images/masonry/img${--currentImageNumber}.jpg`;
  }
});

modalNextButton.addEventListener("click", () => {
  let currentImageSrc = modalBody.lastElementChild.src;
  let currentImageNumber = Number(
    currentImageSrc.slice(currentImageSrc.lastIndexOf("/") + 4, -4)
  );
  if (currentImageNumber === MasonryImageCount) {
    modalBody.lastElementChild.src = `./images/masonry/img1.jpg`;
  } else {
    modalBody.lastElementChild.src = `./images/masonry/img${++currentImageNumber}.jpg`;
  }
});
