// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic',
    });
});

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById('mobile-menu-btn');
// (Note: You need to add the mobile menu div back if you removed it, 
// or just keep the previous mobile menu logic here)

// --- Video Modal Logic (Updated for Local File) ---
const modal = document.getElementById('video-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-modal-btn');
const backdrop = document.getElementById('modal-backdrop');
const videoPlayer = document.getElementById('main-video-player');

// Select buttons that trigger the video
// This grabs both the Hero button and the Video Card play buttons
const watchButtons = document.querySelectorAll('button');

watchButtons.forEach(btn => {
    // Trigger on buttons with specific text or class
    if(btn.innerText.includes('WATCH') || btn.classList.contains('play-btn')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
});

function openModal() {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    
    setTimeout(() => {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 50);

    // Play the local video file
    if(videoPlayer) {
        videoPlayer.currentTime = 0; // Restart from beginning
        videoPlayer.play();
    }
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    // Pause the video when closing
    if(videoPlayer) {
        videoPlayer.pause();
    }

    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
        closeModal();
    }
});

// Smooth scroll logic
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
                behavior: "smooth"
            });
        }
    });
});