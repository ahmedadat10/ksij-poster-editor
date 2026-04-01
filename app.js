// KSIJ Poster Editor App
let currentContextTarget = null;

// Load template on page load
window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupContextMenu();
});

function loadTemplate() {
  document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
  console.log('✅ Template loaded');
}

function resetAll() {
  if (confirm('Reset poster to default template? All changes will be lost.')) {
    loadTemplate();
  }
}

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found! Please load a template first.');
    return;
  }
  
  // Remove contenteditable before capturing
  const editables = poster.querySelectorAll('[contenteditable]');
  editables.forEach(el => el.removeAttribute('contenteditable'));
  
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
    // Restore contenteditable
    editables.forEach(el => el.setAttribute('contenteditable', 'true'));
  }
}

function setupContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  
  // Show context menu on right-click
  document.addEventListener('contextmenu', (e) => {
    const target = e.target.closest('.notice, .prog-badge');
    if (target) {
      e.preventDefault();
      currentContextTarget = target;
      contextMenu.style.display = 'block';
      contextMenu.style.left = e.pageX + 'px';
      contextMenu.style.top = e.pageY + 'px';
    }
  });
  
  // Hide context menu on click anywhere else
  document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
  });
}

function changeTheme(theme) {
  if (!currentContextTarget) return;
  
  const isNotice = currentContextTarget.classList.contains('notice');
  const isBadge = currentContextTarget.classList.contains('prog-badge');
  
  if (isNotice) {
    // Remove all theme classes
    currentContextTarget.classList.remove('notice-shahadat', 'notice-wiladat');
    
    // Add new theme
    if (theme === 'shahadat') {
      currentContextTarget.classList.add('notice-shahadat');
    } else if (theme === 'wiladat') {
      currentContextTarget.classList.add('notice-wiladat');
    }
  }
  
  if (isBadge) {
    // Remove all theme classes
    currentContextTarget.classList.remove('prog-badge-shahadat', 'prog-badge-wiladat');
    
    // Add new theme
    if (theme === 'shahadat') {
      currentContextTarget.classList.add('prog-badge-shahadat');
    } else if (theme === 'wiladat') {
      currentContextTarget.classList.add('prog-badge-wiladat');
    }
  }
  
  console.log(`✅ Theme changed to ${theme}`);
}
