const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const bestEl = document.getElementById('best');
const restartButton = document.getElementById('restartButton');

const keys = {};
const starField = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  speed: Math.random() * 1.5 + 0.5,
}));

const player = {
  x: canvas.width / 2,
  y: canvas.height - 44,
  width: 34,
  height: 32,
  speed: 7,
  cooldown: 0,
};

let shots = [];
let enemies = [];
let particles = [];
let score = 0;
let lives = 5;
let best = Number(localStorage.getItem('starDefenderBest')) || 0;
let lastTime = 0;
let spawnTimer = 0;
let gameRunning = true;

function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  bestEl.textContent = best;
}

function resetGame() {
  shots = [];
  enemies = [];
  particles = [];
  score = 0;
  lives = 5;
  spawnTimer = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height - 44;
  player.cooldown = 0;
  gameRunning = true;
  updateHud();
}

function shoot() {
  if (!gameRunning || player.cooldown > 0) return;

  shots.push({
    x: player.x,
    y: player.y - player.height / 2,
    radius: 5,
    speed: 10,
  });

  player.cooldown = 0.22;
}

function spawnEnemy() {
  const size = 18 + Math.random() * 18;
  enemies.push({
    x: Math.random() * (canvas.width - size * 2) + size,
    y: -size,
    size,
    speed: 1.2 + Math.random() * 2.1,
    drift: (Math.random() - 0.5) * 1.7,
    phase: Math.random() * Math.PI * 2,
  });
}

function createBurst(x, y, color) {
  for (let i = 0; i < 12; i += 1) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 2 + Math.random() * 3,
      color,
      life: 30 + Math.random() * 25,
    });
  }
}

function handleInput() {
  if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
  if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

  player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));
}

function update(dt) {
  if (!gameRunning) return;

  handleInput();
  player.cooldown = Math.max(0, player.cooldown - dt);

  starField.forEach((star) => {
    star.y += star.speed * dt * 60;
    if (star.y > canvas.height) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }
  });

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnEnemy();
    spawnTimer = Math.max(0.35, 1.2 - score * 0.01);
  }

  for (let i = shots.length - 1; i >= 0; i -= 1) {
    shots[i].y -= shots[i].speed;
    if (shots[i].y < -10) shots.splice(i, 1);
  }

  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    enemy.y += enemy.speed * dt * 60;
    enemy.x += Math.sin((enemy.y + enemy.phase) * 0.05) * enemy.drift * dt * 60;

    if (enemy.y > canvas.height + enemy.size) {
      enemies.splice(i, 1);
      lives -= 1;
      createBurst(enemy.x, canvas.height - 20, '#ff7676');
      if (lives <= 0) {
        gameRunning = false;
        best = Math.max(best, score);
        localStorage.setItem('starDefenderBest', String(best));
        updateHud();
      }
      continue;
    }

    for (let j = shots.length - 1; j >= 0; j -= 1) {
      const shot = shots[j];
      const dx = shot.x - enemy.x;
      const dy = shot.y - enemy.y;
      const distance = Math.hypot(dx, dy);

      if (distance < shot.radius + enemy.size) {
        shots.splice(j, 1);
        enemies.splice(i, 1);
        score += 10;
        createBurst(enemy.x, enemy.y, '#69f0ae');
        if (score > best) {
          best = score;
          localStorage.setItem('starDefenderBest', String(best));
        }
        updateHud();
        break;
      }
    }
  }

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawShip(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#6fe7ff';
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(12, 18);
  ctx.lineTo(0, 10);
  ctx.lineTo(-12, 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(-3, 18, 6, 8);
  ctx.restore();
}

function drawEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.fillStyle = '#ff5d8f';
  ctx.beginPath();
  ctx.arc(0, 0, enemy.size, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0d1320';
  ctx.fillRect(-6, -3, 12, 6);
  ctx.restore();
}

function drawShot(shot) {
  ctx.fillStyle = '#ffe66d';
  ctx.beginPath();
  ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 40);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawBackground() {
  ctx.fillStyle = '#040912';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  starField.forEach((star) => {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 42px Arial';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 12);
  ctx.font = '20px Arial';
  ctx.fillText(`Final score: ${score}`, canvas.width / 2, canvas.height / 2 + 28);
  ctx.fillText('Press restart or space to play again', canvas.width / 2, canvas.height / 2 + 62);
}

function draw() {
  drawBackground();

  if (gameRunning) {
    drawShip(player.x, player.y);
    shots.forEach(drawShot);
    enemies.forEach(drawEnemy);
    drawParticles();
  } else {
    drawGameOver();
  }
}

function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000 || 0.016, 0.03);
  lastTime = timestamp;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keys[key] = true;

  if (event.code === 'Space') {
    event.preventDefault();
    if (!gameRunning) {
      resetGame();
    }
    shoot();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  keys[key] = false;
});

canvas.addEventListener('pointerdown', () => {
  if (!gameRunning) {
    resetGame();
  }
  shoot();
});

restartButton.addEventListener('click', () => {
  resetGame();
});

updateHud();
requestAnimationFrame(gameLoop);
