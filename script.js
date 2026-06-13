
document.addEventListener('DOMContentLoaded', () => {
    /* 
     ====================================
       Theme Toggling Logic
     ====================================
    */
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const htmlElement = document.documentElement;

    // Load from local storage or OS default
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateToggleIcons(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            updateToggleIcons('dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            updateToggleIcons('light');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateToggleIcons(newTheme);
    });

    function updateToggleIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    /* 
     ====================================
       Mobile Navigation Toggle
     ====================================
    */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const lines = hamburger.querySelectorAll('span');

    function toggleMenu() {
        navLinks.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* 
     ====================================
       Active Link Scroll Spy
     ====================================
    */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Ensure "Home" is selected at the very top
        if (scrollY === 0) current = 'home';

        navItems.forEach(item => {
            item.classList.remove('active');

            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /* 
     ====================================
       Intersection Observer for Animations
     ====================================
    */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
    });

    /* 
     ====================================
       Contact Form Email Sending
     ====================================
    */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);

            const body = encodeURIComponent(
`Name: ${name}

Email: ${email}

Message:
${message}`
            );

            // Open user's email app with pre-filled email
            window.location.href = `mailto:manjumudhiraj0230@gmail.com?subject=${subject}&body=${body}`;

            // Button success effect
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Opening Email App...';
            btn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
