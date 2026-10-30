/**
 * Jolie Van den Heuvel - Portfolio Interactions Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle Logic (Wireframe 08)
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileMenu = () => {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    const mobileLinks = mobileOverlay.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  }

  // 2. Active Nav Link Highlighter based on current page filename
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .sitemap-link');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
// ================================
// CURRENTLY CREATING TEXT
// ================================

const creatingTexts = [
  "CURRENTLY CREATING...",
  "CURRENTLY EXPERIMENTING...",
  "CURRENTLY DESIGNING...",
  "CURRENTLY MAKING IDEAS..."
];

const creatingLabel = document.querySelector(".footer-small-label");

let currentText = 0;

if (creatingLabel) {
  setInterval(() => {
    // Fade out
    creatingLabel.style.opacity = "0";

    setTimeout(() => {
      // Change text
      currentText = (currentText + 1) % creatingTexts.length;
      creatingLabel.textContent = creatingTexts[currentText];

      // Fade in
      creatingLabel.style.opacity = "1";
    }, 400);

  }, 3000);
}
  // 3. Work Filter Buttons Logic (Work Page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-card');

  if (filterBtns.length > 0 && workItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        workItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

// ================================
// KYLIE / PROJECT MODAL
// ================================
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');

window.openProjectModal = function (title, subtitle, imageSrc, desc) {
  if (!projectModal) {
    console.error('Project-modal niet gevonden.');
    return;
  }

  // Behoud de volledige, bestaande Kylie-case-study.
  // Andere projecten gebruiken de algemene projectheader.
  if (title !== 'Kylie Cosmetics') {
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDesc = document.getElementById('modalDesc');
    const heroImage = projectModal.querySelector('.case-study-hero img');

    if (modalTitle) modalTitle.textContent = title;
    if (modalSubtitle) modalSubtitle.textContent = subtitle;
    if (modalDesc) modalDesc.textContent = desc;
    if (heroImage && imageSrc) heroImage.src = imageSrc;
  }

  // Voorkom dat een ander projectvenster open blijft staan.
  document.getElementById('energyDrinkModal')?.classList.remove('active');
  document.getElementById('gameBoxModal')?.classList.remove('active');

  projectModal.classList.add('active');
  projectModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
};

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (projectModal && projectModalClose) {
  projectModalClose.addEventListener('click', closeProjectModal);

  projectModal.addEventListener('click', function (event) {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}


// ================================
// ENERGY DRINK MODAL
// ================================
const energyDrinkModal = document.getElementById('energyDrinkModal');
const energyDrinkModalClose = document.getElementById('energyDrinkModalClose');

window.openEnergyDrinkModal = function () {
  if (!energyDrinkModal) return;

  projectModal?.classList.remove('active');
  gameBoxModal?.classList.remove('active');

  energyDrinkModal.classList.add('active');
  energyDrinkModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
};

function closeEnergyDrinkModal() {
  if (!energyDrinkModal) return;

  energyDrinkModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (energyDrinkModal && energyDrinkModalClose) {
  energyDrinkModalClose.addEventListener('click', closeEnergyDrinkModal);

  energyDrinkModal.addEventListener('click', function (event) {
    if (event.target === energyDrinkModal) {
      closeEnergyDrinkModal();
    }
  }