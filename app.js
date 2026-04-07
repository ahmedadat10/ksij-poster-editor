// KSIJ Poster Editor - WITH ADD/DELETE DAYS
let draggedElement = null;
let autoSaveTimer = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
    addDeleteButtonsToPrayers();
    addDeleteButtonsToDays();
    addDayButtons();
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
    addDeleteButtonsToDays();
    addDayButtons();
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
      addDeleteButtonsToDays();
      addDayButtons();
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
// ADD DAY BUTTONS
// ============================================

function addDayButtons() {
  const columns = document.querySelectorAll('.col-panel');
  
  columns.forEach((column, index) => {
    if (!column.querySelector('.add-day-btn')) {
      const addBtn = document.createElement('button');
      addBtn.className = 'add-day-btn';
      addBtn.innerHTML = '+ Add Day';
      addBtn.style.cssText = `
        display: block;
        width: 100%;
        padding: 12px;
        margin-top: 12px;
        background: #e8f5e9;
        border: 2px dashed #a8d8b8;
        color: #1e7a3c;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      `;
      
      addBtn.onmouseover = function() {
        this.style.background = '#c8e6c9';
        this.style.borderColor = '#2a9d4e';
      };
      
      addBtn.onmouseout = function() {
        this.style.background = '#e8f5e9';
        this.style.borderColor = '#a8d8b8';
      };
      
      addBtn.onclick = function() {
        addNewDay(column);
      };
      
      column.appendChild(addBtn);
    }
  });
  
  console.log('✅ Add Day buttons added');
}

function addNewDay(column) {
  const newDay = document.createElement('div');
  newDay.className = 'day-section';
  
  const dayCount = column.querySelectorAll('.day-section').length + 1;
  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + dayCount);
  
  const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  
  newDay.innerHTML = `
    <div class="day-band">
      <div class="dname" contenteditable="true">${dayName} ${dateStr}</div>
      <div class="date-islamic" contenteditable="true">1ST RAJAB 1447</div>
    </div>
    <div class="day-body">
      <table class="prayers">
        <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
        <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
        <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
      </table>
      <button class="add-prayer-btn" onclick="addPrayerRow()">+ Add Prayer Row</button>
      <button class="add-notice-btn" onclick="addNoticeBox()">+ Add Notice</button>
      <button class="add-programme-btn" onclick="toggleProgramme()">+ Add Programme</button>
      <div class="programme-section">
        <div class="prog-header-box">
          <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
          <span class="prog-badge" contenteditable="true">PROGRAMME</span>
        </div>
        <div class="schedule">
          <table class="schedule-table">
            <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
          </table>
          <button class="add-item-btn" onclick="addScheduleItem()">+ Add Schedule Item</button>
        </div>
        <div class="notice">
          <p contenteditable="true">Details here</p>
        </div>
      </div>
    </div>
  `;
  
  // Insert before the Add Day button
  const addDayBtn = column.querySelector('.add-day-btn');
  column.insertBefore(newDay, addDayBtn);
  
  // Setup features for new day
  setTimeout(() => {
    setupDragAndDrop();
    addDeleteButtonsToNotices();
    addDeleteButtonsToPrayers();
    addDeleteButtonsToDays();
    addThemeDropdowns();
    saveContent();
  }, 100);
  
  console.log('✅ New day added');
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
  
  if (draggedElement !== this && draggedElement) {
    const draggedParent = draggedElement.parentNode;
    const targetParent = this.parentNode;
    
    if (draggedParent === targetParent) {
      const allSections = Array.from(draggedParent.children).filter(el => el.classList.contains('day-section'));
      const draggedIndex = allSections.indexOf(draggedElement);
      const targetIndex = allSections.indexOf(this);
      
      if (draggedIndex < targetIndex) {
        targetParent.insertBefore(draggedElement, this.nextSibling);
      } else {
        targetParent.insertBefore(draggedElement, this);
      }
      
      saveContent();
    }
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
        }
      };
      
      const lastCell = row.querySelector('.pt');
      if (lastCell) {
        lastCell.style.position = 'relative';
        lastCell.appendChild(deleteBtn);
      }
    }
  });
}

function addDeleteButtonsToDays() {
  document.querySelectorAll('.day-section').forEach(daySection => {
    if (!daySection.querySelector('.delete-day')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-day';
      deleteBtn.innerHTML = '🗑️ Delete Day';
      deleteBtn.title = 'Delete entire day';
      deleteBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 10px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 700;
        z-index: 100;
        opacity: 0;
        transition: opacity 0.2s;
      `;
      
      daySection.addEventListener('mouseenter', () => {
        deleteBtn.style.opacity = '1';
      });
      daySection.addEventListener('mouseleave', () => {
        deleteBtn.style.opacity = '0';
      });
      
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        const dayName = daySection.querySelector('.dname')?.textContent || 'this day';
        if (confirm(`Delete ${dayName}?`)) {
          daySection.remove();
          saveContent();
        }
      };
      
      daySection.appendChild(deleteBtn);
    }
  });
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
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .add-day-btn, .delete-notice, .delete-prayer, .delete-day, .theme-dropdown');
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
    console.error('Download error:', error);
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
// ADD/TOGGLE FUNCTIONS
// ============================================

function toggleProgramme() {
  const btn = event.target;
  const progSection = btn.nextElementSibling;
  
  if (progSection && progSection.classList.contains('programme-section')) {
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
}

function addNoticeBox() {
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

function addScheduleItem() {
  const btn = event.target;
  const scheduleTable = btn.previousElementSibling;
  if (scheduleTable && scheduleTable.classList.contains('schedule-table')) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = '<td contenteditable="true">New Item</td><td contenteditable="true">08:00 P.M.</td>';
    scheduleTable.appendChild(newRow);
    saveContent();
  }
}

function addPrayerRow() {
  const btn = event.target;
  const prayerTable = btn.previousElementSibling;
  if (prayerTable && prayerTable.classList.contains('prayers')) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = '<td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Prayer Name</span></td><td class="pt" contenteditable="true">00:00 P.M.</td>';
    prayerTable.appendChild(newRow);
    
    setTimeout(() => {
      addDeleteButtonsToPrayers();
      saveContent();
    }, 50);
  }
}
