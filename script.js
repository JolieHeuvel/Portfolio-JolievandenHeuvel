
/**
 * Jolie Van den Heuvel - Portfolio Interactions Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // 1. MOBILE MENU
  // ================================

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

    mobileCloseBtn?.addEventListener('click', closeMobileMenu);

    mobileOverlay.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ================================
  // 2. ACTIVE NAVIGATION
  // ================================

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll(
    '.nav-link, .mobile-nav-link, .sitemap-link'
  );

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ================================
  // 3. FOOTER TEXT ANIMATION
  // ================================

  const creatingTexts = [
    "CURRENTLY CREATING...",
    "CURRENTLY EXPERIMENTING...",
    "CURRENTLY DESIGNING...",
    "CURRENTLY MAKING IDEAS..."
  ];

  const creatingLabel = document.querySelector('.footer-small-label');
  let currentText = 0;

  if (creatingLabel) {
    setInterval(() => {
      creatingLabel.style.opacity = '0';

      setTimeout(() => {
        currentText = (currentText + 1) % creatingTexts.length;
        creatingLabel.textContent = creatingTexts[currentText];
        creatingLabel.style.opacity = '1';
      }, 400);

    }, 3000);
  }

  // ================================
  // 4. PROJECT FILTERS
  // ================================

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
  // 5. ALL PROJECT MODALS
  // ================================

  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');

  const energyDrinkModal = document.getElementById('energyDrinkModal');
  const energyDrinkModalClose = document.getElementById('energyDrinkModalClose');

  const gameBoxModal = document.getElementById('gameBoxModal');
  const gameBoxModalClose = document.getElementById('gameBoxModalClose');

  const luminaModal = document.getElementById('luminaModal');
  const luminaModalClose = document.getElementById('luminaModalClose');

  const scentMemoryModal = document.getElementById('scentMemoryModal');
  const scentMemoryModalClose = document.getElementById('scentMemoryModalClose');

  // Close all project windows before opening another one
  function closeAllProjectModals() {
    [
      projectModal,
      energyDrinkModal,
      gameBoxModal,
      luminaModal,
      scentMemoryModal
    ].forEach(modal => {
      modal?.classList.remove('active');
    });

    document.body.style.overflow = '';
  }

  // Open a selected modal
  function openModal(modal) {
    if (!modal) {
      console.error('Project-modal niet gevonden.');
      return;
    }

    closeAllProjectModals();

    modal.classList.add('active');
    modal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  // ================================
  // KYLIE COSMETICS
  // ================================

  window.openProjectModal = function (title, subtitle, imageSrc, desc) {
    if (!projectModal) return;

    // Keep the original Kylie case study intact
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

    openModal(projectModal);
  };

  // ================================
  // CLARITY ENERGY DRINK
  // ================================

  window.openEnergyDrinkModal = function () {
    openModal(energyDrinkModal);
  };

  // ================================
  // GAME BOX DESIGN
  // ================================

  window.openGameBoxModal = function () {
    openModal(gameBoxModal);
  };

  window.closeGameBoxModal = function () {
    closeAllProjectModals();
  };

  // ================================
  // LUMINA PARTY PARFUM MIX
  // ================================

  window.openLuminaModal = function () {
    openModal(luminaModal);
  };

  // ================================
  // SCENT MEMORY LETTER
  // ================================

  window.openScentMemoryModal = function () {
    openModal(scentMemoryModal);
  };

  // ================================
  // MODAL CLOSE BUTTONS
  // ================================

  const modalCloseButtons = [
    [projectModal, projectModalClose],
    [energyDrinkModal, energyDrinkModalClose],
    [gameBoxModal, gameBoxModalClose],
    [luminaModal, luminaModalClose],
    [scentMemoryModal, scentMemoryModalClose]
  ];

  modalCloseButtons.forEach(([modal, closeButton]) => {
    closeButton?.addEventListener('click', closeAllProjectModals);

    modal?.addEventListener('click', event => {
      if (event.target === modal) {
        closeAllProjectModals();
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllProjectModals();
    }
  });

  // ================================
  // 6. CONTACT FORM
  // ================================

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Versturen... ✓';
        submitBtn.disabled = true;

        setTimeout(() => {
          alert('Bedankt voor je bericht! Jolie neemt zo snel mogelijk contact met je op.');

          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 800);
      }
    });
  }

});
