const TOTAL_FRAMES = 300;
const FRAME_FOLDER = '/ezgif-896d010404818b75-jpg';

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');

const images = [];
let loadedCount = 0;
let targetFrame = 0;
let currentFrame = 0;

function getFrameUrl(index) {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `${FRAME_FOLDER}/ezgif-frame-${paddedIndex}.jpg`;
}

function preloadImages() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    images.push(img);

    img.onload = () => {
      loadedCount++;
      if (loaderProgress) {
        loaderProgress.style.width = `${(loadedCount / TOTAL_FRAMES) * 100}%`;
      }
      if (loadedCount >= TOTAL_FRAMES) {
        if (loader) loader.classList.add('hidden');
      }
    };

    img.onerror = () => {
      loadedCount++;
      if (loadedCount >= TOTAL_FRAMES) {
        if (loader) loader.classList.add('hidden');
      }
    };

    img.src = getFrameUrl(i);
  }
}

function drawCoverImage(img, alpha = 1) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const imgAspect = imgWidth / imgHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let renderWidth, renderHeight, offsetX, offsetY;

  if (canvasAspect > imgAspect) {
    renderWidth = canvasWidth;
    renderHeight = canvasWidth / imgAspect;
    offsetX = 0;
    offsetY = (canvasHeight - renderHeight) / 2;
  } else {
    renderWidth = canvasHeight * imgAspect;
    renderHeight = canvasHeight;
    offsetX = (canvasWidth - renderWidth) / 2;
    offsetY = 0;
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  ctx.restore();
}

function renderFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrame));
  const index1 = Math.floor(clampedFrame);
  const index2 = Math.min(TOTAL_FRAMES - 1, index1 + 1);
  const blend = clampedFrame - index1;

  const img1 = images[index1];
  const img2 = images[index2];

  if (img1 && img1.complete && img1.naturalWidth > 0) {
    drawCoverImage(img1, 1);
  } else {
    // Fallback: search backwards for closest loaded frame
    for (let fallback = index1; fallback >= 0; fallback--) {
      if (images[fallback] && images[fallback].complete && images[fallback].naturalWidth > 0) {
        drawCoverImage(images[fallback], 1);
        break;
      }
    }
  }

  if (blend > 0.01 && index1 !== index2 && img2 && img2.complete && img2.naturalWidth > 0) {
    drawCoverImage(img2, blend);
  }
}

function renderLoop() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.001) {
    currentFrame += diff * 0.1;
  } else {
    currentFrame = targetFrame;
  }

  renderFrame();
  requestAnimationFrame(renderLoop);
}

function updateTargetFrame() {
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const maxScroll = docHeight - windowHeight;

  if (maxScroll <= 0) {
    targetFrame = 0;
  } else {
    const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    targetFrame = fraction * (TOTAL_FRAMES - 1);
  }
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  updateTargetFrame();
  renderFrame();
}

window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('resize', resizeCanvas);

// Kick off canvas setup and animation loop immediately
resizeCanvas();
preloadImages();
requestAnimationFrame(renderLoop);
