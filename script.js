function neuralSideCanvas(id) {
const canvas = document.getElementById(id);
const ctx = canvas.getContext("2d");


function resize() {
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener("resize", resize);


const nodes = [];
for (let i = 0; i < 500; i++) {
nodes.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: (Math.random() - 0.5) * 0.4,
vy: (Math.random() - 0.5) * 0.4
});
}


function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
nodes.forEach(n => {
n.x += n.vx;
n.y += n.vy;


if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
});


for (let i = 0; i < nodes.length; i++) {
for (let j = i + 1; j < nodes.length; j++) {
const dx = nodes[i].x - nodes[j].x;
const dy = nodes[i].y - nodes[j].y;
const dist = Math.sqrt(dx*dx + dy*dy);


if (dist < 150) {
ctx.strokeStyle = "rgba(0, 234, 255, " + (1 - dist/80) + ")";
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(nodes[i].x, nodes[i].y);
ctx.lineTo(nodes[j].x, nodes[j].y);
ctx.stroke();
}
}
}


nodes.forEach(n => {
ctx.fillStyle = "#00eaff";
ctx.beginPath();
ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
ctx.fill();
});


requestAnimationFrame(animate);
}
animate();
}


neuralSideCanvas("neuralBG");

// Smooth Scroll
const arrow = document.getElementById("arrow-down");
arrow.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// Reveal on Scroll
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(section => {
  revealObserver.observe(section);
});

// About Section Particle Effect

function aboutParticles() {
    const canvas = document.getElementById("aboutParticles");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const TOTAL = 100;  // Increase or decrease for more/less particles

    for (let i = 0; i < TOTAL; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 3 + Math.random() * 2,   // slightly bigger particles
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            opacity: 0.4 + Math.random() * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // bounce within screen
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.fillStyle = `rgba(0, 200, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

aboutParticles();

// Skill Graph in skill Section
window.addEventListener('load', () => {
  const canvas = document.getElementById('skillsCanvas');
  const ctx = canvas.getContext('2d');
  const section = document.querySelector('.skills-section');
  const skillCards = document.querySelectorAll('.skill-card');
  const cardPositions = {};

  let animationFrameId = null; // store current animation frame

  function resizeCanvas() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    updatePositions();
  });

  function updatePositions() {
    skillCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const secRect = section.getBoundingClientRect();
      const name = card.querySelector('.card-front h3').innerText.toLowerCase().trim();
      cardPositions[name] = {
        x: rect.left + rect.width / 2 - secRect.left,
        y: rect.top + rect.height - secRect.top
      };
    });
  }
  updatePositions();
  window.addEventListener('scroll', updatePositions);

  function drawCurvedLine(start, end, color, offset) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    ctx.beginPath();
    const cpX = (start.x + end.x) / 2 + Math.sin(offset) * 40;
    const cpY = (start.y + end.y) / 2 + Math.cos(offset) * 20;
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(cpX, cpY, end.x, end.y);
    ctx.stroke();
  }

  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // cancel any previous animation
      if(animationFrameId) cancelAnimationFrame(animationFrameId);

      const targetName = card.querySelector('.card-front h3').innerText.toLowerCase().trim();
      const related = card.dataset.related?.split(',').map(r => r.trim().toLowerCase()) || [];

      // remove all glow first
      skillCards.forEach(c => c.classList.remove('related-glow'));
      skillCards.forEach(c => {
        const name = c.querySelector('.card-front h3').innerText.toLowerCase().trim();
        if (related.includes(name)) c.classList.add('related-glow');
      });

      let offset = 0;
      const colors = ['#00eaff', '#4c00ff', '#ff6a00', '#00ffb3', '#ff00ff'];

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        related.forEach((name, index) => {
          const pos = cardPositions[name];
          if (!pos) return;
          const start = cardPositions[targetName];
          drawCurvedLine(start, pos, colors[index % colors.length], offset + index);
        });
        offset += 0.05;
        animationFrameId = requestAnimationFrame(animate); // store frame ID
      }
      animate();
    });

    card.addEventListener('mouseleave', () => {
      // cancel the running animation
      if(animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = null; // reset
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
      skillCards.forEach(c => c.classList.remove('related-glow')); // remove glow
    });
  });
});
