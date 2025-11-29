const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".card-nav a");

let currentIndex = 0;
let isScrolling = false;


(function () {

    const roles = [
        "Frontend Developer",
        "Web Designer",
        "Student - 3rd Semester"
    ];

    const el = document.getElementById("roleText");
    let idx = 0, pos = 0, deleting = false;

    function typeEffect() {
        const full = roles[idx];

        if (!deleting) {
            pos++;
            el.textContent = full.slice(0, pos);

            if (pos === full.length) {
                deleting = true;
                setTimeout(typeEffect, 900);
                return;
            }

        } else {
            pos--;
            el.textContent = full.slice(0, pos);

            if (pos === 0) {
                deleting = false;
                idx = (idx + 1) % roles.length;
                setTimeout(typeEffect, 250);
                return;
            }
        }

        setTimeout(typeEffect, deleting ? 60 : 110);
    }

    window.addEventListener("load", () => {
        setTimeout(typeEffect, 1400); 
    });

})();





const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    if (entry.isIntersecting) {

      entry.target.querySelector(".card").classList.add("in-view");

      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });
}, { threshold: 0.55 });

sections.forEach(s => io.observe(s));

function goToCard(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  sections[index].scrollIntoView({ behavior: "smooth", block: "center" });
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentIndex < sections.length - 1) currentIndex++;
  else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;

  goToCard(currentIndex);
  setTimeout(() => isScrolling = false, 750);
}, { passive: true });

let startY = 0;
window.addEventListener("touchstart", e => startY = e.touches[0].clientY, { passive:true });
window.addEventListener("touchend", e => {
  if (isScrolling) return;
  const diff = startY - e.changedTouches[0].clientY;
  if (Math.abs(diff) < 60) return;
  isScrolling = true;
  if (diff > 0 && currentIndex < sections.length -1) currentIndex++;
  else if (diff < 0 && currentIndex > 0) currentIndex--;
  goToCard(currentIndex);
  setTimeout(() => isScrolling = false, 750);
}, { passive:true });

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const idx = [...sections].findIndex(s => "#" + s.id === href);
    if (idx >= 0) {
      goToCard(idx);
    }
  });
});


window.addEventListener("load", () => {

  const nav = document.querySelector(".nav-anim");
  if (nav) nav.style.animationPlayState = "running";

  document.querySelectorAll(".home-left-anim").forEach(el => {
    el.style.animationPlayState = "running";
  });


  const right = document.querySelector(".home-right-anim");
  if (right) right.style.animationPlayState = "running";

  setTimeout(() => {
    const pf = document.querySelector(".photo-frame");
    if (pf) pf.classList.add("glow");
  }, 1100);


  setTimeout(() => sections[0].scrollIntoView({ behavior:"smooth", block:"center" }), 60);
});


const serviceBoxes = document.querySelectorAll(".service-box");

const servicesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, { threshold: 0.35 });

serviceBoxes.forEach(box => servicesObserver.observe(box));

const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      skillBars.forEach(bar => {
        const target = bar.getAttribute("data-width");
        bar.style.width = target;
      });

    }
  });
}, { threshold: 0.4 });

skillObserver.observe(document.querySelector("#skills"));



const projObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll(".fade-proj")
      .forEach(el => el.style.opacity = "1");
    }
  });
},{ threshold: 0.4 });

projObserver.observe(document.querySelector("#projects"));



const contactObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll(".fade-contact")
      .forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  });
},{ threshold: 0.4 });

contactObserver.observe(document.querySelector("#contact"));



const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.src = "img/sun.png"; 
}


toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeIcon.src = "img/sun.png"; 
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.src = "img/moon.svg"; 
        localStorage.setItem("theme", "light");
    }
});
