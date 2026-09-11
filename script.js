document.addEventListener('DOMContentLoaded', () => {
  const extensionsListEl = document.getElementById('extensions-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  let extensions = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
  ];
  let currentFilter = 'all';

  // Render initial data
  renderExtensions();

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
  });

  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active class
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Update filter and render
      currentFilter = e.target.getAttribute('data-filter');
      renderExtensions();
    });
  });

  // Render function
  function renderExtensions() {
    extensionsListEl.innerHTML = '';
    
    const filteredExtensions = extensions.filter(ext => {
      if (currentFilter === 'active') return ext.isActive;
      if (currentFilter === 'inactive') return !ext.isActive;
      return true; // 'all'
    });

    filteredExtensions.forEach((ext, index) => {
      // Since data might have identical names, we'll use name as ID for toggle logic
      const extId = `ext-${ext.name.replace(/\s+/g, '-').toLowerCase()}`;
      
      const card = document.createElement('div');
      card.className = 'extension-card';
      
      card.innerHTML = `
        <div class="extension-info">
          <img src="${ext.logo}" alt="${ext.name} logo" class="extension-logo">
          <div class="extension-details">
            <h2 class="extension-name">${ext.name}</h2>
            <p class="extension-desc">${ext.description}</p>
          </div>
        </div>
        <div class="extension-actions">
          <button class="remove-btn" data-name="${ext.name}">Remove</button>
          <label class="toggle-switch">
            <input type="checkbox" class="status-toggle" data-name="${ext.name}" ${ext.isActive ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      
      extensionsListEl.appendChild(card);
    });

    // Attach event listeners for dynamic elements
    attachDynamicEventListeners();
  }

  function attachDynamicEventListeners() {
    // Status Toggle
    const statusToggles = document.querySelectorAll('.status-toggle');
    statusToggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const extName = e.target.getAttribute('data-name');
        const isChecked = e.target.checked;
        
        // Update state
        const extIndex = extensions.findIndex(ext => ext.name === extName);
        if (extIndex !== -1) {
          extensions[extIndex].isActive = isChecked;
          
          // Re-render if we are in a filtered view to remove the item from the current view
          if (currentFilter !== 'all') {
            renderExtensions();
          }
        }
      });
    });

    // Remove Button
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const extName = e.target.getAttribute('data-name');
        
        // Update state
        extensions = extensions.filter(ext => ext.name !== extName);
        
        // Re-render
        renderExtensions();
      });
    });
  }
});
