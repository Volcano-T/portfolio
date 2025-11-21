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

const arrow = document.getElementById("arrow-down");
arrow.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});
