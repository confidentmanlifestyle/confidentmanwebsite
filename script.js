// ─── Lightweight AOS Replacement ───
// Replaces the 14KB AOS library with a ~30 line observer
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-aos-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
})();

// ─── Video Modal Logic ───
const modal = document.getElementById('video-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-modal-btn');
const backdrop = document.getElementById('modal-backdrop');
const videoPlayer = document.getElementById('main-video-player');

const watchButtons = document.querySelectorAll('button');
watchButtons.forEach(btn => {
    if (btn.innerText.includes('WATCH') || btn.classList.contains('play-btn')) {
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
    if (videoPlayer) {
        videoPlayer.currentTime = 0;
        videoPlayer.play();
    }
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    if (videoPlayer) videoPlayer.pause();
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) closeModal();
});

// ─── Smooth Scroll ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});
