document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. COPY TO CLIPBOARD FOR CODE BLOCKS
     ========================================== */
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Avoid duplicate buttons
    if (pre.querySelector('.copy-code-btn')) return;

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.type = 'button';
    button.setAttribute('aria-label', 'Copy code');
    button.textContent = 'Copy';

    button.addEventListener('click', async (e) => {
      e.stopPropagation();

      // Target <code> inside <pre>, otherwise fallback to <pre>
      const codeElement = pre.querySelector('code') || pre;
      
      // Clone element to strip out any buttons or nested tags safely
      const clone = codeElement.cloneNode(true);
      const existingBtn = clone.querySelector('.copy-code-btn');
      if (existingBtn) existingBtn.remove();
      
      const textToCopy = clone.innerText.trim();

      const showSuccess = () => {
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      };

      // Primary modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showSuccess();
          return;
        } catch (err) {
          console.warn('Clipboard API failed, trying fallback...', err);
        }
      }

      // Fallback: document.execCommand('copy')
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
          showSuccess();
        } else {
          button.textContent = 'Error';
          setTimeout(() => (button.textContent = 'Copy'), 2000);
        }
      } catch (err) {
        console.error('All copy methods failed:', err);
        button.textContent = 'Error';
        setTimeout(() => (button.textContent = 'Copy'), 2000);
      }
    });

    pre.appendChild(button);
  });

  /* ==========================================
     2. IMAGE CLICK-TO-ZOOM MODAL
     ========================================== */
  // Create modal element dynamically if it doesn't exist
  let modal = document.getElementById('image-zoom-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-zoom-modal';
    modal.className = 'image-zoom-modal';
    modal.innerHTML = `
      <span class="image-zoom-close">&times;</span>
      <img class="image-zoom-content" id="image-zoom-img" alt="Zoomed view" />
    `;
    document.body.appendChild(modal);
  }

  const modalImg = document.getElementById('image-zoom-img');
  const closeBtn = modal.querySelector('.image-zoom-close');

  // Attach zoom listener to images inside your content
  const contentImages = document.querySelectorAll('article img, main img, .content img');
  contentImages.forEach((img) => {
    img.classList.add('zoomable-img');
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Zoomed Screenshot';
      modal.classList.add('active');
    });
  });

  // Close handlers
  const closeModal = () => modal.classList.remove('active');
  modal.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');

  // Attach zoom to images inside the content area
  document.querySelectorAll('article img, main img').forEach((img) => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('active');
    });
  });

  // Close when clicking background or close button
  const closeModal = () => modal.classList.remove('active');

  modal.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});