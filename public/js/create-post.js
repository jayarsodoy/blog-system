document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const modal = document.getElementById('statusModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      modal.classList.add('show');;
      modalTitle.textContent = result.success ? 'Success!' : 'Error';
      modalMessage.textContent = result.message;

      if (result.success) postForm.reset();
    } catch (err) {
      modal.classList.add('show');
      modalTitle.textContent = 'Error';
      modalMessage.textContent = 'Something went wrong. Please try again.';
    }
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('editForm');
  const modal = document.getElementById('statusModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');
  const postId = window.location.pathname.split('/').pop();

  console.log("Editing post with ID (from JS):", postId);

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);
    const data = Object.fromEntries(formData.entries());
    data.postId = postId; // ✅ Add the ID to the request body

    try {
      const response = await fetch('/posts/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      modal.classList.add('show');
      modalTitle.textContent = result.success ? 'Success!' : 'Error';
      modalMessage.textContent = result.message;

      if (result.success) postForm.reset();
    } catch (err) {
      modal.classList.add('show');;
      modalTitle.textContent = 'Error';
      modalMessage.textContent = 'Something went wrong. Please try again.';
    }
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});
