// KSIJ Poster Editor - WITH PRAYER ROW DELETE & CROSS-COLUMN DRAG
let draggedElement = null;
let autoSaveTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addDeleteButtonsToPrayers();
    addThemeDropdowns();
    setupAutoSave();
  }, 200);
});

function loadTemplate() {
  const savedContent = localStorage.getItem('ksij-poster-content');
  
  if (savedContent) {
    document.getElementById('editorWrapper').innerHTML = savedContent;
  } else {
    document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
  }
  
  setTimeout(() => {
    setupDragAndDrop();
    addDeleteButtonsToNotices();
    addDeleteButtonsToPrayers();
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
      addDeleteButtonsToPrayers();
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
    showSaveIndicator();
  } catch (error) {
    console.error('Save failed:', error);
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
// DROPDOWN THEME SYSTEM
// ============================================

function addThemeDropdowns() {
  document.querySelectorAll('.prog-header-box').forEach(header => {
    if (!header.querySelector('.theme-dropdown')) {
      const dropdown = createThemeDropdown('programme', header);
      header.insertBefore(dropdown, header.firstChild);
    }
  });
  
  document.querySelectorAll('.notice').forEach(notice => {
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
  wrapper.style.cssText = `display: inline-block; margin-right: 8px; margin-bottom: 4px;`;
  
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
  
  select.onchange = function() {
    const theme = this.value;
    
    if (type === 'programme') {
      const headerBox = element;
      const progSection = headerBox.closest('.programme-section');
      const badge = headerBox.querySelector('.prog-badge');
      
      headerBox.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
      if (theme === 'shahadat') {
        headerBox.classList.add('prog-header-box-shahadat');
      } else if (theme === 'wiladat') {
        headerBox.classList.add('prog-header-box-wiladat');
      }
      
      if (badge) {
        badge.classList.remove('prog-badge-regular', 'prog-badge-shahadat', 'prog-badge-wiladat');
        if (theme === 'regular') {
          badge.classList.add('prog-badge-regular');
        } else if (theme === 'shahadat') {
          badge.classList.add('prog-badge-shahadat');
        } else if (theme === 'wiladat') {
          badge.classList.add('prog-badge-wiladat');
        }
      }
      
      if (progSection) {
        progSection.classList.remove('prog-shahadat', 'prog-wiladat');
        if (theme === 'shahadat') {
          progSection.classList.add('prog-shahadat');
        } else if (theme === 'wiladat') {
          progSection.classList.add('prog-wiladat');
        }
      }
    } else {
      element.classList.remove('notice-shahadat', 'notice-wiladat');
      if (theme === 'shahadat') {
        element.classList.add('notice-shahadat');
      } else if (theme === 'wiladat') {
        element.classList.add('notice-wiladat');
      }
    }
    
    saveContent();
  };
  
  wrapper.appendChild(select);
  return wrapper;
}

// ============================================
// DRAG & DROP - WORKS ACROSS COLUMNS
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
  
  console.log(`✅ Drag & Drop enabled (cross-column)`);
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
  
  if (draggedElement !== this && draggedElement) {
    const draggedParent = draggedElement.parentNode;
    const targetParent = this.parentNode;
    
    // SWAP - works even across different columns
    const draggedNext = draggedElement.nextSibling;
    const targetNext = this.nextSibling;
    
    // Insert dragged element where target is
    if (targetNext) {
      targetParent.insertBefore(draggedElement, targetNext);
    } else {
      targetParent.appendChild(draggedElement);
    }
    
    // Insert target element where dragged was
    if (draggedNext && draggedNext !== this) {
      draggedParent.insertBefore(this, draggedNext);
    } else {
      draggedParent.appendChild(this);
    }
    
    saveContent();
    console.log('✅ Days swapped (cross-column works!)');
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
// DELETE BUTTONS
// ============================================

function addDeleteButtonsToNotices() {
  document.querySelectorAll('.notice').forEach(notice => {
    if (!notice.querySelector('.delete-notice')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-notice';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Delete notice';
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

function addDeleteButtonsToPrayers() {
  document.querySelectorAll('.prayers tr').forEach(row => {
    if (!row.querySelector('.delete-prayer')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-prayer';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Delete prayer row';
      deleteBtn.style.cssText = `
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        line-height: 16px;
        text-align: center;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.2s;
      `;
      
      // Show on hover
      row.addEventListener('mouseenter', () => {
        deleteBtn.style.opacity = '1';
      });
      row.addEventListener('mouseleave', () => {
        deleteBtn.style.opacity = '0';
      });
      
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        if (confirm('Delete this prayer time?')) {
          row.remove();
          saveContent();
          console.log('✅ Prayer row deleted');
        }
      };
      
      // Add to last cell (time column)
      const lastCell = row.querySelector('.pt');
      if (lastCell) {
        lastCell.style.position = 'relative';
        lastCell.appendChild(deleteBtn);
      }
    }
  });
  
  console.log('✅ Delete buttons added to prayers');
}

// ============================================
// PNG DOWNLOAD
// ============================================

// MOBILE-SAFE DOWNLOAD FUNCTION (NO SECURITY ERRORS)

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found!');
    return;
  }
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Show loading
  const loading = document.createElement('div');
  loading.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:white;padding:20px 30px;border-radius:10px;z-index:10000;text-align:center;font-size:16px;';
  loading.innerHTML = '📸 Creating image...<br><small>Please wait...</small>';
  document.body.appendChild(loading);
  
  const editables = poster.querySelectorAll('[contenteditable]');
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .add-day-btn, .delete-notice, .delete-prayer, .delete-day, .theme-dropdown');
  const daySections = poster.querySelectorAll('.day-section');
  
  editables.forEach(el => el.removeAttribute('contenteditable'));
  buttons.forEach(btn => btn.style.display = 'none');
  daySections.forEach(section => {
    section.style.cursor = '';
    section.removeAttribute('draggable');
  });
  
  try {
    let canvas;
    
    if (isIOS) {
      // iOS-SAFE: Use simpler rendering without security-sensitive options
      canvas = await html2canvas(poster, {
        scale: 1.5,
        backgroundColor: '#f7f4ee',
        logging: false,
        useCORS: false,  // Important: Don't use CORS on iOS
        allowTaint: false,  // Important: Don't allow taint on iOS
        foreignObjectRendering: true,  // Use foreignObject instead
      });
    } else {
      // Android/Desktop: Full quality
      canvas = await html2canvas(poster, {
        scale: isMobile ? 1.5 : 2,
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
    }
    
    const date = new Date().toISOString().split('T')[0];
    
    if (isMobile) {
      // Mobile: Show in overlay with full poster visible
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      loading.remove();
      
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:99999;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;';
      
      // Instruction box at top (sticky)
      const instructionBox = document.createElement('div');
      instructionBox.style.cssText = 'position:sticky;top:0;background:#667eea;color:white;padding:15px 10px;text-align:center;z-index:100000;box-shadow:0 2px 10px rgba(0,0,0,0.3);';
      instructionBox.innerHTML = '<div style="font-size:16px;font-weight:bold;margin-bottom:6px;">📥 Save to Phone</div><div style="font-size:13px;line-height:1.5;"><strong>iPhone:</strong> Long-press image → "Save Image"<br><strong>Android:</strong> Long-press → "Download image"</div>';
      
      // Container for image
      const container = document.createElement('div');
      container.style.cssText = 'padding:15px;text-align:center;';
      
      // The poster image - simple and centered
      const img = document.createElement('img');
      img.src = dataUrl;
      img.style.cssText = 'max-width:95%;height:auto;display:inline-block;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.5);margin:0 auto;';
      
      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕ Close';
      closeBtn.style.cssText = 'display:block;width:90%;max-width:400px;padding:14px;background:#667eea;color:white;border:none;border-radius:8px;font-size:15px;font-weight:bold;cursor:pointer;margin:15px auto 20px auto;';
      
      container.appendChild(img);
      container.appendChild(closeBtn);
      
      overlay.appendChild(instructionBox);
      overlay.appendChild(container);
      
      document.body.appendChild(overlay);
      
      // Scroll to top immediately
      requestAnimationFrame(() => {
        overlay.scrollTop = 0;
      });
      
      closeBtn.onclick = function() {
        overlay.remove();
      };
    } else {
      // Desktop: Download
      canvas.toBlob(function(blob) {
        loading.remove();
        const link = document.createElement('a');
        link.download = 'KSIJ_Weekly_Programme_' + date + '.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      });
    }
  } catch (error) {
    loading.remove();
    alert('Error creating image. Please try:\n1. Using Safari browser\n2. Closing other apps\n3. Reloading the page');
    console.error('Download error:', error);
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
  
  // Add delete button to new row
  setTimeout(() => {
    addDeleteButtonsToPrayers();
    saveContent();
  }, 50);
  
  console.log('✅ Prayer row added');
}

// ============================================
// ADD/DELETE DAY FUNCTIONS
// ============================================

function addDaySection(columnSide) {
  const column = columnSide === 'left' ? document.querySelector('.content-grid .day-section:first-child').parentNode : document.querySelector('.content-grid').lastElementChild.parentNode;
  
  // Generate next day number
  const allDays = document.querySelectorAll('.day-section');
  const lastDayId = allDays[allDays.length - 1].id;
  const nextDayNum = parseInt(lastDayId.replace('day', '')) + 1;
  const dayId = 'day' + nextDayNum;
  
  // Create new day section
  const newDay = document.createElement('div');
  newDay.className = 'day-section';
  newDay.id = dayId;
  newDay.draggable = true;
  
  // Calculate next date (simple increment for demonstration)
  const today = new Date();
  today.setDate(today.getDate() + nextDayNum - 1);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayName = dayNames[today.getDay()];
  const dateStr = today.getDate() + 'th ' + monthNames[today.getMonth()] + '. ' + today.getFullYear();
  
  newDay.innerHTML = `
    <div class="day-header">
      <div class="prog-header-box prog-header-box-regular">
        <select class="theme-dropdown" onchange="applyTheme('programme', this.value, this.closest('.prog-header-box'))">
          <option value="regular">🟢 Regular</option>
          <option value="shahadat">⚫ Shahadat</option>
          <option value="wiladat">🔴 Wiladat</option>
        </select>
        <span class="day-name" contenteditable="true">${dayName} ${dateStr}</span>
        <span class="prog-badge prog-badge-regular" contenteditable="true">1ST RAJAB 1447</span>
      </div>
    </div>
    
    <div class="day-body">
      <table class="prayer-times">
        <tr>
          <td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td>
          <td class="pt" contenteditable="true">05:39 A.M.</td>
        </tr>
        <tr>
          <td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN</span></td>
          <td class="pt" contenteditable="true">12:49 P.M.</td>
        </tr>
        <tr>
          <td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td>
          <td class="pt" contenteditable="true">07:06 P.M.</td>
        </tr>
      </table>
      
      <button class="action-btn" onclick="addPrayerRow('${dayId}')">+ Add Prayer</button>
      
      <div class="prog-section" id="prog-${dayId}">
        <div class="prog-container prog-regular">
          <div class="prog-title" contenteditable="true">PROGRAMME TITLE</div>
          <div class="prog-label">PROGRAMME</div>
          <table class="schedule-table">
            <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
          </table>
          <button class="action-btn" onclick="addScheduleItem('${dayId}')">+ Add Item</button>
        </div>
      </div>
      
      <button class="action-btn" onclick="toggleProgramme('${dayId}')">+ Add Programme</button>
      <button class="action-btn" onclick="addNoticeBox('${dayId}')">+ Add Notice</button>
    </div>
  `;
  
  // Insert before the add day button
  const addBtn = columnSide === 'left' 
    ? document.querySelector('.add-day-btn-left') 
    : document.querySelector('.add-day-btn-right');
  addBtn.parentNode.insertBefore(newDay, addBtn);
  
  // Setup all features for new day
  setTimeout(() => {
    setupDragAndDrop();
    addThemeDropdowns();
    addDeleteButtonsToPrayers();
    addDeleteButtonsToNotices();
    addDeleteDayButtons();
    saveContent();
  }, 50);
  
  console.log('✅ Day added:', dayId);
}

function addDeleteDayButtons() {
  // Remove existing delete buttons first
  document.querySelectorAll('.delete-day-btn').forEach(btn => btn.remove());
  
  document.querySelectorAll('.day-section').forEach(daySection => {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-day-btn';
    deleteBtn.innerHTML = '🗑️ Delete Day';
    deleteBtn.onclick = function(e) {
      e.stopPropagation();
      if (confirm('Delete this entire day?')) {
        daySection.remove();
        saveContent();
        console.log('✅ Day deleted');
      }
    };
    
    // Add to day header
    const dayHeader = daySection.querySelector('.day-header');
    if (dayHeader && !dayHeader.querySelector('.delete-day-btn')) {
      dayHeader.appendChild(deleteBtn);
    }
  });
}

// Setup Add Day buttons at bottom of each column
function setupAddDayButtons() {
  const contentGrid = document.querySelector('.content-grid');
  
  // Check if buttons already exist
  if (document.querySelector('.add-day-btn-left')) return;
  
  // Left column add button
  const leftBtn = document.createElement('button');
  leftBtn.className = 'add-day-btn add-day-btn-left';
  leftBtn.innerHTML = '+ Add Day';
  leftBtn.onclick = () => addDaySection('left');
  
  // Right column add button  
  const rightBtn = document.createElement('button');
  rightBtn.className = 'add-day-btn add-day-btn-right';
  rightBtn.innerHTML = '+ Add Day';
  rightBtn.onclick = () => addDaySection('right');
  
  // Insert at end of grid
  contentGrid.appendChild(leftBtn);
  contentGrid.appendChild(rightBtn);
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', function() {
  loadTemplate();
  setupAddDayButtons();
  addDeleteDayButtons();
});
