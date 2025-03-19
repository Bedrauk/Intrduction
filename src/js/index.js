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
          
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalBtnText = submitBtn.textContent;
          submitBtn.textContent = 'Отправка...';
          submitBtn.disabled = true;
          
          const formData = new FormData(this);
          
          fetch(this.action, {
              method: 'POST',
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          })
          .then(response => response.json())
          .then(data => {
              alert('Сообщение отправлено! Спасибо за обращение.');
              contactForm.reset();
          })
          .catch(error => {
              console.error('Ошибка:', error);
              alert('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.');
          })
          .finally(() => {
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
          });
      });
  }
  
  
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

