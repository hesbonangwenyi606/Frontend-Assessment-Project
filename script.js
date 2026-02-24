const membershipButtons = document.querySelectorAll('.membership-btn');

membershipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) {
      target.classList.toggle('show');
    }
  });
});

const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');

if (emailForm && emailInput && successMessage) {
  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.classList.add('d-none');

    if (emailInput.checkValidity()) {
      emailInput.classList.remove('is-invalid');
      successMessage.classList.remove('d-none');
      emailForm.reset();
      return;
    }

    emailInput.classList.add('is-invalid');
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.checkValidity()) {
      emailInput.classList.remove('is-invalid');
    }
  });
}

const activities = [
  { type: 'deposit', label: 'Deposit', date: '2026-02-20', amount: '$1,500' },
  { type: 'return', label: 'Dividend payout', date: '2026-02-17', amount: '$240' },
  { type: 'deposit', label: 'Auto top-up', date: '2026-02-10', amount: '$600' },
  { type: 'return', label: 'Fund growth', date: '2026-02-03', amount: '$310' }
];

const goals = [
  { name: 'Emergency Fund', progress: 72 },
  { name: 'Home Deposit', progress: 48 },
  { name: 'Retirement Plan', progress: 61 }
];

const activityBody = document.getElementById('activityBody');
const filterButtons = document.querySelectorAll('.activity-filter');
const goalsList = document.getElementById('goalsList');

function renderActivities(filter = 'all') {
  if (!activityBody) {
    return;
  }

  const visible = filter === 'all' ? activities : activities.filter((item) => item.type === filter);

  activityBody.innerHTML = visible
    .map(
      (item) => `
        <tr>
          <td>${item.label}</td>
          <td>${item.date}</td>
          <td class="text-end fw-semibold">${item.amount}</td>
        </tr>
      `
    )
    .join('');
}

function renderGoals() {
  if (!goalsList) {
    return;
  }

  goalsList.innerHTML = goals
    .map(
      (goal) => `
        <div class="goal-row">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="meta">${goal.name}</span>
            <strong>${goal.progress}%</strong>
          </div>
          <div class="progress" role="progressbar" aria-valuenow="${goal.progress}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${goal.progress}%"></div>
          </div>
        </div>
      `
    )
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderActivities(button.dataset.filter);
  });
});

renderActivities();
renderGoals();
