particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#f472b6' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#f472b6', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .hover-scale').forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeIcon.innerHTML = document.body.classList.contains('dark') 
        ? '<path d="M12 3v1m0 12v1m4.36-10.36l.707.707M6.34 6.34l.707-.707m5.66 9.9l.707-.707M6.34 13.66l.707.707M3 8h1m12 0h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        : '<path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="currentColor"/>';
});
const sections = document.querySelectorAll('.fade-scale, .slide-left, .fade-stagger, .slide-right, .scale-rotate, .fade-bounce');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));
const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
const chatSend = document.getElementById('chat-send');
const responses = {
    'hi': 'Hello! How can I assist you today?',
    'hello': 'Hi there! Feel free to ask about my projects or internships.',
    'projects': 'Check out my Projects section! I’ve built a Gemini AI chatbot, a weather app, and more.',
    'internships': 'My Internships section details my experiences at Tech Corp, AI Lab, and others.',
    'contact': 'You can reach me via the Contact section or email me directly!',
    'default': 'Sorry, I didn’t catch that. Try saying "hi", "projects", or "contact".'
};
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'text-right mb-2' : 'text-left mb-2';
    messageDiv.innerHTML = `<span class="${isUser ? 'bg-pink-600 text-white' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100'} inline-block px-4 py-2 rounded-lg">${message}</span>`;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim().toLowerCase();
    if (message) {
        addMessage(message, true);
        const response = responses[message] || responses['default'];
        setTimeout(() => addMessage(response, false), 500);
        chatInput.value = '';
    }
});
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});