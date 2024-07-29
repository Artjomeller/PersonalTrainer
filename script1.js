document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const carousel = document.getElementById('carouselExampleIndicators');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const defaultBgColor = '#f8f9fa';
    const activeSectionColor = 'darkgray';

    function clearHighlights() {
        navLinks.forEach(link => link.classList.remove('nav-highlight'));
    }

    function handleScroll() {
        const scrollOffset = 100;
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + scrollOffset;
        const carouselBottom = carousel ? carousel.offsetHeight : 0;

        if (scrollPosition > carouselBottom) {
            navbar.classList.add('fixed-top');
            navbar.style.backgroundColor = defaultBgColor;
        } else {
            navbar.classList.remove('fixed-top');
            navbar.style.backgroundColor = 'transparent';
        }

        let inSection = false;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - navbar.offsetHeight + scrollOffset;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navbar.style.backgroundColor = activeSectionColor;
                clearHighlights();
                const matchingLink = Array.from(navLinks).find(link => link.getAttribute('href').includes(section.id));
                if (matchingLink) {
                    matchingLink.classList.add('nav-highlight');
                }
                inSection = true;
            }
        });

        if (!inSection) {
            clearHighlights();
            navbar.style.backgroundColor = 'transparent';
        }

        scrollTopBtn.style.display = (window.pageYOffset > 500) ? 'block' : 'none';
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);

    // Carousel animation handling
    var activeCaption = document.querySelector('.carousel-item.active .carousel-caption');
    activeCaption.classList.add('active');

    carousel.addEventListener('slid.bs.carousel', function () {
        var activeItem = document.querySelector('.carousel-item.active');
        var allCaptions = document.querySelectorAll('.carousel-caption');

        // Remove active class from all captions
        allCaptions.forEach(function(caption) {
            caption.classList.remove('active');
        });

        // Add active class to the current caption
        var activeCaption = activeItem.querySelector('.carousel-caption');
        activeCaption.classList.add('active');
    });
});

//Text animation

gsap.registerPlugin(ScrollTrigger);
// REVEAL //
gsap.utils.toArray(".revealUp").forEach(function (elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        markers: true,
        onEnter: function () {
            gsap.fromTo(
                elem,
                { y: 100, autoAlpha: 0 },
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        },
        onLeave: function () {
            gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
        },
        onEnterBack: function () {
            gsap.fromTo(
                elem,
                { y: -100, autoAlpha: 0 },
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        },
        onLeaveBack: function () {
            gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
        }
    });
});
