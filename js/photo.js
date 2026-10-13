
class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);

        if (!this.slider) return;

        this.track = this.slider.querySelector('.slider-wrapper');
        this.slides = Array.from(this.track.children);
        this.dotsContainer = this.slider.querySelector('.slider-dots');

        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');

        this.dots = [];
        this.currentIndex = 0;
        this.autoSlideInterval = null;

        if (!this.track || !this.slides.length || !this.dotsContainer) {
            return;
        }

        this.init();
    }

    // Initialize the slider
    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
    }

    // Position slides using the actual slider width
    updateSlidePosition() {
        const slideWidth = this.track.parentElement.clientWidth;
        const offset = -this.currentIndex * slideWidth;

        this.track.style.transform = `translateX(${offset}px)`;

        this.updateDots();
    }

    // Move to the next slide
    nextSlide() {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSlidePosition();
    }

    // Move to the previous slide
    prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length) %
            this.slides.length;

        this.updateSlidePosition();
    }

    // Automatically change images every 5 seconds
    startAutoSlide() {
        this.stopAutoSlide();

        if (this.slides.length <= 1) return;

        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // Stop automatic sliding
    stopAutoSlide() {
        if (this.autoSlideInterval !== null) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    // Attach event listeners
    bindEvents() {
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.startAutoSlide();
            });
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.startAutoSlide();
            });
        }

        window.addEventListener('resize', () => {
            this.updateSlidePosition();
        });
    }

    // Create a dot for every image
    createDots() {
        this.dotsContainer.innerHTML = '';
        this.dots = [];

        this.slides.forEach((slide, index) => {
            const dot = document.createElement('button');

            dot.type = 'button';
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Show photo ${index + 1}`);

            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlidePosition();
                this.startAutoSlide();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    // Highlight the active dot
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle(
                'active',
                index === this.currentIndex
            );
        });
    }
}

// Start after the HTML has loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider('#portfolioSlider');
});
