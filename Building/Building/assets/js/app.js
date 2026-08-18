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
  initProductCatalog();
  initBlogSearchFilter();
  initCountdownTimer();
  initAdminDashboard();
});

// ==========================================
// 1. Theme Management (Dark / Light Mode)
// ==========================================
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcons();
    });
  });
  updateThemeIcons();
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
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  
  document.documentElement.dir = currentDir;
  updateRTLButtons(currentDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.dir = newDir;
      localStorage.setItem('dir', newDir);
      updateRTLButtons(newDir);
    });
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

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
    });
  }
}

// ==========================================
// 4. Dropdowns
// ==========================================
function initDropdowns() {
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    const dropdownMenu = trigger.nextElementSibling;
    if (dropdownMenu) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('hidden');
      });
      // Close dropdown if clicking outside
      document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.classList.add('hidden');
        }
      });
    }
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
        // Close all other accordions first
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
      
      // Temporary Modal Notification or alert
      showToast(`${name} added to quote list!`);
    });
  });

  // If we are on the product details or list, setup quantity selectors
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
  const badges = document.querySelectorAll('.cart-badge');
  const count = quoteCart.reduce((acc, curr) => acc + curr.quantity, 0);
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
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);
  
  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => toast.remove());
  
  // Auto remove
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

  // Estimator Calculations
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
        const thickness = parseFloat(document.getElementById('c-thickness')?.value) || 0.1; // in meters (default 10cm)
        const ratio = document.getElementById('c-ratio')?.value || '1:4'; // standard mix
        
        // Calculate volume in m3
        const volume = area * thickness;
        // Cement standard rule: ~1.54 multiplier for dry mix. 
        // 1:4 mix is 1 part cement, 4 parts sand. Cement parts = 1 / 5 = 0.2.
        let partsTotal = 5;
        if (ratio === '1:3') partsTotal = 4;
        if (ratio === '1:5') partsTotal = 6;
        if (ratio === '1:6') partsTotal = 7;
        
        const dryVolume = volume * 1.54;
        const cementVolume = (dryVolume * 1) / partsTotal;
        // 1 cement bag is 50kg = ~0.035 m3
        const bags = Math.ceil(cementVolume / 0.035);
        outputQty = bags;
        unit = 'Bags (50kg)';
        outputCost = bags * 450; // standard bag rate INR/USD equivalent
      } 
      
      else if (type === 'steel') {
        const volume = parseFloat(document.getElementById('s-volume')?.value) || 0; // concrete volume in m3
        const density = parseFloat(document.getElementById('s-type')?.value) || 80; // kg/m3 based on structural elements
        
        // Steel weight calculation
        const totalWeight = Math.ceil(volume * density);
        outputQty = totalWeight;
        unit = 'kg';
        outputCost = totalWeight * 72; // average steel rate
      } 
      
      else if (type === 'bricks') {
        const length = parseFloat(document.getElementById('b-length')?.value) || 0;
        const height = parseFloat(document.getElementById('b-height')?.value) || 0;
        const thickness = parseFloat(document.getElementById('b-thickness')?.value) || 0.23; // wall thickness (meters)
        
        // Volume of wall
        const wallVolume = length * height * thickness;
        // Brick standard size: 0.19m x 0.09m x 0.09m = 0.001539 m3
        // With mortar, brick is ~ 0.2m x 0.1m x 0.1m = 0.002 m3
        const bricksCount = Math.ceil(wallVolume / 0.002);
        outputQty = bricksCount;
        unit = 'Bricks';
        outputCost = bricksCount * 8; // average cost per brick
      } 
      
      else if (type === 'tiles') {
        const width = parseFloat(document.getElementById('t-width')?.value) || 0;
        const length = parseFloat(document.getElementById('t-length')?.value) || 0;
        const tileSize = parseFloat(document.getElementById('t-size')?.value) || 0.36; // tile area in sq m
        
        const area = width * length;
        // Add 10% wastage
        const totalAreaWithWastage = area * 1.1;
        const tilesCount = Math.ceil(totalAreaWithWastage / tileSize);
        outputQty = tilesCount;
        unit = 'Tiles';
        outputCost = tilesCount * 120; // average cost per tile
      }

      // Display Estimates
      const qtyContainer = document.getElementById(`${type}-est-qty`);
      const costContainer = document.getElementById(`${type}-est-cost`);
      const discountContainer = document.getElementById(`${type}-est-discount`);
      const finalContainer = document.getElementById(`${type}-est-final`);
      
      if (qtyContainer && costContainer) {
        qtyContainer.textContent = `${outputQty} ${unit}`;
        costContainer.textContent = `₹${outputCost.toLocaleString()}`;
        
        // 10% bulk discount for estimates over ₹1000
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
  const materialSelect = document.getElementById('calc-material');
  const calculateBtn = document.getElementById('btn-calc-price');

  if (!calculateBtn) return;

  const handleCalc = () => {
    if (!volumeSlider || !materialSelect) return;
    const volume = parseFloat(volumeSlider.value) || 1;
    const materialPrice = parseFloat(materialSelect.value) || 0;
    const selectedOpt = materialSelect.options ? materialSelect.options[materialSelect.selectedIndex] : null;
    const materialName = selectedOpt ? selectedOpt.text.split(' - ')[0] : 'Material';

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
    if (tierDisp) tierDisp.textContent = tier;
    if (baseDisp) baseDisp.textContent = `₹${baseCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (discDisp) discDisp.textContent = `-₹${discountVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${discountPct * 100}%)`;
    if (finalDisp) finalDisp.textContent = `₹${finalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  };

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      document.getElementById('volume-val').textContent = volumeSlider.value;
      handleCalc();
    });
  }

  if (materialSelect) {
    materialSelect.addEventListener('change', handleCalc);
  }

  calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleCalc();
  });
}

// ==========================================
// 9. Interactive Product Catalog (Filters & Sort)
// ==========================================
function initProductCatalog() {
  const cards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('product-search');
  const sortSelect = document.getElementById('product-sort');
  const categoryFilters = document.querySelectorAll('.cat-filter');
  const priceRange = document.getElementById('price-range');

  if (cards.length === 0) return;

  let activeCategory = 'all';
  let searchQuery = '';
  let maxPrice = Infinity;

  if (priceRange) {
    priceRange.addEventListener('input', () => {
      const priceVal = document.getElementById('price-val');
      if (priceVal) priceVal.textContent = `₹${priceRange.value}`;
      maxPrice = parseFloat(priceRange.value);
      filterProducts();
    });
  }

  categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      if (filter.checked) {
        activeCategory = filter.value;
        filterProducts();
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const criteria = sortSelect.value;
      sortProducts(criteria);
    });
  }

  function filterProducts() {
    cards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      const cat = card.getAttribute('data-category');
      const price = parseFloat(card.getAttribute('data-price')) || 0;
      
      const matchSearch = name.includes(searchQuery);
      const matchCat = activeCategory === 'all' || cat === activeCategory;
      const matchPrice = price <= maxPrice;

      if (matchSearch && matchCat && matchPrice) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function sortProducts(criteria) {
    const parent = cards[0].parentElement;
    const cardsArray = Array.from(cards);

    cardsArray.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price')) || 0;
      const priceB = parseFloat(b.getAttribute('data-price')) || 0;
      const nameA = a.getAttribute('data-name').toLowerCase();
      const nameB = b.getAttribute('data-name').toLowerCase();

      if (criteria === 'price-low') {
        return priceA - priceB;
      } else if (criteria === 'price-high') {
        return priceB - priceA;
      } else if (criteria === 'name-asc') {
        return nameA.localeCompare(nameB);
      } else {
        // Default / Popularity (uses IDs)
        return a.getAttribute('data-id').localeCompare(b.getAttribute('data-id'));
      }
    });

    cardsArray.forEach(card => parent.appendChild(card));
  }
}

// ==========================================
// 10. Interactive Blog Search & Filters
// ==========================================
function initBlogSearchFilter() {
  const articles = document.querySelectorAll('.blog-article');
  const searchInput = document.getElementById('blog-search');
  const catBtns = document.querySelectorAll('.blog-cat-btn');

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
      const title = art.getAttribute('data-title').toLowerCase();
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

  // Launch date set to 90 days from now
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

  // Dashboard Modal Trigger Handler
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
    if (form.id === 'quote-submission-form') return; // Handled separately in products.html
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Your response has been submitted!");
      form.reset();
    });
  });
}
