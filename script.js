// Modern hamburger menu functionality
const hamburger = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  // Toggle body scroll
  if (navLinks.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Close menu when clicking on navigation links
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Close menu when pressing ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll-based animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".feature-card, .about-content, .about-image")
  .forEach((el) => {
    observer.observe(el);
  });

// Add animation classes to CSS
const style = document.createElement("style");
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
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scroll down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scroll up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Add header scroll classes to CSS
const headerStyle = document.createElement("style");
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
const whatsappButton = document.createElement("a");
whatsappButton.href = "https://wa.me/5592941207280";
whatsappButton.target = "_blank";
whatsappButton.className = "whatsapp-float";
whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
document.body.appendChild(whatsappButton);

// Add WhatsApp button styles
const whatsappStyle = document.createElement("style");
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
document.getElementById("calculate-bmi").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const resultDiv = document.querySelector(".bmi-result");

  // Reset previous validation styles
  weightInput.classList.remove("error");
  heightInput.classList.remove("error");

  // Validate inputs with friendly messages
  let isValid = true;
  let errorMessage = "";

  // Validate weight (max 3 digits integer and 1 decimal place)
  if (isNaN(weight) || weight <= 0) {
    weightInput.classList.add("error");
    isValid = false;
    errorMessage = "Por favor, insira um peso válido.";
  } else if (weight > 999.9) {
    weightInput.classList.add("error");
    isValid = false;
    errorMessage = "O peso deve ser menor que 1000 kg.";
  } else if (
    weight.toString().includes(".") &&
    weight.toString().split(".")[1].length > 1
  ) {
    weightInput.classList.add("error");
    isValid = false;
    errorMessage = "O peso deve ter no máximo 1 casa decimal.";
  }

  // Validate height (between 50cm and 250cm)
  if (isNaN(heightCm) || heightCm <= 0) {
    heightInput.classList.add("error");
    isValid = false;
    if (errorMessage) {
      errorMessage += " E uma altura válida.";
    } else {
      errorMessage = "Por favor, insira uma altura válida.";
    }
  } else if (heightCm < 50) {
    heightInput.classList.add("error");
    isValid = false;
    if (errorMessage) {
      errorMessage += " A altura deve ser maior que 50 cm.";
    } else {
      errorMessage = "A altura deve ser maior que 50 cm.";
    }
  } else if (heightCm > 250) {
    heightInput.classList.add("error");
    isValid = false;
    if (errorMessage) {
      errorMessage += " A altura deve ser menor que 250 cm.";
    } else {
      errorMessage = "A altura deve ser menor que 250 cm.";
    }
  }

  if (!isValid) {
    // Show friendly error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;

    // Remove any existing error message
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add the new error message
    document.querySelector(".button-container").after(errorDiv);

    // Remove error message after 3 seconds
    setTimeout(() => {
      errorDiv.classList.add("fade-out");
      setTimeout(() => {
        errorDiv.remove();
        weightInput.classList.remove("error");
        heightInput.classList.remove("error");
      }, 500);
    }, 3000);

    return;
  }

  // Convert height from cm to m
  const height = heightCm / 100;

  // Hide previous result with animation
  if (resultDiv.style.display === "block") {
    resultDiv.classList.remove("visible");

    // Wait for fade out animation to complete
    setTimeout(() => {
      resultDiv.style.display = "none";

      // Calculate BMI
      const bmi = weight / (height * height);
      const bmiValue = document.getElementById("bmi-value");
      const bmiCategory = document.getElementById("bmi-category");

      // Update values
      bmiValue.textContent = bmi.toFixed(1);

      // Determine category according to WHO standards
      if (bmi < 18.5) {
        bmiCategory.textContent = "Abaixo do peso";
      } else if (bmi < 24.9) {
        bmiCategory.textContent = "Peso normal";
      } else if (bmi < 29.9) {
        bmiCategory.textContent = "Sobrepeso";
      } else if (bmi < 34.9) {
        bmiCategory.textContent = "Obesidade Grau I";
      } else if (bmi < 39.9) {
        bmiCategory.textContent = "Obesidade Grau II";
      } else {
        bmiCategory.textContent = "Obesidade Grau III (mórbida)";
      }

      // Show result with animation
      resultDiv.style.display = "block";

      // Trigger reflow to restart animation
      void resultDiv.offsetWidth;

      // Add visible class to trigger animation
      resultDiv.classList.add("visible");
    }, 500);
  } else {
    // Calculate BMI
    const bmi = weight / (height * height);
    const bmiValue = document.getElementById("bmi-value");
    const bmiCategory = document.getElementById("bmi-category");

    // Update values
    bmiValue.textContent = bmi.toFixed(1);

    // Determine category according to WHO standards
    if (bmi < 18.5) {
      bmiCategory.textContent = "Abaixo do peso";
    } else if (bmi < 24.9) {
      bmiCategory.textContent = "Peso normal";
    } else if (bmi < 29.9) {
      bmiCategory.textContent = "Sobrepeso";
    } else if (bmi < 34.9) {
      bmiCategory.textContent = "Obesidade Grau I";
    } else if (bmi < 39.9) {
      bmiCategory.textContent = "Obesidade Grau II";
    } else {
      bmiCategory.textContent = "Obesidade Grau III (mórbida)";
    }

    // Show result with animation
    resultDiv.style.display = "block";

    // Trigger reflow to restart animation
    void resultDiv.offsetWidth;

    // Add visible class to trigger animation
    resultDiv.classList.add("visible");
  }
});

// Add event listener to format weight input (limit to 1 decimal place)
document.getElementById("weight").addEventListener("input", function (e) {
  // Remove any non-numeric characters except decimal point
  let value = this.value.replace(/[^\d.]/g, "");

  // Ensure only one decimal point
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  // Limit to 1 decimal place
  if (parts.length === 2 && parts[1].length > 1) {
    value = parts[0] + "." + parts[1].substring(0, 1);
  }

  // Limit to 3 digits before decimal
  if (parts[0].length > 3) {
    value = parts[0].substring(0, 3) + (parts.length > 1 ? "." + parts[1] : "");
  }

  this.value = value;
});

// Add event listener to format height input (ensure integer)
document.getElementById("height").addEventListener("input", function (e) {
  // Remove any non-numeric characters
  let value = this.value.replace(/[^\d]/g, "");

  // Limit to 3 digits
  if (value.length > 3) {
    value = value.substring(0, 3);
  }

  this.value = value;
});

// WhatsApp button functionality
document
  .getElementById("schedule-evaluation")
  .addEventListener("click", function () {
    // Get BMI values for the message
    const bmiValue = document.getElementById("bmi-value").textContent;
    const bmiCategory = document.getElementById("bmi-category").textContent;

    // Create WhatsApp message
    const message =
      `Olá! Gostaria de agendar uma avaliação física.\n\n` +
      `Meu IMC é: ${bmiValue}\n` +
      `Categoria: ${bmiCategory}\n\n` +
      `Por favor, me informe os horários disponíveis.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5592941207280?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  });

// Function to open WhatsApp with a message
function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/5592941207280?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}

// Add event listeners to "Escolher Plano" buttons
document.querySelectorAll(".service-button").forEach((button) => {
  button.addEventListener("click", function () {
    // Get the service name from the parent card
    const serviceCard = this.closest(".service-card");
    const serviceName = serviceCard.querySelector("h3").textContent;
    const servicePrice = serviceCard.querySelector(".price").textContent;

    // Create WhatsApp message
    const message =
      `Olá! Gostaria de saber mais sobre o plano: ${serviceName}\n\n` +
      `Preço: ${servicePrice}\n\n` +
      `Por favor, me envie mais informações.`;

    // Open WhatsApp
    openWhatsApp(message);
  });
});

// Add event listener to "Comece Agora" button
const ctaButtons = document.querySelectorAll(".cta-button:not(#calculate-bmi)");
ctaButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Scroll to services section
    const servicesSection = document.getElementById("services");
    servicesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Funcionalidade para o Modal "Conheça Mais"
const aboutModal = document.getElementById("about-modal");
const aboutBtn = document.querySelector(".about-content .secondary-button");
const aboutCloseBtn = document.querySelector(".modal-close");

// Funcionalidade para os modais de benefícios
const benefitModal = document.getElementById("benefit-modal");
const benefitTitle = document.getElementById("benefit-title");
const benefitDescription = document.getElementById("benefit-description");
const benefitBtns = document.querySelectorAll(".benefit-btn");
const benefitCloseBtns = document.querySelectorAll(
  "#benefit-modal .modal-close"
);

// Conteúdo detalhado dos benefícios
const benefitsContent = {
  resultados: {
    title: "Resultados Mais Rápidos",
    content: `
            <h3>Como funciona</h3>
            <p>O treinamento personalizado acelera seus resultados através de exercícios cientificamente comprovados e adaptados especificamente para seu corpo, metabolismo e objetivos.</p>
            
            <h3>Benefícios específicos</h3>
            <ul>
                <li>Planejamento estratégico focado em suas metas específicas</li>
                <li>Ajustes constantes baseados no seu progresso</li>
                <li>Maximização do tempo de treino com exercícios eficientes</li>
                <li>Combinação ideal entre treino e recuperação</li>
                <li>Menor risco de estagnação nos resultados</li>
            </ul>
            
            <h3>Diferencial</h3>
            <p>Diferente de treinos genéricos, o acompanhamento personalizado identifica e trabalha seus pontos fracos, otimizando cada sessão para garantir o máximo de resultados no menor tempo possível.</p>
        `,
  },
  saude: {
    title: "Saúde Melhorada",
    content: `
            <h3>Impacto na saúde</h3>
            <p>O exercício físico orientado vai muito além da estética, proporcionando benefícios profundos para todos os sistemas do corpo humano.</p>
            
            <h3>Benefícios para a saúde</h3>
            <ul>
                <li>Redução do risco de doenças cardiovasculares em até 35%</li>
                <li>Melhora da sensibilidade à insulina e controle glicêmico</li>
                <li>Fortalecimento do sistema imunológico</li>
                <li>Redução dos níveis de estresse e ansiedade</li>
                <li>Melhora da qualidade do sono e recuperação</li>
                <li>Aumento da densidade óssea e prevenção de osteoporose</li>
            </ul>
            
            <h3>Abordagem holística</h3>
            <p>Trabalho com uma visão integrada da saúde, considerando não apenas o treinamento físico, mas também aspectos como recuperação, gerenciamento de estresse e hábitos diários para uma transformação completa.</p>
        `,
  },
  disciplina: {
    title: "Disciplina e Foco",
    content: `
            <h3>Desenvolvimento mental</h3>
            <p>O treinamento personalizado não transforma apenas seu corpo, mas também sua mente, desenvolvendo disciplina e foco que se transferem para todas as áreas da sua vida.</p>
            
            <h3>Como desenvolvemos</h3>
            <ul>
                <li>Estabelecimento de metas claras e progressivas</li>
                <li>Criação de hábitos consistentes e sustentáveis</li>
                <li>Acompanhamento regular para manter a motivação</li>
                <li>Superação constante de desafios físicos e mentais</li>
                <li>Celebração de conquistas e reforço positivo</li>
            </ul>
            
            <h3>Resultados além da academia</h3>
            <p>Meus alunos frequentemente relatam melhorias significativas em sua produtividade profissional, relacionamentos pessoais e capacidade de alcançar objetivos em outras áreas da vida como resultado da disciplina desenvolvida nos treinos.</p>
        `,
  },
  forca: {
    title: "Força e Resistência",
    content: `
            <h3>Desenvolvimento funcional</h3>
            <p>O treinamento de força adequado não se trata apenas de músculos maiores, mas de um corpo mais funcional, resistente e preparado para as demandas do dia a dia.</p>
            
            <h3>Benefícios do treinamento de força</h3>
            <ul>
                <li>Aumento da massa muscular e densidade óssea</li>
                <li>Melhora da postura e alinhamento corporal</li>
                <li>Prevenção de lesões através do fortalecimento articular</li>
                <li>Aumento da capacidade funcional para atividades diárias</li>
                <li>Melhora do equilíbrio e coordenação motora</li>
                <li>Maior resistência física para atividades prolongadas</li>
            </ul>
            
            <h3>Metodologia progressiva</h3>
            <p>Utilizo técnicas avançadas de periodização para garantir ganhos constantes de força e resistência, respeitando os limites do seu corpo e evitando o temido platô nos resultados.</p>
        `,
  },
  metabolismo: {
    title: "Metabolismo Acelerado",
    content: `
            <h3>Como funciona</h3>
            <p>O treinamento adequado estimula o metabolismo não apenas durante o exercício, mas por horas após o término da atividade, através do efeito EPOC (Excess Post-exercise Oxygen Consumption).</p>
            
            <h3>Estratégias metabólicas</h3>
            <ul>
                <li>Treinamento de força para aumento da massa muscular (tecido metabolicamente ativo)</li>
                <li>Exercícios de alta intensidade estrategicamente posicionados</li>
                <li>Combinação ideal entre cardio e musculação</li>
                <li>Periodização do treinamento para evitar adaptação metabólica</li>
                <li>Orientações nutricionais complementares ao treino</li>
            </ul>
            
            <h3>Resultados sustentáveis</h3>
            <p>Diferente de dietas restritivas que podem desacelerar o metabolismo, minha abordagem visa criar um metabolismo mais eficiente a longo prazo, facilitando tanto a perda de gordura quanto a manutenção do peso ideal.</p>
        `,
  },
  autoestima: {
    title: "Autoestima Elevada",
    content: `
            <h3>Transformação completa</h3>
            <p>A transformação física vem acompanhada de uma profunda mudança na forma como você se vê e se relaciona com seu próprio corpo.</p>
            
            <h3>Impacto psicológico</h3>
            <ul>
                <li>Aumento da confiança e segurança pessoal</li>
                <li>Melhora da autoimagem e satisfação corporal</li>
                <li>Sensação de conquista e capacidade</li>
                <li>Redução de sintomas de ansiedade e depressão</li>
                <li>Maior disposição para novos desafios</li>
                <li>Relacionamento mais saudável com o próprio corpo</li>
            </ul>
            
            <h3>Abordagem positiva</h3>
            <p>Trabalho com foco em conquistas e celebração de pequenas vitórias, não em críticas ou comparações. Meu objetivo é que você desenvolva uma relação positiva e saudável com seu corpo e com o exercício físico.</p>
        `,
  },
};

// Abrir modal de benefício
benefitBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const benefitCard = this.closest(".feature-card");
    const benefitType = benefitCard.getAttribute("data-benefit");

    if (benefitsContent[benefitType]) {
      benefitTitle.textContent = benefitsContent[benefitType].title;
      benefitDescription.innerHTML = benefitsContent[benefitType].content;

      document.body.style.overflow = "hidden";
      benefitModal.classList.add("show");
    }
  });
});

// Fechar modal de benefício
benefitCloseBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    document.body.style.overflow = "";
    benefitModal.classList.remove("show");
  });
});

// Fechar modal quando clicar fora do conteúdo
window.addEventListener("click", function (event) {
  if (event.target === benefitModal) {
    document.body.style.overflow = "";
    benefitModal.classList.remove("show");
  }
});

// Abrir o modal quando clicar no botão "Conheça Mais"
aboutBtn.addEventListener("click", function () {
  document.body.style.overflow = "hidden"; // Impede rolagem da página de fundo
  aboutModal.classList.add("show");
});

// Fechar o modal quando clicar no X
document
  .querySelector("#about-modal .modal-close")
  .addEventListener("click", function () {
    document.body.style.overflow = ""; // Restaura rolagem
    aboutModal.classList.remove("show");
  });

// Fechar o modal quando clicar fora do conteúdo
window.addEventListener("click", function (event) {
  if (event.target === aboutModal) {
    document.body.style.overflow = ""; // Restaura rolagem
    aboutModal.classList.remove("show");
  }
});

// Fechar o modal ao pressionar ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && aboutModal.classList.contains("show")) {
    document.body.style.overflow = ""; // Restaura rolagem
    aboutModal.classList.remove("show");
  }
});

// Funcionalidade específica para o link "Home"
const homeLink = document.getElementById("homeLink");
homeLink.addEventListener("click", function (e) {
  e.preventDefault();

  // Rolar suavemente para o topo da página
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Funcionalidade para o formulário de contato
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obter os valores do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${name}.\n\n${message}\n\nMeu e-mail para contato: ${email}`;

    // Abrir WhatsApp com a mensagem
    openWhatsApp(whatsappMessage);

    // Limpar formulário
    contactForm.reset();

    // Mostrar mensagem de sucesso
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent =
      "Mensagem enviada com sucesso! Em breve entraremos em contato.";

    // Adicionar mensagem após o botão
    contactForm.appendChild(successMessage);

    // Remover mensagem após 5 segundos
    setTimeout(() => {
      successMessage.classList.add("fade-out");
      setTimeout(() => {
        successMessage.remove();
      }, 500);
    }, 5000);
  });
}

// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});
