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
    'hi': 'Hello! I’m Mohammed Shabar, a B.Tech student at SRM IST, passionate about IoT, AI, and embedded systems. Ask me about my projects, internships, or anything else!',
    'hello': 'Hi there! I’m a second-year ECE student with a 9.535 CGPA. Want to know about my work in IoT, AI, or my leadership roles? Just ask!',
    'projects': 'Check out my Projects section! I’ve built cool stuff like a Voice-Nav Obsta Car, a Harassment Detection Camera, and a Life Saver system for fishermen. Want details on any specific project?',
    'internships': 'My Internships section covers my work at Keltron (IoT), Unified Mentor (Data Analyst), and Zidio Development (Data Science). Curious about what I did there? Let me know!',
    'leadership': 'I’m Co-Treasurer at Matrix Club and Technical Head at IETE Club at SRM IST. I’ve organized tech events and hackathons. Want to hear about my leadership roles?',
    'certifications': 'I’ve earned certifications in Python for Data Science, Design Thinking, Arduino Robotics, and more. Check the Certifications section or ask for specifics!',
    'extracurriculars': 'I’ve hosted events like Block & Tackle, anchored college Annual Days, and organized technical and sports events. See the Extracurriculars section for more!',
    'contact': 'Reach me at jafsamnazsha@gmail.com, +91 97909 26976, or via LinkedIn (linkedin.com/in/mohammed-shabar-8aa187277) and GitHub (github.com/SHARIFF-DEVIL). Drop a message in the Contact section!',
    'skills': 'I’m skilled in C, C++, Python, HTML, MATLAB, Arduino IDE, and more. I also work with IoT, embedded systems, and circuit design. Want to know about a specific skill?',
    'voice-nav obsta car': 'The Voice-Nav Obsta Car is a hands-free navigation system using Arduino UNO, Bluetooth, and Ultrasonic & IR Sensors for real-time obstacle detection. Cool, right? Want to know how I built it?',
    'harassment detection camera': 'This project uses AI-based detection algorithms to identify harassment patterns via video analysis. It’s built with camera systems and AI tech. Interested in the tech details?',
    'traffic signal controller': 'The Automatic Traffic Signal Controller uses Machine Learning and Image Processing for real-time traffic density analysis. It’s a smart solution for traffic management. Want more info?',
    'life saver for fishermen': 'This non-GPS system prevents fishing boats from crossing maritime boundaries using Arduino Mega, Magnetometer, and RFM95. It’s designed to keep fishermen safe. Curious about its features?',
    'gender classification': 'My Gender Classification project uses a Raspberry Pi and TensorFlow Lite for real-time gender detection from images. It’s a neat ML application. Want to dive into the tech stack?',
    'chat bot': 'The Terminal-Based Chat Bot is a text-based conversational AI built with Python and Raspberry Pi. It uses NLTK or ChatterBot for engagement. Want to know how it works?',
    'iot intern': 'At Keltron, I built IoT prototypes with Arduino and Raspberry Pi, focusing on MQTT communication and dashboard design. Ask me about my IoT projects!',
    'data analyst': 'As a Data Analyst Intern at Unified Mentor, I used Excel, SQL, and Python to analyze datasets and build dashboards. Want to hear about the insights I uncovered?',
    'data science': 'At Zidio Development, I worked on data-driven solutions using Python, SQL, and ML models, creating visualizations with Power BI/Tableau. Interested in my data science projects?',
    'education': 'I’m a second-year B.Tech student in Electronics and Communication Engineering at SRM IST, Vadapalani, with a CGPA of 9.535. My core subjects include Circuit Theory and Signal Processing. Want to know more about my studies?',
    'hobbies': 'I love hosting events, anchoring college programs, and organizing hackathons. I’m also into technical and sports events at SRM IST. Check out my Extracurriculars section!',
    'who are you': 'I’m Mohammed Shabar, a passionate ECE student at SRM IST, skilled in IoT, AI, and embedded systems. I build innovative projects and lead tech events. Ask me anything about my work!',
    'default': 'Oops, I didn’t quite get that. Try keywords like "hi", "projects", "internships", "leadership", "certifications", "skills", or ask about a specific project like "voice-nav obsta car".'
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
function openModal(title, desc) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('internshipModal').classList.remove('hidden');
}
function closeModal() {
    document.getElementById('internshipModal').classList.add('hidden');
}
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
  menu.classList.toggle("flex-col");
  menu.classList.toggle("absolute");
  menu.classList.toggle("top-16");
  menu.classList.toggle("left-0");
  menu.classList.toggle("w-full");
  menu.classList.toggle("bg-gray-800");
  menu.classList.toggle("z-50");
});
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});
