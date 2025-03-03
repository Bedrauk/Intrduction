// Инициализация скриптов после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Анимация навигационного меню на мобильных устройствах
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  
  burger.addEventListener('click', function() {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('burger-active');
  });
  
  // Анимация полосок навыков при скролле
  const skillLevels = document.querySelectorAll('.skill-level');
  
  function animateSkills() {
      skillLevels.forEach(skill => {
          const level = skill.getAttribute('data-level');
          skill.style.width = level + '%';
      });
  }
  
  // Плавное прокручивание до разделов при клике на навигационные ссылки
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Закрываем меню на мобильных устройствах после клика
          nav.classList.remove('nav-active');
          burger.classList.remove('burger-active');
          
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetSection.offsetTop,
              behavior: 'smooth'
          });
      });
  });
  
  // Фильтрация портфолио
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Активный класс для кнопок
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          portfolioItems.forEach(item => {
              if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                  item.style.display = 'block';
                  setTimeout(() => {
                      item.style.opacity = '1';
                      item.style.transform = 'scale(1)';
                  }, 10);
              } else {
                  item.style.opacity = '0';
                  item.style.transform = 'scale(0.8)';
                  setTimeout(() => {
                      item.style.display = 'none';
                  }, 300);
              }
          });
      });
  });
  
  // Обработка формы обратной связи
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Получение данных формы
          const formData = {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              subject: document.getElementById('subject').value,
              message: document.getElementById('message').value
          };
          
          // Симуляция отправки формы
          // В реальном проекте здесь был бы AJAX запрос на сервер
          console.log('Отправка формы:', formData);
          
          // Показать уведомление пользователю
          alert('Сообщение отправлено! Спасибо за обращение.');
          
          // Сбросить форму
          contactForm.reset();
      });
  }
  
  // Эффект паралакса для фоновых шестеренок
  window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const gear1 = document.querySelector('.gear1');
      const gear2 = document.querySelector('.gear2');
      const gear3 = document.querySelector('.gear3');
      
      if (gear1 && gear2 && gear3) {
          gear1.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
          gear2.style.transform = `rotate(-${scrollPosition * 0.08}deg)`;
          gear3.style.transform = `rotate(${scrollPosition * 0.12}deg)`;
      }
  });
  
  // Анимация при скролле
  const animateOnScroll = function() {
      const sections = document.querySelectorAll('.section');
      
      sections.forEach(section => {
          const sectionTop = section.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (sectionTop < windowHeight * 0.75) {
              section.classList.add('animate');
              
              // Если это секция навыков, запускаем анимацию
              if (section.id === 'skills') {
                  animateSkills();
              }
          }
      });
  };
  
  // Запуск анимации при скролле
  window.addEventListener('scroll', animateOnScroll);
  
  // Запуск анимации при первой загрузке
  animateOnScroll();
  
  // Интерактивный эффект для портфолио
  const portfolioImages = document.querySelectorAll('.portfolio-image');
  
  portfolioImages.forEach(image => {
      image.addEventListener('mousemove', function(e) {
          const bounds = this.getBoundingClientRect();
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;
          
          const xPercent = mouseX / bounds.width - 0.5;
          const yPercent = mouseY / bounds.height - 0.5;
          
          const overlay = this.querySelector('.portfolio-overlay');
          overlay.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
      });
      
      image.addEventListener('mouseleave', function() {
          const overlay = this.querySelector('.portfolio-overlay');
          overlay.style.transform = 'translate(0, 0)';
      });
  });
});