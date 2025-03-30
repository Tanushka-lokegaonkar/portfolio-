let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

const slider = document.querySelector('.banner .slider');
let isDragging = false;
let startX, currentAngle = 0;

const startDrag = (e) => {
    isDragging = true;
    startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    slider.classList.add('paused'); 
    slider.style.animation = 'none';
};

const onDrag = (e) => {
    if (!isDragging) return;

    let clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    let deltaX = clientX - startX;
    currentAngle += deltaX * 0.3;
    slider.style.transform = `perspective(1000px) rotateX(5deg) rotateY(${currentAngle}deg)`;

    startX = clientX;
};

const stopDrag = () => {
    isDragging = false;
    slider.classList.remove('paused'); 
    slider.style.animation = '';
};

// Mouse events
slider.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', stopDrag);

// Touch events for mobile
slider.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', onDrag);
document.addEventListener('touchend', stopDrag);

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

// Check if menuIcon exists before adding event listener
if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}
