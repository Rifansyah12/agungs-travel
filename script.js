// ── Header scroll effect ──
const header = document.getElementById('header');
const fixedHeader = !document.getElementById('home');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', fixedHeader || window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile menu ──
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated counters ──
function animateCount(el, target, duration = 1800) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current >= 1000 ? current.toLocaleString('id-ID') : current;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (!isNaN(target)) animateCount(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// -- Fleet catalog --
const whatsAppNumber = '6282115224743';
const siteBaseUrl = 'https://agungs-travel-p4ugqczvc-rifansyah12s-projects.vercel.app';
const metaDescription = document.querySelector('meta[name="description"]');
const canonicalLink = document.querySelector('link[rel="canonical"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');
const ogUrl = document.querySelector('meta[property="og:url"]');
const ogImage = document.querySelector('meta[property="og:image"]');
const twitterTitle = document.querySelector('meta[name="twitter:title"]');
const twitterDescription = document.querySelector('meta[name="twitter:description"]');
const twitterImage = document.querySelector('meta[name="twitter:image"]');

function absoluteAssetUrl(path) {
  return path?.startsWith('http') ? path : `${siteBaseUrl}/${path}`;
}

function setPageSeo({ title, description, url, image }) {
  document.title = title;
  if (metaDescription) metaDescription.content = description;
  if (canonicalLink) canonicalLink.href = url;
  if (ogTitle) ogTitle.content = title;
  if (ogDescription) ogDescription.content = description;
  if (ogUrl) ogUrl.content = url;
  if (ogImage && image) ogImage.content = image;
  if (twitterTitle) twitterTitle.content = title;
  if (twitterDescription) twitterDescription.content = description;
  if (twitterImage && image) twitterImage.content = image;
}

const serviceCatalog = {
  'rental-harian': {
    title: 'Rental Harian',
    lead: 'Sewa mobil harian untuk kebutuhan pribadi, keluarga, kantor, atau perjalanan wisata dengan pilihan unit yang fleksibel.',
    benefits: [
      'Pilihan unit lengkap dari city car, MPV, SUV, hingga kendaraan premium.',
      'Bisa disesuaikan untuk perjalanan dalam kota, luar kota, atau kebutuhan dinas.',
      'Armada bersih, terawat, dan siap digunakan sesuai jadwal pemesanan.',
      'Harga transparan dan dapat dikonsultasikan sebelum booking.'
    ],
    steps: [
      'Pilih unit kendaraan sesuai kebutuhan perjalanan.',
      'Kirim detail tanggal, durasi, lokasi jemput, dan tujuan.',
      'Kami cek ketersediaan unit dan estimasi biaya.',
      'Konfirmasi booking, lalu armada siap digunakan sesuai jadwal.'
    ]
  },
  'travel-antar-kota': {
    title: 'Travel Antar Kota',
    lead: 'Layanan perjalanan antar kota yang nyaman untuk kebutuhan keluarga, pekerjaan, wisata, atau perjalanan rutin.',
    benefits: [
      'Perjalanan lebih nyaman dengan armada sesuai jumlah penumpang.',
      'Cocok untuk rute antar kota, perjalanan bisnis, dan perjalanan keluarga.',
      'Driver berpengalaman dan memahami rute perjalanan.',
      'Jadwal perjalanan dapat dibicarakan sesuai kebutuhan pelanggan.'
    ],
    steps: [
      'Informasikan kota asal dan kota tujuan.',
      'Tentukan tanggal, jam berangkat, dan jumlah penumpang.',
      'Kami rekomendasikan unit dan estimasi biaya terbaik.',
      'Konfirmasi, lalu perjalanan siap dijadwalkan.'
    ]
  },
  'antar-jemput-bandara': {
    title: 'Antar Jemput Bandara',
    lead: 'Layanan antar jemput bandara untuk keberangkatan dan kedatangan, dengan penjemputan tepat waktu dan armada nyaman.',
    benefits: [
      'Cocok untuk penjemputan keluarga, tamu, rekan kerja, atau perjalanan pribadi.',
      'Driver siap menyesuaikan jadwal penerbangan.',
      'Armada nyaman untuk membawa penumpang dan barang bawaan.',
      'Koordinasi mudah melalui WhatsApp sebelum penjemputan.'
    ],
    steps: [
      'Kirim nama bandara, terminal, dan jam penerbangan.',
      'Informasikan jumlah penumpang dan estimasi barang bawaan.',
      'Kami siapkan unit yang sesuai kebutuhan.',
      'Driver melakukan penjemputan atau pengantaran sesuai jadwal.'
    ]
  },
  'antar-jemput-stasiun': {
    title: 'Antar Jemput Stasiun',
    lead: 'Layanan antar jemput stasiun untuk perjalanan kereta, penjemputan keluarga, tamu, maupun kebutuhan kantor.',
    benefits: [
      'Penjemputan lebih praktis tanpa perlu menunggu transportasi umum.',
      'Cocok untuk kedatangan kereta pagi, siang, sore, maupun malam.',
      'Armada bisa disesuaikan dengan jumlah penumpang dan barang bawaan.',
      'Driver membantu koordinasi titik jemput di area stasiun.'
    ],
    steps: [
      'Kirim nama stasiun dan jadwal kedatangan atau keberangkatan.',
      'Informasikan jumlah penumpang dan barang bawaan.',
      'Kami rekomendasikan unit yang sesuai.',
      'Driver siap antar atau jemput sesuai titik yang disepakati.'
    ]
  },
  'paket-wisata': {
    title: 'Paket Wisata',
    lead: 'Paket transportasi wisata untuk keluarga, komunitas, kantor, atau rombongan dengan armada yang nyaman dan fleksibel.',
    benefits: [
      'Cocok untuk wisata harian, city tour, outing kantor, dan perjalanan rombongan.',
      'Pilihan unit lengkap dari minibus hingga bus besar.',
      'Rute perjalanan dapat disusun sesuai kebutuhan pelanggan.',
      'Driver berpengalaman untuk perjalanan wisata dan luar kota.'
    ],
    steps: [
      'Kirim tujuan wisata dan jumlah peserta.',
      'Tentukan tanggal, titik jemput, dan durasi perjalanan.',
      'Kami bantu rekomendasikan armada dan estimasi biaya.',
      'Konfirmasi booking, lalu perjalanan wisata siap berjalan.'
    ]
  }
};
const vehicleCatalog = {
  minibus: {
    title: 'Minibus',
    description: 'City car, MPV, SUV, dan mobil premium untuk harian, keluarga, dinas, dan perjalanan pribadi.',
    units: [
      { brand: 'Honda', name: 'Brio', type: 'City Car', price: 'Rp350.000/hari', image: 'images/Honda-Brio.jpeg' },
      { brand: 'Honda', name: 'Jazz RS', type: 'Hatchback', price: 'Rp500.000/hari', image: 'images/Honda-Jazz-RS.jpeg' },
      { brand: 'Toyota', name: 'Raize', type: 'Compact SUV', price: 'Rp500.000/hari', image: 'images/%E2%81%A0Raize.jpeg' },
      { brand: 'Toyota', name: 'Yaris', type: 'Hatchback', price: 'Rp500.000/hari', image: 'images/Yaris.jpeg' },
      { brand: 'Honda', name: 'Mobilio', type: 'MPV', price: 'Rp350.000/hari', image: 'images/Mobilio.jpeg' },
      { brand: 'Toyota / Daihatsu', name: 'Avanza / Xenia', type: 'MPV', price: 'Rp350.000/hari', image: 'images/Avanza:Xenia.jpeg' },
      { brand: 'Toyota', name: 'Avanza Facelift', type: 'MPV', price: 'Hubungi kami', image: 'images/Avanza:Xenia.jpeg' },
      { brand: 'Toyota', name: 'New Avanza TSS', type: 'MPV', price: 'Rp450.000/hari', image: 'images/New-Avanza-Tss.jpeg' },
      { brand: 'Toyota', name: 'Rush', type: 'SUV', price: 'Rp500.000/hari', image: 'images/Rush.jpeg' },
      { brand: 'Honda', name: 'BR-V', type: 'SUV 7 Kursi', price: 'Rp500.000/hari', image: 'images/BRV.jpeg' },
      { brand: 'Mitsubishi', name: 'Xpander', type: 'MPV', price: 'Rp500.000/hari', image: 'images/Xpander.jpeg' },
      { brand: 'Toyota', name: 'Innova Reborn', type: 'Premium MPV', price: 'Rp600.000/hari', image: 'images/Innova-Riborn.jpeg' },
      { brand: 'Toyota', name: 'Innova Zenix', type: 'Premium MPV', price: 'Rp1.000.000/hari', image: 'images/Innova-Zenix.jpeg' },
      { brand: 'Mitsubishi', name: 'Pajero Sport / Dakar', type: 'SUV Premium', price: 'Rp1.400.000/hari', image: 'images/%E2%81%A0Pajero-Sport:Dakar%20.jpeg' },
      { brand: 'Toyota', name: 'Fortuner GR', type: 'SUV Premium', price: 'Rp1.400.000/hari', image: 'images/Fortuner-GR-tahun.jpeg' },
      { brand: 'Toyota', name: 'Alphard Biasa', type: 'Luxury MPV', price: 'Rp2.500.000/hari', image: 'images/Alphard-biasa.jpeg' },
      { brand: 'Toyota', name: 'Alphard Transformer VIP', type: 'VIP Luxury', price: 'Rp3.500.000/hari', image: 'images/Alphard-Transformer-VIP.jpeg' },
      { brand: 'Suzuki', name: 'New Ertiga', type: 'MPV', price: 'Hubungi kami', image: 'images/avanza.jpg' },
      { brand: 'Honda', name: 'CR-V', type: 'SUV', price: 'Hubungi kami', image: 'images/crv.jpeg' },
      { brand: 'Honda', name: 'HR-V', type: 'Compact SUV', price: 'Hubungi kami', image: 'images/hrv.jpeg' },
      { brand: 'Daihatsu', name: 'Luxio', type: 'MPV', price: 'Hubungi kami', image: 'images/avanza.jpg' }
    ]
  },
  barang: {
    title: 'Barang',
    description: 'Armada angkut barang untuk kebutuhan kirim barang, usaha, pindahan ringan, dan operasional harian.',
    units: [
      { brand: 'Daihatsu / Suzuki', name: 'Grand Max Blind Van', type: 'Blind Van', price: 'Rp350.000/hari', image: 'images/grand-max-blindvan.jpeg' },
      { brand: 'Daihatsu / Suzuki', name: 'Grand Max Pick Up Bak', type: 'Pick Up Bak', price: 'Rp350.000/hari', image: 'images/grand-Max-Pick-Up.jpeg' },
      { brand: 'Daihatsu / Suzuki', name: 'Grand Max Pick Up Box', type: 'Pick Up Box', price: 'Rp350.000/hari', image: 'images/%E2%81%A0Grand-Max-Box.jpeg' }
    ]
  },
  hiace: {
    title: 'HiAce',
    description: 'Pilihan HiAce untuk rombongan kecil sampai menengah. Harga yang tertera sudah all in dalam kota.',
    units: [
      { brand: 'Toyota', name: 'HiAce Commuter Euro 4', type: '14 Kursi', price: 'Rp1.400.000/hari', note: 'All in dalam kota', image: 'images/Hiace-Commuter-all-in.jpeg' },
      { brand: 'Toyota', name: 'HiAce Premio', type: '14 Kursi', price: 'Rp1.800.000/hari', note: 'All in dalam kota', image: 'images/Hiace-Premio-All-in.jpeg' },
      { brand: 'Toyota', name: 'HiAce Premio Luxury', type: '10 Kursi', price: 'Rp2.500.000/hari', note: 'All in dalam kota', image: 'images/Hiace-Premio-luxury-All-in.jpeg' }
    ]
  },
  elf: {
    title: 'ELF Long',
    description: 'ELF Long untuk rombongan 19 kursi. Harga yang tertera sudah all in dalam kota.',
    units: [
      { brand: 'Isuzu', name: 'ELF Long Euro 4', type: '19 Kursi', price: 'Rp1.500.000/hari', note: 'All in dalam kota', image: 'images/Elf-Long-all-in.jpeg' }
    ]
  },
  mediumBus: {
    title: 'Medium Bus',
    heroImage: 'images/bus/medium-bus.jpeg',
    description: 'Medium Bus JB3 dan JB5 untuk rombongan wisata, kantor, sekolah, dan acara keluarga.',
    units: [
      { brand: 'Medium Bus', name: 'Medium Bus JB3 / JB5', type: '20 / 39 Kursi', price: 'Hubungi kami', image: 'images/bus/medium-bus.jpeg' }
    ]
  },
  bigBus: {
    title: 'Big Bus',
    heroImage: 'images/bus/big-bus.jpeg',
    description: 'Big Bus JB3 sampai JB5 untuk rombongan besar dengan pilihan kapasitas kursi lebih lengkap.',
    units: [
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/big-bus.jpeg' },
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/bus1.jpeg' },
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/bus2.jpeg' },
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/bus3.jpeg' },
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/bus4.jpeg' },
      { brand: 'Big Bus', name: 'Big Bus JB3 / JB5', type: '40 / 45 / 50 / 59 Kursi', price: 'Hubungi kami', image: 'images/bus/bus5.jpeg' }
    ]
  }
};

const categoryButtons = document.querySelectorAll('.category-card[data-category]');
const vehicleGrid = document.getElementById('vehicleGrid');
const catalogTitle = document.getElementById('catalogTitle');
const catalogDescription = document.getElementById('catalogDescription');
const catalogListTitle = document.getElementById('catalogListTitle');
const catalogPageHero = document.querySelector('.catalog-page-hero');
const catalogHeroImageWrap = document.getElementById('catalogHeroImageWrap');
const catalogHeroImage = document.getElementById('catalogHeroImage');
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const customerNameInput = document.getElementById('customerName');
const bookingUnitText = document.getElementById('bookingUnitText');
const serviceDetailTitle = document.getElementById('serviceDetailTitle');
const serviceDetailLead = document.getElementById('serviceDetailLead');
const serviceBenefits = document.getElementById('serviceBenefits');
const serviceSteps = document.getElementById('serviceSteps');
const serviceConsultButton = document.getElementById('serviceConsultButton');
const serviceConsultModal = document.getElementById('serviceConsultModal');
const serviceConsultForm = document.getElementById('serviceConsultForm');
const serviceConsultText = document.getElementById('serviceConsultText');
const serviceCustomerName = document.getElementById('serviceCustomerName');
let selectedBooking = null;
let selectedService = null;

function valueOrDash(value) {
  return value?.trim() || '-';
}

function buildServiceWhatsAppLink(service, details) {
  const messageLines = [
    "Halo Agung's Travel & Tour,",
    '',
    'Saya ingin konsultasi layanan transportasi. Berikut detail kebutuhan saya:',
    '',
    '=== DATA PEMESAN ===',
    `Nama          : ${details.name}`,
    '',
    '=== LAYANAN YANG DIPILIH ===',
    `Layanan       : ${service.title}`,
    `Tanggal/Jam   : ${valueOrDash(details.date)}`,
    `Lokasi Jemput : ${valueOrDash(details.pickup)}`,
    `Tujuan        : ${valueOrDash(details.destination)}`,
    `Jumlah Orang  : ${valueOrDash(details.passengers)}`,
    `Catatan       : ${valueOrDash(details.note)}`,
    '',
    'Mohon dibantu rekomendasi armada yang cocok, estimasi biaya, dan ketersediaan jadwalnya. Terima kasih.'
  ];

  return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
}

function renderServiceDetail() {
  if (!serviceDetailTitle || !serviceDetailLead || !serviceBenefits || !serviceSteps || !serviceConsultButton) return;

  const params = new URLSearchParams(window.location.search);
  const serviceKey = params.get('layanan');
  const selectedServiceKey = serviceCatalog[serviceKey] ? serviceKey : 'rental-harian';
  const service = serviceCatalog[selectedServiceKey];
  selectedService = service;

  document.title = `${service.title} - Agung's Travel & Tour`;
  serviceDetailTitle.textContent = service.title;
  serviceDetailLead.textContent = service.lead;
  serviceBenefits.innerHTML = service.benefits.map(item => `<li>${item}</li>`).join('');
  serviceSteps.innerHTML = service.steps.map(item => `<li>${item}</li>`).join('');
  if (serviceConsultText) serviceConsultText.textContent = service.title;
  setPageSeo({
    title: `${service.title} | Agung's Travel & Tour`,
    description: service.lead,
    url: `${siteBaseUrl}/detail-layanan.html?layanan=${selectedServiceKey}`,
    image: `${siteBaseUrl}/images/bg-hero.jpeg`
  });
}

renderServiceDetail();

function openServiceConsultModal() {
  if (!serviceConsultModal || !serviceConsultForm || !serviceCustomerName || !selectedService) return;

  serviceConsultForm.reset();
  serviceConsultModal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => serviceCustomerName.focus(), 0);
}

function closeServiceConsultModal() {
  if (!serviceConsultModal) return;

  serviceConsultModal.hidden = true;
  document.body.style.overflow = '';
}

if (serviceConsultButton) {
  serviceConsultButton.addEventListener('click', openServiceConsultModal);
}

if (serviceConsultModal) {
  serviceConsultModal.querySelectorAll('[data-close-service]').forEach(button => {
    button.addEventListener('click', closeServiceConsultModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !serviceConsultModal.hidden) closeServiceConsultModal();
  });
}

if (serviceConsultForm) {
  serviceConsultForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!selectedService || !serviceCustomerName) return;

    const formData = new FormData(serviceConsultForm);
    const details = {
      name: valueOrDash(formData.get('serviceCustomerName')),
      date: formData.get('serviceDate'),
      pickup: formData.get('servicePickup'),
      destination: formData.get('serviceDestination'),
      passengers: formData.get('servicePassengers'),
      note: formData.get('serviceNote')
    };

    if (details.name === '-') {
      serviceCustomerName.focus();
      return;
    }

    window.open(buildServiceWhatsAppLink(selectedService, details), '_blank', 'noopener');
    closeServiceConsultModal();
  });
}

function buildWhatsAppLink(unit, category, customerName) {
  const messageLines = [
    "Halo Agung's Travel & Tour,",
    '',
    'Saya ingin melakukan booking unit. Berikut detailnya:',
    '',
    '=== DATA PEMESAN ===',
    `Nama Pemesan : ${customerName}`,
    '',
    '=== UNIT YANG DIPILIH ===',
    `Kategori     : ${category.title}`,
    `Unit         : ${unit.name}`,
    `Jenis        : ${unit.type}`,
    `Harga        : ${unit.price}`,
    ...(unit.note ? [`Catatan      : ${unit.note}`] : []),
    '',
    '=== RENCANA PEMAKAIAN ===',
    'Tanggal      :',
    'Jam Jemput   :',
    'Lokasi Jemput:',
    'Tujuan       :',
    'Durasi       :',
    '',
    'Mohon dibantu cek ketersediaan unit dan estimasi total biayanya. Terima kasih.'
  ];
  const message = messageLines.join('\n');
  return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
}

function renderVehicleCards(categoryKey) {
  const category = vehicleCatalog[categoryKey];
  if (!category || !vehicleGrid || !catalogTitle || !catalogDescription) return;

  catalogTitle.textContent = category.title;
  catalogDescription.textContent = category.description;
  if (catalogListTitle) catalogListTitle.textContent = category.title;
  setPageSeo({
    title: `${category.title} | Daftar Unit Armada Agung's Travel & Tour`,
    description: `Daftar unit ${category.title} Agung's Travel & Tour lengkap dengan gambar, jenis kendaraan, harga, dan tombol booking WhatsApp.`,
    url: `${siteBaseUrl}/daftar-unit.html?kategori=${categoryKey}`,
    image: absoluteAssetUrl(category.heroImage || category.units[0]?.image || 'images/bg-hero.jpeg')
  });
  if (catalogPageHero) {
    const hasHeroImage = Boolean(category.heroImage && catalogHeroImage && catalogHeroImageWrap);
    catalogPageHero.classList.toggle('has-image', hasHeroImage);

    if (hasHeroImage) {
      catalogHeroImage.src = category.heroImage;
      catalogHeroImage.alt = `Gambar ${category.title}`;
      catalogHeroImageWrap.hidden = false;
    } else if (catalogHeroImage && catalogHeroImageWrap) {
      catalogHeroImage.removeAttribute('src');
      catalogHeroImage.alt = '';
      catalogHeroImageWrap.hidden = true;
    }
  }

  vehicleGrid.innerHTML = category.units.map((unit, index) => {
    const note = unit.note ? `<span class="vehicle-note">${unit.note}</span>` : '';

    return `
      <article class="vehicle-card">
        <div class="vehicle-img-wrap">
          <img src="${unit.image}" alt="${unit.name}" loading="lazy" />
          <span class="vehicle-type">${unit.type}</span>
        </div>
        <div class="vehicle-info">
          <span class="vehicle-brand">${unit.brand}</span>
          <h4>${unit.name}</h4>
          <div class="vehicle-price">${unit.price}</div>
          ${note}
          <button type="button" class="btn btn-gold btn-sm order-unit-btn" data-category="${categoryKey}" data-unit-index="${index}">Pesan Sekarang</button>
        </div>
      </article>
    `;
  }).join('');
}

function openBookingModal(categoryKey, unitIndex) {
  const category = vehicleCatalog[categoryKey];
  const unit = category?.units[unitIndex];
  if (!category || !unit || !bookingModal || !bookingForm || !customerNameInput || !bookingUnitText) return;

  selectedBooking = { category, unit };
  bookingUnitText.textContent = `${unit.name} - ${unit.type} - ${unit.price}`;
  bookingForm.reset();
  bookingModal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => customerNameInput.focus(), 0);
}

function closeBookingModal() {
  if (!bookingModal) return;

  bookingModal.hidden = true;
  selectedBooking = null;
  document.body.style.overflow = '';
}

function getSelectedCategory() {
  const params = new URLSearchParams(window.location.search);
  const categoryKey = params.get('kategori');
  return vehicleCatalog[categoryKey] ? categoryKey : 'minibus';
}

function setActiveCategory(categoryKey) {
  categoryButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.category === categoryKey);
  });
}

if (vehicleGrid) {
  const selectedCategory = getSelectedCategory();
  setActiveCategory(selectedCategory);
  renderVehicleCards(selectedCategory);

  vehicleGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.order-unit-btn');
    if (!button) return;

    openBookingModal(button.dataset.category, Number(button.dataset.unitIndex));
  });
}

if (bookingModal) {
  bookingModal.querySelectorAll('[data-close-booking]').forEach(button => {
    button.addEventListener('click', closeBookingModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !bookingModal.hidden) closeBookingModal();
  });
}

if (bookingForm && customerNameInput) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerName = customerNameInput.value.trim();
    if (!customerName || !selectedBooking) {
      customerNameInput.focus();
      return;
    }

    window.open(buildWhatsAppLink(selectedBooking.unit, selectedBooking.category, customerName), '_blank', 'noopener');
    closeBookingModal();
  });
}

// ── Contact form ──
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm && formNote) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Mengirim...';

    setTimeout(() => {
      formNote.textContent = '✓ Pesan terkirim! Kami akan segera menghubungi Anda.';
      formNote.style.color = '#4ade80';
      contactForm.reset();
      btn.disabled = false;
      btn.textContent = 'Kirim Pesan';
      setTimeout(() => { formNote.textContent = ''; }, 6000);
    }, 1000);
  });
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
