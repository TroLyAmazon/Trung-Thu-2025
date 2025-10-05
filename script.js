// Đèn lồng bay
function createLantern() {
  const lantern = document.createElement('div');
  lantern.classList.add('lantern');
  lantern.style.left = Math.random() * 100 + 'vw';
  lantern.style.animationDuration = (8 + Math.random() * 4) + 's';
  document.querySelector('.lantern-container').appendChild(lantern);
  setTimeout(() => lantern.remove(), 12000);
}
setInterval(createLantern, 1000);

// Hoa đào rơi
function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petals');
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (5 + Math.random() * 5) + 's';
  petal.style.opacity = Math.random();
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 300);

// Popup quà
function showGift() {
  document.getElementById('gift-popup').style.display = 'block';
}
function hideGift() {
  document.getElementById('gift-popup').style.display = 'none';
}

// Gửi lời nhắn bí mật qua Telegram
const TELEGRAM_TOKEN = '7644314791:AAGzIpsQL081N7R8ilvJo4-epjrIC8ckVU8';
const CHAT_ID = '6683820146';

function submitMessage() {
  const input = document.getElementById('secret-input');
  const message = input.value.trim();
  if (!message) return;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const params = {
    chat_id: CHAT_ID,
    text: `💌 Lời nhắn từ trang Trung Thu: ${message}`
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  .then(res => {
    if (res.ok) {
      alert('Tin nhắn đã được gửi đến Chú Cuội 🐇');
      input.value = '';
    } else {
      alert('Không gửi được tin nhắn!');
    }
  })
  .catch(err => alert('Lỗi khi gửi tin nhắn: ' + err));
}


// Nhạc nền phát sau tương tác
let musicStarted = false;
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  const audio = document.getElementById("bg-music");
  audio.volume = 0.5;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(e => console.log("Autoplay bị chặn:", e));
  }
}
window.addEventListener("click", startMusic);
window.addEventListener("scroll", startMusic);

// Sao băng kéo dài đẹp hơn
const canvas = document.getElementById("shooting-star");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawStar(x, y, alpha, length = 150) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - length, y + length * 0.5);
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function shootStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  let alpha = 1;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStar(x, y, alpha);
    alpha -= 0.02;
    if (alpha <= 0) clearInterval(interval);
  }, 30);
}
setInterval(shootStar, 10000);

// 🎆 Pháo hoa đơn giản + click để nổ pháo hoa
const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

function drawFirework(x, y, radius, color) {
  for (let i = 0; i < 30; i++) {
    const angle = (Math.PI * 2 * i) / 30;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    fwCtx.beginPath();
    fwCtx.arc(x + dx, y + dy, 2, 0, Math.PI * 2);
    fwCtx.fillStyle = color;
    fwCtx.fill();
  }
}

function launchFirework(x = Math.random() * fwCanvas.width, y = Math.random() * fwCanvas.height * 0.5) {
  const colors = ['#ffcc00', '#ff6699', '#66ccff', '#ffffff'];
  drawFirework(x, y, 80, colors[Math.floor(Math.random() * colors.length)]);
  setTimeout(() => fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height), 1000);
}
setInterval(launchFirework, 7000);
fwCanvas.addEventListener("click", e => {
  const rect = fwCanvas.getBoundingClientRect();
  launchFirework(e.clientX - rect.left, e.clientY - rect.top);
});

// Fade-in toàn trang khi vào
window.onload = () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 2s';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
};