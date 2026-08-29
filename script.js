// Domain Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.intern-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Modal Dialog Controls
const modal = document.getElementById('applyModal');
const domainTitle = document.getElementById('modalDomainTitle');
const domainInput = document.getElementById('selectedDomain');
const form = document.getElementById('internshipForm');
const toast = document.getElementById('toastNotification');
const nameInput = document.getElementById('fullName');

function openModal(domainName) {
  domainTitle.textContent = domainName;
  domainInput.value = domainName;
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  form.reset();
  clearErrors();
}

// Close modal when clicking outside of the card
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Real-time Name Validation (Instant feedback as user types)
nameInput.addEventListener('input', () => {
  const value = nameInput.value.trim();
  const startsWithCapital = /^[A-Z]/;

  if (value.length > 0 && !startsWithCapital.test(value)) {
    showError('nameError', '⚠️ Name must start with an uppercase letter (e.g., John, Rahul).');
  } else {
    document.getElementById('nameError').textContent = '';
  }
});

// Form Validation and Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const college = document.getElementById('college').value.trim();
  const duration = document.getElementById('duration').value;

  let isValid = true;

  // Name Validation: Capital Letter Check & Length Check
  const capitalStartRegex = /^[A-Z]/;

  if (name.length === 0) {
    showError('nameError', 'Please enter your full name.');
    isValid = false;
  } else if (!capitalStartRegex.test(name)) {
    showError('nameError', '⚠️ Full Name must begin with an uppercase letter (e.g., John).');
    isValid = false;
  } else if (name.length < 3) {
    showError('nameError', 'Name must contain at least 3 characters.');
    isValid = false;
  }

  // Email Validation Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('emailError', 'Please enter a valid email address.');
    isValid = false;
  }

  // Phone Validation (10 digits)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    showError('phoneError', 'Please enter a valid 10-digit mobile number.');
    isValid = false;
  }

  // College Validation
  if (college.length < 2) {
    showError('collegeError', 'Please enter your college name.');
    isValid = false;
  }

  if (isValid) {
    console.log('Application Submitted Successfully:', {
      domain: domainInput.value,
      name,
      email,
      phone,
      college,
      duration,
      github: document.getElementById('github').value.trim()
    });

    closeModal();
    showToast();
  }
});

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
