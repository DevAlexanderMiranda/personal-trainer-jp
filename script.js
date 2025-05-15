// Mobile menu functionality
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const closeBtn = document.querySelector('.close-btn');

function toggleMenu(show) {
    if (show) {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

menuBtn.addEventListener('click', () => toggleMenu(true));
closeBtn.addEventListener('click', () => toggleMenu(false));

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && 
        e.target !== menuBtn && 
        navLinks.classList.contains('active')) {
        toggleMenu(false);
    }
});

// Close menu when pressing ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu(false);
    }
});

// Close menu when clicking on navigation links
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu(false);
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                toggleMenu(false);
            }
        }
    });
});

// Scroll-based animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-content, .about-image').forEach(el => {
    observer.observe(el);
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .feature-card, .about-content, .about-image {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .feature-card.animate, .about-content.animate, .about-image.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add header scroll classes to CSS
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    header {
        transition: transform 0.3s ease;
    }

    header.scroll-down {
        transform: translateY(-100%);
    }

    header.scroll-up {
        transform: translateY(0);
    }
`;
document.head.appendChild(headerStyle);

// Add WhatsApp floating button
const whatsappButton = document.createElement('a');
whatsappButton.href = 'https://wa.me/5592941207280';
whatsappButton.target = '_blank';
whatsappButton.className = 'whatsapp-float';
whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
document.body.appendChild(whatsappButton);

// Add WhatsApp button styles
const whatsappStyle = document.createElement('style');
whatsappStyle.textContent = `
    .whatsapp-float {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #25d366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
        box-shadow: 2px 2px 3px #999;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: transform 0.3s ease;
    }

    .whatsapp-float:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        .whatsapp-float {
            width: 50px;
            height: 50px;
            font-size: 25px;
            bottom: 20px;
            right: 20px;
        }
    }
`;
document.head.appendChild(whatsappStyle);

// BMI Calculator
document.getElementById('calculate-bmi').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultDiv = document.querySelector('.bmi-result');
    
    // Reset previous validation styles
    weightInput.classList.remove('error');
    heightInput.classList.remove('error');
    
    // Validate inputs with friendly messages
    let isValid = true;
    let errorMessage = '';
    
    // Validate weight (max 3 digits integer and 1 decimal place)
    if (isNaN(weight) || weight <= 0) {
        weightInput.classList.add('error');
        isValid = false;
        errorMessage = 'Por favor, insira um peso válido.';
    } else if (weight > 999.9) {
        weightInput.classList.add('error');
        isValid = false;
        errorMessage = 'O peso deve ser menor que 1000 kg.';
    } else if (weight.toString().includes('.') && weight.toString().split('.')[1].length > 1) {
        weightInput.classList.add('error');
        isValid = false;
        errorMessage = 'O peso deve ter no máximo 1 casa decimal.';
    }
    
    // Validate height (between 50cm and 250cm)
    if (isNaN(heightCm) || heightCm <= 0) {
        heightInput.classList.add('error');
        isValid = false;
        if (errorMessage) {
            errorMessage += ' E uma altura válida.';
        } else {
            errorMessage = 'Por favor, insira uma altura válida.';
        }
    } else if (heightCm < 50) {
        heightInput.classList.add('error');
        isValid = false;
        if (errorMessage) {
            errorMessage += ' A altura deve ser maior que 50 cm.';
        } else {
            errorMessage = 'A altura deve ser maior que 50 cm.';
        }
    } else if (heightCm > 250) {
        heightInput.classList.add('error');
        isValid = false;
        if (errorMessage) {
            errorMessage += ' A altura deve ser menor que 250 cm.';
        } else {
            errorMessage = 'A altura deve ser menor que 250 cm.';
        }
    }
    
    if (!isValid) {
        // Show friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add the new error message
        document.querySelector('.button-container').after(errorDiv);
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.classList.add('fade-out');
            setTimeout(() => {
                errorDiv.remove();
                weightInput.classList.remove('error');
                heightInput.classList.remove('error');
            }, 500);
        }, 3000);
        
        return;
    }
    
    // Convert height from cm to m
    const height = heightCm / 100;
    
    // Hide previous result with animation
    if (resultDiv.style.display === 'block') {
        resultDiv.classList.remove('visible');
        
        // Wait for fade out animation to complete
        setTimeout(() => {
            resultDiv.style.display = 'none';
            
            // Calculate BMI
            const bmi = weight / (height * height);
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');
            
            // Update values
            bmiValue.textContent = bmi.toFixed(1);
            
            // Determine category according to WHO standards
            if (bmi < 18.5) {
                bmiCategory.textContent = 'Abaixo do peso';
            } else if (bmi < 24.9) {
                bmiCategory.textContent = 'Peso normal';
            } else if (bmi < 29.9) {
                bmiCategory.textContent = 'Sobrepeso';
            } else if (bmi < 34.9) {
                bmiCategory.textContent = 'Obesidade Grau I';
            } else if (bmi < 39.9) {
                bmiCategory.textContent = 'Obesidade Grau II';
            } else {
                bmiCategory.textContent = 'Obesidade Grau III (mórbida)';
            }
            
            // Show result with animation
            resultDiv.style.display = 'block';
            
            // Trigger reflow to restart animation
            void resultDiv.offsetWidth;
            
            // Add visible class to trigger animation
            resultDiv.classList.add('visible');
        }, 500);
    } else {
        // Calculate BMI
        const bmi = weight / (height * height);
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        
        // Update values
        bmiValue.textContent = bmi.toFixed(1);
        
        // Determine category according to WHO standards
        if (bmi < 18.5) {
            bmiCategory.textContent = 'Abaixo do peso';
        } else if (bmi < 24.9) {
            bmiCategory.textContent = 'Peso normal';
        } else if (bmi < 29.9) {
            bmiCategory.textContent = 'Sobrepeso';
        } else if (bmi < 34.9) {
            bmiCategory.textContent = 'Obesidade Grau I';
        } else if (bmi < 39.9) {
            bmiCategory.textContent = 'Obesidade Grau II';
        } else {
            bmiCategory.textContent = 'Obesidade Grau III (mórbida)';
        }
        
        // Show result with animation
        resultDiv.style.display = 'block';
        
        // Trigger reflow to restart animation
        void resultDiv.offsetWidth;
        
        // Add visible class to trigger animation
        resultDiv.classList.add('visible');
    }
});

// Add event listener to format weight input (limit to 1 decimal place)
document.getElementById('weight').addEventListener('input', function(e) {
    // Remove any non-numeric characters except decimal point
    let value = this.value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 1 decimal place
    if (parts.length === 2 && parts[1].length > 1) {
        value = parts[0] + '.' + parts[1].substring(0, 1);
    }
    
    // Limit to 3 digits before decimal
    if (parts[0].length > 3) {
        value = parts[0].substring(0, 3) + (parts.length > 1 ? '.' + parts[1] : '');
    }
    
    this.value = value;
});

// Add event listener to format height input (ensure integer)
document.getElementById('height').addEventListener('input', function(e) {
    // Remove any non-numeric characters
    let value = this.value.replace(/[^\d]/g, '');
    
    // Limit to 3 digits
    if (value.length > 3) {
        value = value.substring(0, 3);
    }
    
    this.value = value;
});

// WhatsApp button functionality
document.getElementById('schedule-evaluation').addEventListener('click', function() {
    // Get BMI values for the message
    const bmiValue = document.getElementById('bmi-value').textContent;
    const bmiCategory = document.getElementById('bmi-category').textContent;
    
    // Create WhatsApp message
    const message = `Olá! Gostaria de agendar uma avaliação física.\n\n` +
                   `Meu IMC é: ${bmiValue}\n` +
                   `Categoria: ${bmiCategory}\n\n` +
                   `Por favor, me informe os horários disponíveis.`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5592941207280?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
});

// Function to open WhatsApp with a message
function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5592941207280?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Add event listeners to "Escolher Plano" buttons
document.querySelectorAll('.service-button').forEach(button => {
    button.addEventListener('click', function() {
        // Get the service name from the parent card
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        const servicePrice = serviceCard.querySelector('.price').textContent;
        
        // Create WhatsApp message
        const message = `Olá! Gostaria de saber mais sobre o plano: ${serviceName}\n\n` +
                       `Preço: ${servicePrice}\n\n` +
                       `Por favor, me envie mais informações.`;
        
        // Open WhatsApp
        openWhatsApp(message);
    });
});

// Add event listener to "Comece Agora" button
const ctaButtons = document.querySelectorAll('.cta-button:not(#calculate-bmi)');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Scroll to services section
        const servicesSection = document.getElementById('services');
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Funcionalidade para o Modal "Conheça Mais"
const aboutModal = document.getElementById('about-modal');
const aboutBtn = document.querySelector('.about-content .secondary-button');
const aboutCloseBtn = document.querySelector('.modal-close');

// Abrir o modal quando clicar no botão "Conheça Mais"
aboutBtn.addEventListener('click', function() {
    document.body.style.overflow = 'hidden'; // Impede rolagem da página de fundo
    aboutModal.classList.add('show');
});

// Fechar o modal quando clicar no X
aboutCloseBtn.addEventListener('click', function() {
    document.body.style.overflow = ''; // Restaura rolagem
    aboutModal.classList.remove('show');
});

// Fechar o modal quando clicar fora do conteúdo
window.addEventListener('click', function(event) {
    if (event.target === aboutModal) {
        document.body.style.overflow = ''; // Restaura rolagem
        aboutModal.classList.remove('show');
    }
});

// Fechar o modal ao pressionar ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && aboutModal.classList.contains('show')) {
        document.body.style.overflow = ''; // Restaura rolagem
        aboutModal.classList.remove('show');
    }
});

// Funcionalidade específica para o link "Home"
const homeLink = document.getElementById('homeLink');
homeLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Rolar suavemente para o topo da página
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Fechar o menu mobile se estiver aberto
    if (window.innerWidth <= 768) {
        toggleMenu(false);
    }
}); 