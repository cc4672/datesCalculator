const REQUIRED_DAYS = 5 * 365; // 5 years in days
const entriesDiv = document.getElementById('entries');
const totalDaysEl = document.getElementById('totalDays');
const daysRemainingEl = document.getElementById('daysRemaining');

document.getElementById('addEntry').addEventListener('click', addEntry);
window.addEventListener('DOMContentLoaded', addEntry);

function addEntry() {
  const entry = document.createElement('div');
  entry.className = 'entry';

  const start = document.createElement('input');
  start.type = 'date';
  start.addEventListener('change', calculate);

  const end = document.createElement('input');
  end.type = 'date';
  end.addEventListener('change', calculate);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    entry.remove();
    calculate();
  });

  entry.appendChild(start);
  entry.appendChild(end);
  entry.appendChild(removeBtn);
  entriesDiv.appendChild(entry);
}

function calculate() {
  let total = 0;
  document.querySelectorAll('.entry').forEach(entry => {
    const [start, end] = entry.querySelectorAll('input[type="date"]');
    if (start.value && end.value) {
      const d1 = new Date(start.value);
      const d2 = new Date(end.value);
      if (d2 >= d1) {
        const diff = (d2 - d1) / (1000 * 60 * 60 * 24) + 1;
        total += diff;
      }
    }
  });
  totalDaysEl.textContent = total;
  const remaining = Math.max(REQUIRED_DAYS - total, 0);
  daysRemainingEl.textContent = remaining;
}
