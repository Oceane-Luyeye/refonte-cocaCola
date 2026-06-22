window.__resources = {};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  const can = document.getElementById('heroCan');
  const layerA = document.getElementById('layerA');
  const layerB = document.getElementById('layerB');
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');

  // --- 1. GESTION DU CURSEUR PERSONNALISÉ ---
  window.addEventListener('mousemove', (e) => {
    if (cursorDot) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    }
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }
  });

  // --- 2. LOGIQUE D'ANIMATION AU DEFILEMENT (SCROLL) ---
  window.addEventListener('scroll', () => {
    if (hero && can) {
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      
      const p = clamp(-rect.top / total, 0, 1);
      
      const rot = p * 400;
      const scale = 1 + p * 0.20;
      const drift = Math.sin(p * Math.PI) * -10;
      
      can.style.transform = `rotateY(${rot}deg) scale(${scale}) translateY(${drift}px)`;
      
      if (layerA) {
        const a = clamp(1 - (p - 0.10) / 0.20, 0, 1);
        layerA.style.opacity = a;
        layerA.style.transform = `scale(${1 + p * 0.15})`;
      }
      if (layerB) {
        const b = clamp((p - 0.45) / 0.22, 0, 1) * clamp(1 - (p - 0.85) / 0.12, 0, 1);
        layerB.style.opacity = b;
        layerB.style.transform = `translateY(${(1 - b) * 30}px)`;
      }
    }
  });

  // --- 3. INTERACTIVITE DES CARTES (HOVER EFFECTS) ---
  const cards = document.querySelectorAll('.flavor-card');
  
  cards.forEach(card => {
    const canImg = card.querySelector('.flavor-can');
    const splash = card.querySelector('.splash');
    const accentColor = card.getAttribute('data-accent') || '#E61A27';

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px)';
      card.style.boxShadow = `0 24px 48px rgba(0,0,0,0.12)`;
      card.style.borderColor = accentColor;
      
      if (canImg) {
        canImg.style.transform = 'translateY(-10px) rotate(6deg) scale(1.06)';
      }
      if (splash) {
        splash.style.opacity = '1';
        splash.style.transform = 'translate(-50%, -50%) scale(1.25)';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0px)';
      card.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 18px 50px';
      card.style.borderColor = 'rgb(240, 236, 235)';
      
      if (canImg) {
        canImg.style.transform = 'translateY(0px) rotate(0deg) scale(1)';
      }
      if (splash) {
        splash.style.opacity = '0';
        splash.style.transform = 'translate(-50%, -50%) scale(0.4)';
      }
    });
  });

  // --- 4. EFFET MAGNÉTIQUE ---
  const magnetics = document.querySelectorAll('.magnetic');
  magnetics.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const bound = elem.getBoundingClientRect();
      const x = e.clientX - bound.left - (bound.width / 2);
      const y = e.clientY - bound.top - (bound.height / 2);
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'translate(0px, 0px)';
    });
  });
});