// KSIJ Poster Editor App - FIXED THEME HELPER
let currentContextTarget = null;
let draggedElement = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupContextMenu();
  setupDragAndDrop();
});

function loadTemplate() {
  document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
  console.log('✅ Template loaded');
  setTimeout(() => setupDragAndDrop(), 100);
}

function resetAll() {
  if (confirm('Reset poster to default template? All changes will be lost.')) {
    loadTemplate();
    setupContextMenu();
    setupDragAndDrop();
  }
}

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found! Please load a template first.');
    return;
  }
  
  const editables = poster.querySelectorAll('[contenteditable]');
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn');
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
      logging: false
    });
    
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = `KSIJ_Weekly_Programme_${date}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    console.log('✅ PNG downloaded');
  } catch (error) {
    console.error('Download error:', error);
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
  
  // Remove old listeners
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('click', hideContextMenu);
  
  // Add new listeners
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
  if (!currentContextTarget) {
    console.log('❌ No target for theme change');
    return;
  }
  
  const isNotice = currentContextTarget.classList.contains('notice');
  const isBadge = currentContextTarget.classList.contains('prog-badge');
  const isHeaderBox = currentContextTarget.classList.contains('prog-header-box');
  
  // If it's a badge or header box, find the parent programme section and change BOTH
  if (isBadge || isHeaderBox) {
    const programmeSection = currentContextTarget.closest('.programme-section');
    if (programmeSection) {
      // Find the header box and badge within this programme section
      const headerBox = programmeSection.querySelector('.prog-header-box');
      const badge = programmeSection.querySelector('.prog-badge');
      
      // Change header box theme
      if (headerBox) {
        headerBox.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
        if (theme === 'shahadat') {
          headerBox.classList.add('prog-header-box-shahadat');
        } else if (theme === 'wiladat') {
          headerBox.classList.add('prog-header-box-wiladat');
        }
      }
      
      // Change badge theme
      if (badge) {
        badge.classList.remove('prog-badge-shahadat', 'prog-badge-wiladat');
        if (theme === 'shahadat') {
          badge.classList.add('prog-badge-shahadat');
        } else if (theme === 'wiladat') {
          badge.classList.add('prog-badge-wiladat');
        }
      }
      
      console.log(`✅ Programme theme changed to ${theme} (both header and badge)`);
    }
  }
  
  // If it's a notice, change only that notice
  if (isNotice) {
    currentContextTarget.classList.remove('notice-shahadat', 'notice-wiladat');
    if (theme === 'shahadat') {
      currentContextTarget.classList.add('notice-shahadat');
    } else if (theme === 'wiladat') {
      currentContextTarget.classList.add('notice-wiladat');
    }
    console.log(`✅ Notice theme changed to ${theme}`);
  }
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
}

function addNoticeBox(day) {
  const dayBody = event.target.closest('.day-body');
  const newNotice = document.createElement('div');
  newNotice.className = 'notice';
  newNotice.innerHTML = '<p contenteditable="true">New notice or detail here</p>';
  dayBody.insertBefore(newNotice, event.target);
}

function addScheduleItem(day) {
  const scheduleTable = event.target.previousElementSibling.querySelector('.schedule-table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td contenteditable="true">New Item</td><td contenteditable="true">08:00 P.M.</td>';
  scheduleTable.appendChild(newRow);
}

function addPrayerRow(day) {
  const prayerTable = event.target.previousElementSibling;
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Prayer Name</span></td><td class="pt" contenteditable="true">00:00 P.M.</td>';
  prayerTable.appendChild(newRow);
  console.log('✅ Prayer row added');
}
