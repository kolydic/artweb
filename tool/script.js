// Select elements
const lines = document.querySelectorAll('.line');
const container = document.querySelector('#lines');

// Create observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('show');
                }, index * 600);
            });

        }
    });
}, { threshold: 0.5 });

// Observe the container
observer.observe(container);