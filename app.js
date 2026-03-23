// ============================================
// WedPlan.lk – Main JavaScript
// ============================================

// ---- Vendor Data (Simulated Backend) ----
const vendors = [
  { id:1, name:"Cinnamon Grand Weddings", category:"Hotels & Venues", location:"Colombo 03", rating:4.9, reviews:128, price:"From LKR 250,000", emoji:"🏨", bg:"#f5e8d0", desc:"Luxury ballroom and garden weddings in the heart of Colombo." },
  { id:2, name:"Lens & Love Photography", category:"Photography", location:"Kandy", rating:4.8, reviews:96, price:"From LKR 65,000", emoji:"📸", bg:"#e8f4f8", desc:"Capturing timeless moments with creative documentary-style photography." },
  { id:3, name:"Spice of Ceylon Catering", category:"Catering", location:"Galle", rating:4.7, reviews:84, price:"From LKR 850/person", emoji:"🍽️", bg:"#f0f5e8", desc:"Authentic Sri Lankan cuisine with modern presentation for weddings." },
  { id:4, name:"Bloom Decor Studio", category:"Decoration", location:"Colombo 07", rating:4.9, reviews:112, price:"From LKR 45,000", emoji:"💐", bg:"#fce4ec", desc:"Floral design and event styling for elegant Sri Lankan weddings." },
  { id:5, name:"Royal Rides Lanka", category:"Wedding Cars", location:"Colombo", rating:4.6, reviews:67, price:"From LKR 15,000", emoji:"🚗", bg:"#ede7f6", desc:"Premium luxury vehicles for your wedding day transportation." },
  { id:6, name:"Glam by Amaya", category:"Salons & Beauty", location:"Nugegoda", rating:4.8, reviews:143, price:"From LKR 25,000", emoji:"💄", bg:"#fff8e1", desc:"Award-winning bridal makeup and hair styling for brides across Sri Lanka." },
  { id:7, name:"Dilshan Dress Designers", category:"Dress Designers", location:"Colombo 04", rating:4.7, reviews:89, price:"From LKR 55,000", emoji:"👗", bg:"#e8eaf6", desc:"Bespoke bridal gowns and groom suits tailored to perfection." },
  { id:8, name:"Temple Trees Venue", category:"Hotels & Venues", location:"Negombo", rating:4.5, reviews:54, price:"From LKR 180,000", emoji:"🌿", bg:"#e8f5e9", desc:"Beautiful beachside venue with outdoor ceremony setup options." },
  { id:9, name:"Pixel Perfect Studios", category:"Photography", location:"Colombo", rating:4.6, reviews:78, price:"From LKR 50,000", emoji:"🎞️", bg:"#fce4ec", desc:"Wedding photography & videography packages for all budgets." },
  { id:10, name:"Harvest Table Catering", category:"Catering", location:"Colombo", rating:4.8, reviews:102, price:"From LKR 1,200/person", emoji:"🥘", bg:"#fff3e0", desc:"Premium international buffet and set menu catering for weddings." },
  { id:11, name:"Enchanted Florals", category:"Decoration", location:"Kandy", rating:4.9, reviews:134, price:"From LKR 60,000", emoji:"🌸", bg:"#f3e5f5", desc:"Magical floral arrangements and thematic wedding decorations." },
  { id:12, name:"Silver Bells Beauty", category:"Salons & Beauty", location:"Galle", rating:4.7, reviews:61, price:"From LKR 18,000", emoji:"✨", bg:"#e1f5fe", desc:"Full bridal packages including pre-wedding spa and day-of styling." },
];

// ---- Render Vendor Cards ----
function renderVendors(list, containerId, limit) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  const toShow = limit ? list.slice(0, limit) : list;
  if (toShow.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:var(--mid);grid-column:1/-1;padding:40px">No vendors found matching your criteria.</p>';
    return;
  }
  toShow.forEach(v => {
    grid.innerHTML += `
      <div class="vendor-card">
        <div class="vendor-img" style="background:${v.bg}">${v.emoji}</div>
        <div class="vendor-info">
          <span class="vendor-badge">${v.category}</span>
          <h3>${v.name}</h3>
          <p class="loc">📍 ${v.location}</p>
          <div class="vendor-rating">${'★'.repeat(Math.floor(v.rating))}${'☆'.repeat(5-Math.floor(v.rating))} ${v.rating} (${v.reviews} reviews)</div>
          <div class="vendor-price">${v.price}</div>
          <a href="booking.html?id=${v.id}">Book Now</a>
        </div>
      </div>`;
  });
}

// ---- Counter Animation ----
function animateCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(c => {
    const target = parseInt(c.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { c.textContent = target + (target === 98 ? '' : '+'); clearInterval(timer); }
      else c.textContent = Math.floor(current) + (target === 98 ? '' : '+');
    }, 20);
  });
}

// ---- Navbar scroll ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile menu ----
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ---- Search redirect ----
function goSearch() {
  const cat = document.getElementById('catSelect')?.value || '';
  const loc = document.getElementById('locInput')?.value || '';
  window.location.href = `vendors.html?cat=${encodeURIComponent(cat)}&loc=${encodeURIComponent(loc)}`;
}

// ---- URL Params ----
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || '';
}

// ---- Filter Vendors ----
function filterVendors() {
  const cat = document.getElementById('filterCat')?.value || '';
  const loc = document.getElementById('filterLoc')?.value.toLowerCase() || '';
  const price = document.getElementById('filterPrice')?.value || '';
  let result = [...vendors];
  if (cat) result = result.filter(v => v.category === cat);
  if (loc) result = result.filter(v => v.location.toLowerCase().includes(loc));
  renderVendors(result, 'allVendors');
}

// ---- Booking Form ----
function submitBooking(e) {
  e.preventDefault();
  const form = e.target;
  const id = getParam('id');
  const vendor = vendors.find(v => v.id == id) || vendors[0];
  form.style.display = 'none';
  document.getElementById('bookingSuccess').style.display = 'block';
  // Simulate storing to localStorage
  const bookings = JSON.parse(localStorage.getItem('wedplan_bookings') || '[]');
  bookings.push({
    id: Date.now(),
    vendor: vendor.name,
    category: vendor.category,
    date: form.querySelector('#bookDate')?.value || 'TBD',
    name: form.querySelector('#custName')?.value || 'Customer',
    status: 'pending',
    time: new Date().toLocaleString()
  });
  localStorage.setItem('wedplan_bookings', JSON.stringify(bookings));
}

// ---- Auth Forms ----
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  // Simulate auth
  if (email && pass.length >= 6) {
    localStorage.setItem('wedplan_user', JSON.stringify({ email, name: email.split('@')[0], role: 'customer' }));
    showAlert('loginAlert', 'Login successful! Redirecting...', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  } else {
    showAlert('loginAlert', 'Invalid email or password. Try again.', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;
  const type = document.getElementById('regType')?.value || 'customer';
  if (name && email && pass.length >= 6) {
    localStorage.setItem('wedplan_user', JSON.stringify({ name, email, role: type }));
    showAlert('regAlert', 'Account created successfully! Redirecting...', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  } else {
    showAlert('regAlert', 'Please fill all fields. Password must be at least 6 characters.', 'error');
  }
}

function showAlert(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type}`;
  el.style.display = 'block';
}

// ---- Dashboard ----
function loadDashboard() {
  const user = JSON.parse(localStorage.getItem('wedplan_user') || '{"name":"Guest","role":"customer"}');
  const el = document.getElementById('dashUserName');
  if (el) el.textContent = user.name;

  const bookings = JSON.parse(localStorage.getItem('wedplan_bookings') || '[]');
  const bookingList = document.getElementById('bookingList');
  if (bookingList) {
    if (bookings.length === 0) {
      bookingList.innerHTML = '<p style="color:var(--mid);padding:16px 0">No bookings yet. <a href="vendors.html" style="color:var(--gold)">Browse vendors →</a></p>';
    } else {
      bookingList.innerHTML = bookings.slice(-5).reverse().map(b => `
        <div class="booking-item">
          <div class="booking-info">
            <h4>${b.vendor}</h4>
            <p>${b.category} · ${b.date}</p>
          </div>
          <span class="status ${b.status}">${b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span>
        </div>`).join('');
    }
  }
  const countEl = document.getElementById('bookingCount');
  if (countEl) countEl.textContent = bookings.length;
}

function handleLogout() {
  localStorage.removeItem('wedplan_user');
  window.location.href = 'index.html';
}

// ---- Contact Form ----
function handleContact(e) {
  e.preventDefault();
  showAlert('contactAlert', 'Thank you! We will get back to you within 24 hours.', 'success');
  e.target.reset();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Home page
  const vendorGrid = document.getElementById('vendorGrid');
  if (vendorGrid) {
    renderVendors(vendors, 'vendorGrid', 6);
    animateCounters();
  }

  // Vendors page
  const allVendors = document.getElementById('allVendors');
  if (allVendors) {
    const cat = getParam('cat');
    const loc = getParam('loc');
    const filterCat = document.getElementById('filterCat');
    const filterLoc = document.getElementById('filterLoc');
    if (filterCat && cat) filterCat.value = cat;
    if (filterLoc && loc) filterLoc.value = loc;
    filterVendors();
  }

  // Booking page
  const bookVendorName = document.getElementById('bookVendorName');
  if (bookVendorName) {
    const id = getParam('id');
    const vendor = vendors.find(v => v.id == id) || vendors[0];
    bookVendorName.textContent = vendor.name;
    document.getElementById('bookVendorCat').textContent = vendor.category;
    document.getElementById('bookVendorPrice').textContent = vendor.price;
    document.getElementById('bookVendorEmoji').textContent = vendor.emoji;
  }

  // Dashboard
  if (document.getElementById('bookingList')) loadDashboard();

  // Booking form
  const bookForm = document.getElementById('bookingForm');
  if (bookForm) bookForm.addEventListener('submit', submitBooking);

  // Auth forms
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const regForm = document.getElementById('registerForm');
  if (regForm) regForm.addEventListener('submit', handleRegister);

  // Contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleContact);

  // Check URL params for register type
  const regType = document.getElementById('regType');
  if (regType && getParam('type') === 'vendor') regType.value = 'vendor';
});
