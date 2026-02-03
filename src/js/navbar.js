let isOnSearch = false;

const hTitle = document.getElementById("h-title");
const searchInput = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const closeIcon = document.getElementById("close-search-box");

const openSearch = () => {
  hTitle.classList.add("opacity-0", "-translate-x-4");
  hTitle.classList.remove("opacity-100", "translate-x-0");

  searchInput.classList.remove("w-0", "opacity-0");
  searchInput.classList.add("w-40", "opacity-100");

  searchButton.classList.add("hidden");
  closeIcon.classList.remove("hidden");

  searchInput.focus();
  isOnSearch = true;
};

const closeSearch = () => {
  hTitle.classList.remove("opacity-0", "-translate-x-4");
  hTitle.classList.add("opacity-100", "translate-x-0");

  searchInput.classList.add("w-0", "opacity-0");
  searchInput.classList.remove("w-40", "opacity-100");

  closeIcon.classList.add("hidden");
  searchButton.classList.remove("hidden");

  searchInput.value = "";
  isOnSearch = false;
};

searchButton.addEventListener("click", openSearch);
closeIcon.addEventListener("click", closeSearch);
