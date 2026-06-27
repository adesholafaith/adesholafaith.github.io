// Cursor
const cursor = document.getElementById('cursor');
const darkSections = document.querySelectorAll('.hero, .scroll-band');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  let overDark = false;
  darkSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      overDark = true;
    }
  });
  cursor.classList.toggle('on-dark', overDark);
});

document.querySelectorAll('a,button,.proj-row,.skill-item,.t-card,.art-card,.c-link').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});



// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.sr').forEach(el => obs.observe(el));

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Project filter
document.querySelectorAll('.filt').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filt').forEach(b => b.classList.remove('on'));
    this.classList.add('on');
    const f = this.dataset.f;
    document.querySelectorAll('.proj-row').forEach(row => {
      const show = f === 'all' || (row.dataset.cat || '').includes(f);
      row.style.opacity = show ? '1' : '0.2';
      row.style.pointerEvents = show ? 'auto' : 'none';
      row.style.transition = 'opacity .25s';
    });
  });
});

// GitHub grid
(function() {
  const g = document.getElementById('sqGrid');
  if (!g) return;
  for (let i = 0; i < 312; i++) {
    const d = document.createElement('div');
    d.className = 'sq';
    const r = Math.random();
    if (r > 0.92) d.classList.add('l4');
    else if (r > 0.78) d.classList.add('l3');
    else if (r > 0.6) d.classList.add('l2');
    else if (r > 0.45) d.classList.add('l1');
    g.appendChild(d);
  }
})();

// Form
function submitForm(btn) {
  const orig = btn.textContent;
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Sent! I\'ll get back to you soon.';
    btn.style.background = '#007a32';
    btn.style.borderColor = '#007a32';
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; btn.style.borderColor = ''; }, 3500);
  }, 1400);
}

// Smooth links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});


document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contact-form");
  const button = document.getElementById("sendBtn");

  function setButton(state, text) {
    button.classList.remove("loading", "success", "error");
    button.classList.add(state);
    button.innerText = text;

    setTimeout(() => {
      button.classList.remove(state);
      button.innerText = "Send Message →";
      button.disabled = false;
    }, 2500);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.classList.add("loading");
    button.innerText = "Sending...";
    button.disabled = true;

    emailjs.sendForm(
      "service_xox84yg",
      "template_7y36qlp",
      form
    )
    .then(() => {
      form.reset();
      setButton("success", "Message Sent");
    })
    .catch((error) => {
      console.log(error);
      setButton("error", "Failed. Try Again");
    });

  });

});
