// BuildPro Universal Application JavaScript
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initDropdowns();
  initAccordions();
  initQuoteCart();
  initQuantityEstimator();
  initContractorCalculator();
  initBillingToggle();
  initProductCatalog();
  initBlogSearchFilter();
  initCountdownTimer();
  initAdminDashboard();
  initFormAlerts();
  initSmoothScroll();
  initStickyHeader();
});

// ==========================================
// 1. Theme Management (Dark / Light Mode)
// ==========================================
function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  updateThemeIcons();

  // Delegate click events for all theme toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.theme-toggle-btn');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcons();
    }
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');
  
  sunIcons.forEach(icon => {
    if (isDark) icon.classList.remove('hidden');
    else icon.classList.add('hidden');
  });
  moonIcons.forEach(icon => {
    if (isDark) icon.classList.add('hidden');
    else icon.classList.remove('hidden');
  });
}

// ==========================================
// 2. RTL Support (LTR / RTL Toggle)
// ==========================================
function initRTL() {
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.dir = currentDir;
  updateRTLButtons(currentDir);

  // Delegate click events for all RTL toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.rtl-toggle-btn');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      localStorage.setItem('dir', newDir);
      updateRTLButtons(newDir);
    }
  });
}

function updateRTLButtons(dir) {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

// ==========================================
// 3. Mobile Menu Navigation
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenu) return;

  // Create backdrop element if it doesn't exist
  let backdrop = document.getElementById('mobile-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobile-menu-backdrop';
    backdrop.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden transition-opacity duration-300 opacity-0';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  backdrop.addEventListener('click', closeMenu);

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Close mobile menu when clicking any link inside it
  const navLinks = mobileMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

// ==========================================
// 4. Dropdowns
// ==========================================
function initDropdowns() {
  const dropdownContainers = document.querySelectorAll('.nav-dropdown, .group, .relative');
  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.dropdown-trigger');
    const menu = container.querySelector('.dropdown-menu') || (trigger ? trigger.nextElementSibling : null);
    
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        if (trigger.tagName.toLowerCase() === 'button' || trigger.getAttribute('href') === '#') {
          e.preventDefault();
          menu.classList.toggle('hidden');
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      const parent = menu.parentElement;
      if (parent && !parent.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  });
}

// ==========================================
// 5. FAQ Accordions
// ==========================================
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      
      if (content.classList.contains('open')) {
        content.classList.remove('open');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        const allContents = header.parentElement.parentElement.querySelectorAll('.accordion-content');
        const allIcons = header.parentElement.parentElement.querySelectorAll('.accordion-icon');
        allContents.forEach(c => c.classList.remove('open'));
        allIcons.forEach(i => i.style.transform = 'rotate(0deg)');

        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// ==========================================
// 6. Quote Cart System (B2B E-commerce Add to Quote)
// ==========================================
let quoteCart = JSON.parse(localStorage.getItem('quoteCart')) || [];
function initQuoteCart() {
  updateCartBadge();
  const addToQuoteBtns = document.querySelectorAll('.btn-add-quote');
  
  addToQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const category = btn.getAttribute('data-category');
      const price = parseFloat(btn.getAttribute('data-price')) || 0;
      
      const item = { id, name, category, price, quantity: 1 };
      
      const existing = quoteCart.find(i => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        quoteCart.push(item);
      }
      
      localStorage.setItem('quoteCart', JSON.stringify(quoteCart));
      updateCartBadge();
      
      showToast(`${name} added to quote list!`);
    });
  });

  const qtyInputs = document.querySelectorAll('.qty-input');
  qtyInputs.forEach(input => {
    const minus = input.previousElementSibling;
    const plus = input.nextElementSibling;
    if (minus && plus) {
      minus.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
      });
      plus.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
      });
    }
  });
}

function updateCartBadge() {
  let currentCart = [];
  try {
    currentCart = JSON.parse(localStorage.getItem('quoteCart')) || [];
    if (!Array.isArray(currentCart)) currentCart = [];
  } catch(e) {
    currentCart = [];
  }
  const validItems = currentCart.filter(item => item && typeof item === 'object' && (item.id || item.name));
  const count = validItems.reduce((acc, curr) => acc + (parseInt(curr.quantity, 10) || 1), 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'bg-primary text-white dark:bg-white dark:text-primary px-4 py-3 rounded-lg shadow-xl flex items-center justify-between gap-4 border border-accent/20 transition-all duration-300 transform translate-y-10 opacity-0';
  toast.innerHTML = `
    <span class="text-sm font-semibold">${message}</span>
    <button class="text-xs hover:text-accent font-bold"><i class="fa-solid fa-xmark"></i></button>
  `;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);
  
  const closeBtn = toast.querySelector('button');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toast.remove());
  }
  
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// 7. Construction Material Quantity Estimator
// ==========================================
function initQuantityEstimator() {
  const tabs = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.estimator-form');
  
  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('border-accent', 'text-accent', 'active'));
      tab.classList.add('border-accent', 'text-accent', 'active');
      
      forms.forEach(form => {
        if (form.id === target) {
          form.classList.remove('hidden');
        } else {
          form.classList.add('hidden');
        }
      });
    });
  });

  const btnEstimates = document.querySelectorAll('.btn-calculate');
  btnEstimates.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type');
      let outputQty = 0;
      let outputCost = 0;
      let unit = '';
      
      if (type === 'cement') {
        const area = parseFloat(document.getElementById('c-area')?.value) || 0;
        const thickness = parseFloat(document.getElementById('c-thickness')?.value) || 0.1;
        const ratio = document.getElementById('c-ratio')?.value || '1:4';
        
        const volume = area * thickness;
        let partsTotal = 5;
        if (ratio === '1:3') partsTotal = 4;
        if (ratio === '1:5') partsTotal = 6;
        if (ratio === '1:6') partsTotal = 7;
        
        const dryVolume = volume * 1.54;
        const cementVolume = (dryVolume * 1) / partsTotal;
        const bags = Math.ceil(cementVolume / 0.035);
        outputQty = bags;
        unit = 'Bags (50kg)';
        outputCost = bags * 450;
      } 
      else if (type === 'steel') {
        const volume = parseFloat(document.getElementById('s-volume')?.value) || 0;
        const density = parseFloat(document.getElementById('s-type')?.value) || 80;
        
        const totalWeight = Math.ceil(volume * density);
        outputQty = totalWeight;
        unit = 'kg';
        outputCost = totalWeight * 72;
      } 
      else if (type === 'bricks') {
        const length = parseFloat(document.getElementById('b-length')?.value) || 0;
        const height = parseFloat(document.getElementById('b-height')?.value) || 0;
        const thickness = parseFloat(document.getElementById('b-thickness')?.value) || 0.23;
        
        const wallVolume = length * height * thickness;
        const bricksCount = Math.ceil(wallVolume / 0.002);
        outputQty = bricksCount;
        unit = 'Bricks';
        outputCost = bricksCount * 8;
      } 
      else if (type === 'tiles') {
        const width = parseFloat(document.getElementById('t-width')?.value) || 0;
        const length = parseFloat(document.getElementById('t-length')?.value) || 0;
        const tileSize = parseFloat(document.getElementById('t-size')?.value) || 0.36;
        
        const area = width * length;
        const totalAreaWithWastage = area * 1.1;
        const tilesCount = Math.ceil(totalAreaWithWastage / tileSize);
        outputQty = tilesCount;
        unit = 'Tiles';
        outputCost = tilesCount * 120;
      }

      const qtyContainer = document.getElementById(`${type}-est-qty`);
      const costContainer = document.getElementById(`${type}-est-cost`);
      const discountContainer = document.getElementById(`${type}-est-discount`);
      const finalContainer = document.getElementById(`${type}-est-final`);
      
      if (qtyContainer && costContainer) {
        qtyContainer.textContent = `${outputQty} ${unit}`;
        costContainer.textContent = `₹${outputCost.toLocaleString()}`;
        
        const discount = outputCost > 1000 ? outputCost * 0.1 : 0;
        const finalCost = outputCost - discount;
        
        if (discountContainer) discountContainer.textContent = `₹${discount.toLocaleString()}`;
        if (finalContainer) finalContainer.textContent = `₹${finalCost.toLocaleString()}`;
      }
    });
  });
}

// ==========================================
// 8. Contractor Pricing Calculator
// ==========================================
function initContractorCalculator() {
  const volumeSlider = document.getElementById('calc-volume');
  const volumeVal = document.getElementById('volume-val');
  const materialSelect = document.getElementById('calc-material');
  const calculateBtn = document.getElementById('btn-calc-price');

  if (!volumeSlider && !materialSelect && !calculateBtn) return;

  const handleCalc = () => {
    const volume = volumeSlider ? (parseFloat(volumeSlider.value) || 1) : 100;
    const materialPrice = materialSelect ? (parseFloat(materialSelect.value) || 380) : 380;

    if (volumeVal && volumeSlider) {
      volumeVal.textContent = volume;
    }

    const baseCost = volume * materialPrice;
    let discountPct = 0;
    let tier = 'Bronze Starter';

    if (volume >= 500) {
      discountPct = 0.20;
      tier = 'Enterprise / Platinum';
    } else if (volume >= 200) {
      discountPct = 0.15;
      tier = 'Gold Partner';
    } else if (volume >= 50) {
      discountPct = 0.10;
      tier = 'Silver Contractor';
    }

    const discountVal = baseCost * discountPct;
    const finalCost = baseCost - discountVal;

    const qtyDisp = document.getElementById('calc-qty-display');
    const tierDisp = document.getElementById('calc-tier');
    const baseDisp = document.getElementById('calc-base');
    const discDisp = document.getElementById('calc-discount');
    const finalDisp = document.getElementById('calc-final');

    if (qtyDisp) qtyDisp.textContent = volume;
    if (tierDisp) tierDisp.innerHTML = `<i class="fa-solid fa-award text-amber-500 me-1"></i> ${tier}`;
    if (baseDisp) baseDisp.textContent = `₹${baseCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (discDisp) discDisp.textContent = `-₹${discountVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${discountPct * 100}%)`;
    if (finalDisp) finalDisp.textContent = `₹${finalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  };

  if (volumeSlider) volumeSlider.addEventListener('input', handleCalc);
  if (materialSelect) materialSelect.addEventListener('change', handleCalc);
  if (calculateBtn) {
    calculateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleCalc();
      showToast('Wholesale rate calculated & locked!');
    });
  }
}

// ==========================================
// 9. Product Catalog Filtering
// ==========================================
// ==========================================
// 9. Product Catalog Filtering & Sorting
// ==========================================
function initProductCatalog() {
  const catFilters = document.querySelectorAll('.cat-filter');
  const searchInput = document.getElementById('product-search');
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-val');
  const sortSelect = document.getElementById('product-sort');
  const resetBtn = document.getElementById('reset-catalog-filters');
  const catalogGrid = document.getElementById('catalog-grid');
  const cards = document.querySelectorAll('.product-card');
  const countText = document.getElementById('catalog-count-text');

  if (cards.length === 0) return;

  let activeCat = 'all';
  let query = '';
  let maxPrice = priceRange ? (parseFloat(priceRange.value) || 70000) : 70000;
  let currentSort = sortSelect ? sortSelect.value : 'default';

  catFilters.forEach(f => {
    if (f.checked) activeCat = f.value;
  });

  const applyProductFiltersAndSort = () => {
    let visibleCount = 0;

    cards.forEach(card => {
      const name = (card.getAttribute('data-name') || card.getAttribute('data-title') || card.innerText || '').toLowerCase();
      const cat = card.getAttribute('data-category');
      const price = parseFloat(card.getAttribute('data-price')) || 0;

      const matchSearch = !query || name.includes(query);
      const matchCat = activeCat === 'all' || cat === activeCat;
      const matchPrice = price <= maxPrice;

      if (matchSearch && matchCat && matchPrice) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countText) {
      countText.textContent = `Showing ${visibleCount} active wholesale material${visibleCount === 1 ? '' : 's'}`;
    }

    if (catalogGrid) {
      const cardsArray = Array.from(cards);
      cardsArray.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price')) || 0;
        const priceB = parseFloat(b.getAttribute('data-price')) || 0;
        const nameA = (a.getAttribute('data-name') || '').toLowerCase();
        const nameB = (b.getAttribute('data-name') || '').toLowerCase();
        const idA = parseInt(a.getAttribute('data-id')) || 0;
        const idB = parseInt(b.getAttribute('data-id')) || 0;

        if (currentSort === 'price-low') {
          return priceA - priceB;
        } else if (currentSort === 'price-high') {
          return priceB - priceA;
        } else if (currentSort === 'name-asc') {
          return nameA.localeCompare(nameB);
        } else {
          return idA - idB;
        }
      });

      cardsArray.forEach(card => catalogGrid.appendChild(card));
    }
  };

  catFilters.forEach(filter => {
    filter.addEventListener('change', (e) => {
      activeCat = e.target.value;
      applyProductFiltersAndSort();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value.toLowerCase().trim();
      applyProductFiltersAndSort();
    });
  }

  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      maxPrice = parseFloat(e.target.value) || 70000;
      if (priceVal) {
        priceVal.textContent = `₹${maxPrice.toLocaleString()}`;
      }
      applyProductFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyProductFiltersAndSort();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activeCat = 'all';
      query = '';
      maxPrice = 70000;
      currentSort = 'default';

      catFilters.forEach(f => {
        f.checked = (f.value === 'all');
      });
      if (searchInput) searchInput.value = '';
      if (priceRange) priceRange.value = 70000;
      if (priceVal) priceVal.textContent = '₹70,000';
      if (sortSelect) sortSelect.value = 'default';

      applyProductFiltersAndSort();
    });
  }

  applyProductFiltersAndSort();
}

// ==========================================
// 10. Blog Search & Filter System
// ==========================================
function initBlogSearchFilter() {
  const catBtns = document.querySelectorAll('.blog-cat-btn');
  const searchInput = document.getElementById('blog-search');
  const articles = document.querySelectorAll('.blog-article');
  
  if (articles.length === 0) return;

  let activeCat = 'all';
  let query = '';

  catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      catBtns.forEach(b => b.classList.remove('bg-accent', 'text-white', 'dark:text-primary'));
      catBtns.forEach(b => b.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-primary', 'dark:text-gray-300'));
      
      btn.classList.add('bg-accent', 'text-white', 'dark:text-primary');
      btn.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-primary', 'dark:text-gray-300');
      
      activeCat = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    articles.forEach(art => {
      const title = (art.getAttribute('data-title') || '').toLowerCase();
      const cat = art.getAttribute('data-category');
      
      const matchSearch = title.includes(query);
      const matchCat = activeCat === 'all' || cat === activeCat;
      
      if (matchSearch && matchCat) {
        art.style.display = '';
      } else {
        art.style.display = 'none';
      }
    });
  }
}

// ==========================================
// 11. Countdown Timer (Coming Soon Page)
// ==========================================
function initCountdownTimer() {
  const timer = document.getElementById('countdown-timer');
  if (!timer) return;

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl && hEl && mEl && sEl) {
      dEl.textContent = String(days).padStart(2, '0');
      hEl.textContent = String(hours).padStart(2, '0');
      mEl.textContent = String(minutes).padStart(2, '0');
      sEl.textContent = String(seconds).padStart(2, '0');
    }
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================
// 12. Admin Dashboard Interactivity (Charts & Actions)
// ==========================================
function initAdminDashboard() {
  const analyticsCanvas1 = document.getElementById('salesChart');
  const analyticsCanvas2 = document.getElementById('ordersChart');
  
  if (analyticsCanvas1 && typeof Chart !== 'undefined') {
    new Chart(analyticsCanvas1, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Revenue ($)',
          data: [42000, 51000, 48000, 62000, 75000, 89000, 83000, 95000],
          borderColor: '#F59E0B',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { grid: { color: 'rgba(156, 163, 175, 0.1)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (analyticsCanvas2 && typeof Chart !== 'undefined') {
    new Chart(analyticsCanvas2, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Volume of Orders',
          data: [150, 180, 165, 210, 240, 310, 290, 340],
          backgroundColor: '#0B1220',
          hoverBackgroundColor: '#F59E0B'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { grid: { color: 'rgba(156, 163, 175, 0.1)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  const openModalBtns = document.querySelectorAll('.open-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const modals = document.querySelectorAll('.modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.remove('hidden');
        targetModal.classList.add('flex');
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => {
        m.classList.add('hidden');
        m.classList.remove('flex');
      });
    });
  });
}

// ==========================================
// 13. General Form Submission Interceptor
// ==========================================
function initFormAlerts() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    if (form.id === 'quote-submission-form') return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Your request has been submitted successfully!");
      form.reset();
    });
  });
}

// ==========================================
// 14. Smooth Anchor Link Scrolling Navigation
// ==========================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href*="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      
      const targetId = href.substring(hashIndex);
      if (!targetId || targetId === '#') return;
      
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage = href.substring(0, hashIndex).split('/').pop();

      if (!targetPage || targetPage === currentPage || targetPage === '') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
          }
          
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ==========================================
// 15. Sticky Header Scroll Effect
// ==========================================
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-[#0B1220]/95');
    } else {
      header.classList.remove('shadow-lg');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================
// 10b. Billing Toggle (Monthly vs Annual)
// ==========================================
function initBillingToggle() {
  const toggleBtn = document.getElementById('billing-toggle-btn');
  const toggleKnob = document.getElementById('billing-toggle-knob');
  if (!toggleBtn || !toggleKnob) return;

  let isAnnual = false;

  const priceBronze = document.getElementById('price-bronze');
  const priceSilver = document.getElementById('price-silver');
  const priceGold = document.getElementById('price-gold');
  const periodEls = document.querySelectorAll('.price-period');

  function updateToggleState() {
    const isRTL = document.documentElement.dir === 'rtl';
    if (isAnnual) {
      toggleKnob.className = `block w-6 h-6 bg-primary dark:bg-white rounded-full shadow-md transition-transform duration-300 transform ${isRTL ? '-translate-x-6' : 'translate-x-6'}`;
      if (priceBronze) priceBronze.textContent = '₹3,399';
      if (priceSilver) priceSilver.textContent = '₹10,199';
      if (priceGold) priceGold.textContent = '₹27,199';
      periodEls.forEach(el => el.textContent = '/ month (annual)');
    } else {
      toggleKnob.className = 'block w-6 h-6 bg-primary dark:bg-white rounded-full shadow-md transition-transform duration-300 transform translate-x-0';
      if (priceBronze) priceBronze.textContent = '₹3,999';
      if (priceSilver) priceSilver.textContent = '₹11,999';
      if (priceGold) priceGold.textContent = '₹31,999';
      periodEls.forEach(el => el.textContent = '/ month');
    }
  }

  toggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updateToggleState();
  });

  const observer = new MutationObserver(() => {
    updateToggleState();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
}
