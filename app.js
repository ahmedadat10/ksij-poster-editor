// KSIJ Poster Editor App - DROPDOWN THEMES WITH GREEN BADGE FOR REGULAR
let draggedElement = null;
let autoSaveTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addThemeDropdowns();
    setupAutoSave();
  }, 200);
});

function loadTemplate() {
  const savedContent = localStorage.getItem('ksij-poster-content');
  
  if (savedContent) {
    console.log('📂 Loading saved content...');
    document.getElementById('editorWrapper').innerHTML = savedContent;
  } else {
    console.log('📄 Loading default template...');
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
  }
  
  setTimeout(() => {
    setupDragAndDrop();
    addDeleteButtonsToNotices();
    addThemeDropdowns();
    setupAutoSave();
  }, 100);
}

function resetAll() {
  if (confirm('Reset to original template? This will delete all your changes and cannot be undone!')) {
    localStorage.removeItem('ksij-poster-content');
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
    
    setTimeout(() => {
      setupDragAndDrop();
      addDeleteButtonsToNotices();
      addThemeDropdowns();
      setupAutoSave();
    }, 100);
    
    alert('✅ Reset complete!');
  }
}

function setupAutoSave() {
  const poster = document.getElementById('poster');
  if (!poster) return;
  
  poster.addEventListener('input', scheduleAutoSave);
  poster.addEventListener('blur', saveContent, true);
  poster.addEventListener('change', saveContent, true);
  
  console.log('💾 Auto-save enabled');
}

function scheduleAutoSave() {
  if (autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(saveContent, 2000);
}

function saveContent() {
  const editorWrapper = document.getElementById('editorWrapper');
  if (!editorWrapper) return;
  
  try {
    localStorage.setItem('ksij-poster-content', editorWrapper.innerHTML);
    console.log('💾 Saved');
    showSaveIndicator();
  } catch (error) {
    console.error('❌ Save failed:', error);
  }
}

function showSaveIndicator() {
  let indicator = document.getElementById('save-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'save-indicator';
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2a9d4e;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10001;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    indicator.textContent = '✓ Saved';
    document.body.appendChild(indicator);
  }
  
  indicator.style.opacity = '1';
  setTimeout(() => indicator.style.opacity = '0', 2000);
}

// ============================================
// DROPDOWN THEME SYSTEM - GREEN BADGE FOR REGULAR
// ============================================

function addThemeDropdowns() {
  // Add dropdowns to programme headers
  document.querySelectorAll('.prog-header-box').forEach((header, index) => {
    if (!header.querySelector('.theme-dropdown')) {
      const dropdown = createThemeDropdown('programme', header);
      header.insertBefore(dropdown, header.firstChild);
    }
  });
  
  // Add dropdowns to notices
  document.querySelectorAll('.notice').forEach((notice, index) => {
    if (!notice.querySelector('.theme-dropdown')) {
      const dropdown = createThemeDropdown('notice', notice);
      notice.insertBefore(dropdown, notice.firstChild);
    }
  });
  
  console.log('✅ Theme dropdowns added');
}

function createThemeDropdown(type, element) {
  const wrapper = document.createElement('div');
  wrapper.className = 'theme-dropdown';
  wrapper.style.cssText = `
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 4px;
  `;
  
  const select = document.createElement('select');
  select.style.cssText = `
    padding: 4px 8px;
    border-radius: 4px;
    border: 2px solid white;
    background: rgba(255,255,255,0.9);
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    color: #333;
  `;
  
  // Options
  const options = [
    { value: 'regular', text: '🟢 Regular' },
    { value: 'shahadat', text: '⚫ Shahadat' },
    { value: 'wiladat', text: '🔴 Wiladat' }
  ];
  
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.text;
    select.appendChild(option);
  });
  
  // Set current theme
  if (type === 'programme') {
    if (element.classList.contains('prog-header-box-shahadat')) {
      select.value = 'shahadat';
    } else if (element.classList.contains('prog-header-box-wiladat')) {
      select.value = 'wiladat';
    } else {
      select.value = 'regular';
    }
  } else {
    if (element.classList.contains('notice-shahadat')) {
      select.value = 'shahadat';
    } else if (element.classList.contains('notice-wiladat')) {
      select.value = 'wiladat';
    } else {
      select.value = 'regular';
    }
  }
  
  // Change handler
  select.onchange = function() {
    const theme = this.value;
    console.log(`🎨 Changing to ${theme}`);
    
    if (type === 'programme') {
      // Find the programme-section container
      const progSection = element.closest('.programme-section');
      
      // Change header
      element.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
      if (theme === 'shahadat') {
        element.classList.add('prog-header-box-shahadat');
      } else if (theme === 'wiladat') {
        element.classList.add('prog-header-box-wiladat');
      }
      // Regular theme has no special class (uses default green)
      
      // Change programme section (for schedule times)
      if (progSection) {
        progSection.classList.remove('prog-shahadat', 'prog-wiladat');
        if (theme === 'shahadat') {
          progSection.classList.add('prog-shahadat');
        } else if (theme === 'wiladat') {
          progSection.classList.add('prog-wiladat');
        }
        // Regular uses default (no class = green)
      }
      
      // Find and change badge
      let next = element.nextElementSibling;
      while (next) {
        if (next.classList.contains('prog-badge')) {
          next.classList.remove('prog-badge-regular', 'prog-badge-shahadat', 'prog-badge-wiladat');
          if (theme === 'regular') {
            next.classList.add('prog-badge-regular'); // Green
          } else if (theme === 'shahadat') {
            next.classList.add('prog-badge-shahadat'); // Black
          } else if (theme === 'wiladat') {
            next.classList.add('prog-badge-wiladat'); // Red
          }
          console.log(`✅ Badge themed: ${theme}`);
          break;
        }
        next = next.nextElementSibling;
      }
      
      console.log(`✅ Full programme themed: ${theme}`);
    } else {
      // Change notice
      element.classList.remove('notice-shahadat', 'notice-wiladat');
      if (theme === 'shahadat') {
        element.classList.add('notice-shahadat');
      } else if (theme === 'wiladat') {
        element.classList.add('notice-wiladat');
      }
      // Regular uses default green
    }
    
    saveContent();
  };
  
  wrapper.appendChild(select);
  return wrapper;
}

// ============================================
// PNG DOWNLOAD
// ============================================

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found!');
    return;
  }
  
  const editables = poster.querySelectorAll('[contenteditable]');
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .delete-notice, .theme-dropdown');
  const daySections = poster.querySelectorAll('.day-section');
  
  editables.forEach(el => el.removeAttribute('contenteditable'));
  buttons.forEach(btn => btn.style.display = 'none');
  daySections.forEach(section => {
    section.style.cursor = '';
    section.removeAttribute('draggable');
  });
  
  try {
    const canvas = await html2canvas(poster, {
      scale: 2,
      backgroundColor: '#f7f4ee',
      width: 1080,
      windowWidth: 1080,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      onclone: function(clonedDoc) {
        const clonedPoster = clonedDoc.getElementById('poster');
        if (clonedPoster) {
          clonedPoster.style.overflow = 'visible';
          const frame = clonedPoster.querySelector('.golden-frame');
          if (frame) {
            frame.style.position = 'absolute';
            frame.style.zIndex = '10000';
          }
        }
      }
    });
    
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `KSIJ_Weekly_Programme_${date}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    console.log('✅ PNG downloaded');
  } catch (error) {
    console.error('❌ Download error:', error);
    alert('Error downloading PNG.');
  } finally {
    editables.forEach(el => el.setAttribute('contenteditable', 'true'));
    buttons.forEach(btn => btn.style.display = '');
    daySections.forEach(section => {
      section.style.cursor = 'move';
      section.setAttribute('draggable', 'true');
    });
  }
}

// ============================================
// DRAG & DROP
// ============================================

function setupDragAndDrop() {
  const allDaySections = document.querySelectorAll('.day-section');
  
  allDaySections.forEach(section => {
    section.setAttribute('draggable', 'true');
    section.style.cursor = 'move';
    
    section.addEventListener('dragstart', handleDragStart);
    section.addEventListener('dragover', handleDragOver);
    section.addEventListener('drop', handleDrop);
    section.addEventListener('dragend', handleDragEnd);
    section.addEventListener('dragenter', handleDragEnter);
    section.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragStart(e) {
  draggedElement = this;
  this.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement) {
    this.style.borderTop = '4px solid #667eea';
  }
}

function handleDragLeave(e) {
  this.style.borderTop = '';
}

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  
  if (draggedElement !== this) {
    const draggedParent = draggedElement.parentNode;
    const targetParent = this.parentNode;
    
    if (draggedParent === targetParent) {
      const allSections = Array.from(draggedParent.children);
      const draggedIndex = allSections.indexOf(draggedElement);
      const targetIndex = allSections.indexOf(this);
      
      if (draggedIndex < targetIndex) {
        targetParent.insertBefore(draggedElement, this.nextSibling);
      } else {
        targetParent.insertBefore(draggedElement, this);
      }
    }
    
    saveContent();
  }
  
  this.style.borderTop = '';
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  document.querySelectorAll('.day-section').forEach(section => {
    section.style.borderTop = '';
  });
}

// ============================================
// ADD/TOGGLE FUNCTIONS
// ============================================

function toggleProgramme(day) {
  const progSection = document.getElementById('prog-' + day);
  const btn = event.target;
  
  if (progSection.classList.contains('active')) {
    progSection.classList.remove('active');
    btn.textContent = '+ Add Programme';
  } else {
    progSection.classList.add('active');
    btn.textContent = '- Remove Programme';
  }
  
  setTimeout(() => {
    addThemeDropdowns();
    saveContent();
  }, 50);
}

function addNoticeBox(day) {
  const dayBody = event.target.closest('.day-body');
  const newNotice = document.createElement('div');
  newNotice.className = 'notice';
  newNotice.innerHTML = '<p contenteditable="true">New notice</p>';
  dayBody.insertBefore(newNotice, event.target);
  
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addThemeDropdowns();
    saveContent();
  }, 50);
}

function addScheduleItem(day) {
  const scheduleTable = event.target.previousElementSibling.querySelector('.schedule-table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td contenteditable="true">New Item</td><td contenteditable="true">08:00 P.M.</td>';
  scheduleTable.appendChild(newRow);
  saveContent();
}

function addPrayerRow(day) {
  const prayerTable = event.target.previousElementSibling;
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Prayer Name</span></td><td class="pt" contenteditable="true">00:00 P.M.</td>';
  prayerTable.appendChild(newRow);
  saveContent();
}

function addDeleteButtonsToNotices() {
  document.querySelectorAll('.notice').forEach(notice => {
    if (!notice.querySelector('.delete-notice')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-notice';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Delete';
      deleteBtn.style.cssText = `
        position: absolute;
        top: 4px;
        right: 4px;
        width: 20px;
        height: 20px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        line-height: 18px;
        z-index: 10;
      `;
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        if (confirm('Delete this notice?')) {
          notice.remove();
          saveContent();
        }
      };
      notice.style.position = 'relative';
      notice.appendChild(deleteBtn);
    }
  });
}
