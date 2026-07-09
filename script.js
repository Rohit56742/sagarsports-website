// ===== Category Data + Rendering =====
const SPORT_CATEGORIES = [
  {name:'Cricket', tag:'Bat & Ball', desc:'Bats, balls, pads, gloves & protective gear for every format.', img:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop', seed:'cricket'},
  {name:'Football', tag:'Soccer', desc:'Match balls, boots, jerseys & training gear for the beautiful game.', img:'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop', seed:'football'},
  {name:'Badminton', tag:'Racquet Sport', desc:'Rackets, shuttlecocks & footwear for smashes that count.', img:'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop', seed:'badminton'},
  {name:'Basketball', tag:'Court Game', desc:'Basketballs, hoops & performance sneakers for the court.', img:'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop', seed:'basketball'},
  {name:'Volleyball', tag:'Team Sport', desc:'Volleyballs, nets & knee pads built for the spike.', img:'https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop', seed:'volleyball'},
  {name:'Tennis', tag:'Racquet Sport', desc:'Rackets, strings & tennis balls for every skill level.', img:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop', seed:'tennis'},
  {name:'Hockey', tag:'Field & Ice', desc:'Sticks, pucks & pads for field and ice hockey players.', img:'https://images.unsplash.com/photo-1641232532919-74d3514f04af?q=80&w=800&auto=format&fit=crop', seed:'hockey'},
  {name:'Gym Equipment', tag:'Strength', desc:'Dumbbells, plates, benches & racks for serious training.', img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', seed:'gym-equipment'},
  {name:'Fitness Accessories', tag:'Training', desc:'Resistance bands, mats, gloves & everyday fitness essentials.', img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop', seed:'fitness-accessories'},
  {name:'Indoor Games', tag:'Recreation', desc:'Carrom, chess, table tennis & more for indoor fun.', img:'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=800&auto=format&fit=crop', seed:'indoor-games'},
  {name:'Outdoor Games', tag:'Recreation', desc:'Gear for athletics, running & every outdoor activity.', img:'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop', seed:'outdoor-games'},
  {name:'Swimming', tag:'Aquatics', desc:'Goggles, caps & swimwear for the pool and beyond.', img:'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop', seed:'swimming'}
];
const catGrid = document.getElementById('catGrid');
catGrid.innerHTML = SPORT_CATEGORIES.map(c => `
  <a href="#contact" class="cat-card reveal" aria-label="Explore ${c.name}">
    <div class="cat-img-wrap">
      <img src="${c.img}" alt="${c.name} equipment at Sagar Sports" loading="lazy" decoding="async"
           onerror="this.onerror=null;this.src='https://picsum.photos/seed/${c.seed}/700/900'">
    </div>
    <div class="cat-overlay">
      <span class="cat-tag">${c.tag}</span>
      <h4>${c.name}</h4>
      <p class="cat-desc">${c.desc}</p>
      <span class="cat-explore">Explore <i class="fa-solid fa-arrow-right"></i></span>
    </div>
  </a>
`).join('');
// reveal-on-scroll for these dynamically injected cards
const catRevealIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); catRevealIO.unobserve(e.target); }
  });
},{threshold:0.15});
document.querySelectorAll('#catGrid .reveal').forEach(el => catRevealIO.observe(el));

// Loader
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('hide'),450);
});

// Header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
burger.addEventListener('click',()=>{
  burger.classList.toggle('open');
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  burger.classList.remove('open'); mainNav.classList.remove('open');
}));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(sec=>{
    if(window.scrollY >= sec.offsetTop - 160) current = sec.getAttribute('id');
  });
  navLinks.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Counters
const counters = document.querySelectorAll('.num');
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/60));
      const tick = ()=>{
        cur += step;
        if(cur >= target){ el.textContent = target + suffix; }
        else { el.textContent = cur + suffix; requestAnimationFrame(tick); }
      };
      tick();
      counterIO.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>counterIO.observe(c));

// Testimonial slider
const slidesWrap = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
const totalSlides = slidesWrap.children.length;
let curSlide = 0;
for(let i=0;i<totalSlides;i++){
  const d = document.createElement('div');
  d.className = 'dot'+(i===0?' active':'');
  d.addEventListener('click',()=>goToSlide(i));
  dotsWrap.appendChild(d);
}
function goToSlide(i){
  curSlide = i;
  slidesWrap.style.transform = `translateX(-${i*100}%)`;
  [...dotsWrap.children].forEach((d,idx)=>d.classList.toggle('active', idx===i));
}
setInterval(()=>{ goToSlide((curSlide+1)%totalSlides); }, 4500);

// Ripple effect
document.querySelectorAll('[data-ripple]').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(), 650);
  });
});

// Contact form (demo submit)
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
form.addEventListener('submit', ()=>{
  sendBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';
  sendBtn.style.background = '#1f9d55';
  setTimeout(()=>{
    form.reset();
    sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    sendBtn.style.background = '';
  }, 2400);
});

document.getElementById('year').textContent = new Date().getFullYear();