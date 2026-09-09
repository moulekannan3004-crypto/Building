# BuildPro — Premium Construction & Building Materials HTML Template

**BuildPro** is a modern, responsive B2B/B2C construction material supplier HTML website template designed to showcase cements, structural steel, bricks, masonry, glass, timber, plumbing fixtures, and electrical products. Built with HTML5, TailwindCSS CDN, and vanilla JavaScript, it includes a customer-facing site and a complete admin management dashboard.

---

## Key Template Features

- **26 Complete HTML Pages**: Seamless navigation across all general client-facing, utility, and administrative routes.
- **Dynamic Theme Toggle**: Smooth transition between light and dark modes (retaining user preference in `localStorage`).
- **Full RTL Support**: Complete bi-directional design layout (LTR & RTL toggling) mapped dynamically to standard logical attributes.
- **Client-Side Quantity Estimators**: Custom civil engineering quantity calculations (Cement bags, Steel weight, Brick totals, Tile coverage) that feed directly into a wholesale quotation layout.
- **Contractor Calculator**: Tier discount pricing simulator based on order volume.
- **Admin Dashboard Suite**: 7 dedicated data views including Chart.js canvas visualizations (Sales and Orders trends), messaging channels, order queues, and inventory tables.
- **Micro Interactions**: Interactive dropdown headers, mobile slide-in menus, responsive filter sidebars, list/grid togglers, accordion grids, and modal popups.

---

## Folder Structure

```
c:\Users\Moule Kannan\Desktop\Building\
├── index.html                  # Home Page 1 (General Landing Page)
├── home-2.html                 # Home Page 2 (Modern Industrial/Supply Chain)
├── about.html                  # About Us (Story, Mission, Timeline, Team)
├── services.html               # Sourcing, Sizing & Procurement Services List
├── service-details.html        # Detailed Service page with accordion FAQs and process steps
├── products.html               # E-commerce Catalog (Categories, brand filters, sort, search)
├── product-details.html        # Single product view (Specs, quantity picker, enquiry modal)
├── contractor-pricing.html     # Volume contractor pricing details & volume calculator
├── brands.html                 # Partner manufacturer grids & FAQ section
├── quantity-estimator.html     # Interactive Estimator (Cement, Steel, Bricks, Tiles)
├── blog.html                   # Industry blog (Category filters & text search)
├── blog-details.html           # Full blog article page & sidebar widgets
├── pricing.html                # Comparison packages & discount tier calculator
├── contact.html                # Multi-branch contact info & material query form
├── login.html                  # B2B Split-screen login layout
├── register.html               # B2B Split-screen registration layout
├── 404.html                    # Centered error alert page
├── coming-soon.html            # 90-day countdown timer page
├── maintenance.html            # Maintenance warning page
├── README.md                   # This instruction manual
│
├── admin/                      # Admin Dashboard Folder
│   ├── index.html              # Dashboard overview (Revenue, orders, user charts)
│   ├── users.html              # Contractor accounts management table
│   ├── orders.html             # Order tracking, invoice levels & status badges
│   ├── products.html           # Product list with adding/edit overlay modals
│   ├── messages.html           # B2B Email submission inbox (split-panel)
│   ├── analytics.html          # Extended performance charts (Sales & Orders)
│   └── settings.html           # User permissions & application configurations
│
└── assets/
    ├── css/
    │   └── style.css           # Global typography overrides, animations, scrollbars
    └── js/
        └── app.js              # Core interaction engine (Estimators, filters, charts)
```

---

## Setup & Configuration Guide

No Node.js or backend servers are required to execute BuildPro. You can run the application directly by opening **`index.html`** in any web browser.

### 1. How to Customize Colors & Branding
BuildPro uses standard Tailwind CSS color variables. You can easily adjust the brand palette by modifying the `tailwind.config` section in the `<head>` of each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1220', // Main Dark Navy theme (primary background/surface)
          hover: '#141E33',
          light: '#1E293B',
        },
        accent: {
          DEFAULT: '#F59E0B', // Amber/Orange highlighting (buttons, icons, toggles)
          hover: '#D97706',
        }
      }
    }
  }
}
```

### 2. How to Replace Images
All image tags (`<img>`) reference high-quality placeholder URLs from Unsplash. To change them:
- Replace the `src` attribute with a local file path (e.g. `assets/images/my-material.jpg`).
- Set appropriate `alt` attributes on each image tag to preserve accessibility and SEO scores.

### 3. How to Edit Products Catalog
To add, edit, or remove catalog items, modify the product grid items in `products.html`. Make sure to set the relevant attributes on the card wrappers so the search, category filter, and sorting system can parse them correctly:

```html
<div class="product-card cursor-pointer bg-white dark:bg-primary-light rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col hover-lift transition-all"
     data-id="1"
     data-name="OPC 53 Grade Cement"
     data-category="cement"
     data-price="450"
     data-brand="ultrapro">
     <!-- Product Content here -->
</div>
```

### 4. How to Edit Pricing & Calculators
- **Estimator Formulas**: Calculations are located in `assets/js/app.js` under the `initQuantityEstimator` block. You can change unit costs, waste tolerances, and brick sizing factors directly in the Javascript event handlers.
- **Contractor Discount Thresholds**: Adjust bulk discount triggers and discount percentages in `assets/js/app.js` under the `initContractorCalculator` event listener.

### 5. Customizing Dark Mode and RTL Support
- **Dark Mode**: Toggle logic uses standard Tailwind CSS `.dark` class added to the root `<html>` element. CSS theme transitions are configured in `assets/css/style.css`.
- **RTL layout**: The template uses logical layout variables (`dir="rtl"`, `ps-4`, `pe-4`, etc.). The theme toggles write preferences to `localStorage` to preserve orientation parameters upon reloading.

---

## Browser Support
BuildPro is tested across modern desktop and mobile engines:
- Google Chrome (Version 90+)
- Apple Safari (Version 14+)
- Mozilla Firefox (Version 88+)
- Microsoft Edge (Version 90+)
