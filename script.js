window.onload = function () {
    const cursorBall = document.getElementById('cursorBall');
    const scrollArea = document.getElementById("scrollArea");
    const scrollRight = document.getElementById("scrollRight");
    const scrollLeft = document.getElementById("scrollLeft");
    const menuIcon = document.querySelector(".icon-menu");
    const nav = document.querySelector("nav");
    const slides1 = document.querySelectorAll('.slide1');
    const slides2 = document.querySelectorAll('.slide2');
    const slides3 = document.querySelectorAll('.slide3');
  
    let current1 = 0;

    function showSlide1(index) {
        slides1.forEach((slide1, i) => {
            slide1.classList.toggle('active', i === index);
        });
    }

    function nextSlide1() {
        current1 = (current1 + 1) % slides1.length;
        showSlide1(current1);
    }

    showSlide1(current1);
    setInterval(nextSlide1, 2000);
   

    let current2 = 0;

    function showSlide2(index) {
        slides2.forEach((slide2, i) => {
            slide2.classList.toggle('active', i === index);
        });
    }

    function nextSlide2() {
        current2 = (current2 + 2) % slides2.length;
        showSlide2(current2);
    }

    showSlide2(current2);
    setInterval(nextSlide2, 2000);
   

    let current3 = 0;

    function showSlide3(index) {
        slides3.forEach((slide3, i) => {
            slide3.classList.toggle('active', i === index);
        });
    }

    function nextSlide3() {
        current3 = (current3 + 3) % slides3.length;
        showSlide3(current3);
    }

    showSlide3(current3);
    setInterval(nextSlide3, 2000);


    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    window.addEventListener('scroll', () => {
        nav.classList.remove('open');
    });


    let mouseX = 0;
    let mouseY = 0;

    let cursorBallX = 0;
    let cursorBallY = 0;

    const speed = 0.25; // Controls how fast the cursorBall catches up (0.05 = slower trail)

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // Interpolate the cursorBall's position toward the mouse
      cursorBallX += (mouseX - cursorBallX) * speed;
      cursorBallY += (mouseY - cursorBallY) * speed;

      cursorBall.style.left = `${cursorBallX}px`;
      cursorBall.style.top = `${cursorBallY}px`;

      requestAnimationFrame(animate);
    }

    animate();

    //Scroll function for project scroll button
    scrollRight.addEventListener("click", function () {
        scrollArea.scrollBy({ left: 320, behavior: 'smooth'});
    });

    scrollLeft.addEventListener("click", function () {
        scrollArea.scrollBy({ left: -320, behavior: 'smooth'});
    });

    //EmailJS for form submission
    (function() {
        emailjs.init("rxrXGaa54jshSE5q1");
    })();

    document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_xox84yg", "template_7y36qlp", this)
        .then(() => {
        alert("Message sent successfully!");
        }, (error) => {
        alert("Failed to send message: " + JSON.stringify(error));
        });
    });
     
};