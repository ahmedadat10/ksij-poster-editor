// KSIJ Poster Editor App - WITH INLINE THEME BUTTONS (NO RIGHT-CLICK)
let draggedElement = null;
let autoSaveTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addThemeButtons();
    setupAutoSave();
  }, 200);
});

function loadTemplate() {
  const savedContent = localStorage.getItem('ksij-poster-content');
  
  if (savedContent) {
    console.log('📂 Loading saved content...');
    document.getElementById('editorWrapper').innerHTML = savedContent;
    console.log('✅ Saved content restored');
  } else {
    console.log('📄 Loading default template...');
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
    console.log('✅ Default template loaded');
  }
  
  setTimeout(() => {
    setupDragAndDrop();
    addDeleteButtonsToNotices();
    addThemeButtons();
    setupAutoSave();
  }, 100);
}

function resetAll() {
  if (confirm('Reset to original template? This will delete all your changes and cannot be undone!')) {
    console.log('🔄 Resetting to base template...');
    localStorage.removeItem('ksij-poster-content');
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
    
    setTimeout(() => {
      setupDragAndDrop();
      addDeleteButtonsToNotices();
      addThemeButtons();
      setupAutoSave();
    }, 100);
    
    console.log('✅ Reset complete');
    alert('✅ Reset complete! Original template restored.');
  }
}

function setupAutoSave() {
  const poster = document.getElementById('poster');
  if (!poster) return;
  
  poster.addEventListener('input', scheduleAutoSave);
  poster.addEventListener('blur', saveContent, true);
  
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
    console.log('💾 Content auto-saved');
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
// NEW: INLINE THEME BUTTONS SYSTEM
// ============================================

function addThemeButtons() {
  // Add theme buttons to all programme headers
  const progHeaders = document.querySelectorAll('.prog-header-box');
  progHeaders.forEach(header => {
    if (!header.querySelector('.theme-selector')) {
      const themeSelector = createThemeSelector('programme');
      header.style.position = 'relative';
      header.appendChild(themeSelector);
    }
  });
  
  // Add theme buttons to all notices
  const notices = document.querySelectorAll('.notice');
  notices.forEach(notice => {
    if (!notice.querySelector('.theme-selector')) {
      const themeSelector = createThemeSelector('notice');
      notice.style.position = 'relative';
      notice.appendChild(themeSelector);
    }
  });
  
  console.log(`✅ Theme buttons added to ${progHeaders.length} programmes and ${notices.length} notices`);
}

function createThemeSelector(type) {
  const selector = document.createElement('div');
  selector.className = 'theme-selector';
  
  // Green button
  const greenBtn = document.createElement('button');
  greenBtn.className = 'theme-btn theme-btn-green active';
  greenBtn.title = 'Regular (Green)';
  greenBtn.onclick = function(e) {
    e.stopPropagation();
    applyTheme(this, 'regular', type);
  };
  
  // Black button
  const blackBtn = document.createElement('button');
  blackBtn.className = 'theme-btn theme-btn-black';
  blackBtn.title = 'Shahadat (Black)';
  blackBtn.onclick = function(e) {
    e.stopPropagation();
    applyTheme(this, 'shahadat', type);
  };
  
  // Red button
  const redBtn = document.createElement('button');
  redBtn.className = 'theme-btn theme-btn-red';
  redBtn.title = 'Wiladat (Red)';
  redBtn.onclick = function(e) {
    e.stopPropagation();
    applyTheme(this, 'wiladat', type);
  };
  
  selector.appendChild(greenBtn);
  selector.appendChild(blackBtn);
  selector.appendChild(redBtn);
  
  return selector;
}

function applyTheme(button, theme, type) {
  console.log(`🎨 Applying ${theme} theme to ${type}`);
  
  // Get the parent element (header box or notice)
  const parent = button.closest('.prog-header-box, .notice');
  if (!parent) return;
  
  // Update button states
  const allButtons = parent.querySelectorAll('.theme-btn');
  allButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  
  if (type === 'programme') {
    // For programme: change both header and badge
    const headerBox = parent;
    
    // Find the badge (it should be the next sibling after the header)
    let badge = headerBox.nextElementSibling;
    while (badge && !badge.classList.contains('prog-badge')) {
      badge = badge.nextElementSibling;
    }
    
    // Clear all theme classes
    headerBox.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
    if (badge) {
      badge.classList.remove('prog-badge-shahadat', 'prog-badge-wiladat');
    }
    
    // Apply new theme
    if (theme === 'shahadat') {
      headerBox.classList.add('prog-header-box-shahadat');
      if (badge) badge.classList.add('prog-badge-shahadat');
    } else if (theme === 'wiladat') {
      headerBox.classList.add('prog-header-box-wiladat');
      if (badge) badge.classList.add('prog-badge-wiladat');
    }
    
    console.log('✅ Programme theme updated');
  } else if (type === 'notice') {
    // For notice: just change the notice itself
    parent.classList.remove('notice-shahadat', 'notice-wiladat');
    
    if (theme === 'shahadat') {
      parent.classList.add('notice-shahadat');
    } else if (theme === 'wiladat') {
      parent.classList.add('notice-wiladat');
    }
    
    console.log('✅ Notice theme updated');
  }
  
  // Auto-save after theme change
  saveContent();
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
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .delete-notice, .theme-selector');
  const daySections = poster.querySelectorAll('.day-section');
  
  editables.forEach(el => el.removeAttribute('contenteditable'));
  buttons.forEach(btn => btn.style.display = 'none');
  daySections.forEach(section => {
    section.style.cursor = '';
    section.removeAttribute('draggable');
  });
  
  try {
    console.log('📸 Starting PNG capture...');
    
    const canvas = await html2canvas(poster, {
      scale: 2,
      backgroundColor: '#f7f4ee',
      width: 1080,
      windowWidth: 1080,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 0,
      removeContainer: true,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      onclone: function(clonedDoc) {
        const clonedPoster = clonedDoc.getElementById('poster');
        if (clonedPoster) {
          clonedPoster.style.overflow = 'visible';
          clonedPoster.style.position = 'relative';
          
          const frame = clonedPoster.querySelector('.golden-frame');
          if (frame) {
            frame.style.position = 'absolute';
            frame.style.pointerEvents = 'none';
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
    alert('Error downloading PNG. Please try again.');
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
    
    section.removeEventListener('dragstart', handleDragStart);
    section.removeEventListener('dragover', handleDragOver);
    section.removeEventListener('drop', handleDrop);
    section.removeEventListener('dragend', handleDragEnd);
    section.removeEventListener('dragenter', handleDragEnter);
    section.removeEventListener('dragleave', handleDragLeave);
    
    section.addEventListener('dragstart', handleDragStart);
    section.addEventListener('dragover', handleDragOver);
    section.addEventListener('drop', handleDrop);
    section.addEventListener('dragend', handleDragEnd);
    section.addEventListener('dragenter', handleDragEnter);
    section.addEventListener('dragleave', handleDragLeave);
  });
  
  console.log(`✅ Drag & Drop enabled for ${allDaySections.length} day sections`);
}

function handleDragStart(e) {
  draggedElement = this;
  this.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
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
  
  if (draggedElement !== this && draggedElement && this) {
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
    } else {
      const draggedNext = draggedElement.nextSibling;
      const targetNext = this.nextSibling;
      
      if (targetNext) {
        targetParent.insertBefore(draggedElement, targetNext);
      } else {
        targetParent.appendChild(draggedElement);
      }
      
      if (draggedNext) {
        draggedParent.insertBefore(this, draggedNext);
      } else {
        draggedParent.appendChild(this);
      }
    }
    
    saveContent();
    console.log('✅ Day sections reordered');
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
  
  // Add theme buttons to the newly visible programme
  setTimeout(() => {
    addThemeButtons();
    saveContent();
  }, 50);
}

function addNoticeBox(day) {
  const dayBody = event.target.closest('.day-body');
  const newNotice = document.createElement('div');
  newNotice.className = 'notice';
  newNotice.innerHTML = '<p contenteditable="true">New notice or detail here</p>';
  dayBody.insertBefore(newNotice, event.target);
  
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addThemeButtons();
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
  console.log('✅ Prayer row added');
}

function addDeleteButtonsToNotices() {
  const allNotices = document.querySelectorAll('.notice');
  
  allNotices.forEach(notice => {
    if (!notice.querySelector('.delete-notice')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-notice';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Delete this notice';
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        if (confirm('Delete this notice?')) {
          notice.remove();
          saveContent();
          console.log('✅ Notice deleted');
        }
      };
      notice.appendChild(deleteBtn);
    }
  });
  
  console.log(`✅ Delete buttons added to ${allNotices.length} notices`);
}
