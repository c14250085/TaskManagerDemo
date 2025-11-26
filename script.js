document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Smooth Auto-Scroll ---
    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 2. Scroll Animations (Intersection Observer) ---
    // Menggunakan Intersection Observer untuk mendeteksi elemen saat masuk ke viewport
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in, .slide-right, .slide-left');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Berhenti mengamati setelah animasi dipicu
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Elemen akan terpicu saat 10% dari elemen terlihat
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 3. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Cek preferensi tema yang tersimpan di localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // Ganti icon menjadi matahari
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon'); // Ganti icon menjadi bulan
        localStorage.setItem('darkMode', 'disabled');
    }

    // --- 4. Slider Gambar (Image Carousel) ---
    const sliderWrapper = document.getElementById('taskMasterSlider');
    const slides = sliderWrapper.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Fungsi untuk menampilkan slide
    function showSlide(index) {
        // Logika untuk loop
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Hitung pergeseran (0% untuk slide 1, -20% untuk slide 2, dst. karena ada 5 slide)
        const offset = -currentSlide * (100 / slides.length); 
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        
        updateDots();
    }

    // Fungsi untuk membuat dan memperbarui indikator dots
    function updateDots() {
        dotsContainer.innerHTML = ''; // Kosongkan dots yang ada
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
            // Tambahkan event listener agar dot bisa diklik
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Event Listeners untuk tombol
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Inisialisasi slider
    showSlide(currentSlide);
});