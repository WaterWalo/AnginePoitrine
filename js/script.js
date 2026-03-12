// ====================================
// Angine de Poitrine - Main JavaScript
// ====================================

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function () {

    // ====================================
    // Language Switcher
    // ====================================

    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;

    // Get saved language or default to French
    let currentLang = localStorage.getItem('language') || 'fr';

    // Set initial language
    setLanguage(currentLang);

    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('data-lang', lang);

        // Update active button
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update all translatable elements
        updateTranslations(lang);
    }

    function updateTranslations(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                // Check if element is an input/textarea with placeholder
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // ====================================
    // Hamburger Menu Toggle
    // ====================================

    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        this.setAttribute('aria-expanded',
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    // Close menu when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ====================================
    // Smooth Scrolling for Anchor Links
    // ====================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================================
    // Music Player
    // ====================================

    const audioElement = document.getElementById('audio-element');
    const trackItems = document.querySelectorAll('.track-item');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');

    // Track information (replace with actual audio file URLs)
    const tracks = [
        {
            title: 'ABABA HOTEL',
            duration: '6:25',
            src: 'audio/ababa-hotel.mp3' // Replace with actual path
        },
        {
            title: 'TAMEBSZ',
            duration: '7:56',
            src: 'audio/tamebsz.mp3' // Replace with actual path
        },
        {
            title: 'SHERPA',
            duration: '5:43',
            src: 'audio/sherpa.mp3' // Replace with actual path
        },
        {
            title: "L'ABEREK",
            duration: '6:12',
            src: 'audio/laberek.mp3' // Replace with actual path
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Load track
    function loadTrack(index) {
        if (index < 0 || index >= tracks.length) return;

        currentTrackIndex = index;
        const track = tracks[index];

        audioElement.src = track.src;

        // Update UI
        trackItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });

        // Update player buttons
        updatePlayButton();
    }

    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    // Update play button icon
    function updatePlayButton() {
        const icon = playPauseBtn.querySelector('i');
        const playBtns = document.querySelectorAll('.track-item .play-btn i');

        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');

            // Update current track button
            playBtns[currentTrackIndex].classList.remove('fa-play');
            playBtns[currentTrackIndex].classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');

            playBtns.forEach(btn => {
                btn.classList.remove('fa-pause');
                btn.classList.add('fa-play');
            });
        }
    }

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Event Listeners

    // Track item clicks
    trackItems.forEach((item, index) => {
        const playBtn = item.querySelector('.play-btn');

        playBtn.addEventListener('click', function () {
            if (currentTrackIndex === index && isPlaying) {
                audioElement.pause();
            } else {
                loadTrack(index);
                audioElement.play();
            }
        });
    });

    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            const newIndex = currentTrackIndex - 1;
            if (newIndex >= 0) {
                loadTrack(newIndex);
                if (isPlaying) audioElement.play();
            }
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const newIndex = currentTrackIndex + 1;
            if (newIndex < tracks.length) {
                loadTrack(newIndex);
                if (isPlaying) audioElement.play();
            }
        });
    }

    // Audio element events
    if (audioElement) {
        audioElement.addEventListener('play', function () {
            isPlaying = true;
            updatePlayButton();
        });

        audioElement.addEventListener('pause', function () {
            isPlaying = false;
            updatePlayButton();
        });

        audioElement.addEventListener('timeupdate', function () {
            if (audioElement.duration) {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                progressFill.style.width = progress + '%';
                currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
            }
        });

        audioElement.addEventListener('loadedmetadata', function () {
            durationDisplay.textContent = formatTime(audioElement.duration);
        });

        audioElement.addEventListener('ended', function () {
            // Auto-play next track
            const newIndex = currentTrackIndex + 1;
            if (newIndex < tracks.length) {
                loadTrack(newIndex);
                audioElement.play();
            } else {
                isPlaying = false;
                updatePlayButton();
            }
        });
    }

    // Progress bar click
    if (progressBar) {
        progressBar.addEventListener('click', function (e) {
            if (audioElement.duration) {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                audioElement.currentTime = audioElement.duration * percentage;
            }
        });
    }

    // Load first track on page load
    loadTrack(0);

    // ====================================
    // Shopify Integration Placeholder
    // ====================================

    // Note: To integrate Shopify, you'll need to:
    // 1. Create a Shopify store
    // 2. Get your store credentials
    // 3. Add the Shopify Buy Button SDK
    // 4. Initialize the SDK with your credentials
    // 
    // Example initialization (uncomment and fill in your details):
    /*
    var client = ShopifyBuy.buildClient({
        domain: 'your-store.myshopify.com',
        storefrontAccessToken: 'your-storefront-access-token'
    });
    
    ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('collection', {
            id: 'your-collection-id',
            node: document.getElementById('shopify-products'),
            moneyFormat: '%24%7B%7Bamount%7D%7D%20CAD',
            options: {
                "product": {
                    "styles": {
                        "product": {
                            "font-family": "'Roboto Mono', monospace",
                            "color": "#000000"
                        }
                    }
                },
                "cart": {
                    "styles": {
                        "cart": {
                            "font-family": "'Roboto Mono', monospace"
                        }
                    }
                }
            }
        });
    });
    */

    // ====================================
    // BandsInTown Widget Integration
    // ====================================

    // Note: To integrate BandsInTown widget:
    // 1. Get your BandsInTown artist ID
    // 2. Add the widget script
    // 
    // Example widget embed (add to concerts section):
    /*
    <a class="bit-widget-initializer" 
       data-artist-name="ANGINE DE POITRINE" 
       data-display-local-dates="false" 
       data-display-past-dates="false" 
       data-auto-style="true" 
       data-text-color="#000000" 
       data-link-color="#000000" 
       data-popup-background-color="#ffffff" 
       data-background-color="rgba(0,0,0,0)" 
       data-display-limit="15" 
       data-link-text-color="#FFFFFF">
    </a>
    */

    console.log('Angine de Poitrine website initialized');
});
