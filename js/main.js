// Initialize AOS (Animate On Scroll)
AOS.init({
	duration: 1000,
	easing: 'ease-in-out',
	once: true,
	mirror: false
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => {
	mobileMenu.classList.toggle('active');
	navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		mobileMenu.classList.remove('active');
		navMenu.classList.remove('active');
	});
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
	if (window.scrollY > 50) {
		navbar.style.background = 'rgba(10, 10, 10, 0.95)';
		navbar.style.padding = '15px 0';
		navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
	} else {
		navbar.style.background = 'rgba(10, 10, 10, 0.8)';
		navbar.style.padding = '20px 0';
		navbar.style.boxShadow = 'none';
	}
});

// Typewriter Effect
const typed = new Typed('#typewriter', {
	strings: [
		'Mobile Apps',
		'Backend Systems',
		'Lightning Integrations',
		'Scalable Solutions'
	],
	typeSpeed: 50,
	backSpeed: 30,
	backDelay: 2000,
	loop: true
});

// Smooth Scrolling for Anchor Links (Backup for CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const targetId = this.getAttribute('href');
		if (targetId === '#') return;

		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 70, // Offset for fixed navbar
				behavior: 'smooth'
			});
		}
	});
});

// Form Submission (Demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
	contactForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// Get button and change text to simulate sending
		const btn = contactForm.querySelector('button');
		const originalText = btn.innerHTML;

		btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
		btn.disabled = true;

		// Simulate API call
		setTimeout(() => {
			btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
			btn.style.background = '#00ff88';
			btn.style.color = '#000';

			// Reset form
			contactForm.reset();

			// Reset button after 3 seconds
			setTimeout(() => {
				btn.innerHTML = originalText;
				btn.style.background = '';
				btn.style.color = '';
				btn.disabled = false;
			}, 3000);
		}, 1500);
	});
}

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
	let current = '';

	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;

		if (pageYOffset >= (sectionTop - 200)) {
			current = section.getAttribute('id');
		}
	});

	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href').includes(current)) {
			link.classList.add('active');
		}
	});
});

/* 
====================================================================
   Theme Toggle Logic
====================================================================
*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
	body.setAttribute('data-theme', 'light');
	icon.classList.remove('fa-moon');
	icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
	if (body.getAttribute('data-theme') === 'light') {
		body.removeAttribute('data-theme');
		localStorage.setItem('theme', 'dark');
		icon.classList.remove('fa-sun');
		icon.classList.add('fa-moon');
	} else {
		body.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		icon.classList.remove('fa-moon');
		icon.classList.add('fa-sun');
	}
});

/* 
====================================================================
   AI Chat Widget Logic
====================================================================
*/
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Toggle Chat Window
chatToggle.addEventListener('click', () => {
	chatWindow.classList.toggle('active');
	if (chatWindow.classList.contains('active')) {
		chatInput.focus();
	}
});

// Close Chat Window
chatClose.addEventListener('click', () => {
	chatWindow.classList.remove('active');
});

// Handle Chat Submission
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const message = chatInput.value.trim();
	if (!message) return;

	// Add User Message
	addMessage(message, 'user');
	chatInput.value = '';

	// Simulate AI Response
	const aiResponse = getAIResponse(message);

	// Show typing indicator (optional, simplified here)
	setTimeout(() => {
		addMessage(aiResponse, 'ai');
	}, 1000);
});

function addMessage(text, sender) {
	const messageDiv = document.createElement('div');
	messageDiv.classList.add('message');
	messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
	messageDiv.textContent = text;

	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(userMessage) {
	const lowerMsg = userMessage.toLowerCase();

	if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
		return "Hello! I'm here to help you navigate Ucee's portfolio. What would you like to know?";
	} else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
		return "You can contact Ucee at ugarba202@gmail.com or use the contact form below.";
	} else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
		return "Ucee has worked on several exciting projects, including a FinTech app and a Lightning Wallet. Check out the Portfolio section!";
	} else if (lowerMsg.includes('skill') || lowerMsg.includes('stack')) {
		return "Ucee specializes in Flutter, Python (FastAPI), and Bitcoin Lightning Network integration.";
	} else {
		return "That's interesting! Tell me more, or feel free to ask about my skills and projects.";
	}
}
