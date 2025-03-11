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
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Создаем формдату для Google Forms
        // Замените "entry.XXXXXXX" на правильные идентификаторы полей из вашей Google формы
        const formData = new FormData();
        formData.append('entry.380780782', name);
        formData.append('entry.1712161483', email);
        formData.append('entry.1680705949', subject);
        formData.append('entry.967542549', message);
        
        // URL вашей Google формы
        const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeZXKtmROfa9baO9XlehVyCOmpeF_txadaRlTG4Kezwnmi_7g/viewform?usp=dialog';
        
        
        // Создаем iframe для отправки (чтобы обойти CORS)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Создаем форму внутри iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeForm = iframeDoc.createElement('form');
        iframeForm.action = googleFormUrl;
        iframeForm.method = 'POST';
        
        // Заполняем форму скрытыми полями
        for (const [key, value] of formData.entries()) {
            const input = iframeDoc.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            iframeForm.appendChild(input);
        }
        
        iframeDoc.body.appendChild(iframeForm);
        
        // Отправка и очистка
        iframeForm.submit();
        
        // Удаляем iframe после отправки
        setTimeout(() => {
            document.body.removeChild(iframe);
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            alert('Сообщение отправлено! Спасибо за обращение.');
            contactForm.reset();
        }, 1000);
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

