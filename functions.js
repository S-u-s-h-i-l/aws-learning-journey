document.addEventListener('DOMContentLoaded', () => {
  // Find all code blocks (<pre> elements)
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Avoid double-wrapping if the script runs again
    if (pre.parentElement.classList.contains('code-wrapper')) return;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerText = 'Copy';

    button.addEventListener('click', async () => {
      // Get pure text content without formatting
      const codeElement = pre.querySelector('code') || pre;
      const textToCopy = codeElement.innerText.trim();

      const showSuccess = () => {
        button.innerText = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.innerText = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      };

      // Try modern navigator.clipboard first
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showSuccess();
          return;
        } catch (err) {
          console.warn('Clipboard API failed, falling back to execCommand:', err);
        }
      }

      // Fallback using textarea + execCommand
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          showSuccess();
        } else {
          button.innerText = 'Error';
          setTimeout(() => (button.innerText = 'Copy'), 2000);
        }
      } catch (err) {
        console.error('All copy methods failed:', err);
        button.innerText = 'Error';
        setTimeout(() => (button.innerText = 'Copy'), 2000);
      }
    });

    wrapper.appendChild(button);
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