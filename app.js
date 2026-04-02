// KSIJ Poster Editor App - WITH AUTO-SAVE FUNCTIONALITY
let currentContextTarget = null;
let draggedElement = null;
let autoSaveTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupContextMenu();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
    setupAutoSave();
  }, 200);
});

function loadTemplate() {
  // Check if there's saved content
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
    setupContextMenu();
    addDeleteButtonsToNotices();
    setupAutoSave();
  }, 100);
}

function resetAll() {
  if (confirm('Reset to original template? This will delete all your changes and cannot be undone!')) {
    console.log('🔄 Resetting to base template...');
    
    // Clear saved content
    localStorage.removeItem('ksij-poster-content');
    
    // Load default template
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
    
    setTimeout(() => {
      setupDragAndDrop();
      setupContextMenu();
      addDeleteButtonsToNotices();
      setupAutoSave();
    }, 100);
    
    console.log('✅ Reset complete - base template loaded');
    alert('✅ Reset complete! Original template restored.');
  }
}

function setupAutoSave() {
  const poster = document.getElementById('poster');
  if (!poster) return;
  
  // Save on any content change
  poster.addEventListener('input', scheduleAutoSave);
  
  // Save on blur (when user clicks away)
  poster.addEventListener('blur', saveContent, true);
  
  console.log('💾 Auto-save enabled');
}

function scheduleAutoSave() {
  // Clear existing timer
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
  
  // Save after 2 seconds of no changes
  autoSaveTimer = setTimeout(() => {
    saveContent();
  }, 2000);
}

function saveContent() {
  const editorWrapper = document.getElementById('editorWrapper');
  if (!editorWrapper) return;
  
  try {
    const content = editorWrapper.innerHTML;
    localStorage.setItem('ksij-poster-content', content);
    console.log('💾 Content auto-saved');
    
    // Show brief save indicator
    showSaveIndicator();
  } catch (error) {
    console.error('❌ Save failed:', error);
  }
}

function showSaveIndicator() {
  // Create or get save indicator
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
  
  // Show indicator
  indicator.style.opacity = '1';
  
  // Hide after 2 seconds
  setTimeout(() => {
    indicator.style.opacity = '0';
  }, 2000);
}

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found! Please load a template first.');
    return;
  }
  
  const editables = poster.querySelectorAll('[contenteditable]');
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .delete-notice');
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
          
          console.log('✅ Clone prepared for capture');
        }
      }
    });
    
    console.log('✅ Canvas created:', canvas.width, 'x', canvas.height);
    
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `KSIJ_Weekly_Programme_${date}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    console.log('✅ PNG downloaded successfully');
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
  if (e.preventDefault) {
    e.preventDefault();
  }
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
    
    // Auto-save after drag & drop
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

function setupContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('click', hideContextMenu);
  
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', hideContextMenu);
  
  console.log('✅ Context menu setup complete');
}

function handleContextMenu(e) {
  const target = e.target.closest('.notice, .prog-badge, .prog-header-box');
  const contextMenu = document.getElementById('contextMenu');
  
  if (target) {
    e.preventDefault();
    currentContextTarget = target;
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    console.log('✅ Context menu opened for:', target.className);
  }
}

function hideContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.display = 'none';
}

function changeTheme(theme) {
  console.log('🎨 changeTheme called with:', theme);
  
  if (!currentContextTarget) {
    console.log('❌ No target for theme change');
    return;
  }
  
  console.log('📍 Target element:', currentContextTarget.className);
  
  const isNotice = currentContextTarget.classList.contains('notice');
  const isBadge = currentContextTarget.classList.contains('prog-badge');
  const isHeaderBox = currentContextTarget.classList.contains('prog-header-box');
  
  if (isBadge || isHeaderBox) {
    console.log('🔍 Finding related programme elements...');
    
    let headerBox, badge;
    
    if (isHeaderBox) {
      headerBox = currentContextTarget;
      let nextElement = headerBox.nextElementSibling;
      while (nextElement && !nextElement.classList.contains('prog-badge')) {
        if (nextElement.querySelector && nextElement.querySelector('.prog-badge')) {
          badge = nextElement.querySelector('.prog-badge');
          break;
        }
        nextElement = nextElement.nextElementSibling;
      }
      if (!badge && nextElement && nextElement.classList.contains('prog-badge')) {
        badge = nextElement;
      }
    } else if (isBadge) {
      badge = currentContextTarget;
      let prevElement = badge.previousElementSibling;
      while (prevElement && !prevElement.classList.contains('prog-header-box')) {
        if (prevElement.querySelector && prevElement.querySelector('.prog-header-box')) {
          headerBox = prevElement.querySelector('.prog-header-box');
          break;
        }
        prevElement = prevElement.previousElementSibling;
      }
      if (!headerBox && prevElement && prevElement.classList.contains('prog-header-box')) {
        headerBox = prevElement;
      }
      
      if (!headerBox) {
        const parent = badge.parentElement;
        if (parent) {
          headerBox = parent.querySelector('.prog-header-box');
        }
      }
    }
    
    console.log('Found header box:', headerBox);
    console.log('Found badge:', badge);
    
    if (headerBox) {
      headerBox.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
      if (theme === 'shahadat') {
        headerBox.classList.add('prog-header-box-shahadat');
      } else if (theme === 'wiladat') {
        headerBox.classList.add('prog-header-box-wiladat');
      }
      console.log('✅ Header box updated to', theme);
    }
    
    if (badge) {
      badge.classList.remove('prog-badge-shahadat', 'prog-badge-wiladat');
      if (theme === 'shahadat') {
        badge.classList.add('prog-badge-shahadat');
      } else if (theme === 'wiladat') {
        badge.classList.add('prog-badge-wiladat');
      }
      console.log('✅ Badge updated to', theme);
    }
    
    if (!headerBox && !badge) {
      console.log('❌ Could not find related programme elements');
    }
  }
  
  if (isNotice) {
    currentContextTarget.classList.remove('notice-shahadat', 'notice-wiladat');
    if (theme === 'shahadat') {
      currentContextTarget.classList.add('notice-shahadat');
    } else if (theme === 'wiladat') {
      currentContextTarget.classList.add('notice-wiladat');
    }
    console.log(`✅ Notice theme changed to ${theme}`);
  }
  
  // Auto-save after theme change
  saveContent();
  hideContextMenu();
}

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
  
  // Auto-save after toggle
  saveContent();
}

function addNoticeBox(day) {
  const dayBody = event.target.closest('.day-body');
  const newNotice = document.createElement('div');
  newNotice.className = 'notice';
  newNotice.innerHTML = '<p contenteditable="true">New notice or detail here</p>';
  dayBody.insertBefore(newNotice, event.target);
  
  setTimeout(() => {
    addDeleteButtonsToNotices();
    saveContent(); // Auto-save after adding notice
  }, 50);
}

function addScheduleItem(day) {
  const scheduleTable = event.target.previousElementSibling.querySelector('.schedule-table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td contenteditable="true">New Item</td><td contenteditable="true">08:00 P.M.</td>';
  scheduleTable.appendChild(newRow);
  
  // Auto-save after adding item
  saveContent();
}

function addPrayerRow(day) {
  const prayerTable = event.target.previousElementSibling;
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Prayer Name</span></td><td class="pt" contenteditable="true">00:00 P.M.</td>';
  prayerTable.appendChild(newRow);
  
  // Auto-save after adding prayer
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
          saveContent(); // Auto-save after deleting notice
          console.log('✅ Notice deleted');
        }
      };
      notice.appendChild(deleteBtn);
    }
  });
  
  console.log(`✅ Delete buttons added to ${allNotices.length} notices`);
}
