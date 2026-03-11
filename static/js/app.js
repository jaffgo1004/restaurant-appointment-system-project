/* ============================================================
   THE VELVET ROOM — FRONTEND LOGIC (Connected to Flask API)
   ============================================================ */

let selectedTime = '';
let selectedRoom = '';
let selectedRoomId = null;
let currentCell = null;
let isAdminLoggedIn = false;

const TIME_SLOTS = ['11:00 AM','2:00 PM','3:00 PM','6:00 PM','7:00 PM','10:00 PM','11:00 PM'];
const CLEAR_SLOTS = ['2:00 PM','6:00 PM','10:00 PM'];

const MENU_DETAILS = {
  'The Executive Table': {
    eyebrow: 'Menu 01 · Corporate Dinner',
    price: 'RM 388/pax',
    courses: [
      { tag: 'Amuse-Bouche', dish: 'Truffle arancini, smoked salmon blini' },
      { tag: 'Starter', dish: 'Foie gras terrine, brioche, fig compote' },
      { tag: 'Soup', dish: 'Wild mushroom velouté, chive cream' },
      { tag: 'Main', dish: 'Wagyu beef tenderloin, bordelaise sauce' },
      { tag: 'Dessert', dish: 'Dark chocolate fondant, vanilla bean ice cream' },
    ]
  },
  'The Anniversary Menu': {
    eyebrow: 'Menu 02 · Romantic Dining',
    price: 'RM 288/pax',
    courses: [
      { tag: 'Starter', dish: 'Burrata with heirloom tomatoes & basil oil' },
      { tag: 'Soup', dish: 'Lobster bisque, brandy cream' },
      { tag: 'Intermezzo', dish: 'Champagne sorbet' },
      { tag: 'Main', dish: 'Pan-seared duck breast, cherry reduction' },
      { tag: 'Dessert', dish: 'Strawberry pavlova, rose water cream' },
    ]
  },
  'The Family Feast': {
    eyebrow: 'Menu 03 · Family Gathering',
    price: 'RM 218/pax',
    courses: [
      { tag: 'Shared Starter', dish: 'Charcuterie board, artisan breads' },
      { tag: 'Soup', dish: 'French onion soup, gruyère crouton' },
      { tag: 'Main', dish: 'Slow-roasted lamb shoulder, rosemary jus' },
      { tag: 'Sides', dish: 'Roasted potatoes, honey-glazed carrots' },
      { tag: 'Dessert', dish: 'Crème brûlée, almond tuile' },
    ]
  },
  'The Celebration Dinner': {
    eyebrow: 'Menu 04 · Birthday Dinner',
    price: 'RM 318/pax',
    courses: [
      { tag: 'Canapés', dish: 'Selection of 3 chef\'s canapés' },
      { tag: 'Starter', dish: 'King prawn cocktail, marie rose sauce' },
      { tag: 'Main', dish: 'Black Angus ribeye, café de Paris butter' },
      { tag: 'Sides', dish: 'Truffle fries, béarnaise, roasted asparagus' },
      { tag: 'Dessert', dish: 'Personalized celebration cake (tableside)' },
    ]
  },
  'The Prestige Tasting': {
    eyebrow: 'Menu 05 · Chef\'s Prestige',
    price: 'RM 688/pax',
    courses: [
      { tag: 'Amuse-Bouche', dish: '4 bites from the chef\'s kitchen' },
      { tag: '1st Course', dish: 'Oscietra caviar, blinis, crème fraîche' },
      { tag: '2nd Course', dish: 'Hokkaido scallop, cauliflower, hazelnut' },
      { tag: '3rd Course', dish: 'Black truffle risotto, parmesan foam' },
      { tag: 'Main', dish: 'A5 Wagyu striploin, seasonal garnish' },
      { tag: 'Dessert', dish: 'Valrhona chocolate sphere, mango sorbet' },
    ]
  },
  'The Grand Brunch': {
    eyebrow: 'Menu 06 · Sunday Brunch',
    price: 'RM 248/pax',
    courses: [
      { tag: 'Welcome', dish: 'Fresh-squeezed juice & pastry basket' },
      { tag: 'Eggs Station', dish: 'Eggs Benedict, Florentine or Royale' },
      { tag: 'Board', dish: 'Smoked salmon, gravlax, capers' },
      { tag: 'Carving', dish: 'Slow-roasted beef, condiments' },
      { tag: 'Dessert', dish: 'Mignardises & petits fours' },
    ]
  }
};

function showMenuDetail() {
  const val = document.getElementById('f-theme').value;
  const preview = document.getElementById('menu-detail-preview');

  if (!val) { preview.style.display = 'none'; updateSummary(); return; }

  const [name] = val.split('|');
  const menu = MENU_DETAILS[name];
  if (!menu) { preview.style.display = 'none'; updateSummary(); return; }

  document.getElementById('md-eyebrow').textContent = menu.eyebrow;
  document.getElementById('md-name').textContent = name;
  document.getElementById('md-price').textContent = menu.price;
  document.getElementById('md-courses').innerHTML = menu.courses.map(c => `
    <div style="display:flex;gap:10px;align-items:baseline;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.78rem;">
      <span style="font-family:'Cinzel',serif;font-size:0.55rem;letter-spacing:1.5px;color:var(--gold-dim);min-width:80px;text-transform:uppercase;">${c.tag}</span>
      <span style="color:var(--text-muted);">${c.dish}</span>
    </div>`).join('');

  preview.style.display = 'block';
  updateSummary();
}

/* ============================
   PAGE NAVIGATION
   ============================ */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const nav = document.getElementById('nav-' + page);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'admin') {
    if (!isAdminLoggedIn) {
      showAdminLogin();
    } else {
      loadAdminDashboard();
    }
  }
}

/* ============================
   ADMIN LOGIN
   ============================ */
function showAdminLogin() {
  document.getElementById('admin-login-overlay').style.display = 'flex';
}

function hideAdminLogin() {
  document.getElementById('admin-login-overlay').style.display = 'none';
}

async function submitAdminLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    showToast('⚠️ Please enter username and password', 'warning');
    return;
  }

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (data.success) {
      isAdminLoggedIn = true;
      hideAdminLogin();
      loadAdminDashboard();
      showToast('✓ Welcome, Admin!');
    } else {
      showToast('⚠️ ' + (data.message || 'Invalid credentials'), 'warning');
    }
  } catch (err) {
    showToast('⚠️ Connection error', 'warning');
  }
}

async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  isAdminLoggedIn = false;
  showPage('home');
  showToast('Logged out successfully');
}

/* ============================
   ADMIN DASHBOARD
   ============================ */
async function loadAdminDashboard() {
  await loadReservations();
  renderRoomGrid();
}

async function loadReservations() {
  try {
    const res = await fetch('/api/admin/reservations');
    if (res.status === 401) { showAdminLogin(); return; }
    const reservations = await res.json();
    renderBookingList(reservations);
    updateRoomGridFromReservations(reservations);
  } catch (err) {
    showToast('⚠️ Failed to load reservations', 'warning');
  }
}

function renderRoomGrid() {
  const hdr  = document.getElementById('grid-header-row');
  const body = document.getElementById('grid-body');
  if (!hdr || !body) return;

  hdr.innerHTML = '<th>Room / Time</th>' + TIME_SLOTS.map(t => {
    const isClear = CLEAR_SLOTS.includes(t);
    return `<th style="${isClear ? 'color:var(--text-muted);opacity:0.6;' : ''}">${t}${isClear ? '<br><span style="font-size:0.55rem;letter-spacing:1px;">CLEAR</span>' : '<br><span style="font-size:0.55rem;letter-spacing:1px;color:var(--gold-dim);">3HR</span>'}</th>`;
  }).join('');

  const ROOMS = ['Room 1 · The Crimson Suite', 'Room 2 · The Pearl Alcove'];
  const icons  = { available:'bi-check-circle', booked:'bi-x-circle', maintenance:'bi-tools' };
  const labels = { available:'Available', booked:'Booked', maintenance:'Maint.' };

  body.innerHTML = ROOMS.map(room => {
    const cells = TIME_SLOTS.map(time => {
      const isClear = CLEAR_SLOTS.includes(time);
      if (isClear) {
        return `<td><div class="cell" style="background:rgba(255,255,255,0.03);cursor:default;opacity:0.5;">
          <i class="bi bi-arrow-clockwise cell-icon" style="color:var(--text-muted);"></i>
          <span class="cell-lbl" style="color:var(--text-muted);">Clear</span>
        </div></td>`;
      }
      const key = room + '|' + time;
      const s = window.gridData?.[key] || 'available';
      return `<td><div class="cell ${s}" onclick="openCellModal('${room}','${time}')">
        <i class="bi ${icons[s]} cell-icon"></i>
        <span class="cell-lbl">${labels[s]}</span>
      </div></td>`;
    }).join('');
    return `<tr><td>${room}</td>${cells}</tr>`;
  }).join('');
}

function updateRoomGridFromReservations(reservations) {
  window.gridData = {};
  reservations.forEach(r => {
    if (r.status !== 'cancelled') {
      const key = r.room_name + '|' + r.time_slot;
      window.gridData[key] = 'booked';
    }
  });
  renderRoomGrid();
}

function renderBookingList(reservations) {
  const tbody = document.getElementById('bl-body');
  if (!tbody) return;

  const statusBadge = {
    confirmed: '<span class="badge-status confirmed"><i class="bi bi-check-circle-fill"></i> Confirmed</span>',
    pending:   '<span class="badge-status pending"><i class="bi bi-clock-fill"></i> Pending</span>',
    cancelled: '<span class="badge-status cancelled"><i class="bi bi-x-circle-fill"></i> Cancelled</span>',
  };

  if (!reservations || reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:40px;">No reservations yet.</td></tr>';
    return;
  }

  tbody.innerHTML = reservations.map(b => `
    <tr>
      <td style="font-family:'Cinzel',serif;font-size:0.7rem;color:var(--gold-dim);">BK${String(b.id).padStart(3,'0')}</td>
      <td>${b.customer_name}<br><span style="color:var(--text-muted);font-size:0.73rem;">${b.phone}</span></td>
      <td>${b.date}</td>
      <td>${b.time_slot}</td>
      <td>${b.pax}</td>
      <td style="font-size:0.76rem;">${b.room_name}</td>
      <td style="color:var(--gold);font-size:0.76rem;">${b.package_name}</td>
      <td>${statusBadge[b.status] || b.status}</td>
      <td>
        <button class="btn-outline-gold" style="padding:5px 12px;font-size:0.68rem;"
          onclick="toggleReservationStatus(${b.id}, '${b.status}')">
          ${b.status === 'confirmed' ? 'Cancel' : 'Confirm'}
        </button>
      </td>
    </tr>`).join('');
}

async function toggleReservationStatus(id, currentStatus) {
  const newStatus = currentStatus === 'confirmed' ? 'cancelled' : 'confirmed';
  try {
    await fetch(`/api/admin/reservation/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    showToast(`✓ Booking BK${String(id).padStart(3,'0')} updated to ${newStatus}`);
    loadReservations();
  } catch (err) {
    showToast('⚠️ Failed to update', 'warning');
  }
}

/* ============================
   CELL MODAL
   ============================ */
function openCellModal(room, time) {
  currentCell = { room, time };
  document.getElementById('modal-cell-title').textContent = room;
  const current = window.gridData?.[room + '|' + time] || 'available';
  document.getElementById('modal-cell-sub').textContent = `Time Slot: ${time}  ·  Current: ${current}`;
  document.getElementById('cell-modal').classList.add('open');
}

function closeCellModal() {
  document.getElementById('cell-modal').classList.remove('open');
  currentCell = null;
}

function setCellStatus(status) {
  if (!currentCell) return;
  const key = currentCell.room + '|' + currentCell.time;
  if (!window.gridData) window.gridData = {};
  window.gridData[key] = status;
  closeCellModal();
  renderRoomGrid();
  const lbl = { available:'Available', booked:'Booked/Blocked', maintenance:'Maintenance' };
  showToast(`✓ ${currentCell.room} · ${currentCell.time} → ${lbl[status]}`);
}

/* ============================
   RESERVATION LOGIC
   ============================ */
function selectTime(el, time) {
  if (el.classList.contains('blocked')) return;
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('sel'));
  el.classList.add('sel');
  selectedTime = time;
  updateSummary();
}

function selectRoom(el, room, roomId) {
  document.querySelectorAll('.room-opt').forEach(r => r.classList.remove('sel'));
  el.classList.add('sel');
  selectedRoom = room;
  selectedRoomId = roomId;
  updateSummary();
}

function updateSummary() {
  const name     = document.getElementById('f-name').value || '—';
  const dateRaw  = document.getElementById('f-date').value;
  const pax      = document.getElementById('f-pax').value;
  const themeVal = document.getElementById('f-theme').value;

  document.getElementById('sum-name').textContent = name;
  document.getElementById('sum-date').textContent = dateRaw ? formatDate(dateRaw) : '—';
  document.getElementById('sum-time').textContent = selectedTime || '—';
  document.getElementById('sum-pax').textContent  = pax || '—';
  document.getElementById('sum-room').textContent = selectedRoom || '—';

  if (themeVal) {
    const [tName, tPrice] = themeVal.split('|');
    document.getElementById('sum-theme').textContent = tName;
    const paxNum = pax ? parseInt(pax) : 0;
    document.getElementById('sum-total').textContent =
      paxNum > 0 ? `RM ${(parseInt(tPrice) * paxNum).toLocaleString()}` : `RM ${tPrice}/pax`;
  } else {
    document.getElementById('sum-theme').textContent = '—';
    document.getElementById('sum-total').textContent = '—';
  }
}

['f-name','f-date','f-pax','f-theme'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateSummary);
});

function formatDate(d) {
  const date = new Date(d + 'T00:00:00');
  return date.toLocaleDateString('en-GB', { weekday:'short', year:'numeric', month:'long', day:'numeric' });
}

async function submitBooking() {
  const name     = document.getElementById('f-name').value.trim();
  const phone    = document.getElementById('f-phone').value.trim();
  const email    = document.getElementById('f-email').value.trim();
  const date     = document.getElementById('f-date').value;
  const pax      = document.getElementById('f-pax').value;
  const themeVal = document.getElementById('f-theme').value;

  if (!name || !phone || !email || !date || !pax || !selectedTime || !selectedRoomId || !themeVal) {
    showToast('⚠️  Please fill in all required fields', 'warning');
    return;
  }

  const [tName, tPrice] = themeVal.split('|');
  const paxNum = parseInt(pax);
  const total  = parseInt(tPrice) * paxNum;

  try {
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, email, date,
        time_slot: selectedTime,
        pax: paxNum,
        room_id: selectedRoomId,
        package_id: getPackageId(tName)
      })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById('success-msg').textContent =
        `Thank you, ${name}! Your reservation has been submitted for ${formatDate(date)} at ${selectedTime} in ${selectedRoom}. Estimated total: RM ${total.toLocaleString()}. We will confirm within 24 hours.`;
      document.getElementById('appt-form-wrapper').style.display = 'none';
      document.getElementById('appt-success').classList.add('show');
    } else {
      showToast('⚠️ ' + data.message, 'warning');
    }
  } catch (err) {
    showToast('⚠️ Connection error. Please try again.', 'warning');
  }
}

function getPackageId(name) {
  const map = {
    'The Executive Table': 1,
    'The Anniversary Menu': 2,
    'The Family Feast': 3,
    'The Celebration Dinner': 4,
    'The Prestige Tasting': 5,
    'The Grand Brunch': 6
  };
  return map[name] || 1;
}

function resetForm() {
  document.getElementById('appt-form-wrapper').style.display = 'block';
  document.getElementById('appt-success').classList.remove('show');
  selectedTime = ''; selectedRoom = ''; selectedRoomId = null;
  ['f-name','f-phone','f-email','f-date','f-notes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('f-pax').value = '';
  document.getElementById('f-theme').value = '';
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('sel'));
  document.querySelectorAll('.room-opt').forEach(r => r.classList.remove('sel'));
  updateSummary();
}

function selectTheme(name, price) {
  showPage('appointment');
  setTimeout(() => {
    const sel = document.getElementById('f-theme');
    for (let opt of sel.options) {
      if (opt.value.startsWith(name)) { sel.value = opt.value; break; }
    }
    updateSummary();
    showToast(`✓ Menu selected: ${name} · RM ${price}/pax`);
  }, 300);
}

/* ============================
   ROOM PREVIEW MODAL
   ============================ */
const ROOM_DATA = {
  1: {
    name: 'Room 1 · The Crimson Suite',
    eyebrow: 'Grand Suite · Up to 20 Guests',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    desc: 'Spacious and grand, The Crimson Suite accommodates larger parties with ease. Features a built-in wine display, private AV system, floor-to-ceiling drapes, and bespoke lighting. Perfect for corporate dinners and large celebrations.',
    features: ['👥 Up to 20 guests', '🍷 Wine display', '📽️ Private AV system', '🕯️ Ambient lighting']
  },
  2: {
    name: 'Room 2 · The Pearl Alcove',
    eyebrow: 'Intimate Suite · Up to 10 Guests',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    desc: 'An intimate haven designed for romance and close-knit gatherings. Ambient lighting, fresh florals, and bespoke table settings are included as standard. Ideal for anniversaries, proposals, and intimate celebrations.',
    features: ['👥 Up to 10 guests', '🌸 Fresh florals', '🕯️ Candlelit ambience', '✨ Bespoke table setting']
  }
};

function openRoomModal(roomId) {
  const room = ROOM_DATA[roomId];
  document.getElementById('room-modal-img').src = room.img;
  document.getElementById('room-modal-eyebrow').textContent = room.eyebrow;
  document.getElementById('room-modal-name').textContent = room.name;
  document.getElementById('room-modal-desc').textContent = room.desc;
  document.getElementById('room-modal-features').innerHTML =
    room.features.map(f =>
      `<span style="background:rgba(201,168,76,0.07);border:1px solid var(--border);
       padding:5px 14px;font-size:0.75rem;color:var(--gold);">${f}</span>`
    ).join('');

  document.getElementById('room-modal-select-btn').onclick = () => {
    const opts = document.querySelectorAll('.room-opt');
    selectRoom(opts[roomId - 1], room.name, roomId);
    closeRoomModal();
    showToast(`✓ ${room.name} selected`);
  };

  document.getElementById('room-modal').classList.add('open');
}

function closeRoomModal() {
  document.getElementById('room-modal').classList.remove('open');
}

/* ============================
   TOAST
   ============================ */
function showToast(msg, type = 'success') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast-msg';
  if (type === 'warning') t.style.borderLeftColor = '#fbbf24';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const fDate = document.getElementById('f-date');
  const aDate = document.getElementById('a-date');
  if (fDate) fDate.min = today;
  if (aDate) aDate.min = today;

  const cellModal = document.getElementById('cell-modal');
  if (cellModal) {
    cellModal.addEventListener('click', function(e) {
      if (e.target === this) closeCellModal();
    });
  }

  const roomModal = document.getElementById('room-modal');
  if (roomModal) {
    roomModal.addEventListener('click', function(e) {
      if (e.target === this) closeRoomModal();
    });
  }

  const adminLoginOverlay = document.getElementById('admin-login-overlay');
  if (adminLoginOverlay) {
    adminLoginOverlay.addEventListener('click', function(e) {
      if (e.target === this) showPage('home');
    });
  }

  // Enter key for admin login
  document.getElementById('login-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAdminLogin();
  });
});
