// ===== Theme Handling =====
function updateTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.innerHTML = theme === "dark"
      ? '<i data-lucide="sun"></i>'
      : '<i class="fas fa-moon"></i>';
    lucide.createIcons();
  }

  if (themeToggleMobile) {
    themeToggleMobile.innerHTML = theme === "dark"
      ? '<i data-lucide="sun"></i>'
      : '<i class="fas fa-moon"></i>';
    lucide.createIcons();
  }

  if (siteLogo) siteLogo.src = theme === "dark" ? "./assets/icons/logo.svg" : "./assets/icons/logo-light.svg";
  if (modalLogo) modalLogo.src = theme === "dark" ? "./assets/icons/logo.svg" : "./assets/icons/logo-light.svg";
  if (sitefotter) sitefotter.src = theme === "dark" ? "./assets/icons/logo.svg" : "./assets/icons/logo-light.svg";
}

// ===== DOM Loaded =====
document.addEventListener("DOMContentLoaded", () => {
  // Cache elements
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const siteLogo = document.getElementById("siteLogo");
  const modalLogo = document.getElementById("modalLogo");
  const sitefotter = document.getElementById("sitefotter");
  const themeText = document.getElementById("themeText");
  const menuOpen = document.getElementById("menuOpen");
  const mobileMenu = document.getElementById("mobileMenu");
  const loginBtn = document.querySelectorAll(".login-btn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const exploreBtn = document.querySelector(".filter-search");
  const exploreModal = document.getElementById("exploreModal");
  const closeExploreModal = document.getElementById("closeExploreModal");
 

  let isMenuOpen = false;

  // Load saved theme
  updateTheme(localStorage.getItem("theme") || "light");

  // ===== Theme Toggles =====
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      updateTheme(current === "light" ? "dark" : "light");
    });
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      updateTheme(next);
      if (themeText) themeText.textContent = next === "dark" ? "Dark Mode" : "Light Mode";
    });
  }

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const icon = button.querySelector('.faq-icon');

      document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          const otherIcon = i.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      item.classList.toggle('active');
      if (icon) icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';

      lucide.createIcons();
    });
  });

  // ===== Mobile Menu =====
  if (menuOpen && mobileMenu) {
    menuOpen.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle("active", isMenuOpen);
      menuOpen.innerHTML = isMenuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });

    document.querySelectorAll('.mobile-menu-links a, .login-btn').forEach(link => {
      link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove("active");
        menuOpen.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
      });
    });
  }

  // ===== Login Modal =====
  if (loginBtn && loginModal) {
    loginBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        if (loginModal) loginModal.style.display = "flex";
        if (mobileMenu) mobileMenu.classList.remove("active");
      });
    });
  }
  if (closeModal && loginModal) {
    closeModal.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });

  // ===== Explore Modal =====
  if (exploreBtn && exploreModal) {
    exploreBtn.addEventListener("click", () => {
      exploreModal.style.display = "flex";
    });
  }
  if (closeExploreModal && exploreModal) {
    closeExploreModal.addEventListener("click", () => {
      exploreModal.style.display = "none";
    });
  }

  // ===== Active Nav Link =====
  const navLinks = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path || link.getAttribute('href') === './' + path) {
      link.classList.add('active');
    }
  });

  // ===== Sidebar Active on Scroll =====
  const sections = document.querySelectorAll("main h2, main h3");
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    sidebarLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ===== Hamburger Menu =====
  const hamburger = document.querySelector('.hamburger-menu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const navLinksMenu = document.querySelector('.nav-links');
      if (navLinksMenu) {
        navLinksMenu.style.display = (navLinksMenu.style.display === 'block') ? 'none' : 'block';
      }
    });
  }
});

// ====== SLIDER =====
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev").closest("button");
const nextBtn = document.querySelector(".next").closest("button");

let currentIndex = 0;
function updateArrows() {
  // Fade prev if at start
  if (currentIndex === 0) {
    prevBtn.classList.add("arrow-disabled");
  } else {
    prevBtn.classList.remove("arrow-disabled");
  }

  // Fade next if at end
  if (currentIndex === slides.length - 1) {
    nextBtn.classList.add("arrow-disabled");
  } else {
    nextBtn.classList.remove("arrow-disabled");
  }
}
function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  const offset = -currentIndex * 100;
  document.querySelector(".slider").style.transform = `translateX(${offset}%)`;

  // update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");

  updateArrows();
}

document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));
document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

// Auto slide every 5s
// setInterval(() => showSlide(currentIndex + 1), 5000);

