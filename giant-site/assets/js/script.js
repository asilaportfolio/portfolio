const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible")
  })
}, { threshold: 0.3 })

document.querySelectorAll(".animate-in").forEach(el => observer.observe(el))


// const navToggle = document.querySelector(".nav-toggle")
// const navList = document.querySelector(".nav-list")

// navToggle?.addEventListener("click", () => {
//   navList.classList.toggle("open")
//   navToggle.setAttribute("aria-expanded", navList.classList.contains("open"))
// })

const sections = [...document.querySelectorAll("section[id]")]
const navLinks = [...document.querySelectorAll(".nav-list a[href^='#'], .side-nav a[href^='#']")]

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + 120
  let currentSection = sections.find(s => s.offsetTop <= scrollPos)

  navLinks.forEach(link => {
    link.classList.toggle("active", currentSection && link.hash === "#" + currentSection.id)
  })
}, { passive: true })


const form = document.getElementById("contactForm")
const status = document.getElementById("formStatus")

form?.addEventListener("submit", e => {
  e.preventDefault()

  const { name, email, message } = form

  if (![name, email, message].every(field => field.value.trim())) {
    status.textContent = "Iltimos, barcha maydonlarni to'ldiring."
    status.style.color = "red"
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    status.textContent = "Email noto'g'ri formatda."
    status.style.color = "red"
    return
  }

  status.textContent = "Yuborilmoqda..."
  status.style.color = "var(--accent)"

  setTimeout(() => {
    status.textContent = "Xabar yuborildi! Tez orada bog'lanamiz."
    status.style.color = "green"
    form.reset()
  }, 1200)
})

function animateCounters() {
  const counters = document.querySelectorAll(".stat")

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-countto")

    if (target === 1) {
      counter.textContent = "1"
      return
    }

    let count = 0
    const speed = Math.max(1, Math.floor(target / 100)) 

    const interval = setInterval(() => {
      count += speed
      if (count >= target) {
        count = target
        clearInterval(interval)
      }
      counter.textContent = count
    }, 100) 
  })
}

window.addEventListener("load", animateCounters)
window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY + document.querySelector('.site-header').offsetHeight + 1;
  let currentSection = null;

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollPos >= sections[i].offsetTop) {
      currentSection = sections[i];
      break;
    }
  }

  navLinks.forEach(link => {
    link.classList.toggle("active", currentSection && link.hash === "#" + currentSection.id);
  });
}, { passive: true });

const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");

    navToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", siteNav.classList.contains("open"));
    });

    // Navbar link bosilganda yopiladi
    document.querySelectorAll(".nav-list a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
      });
    });