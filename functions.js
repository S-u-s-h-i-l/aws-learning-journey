document.addEventListener('DOMContentLoaded', () => {
  // Find all pre tags
  document.querySelectorAll('pre').forEach((pre) => {
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.innerText = 'Copy';

    button.addEventListener('click', async () => {
      const codeText = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      
      try {
        await navigator.clipboard.writeText(codeText);
        button.innerText = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
          button.innerText = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        button.innerText = 'Failed';
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