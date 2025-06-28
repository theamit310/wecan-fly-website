// WeCan Fly - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    const scrollWatcher = function() {
        window.scrollY > 50 
            ? header.classList.add('scrolled') 
            : header.classList.remove('scrolled');
    };
    
    window.addEventListener('scroll', scrollWatcher);
    
    // Package tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const packageSections = document.querySelectorAll('.package-section');
    
    if (tabButtons.length && packageSections.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and sections
                tabButtons.forEach(btn => btn.classList.remove('active'));
                packageSections.forEach(section => section.style.display = 'none');
                
                // Add active class to clicked button and show corresponding section
                button.classList.add('active');
                const target = button.getAttribute('data-target');
                document.getElementById(target).style.display = 'block';
            });
        });
        
        // Set default active tab
        if (tabButtons[0] && packageSections[0]) {
            tabButtons[0].classList.add('active');
            packageSections[0].style.display = 'block';
        }
    }
    
    // Testimonial slider
    let slideIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    
    if (testimonials.length > 1) {
        // Show the first testimonial
        showTestimonial(slideIndex);
        
        // Auto slide every 5 seconds
        setInterval(() => {
            slideIndex++;
            if (slideIndex >= testimonials.length) slideIndex = 0;
            showTestimonial(slideIndex);
        }, 5000);
        
        // Previous and next buttons functionality
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                slideIndex--;
                if (slideIndex < 0) slideIndex = testimonials.length - 1;
                showTestimonial(slideIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                slideIndex++;
                if (slideIndex >= testimonials.length) slideIndex = 0;
                showTestimonial(slideIndex);
            });
        }
    }
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        testimonials[index].style.display = 'block';
    }
    
    // Form validation for contact form
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const subject = document.querySelector('#subject');
            const message = document.querySelector('#message');
            
            // Simple validation
            if (!name.value.trim()) {
                isValid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value.trim())) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!subject.value.trim()) {
                isValid = false;
                showError(subject, 'Subject is required');
            } else {
                removeError(subject);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Form is valid - would normally submit to server
                // For demo purposes, show success message and reset form
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Animations on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});
