import { useEffect, useRef, useState } from 'react';
import { PrivateJetLoader } from './PrivateJetLoader';

const TOTAL_FRAMES = 300;
const FRAME_FOLDER = '/ezgif-896d010404818b75-jpg';

function getFrameUrl(index: number): string {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `${FRAME_FOLDER}/ezgif-frame-${paddedIndex}.jpg`;
}

export function CanvasScroll() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    updateCanvasSize();

    // Draw frame with exact cover ratio without off-screen over-decoding (no 1.25x crop scale)
    const drawCoverImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, alpha = 1) => {
      const canvas = canvasRef.current;
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth: number, renderHeight: number;

      if (canvasAspect > imgAspect) {
        renderWidth = canvasWidth;
        renderHeight = canvasWidth / imgAspect;
      } else {
        renderWidth = canvasHeight * imgAspect;
        renderHeight = canvasHeight;
      }

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
      ctx.restore();
    };

    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      const index1 = Math.floor(clampedFrame);
      const index2 = Math.min(TOTAL_FRAMES - 1, index1 + 1);
      const blend = clampedFrame - index1;

      const images = imagesRef.current;
      const img1 = images[index1];
      const img2 = images[index2];

      if (img1 && img1.complete && img1.naturalWidth > 0) {
        drawCoverImage(ctx, img1, 1);
      } else {
        for (let fallback = index1; fallback >= 0; fallback--) {
          if (images[fallback] && images[fallback].complete && images[fallback].naturalWidth > 0) {
            drawCoverImage(ctx, images[fallback], 1);
            break;
          }
        }
      }

      if (blend > 0.01 && index1 !== index2 && img2 && img2.complete && img2.naturalWidth > 0) {
        drawCoverImage(ctx, img2, blend);
      }
    };

    // Idling animation loop: runs only when diff > 0.001
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.18;
        renderFrame();
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame();
        animFrameIdRef.current = null; // IDLE loop when scrolling stops
      }
    };

    const triggerLoop = () => {
      if (prefersReducedMotion) return;
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    // Load single frame
    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / 30) * 100));
          if (index === 0) renderFrame();
          resolve(img);
        };
        img.onerror = () => {
          loadedCount++;
          resolve(img);
        };
        img.src = getFrameUrl(index);
        imgArray[index] = img;
      });
    };

    const preloadAll = async () => {
      const initialBatch = [];
      for (let i = 0; i < 30; i++) {
        initialBatch.push(loadSingleImage(i));
      }
      await Promise.all(initialBatch);
      setLoadProgress(100);
      setIsLoaded(true);

      // Background loading for remaining frames
      for (let i = 30; i < TOTAL_FRAMES; i++) {
        loadSingleImage(i);
      }
    };

    preloadAll();
    imagesRef.current = imgArray;

    const updateTargetFrame = () => {
      if (prefersReducedMotion) return;
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const maxScroll = docHeight - windowHeight;

      if (maxScroll <= 0) {
        targetFrameRef.current = 0;
      } else {
        const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        targetFrameRef.current = fraction * (TOTAL_FRAMES - 1);
      }

      triggerLoop();
    };

    const handleResize = () => {
      updateCanvasSize();
      if (!prefersReducedMotion) {
        updateTargetFrame();
      } else {
        renderFrame();
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', updateTargetFrame, { passive: true });
      triggerLoop();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <PrivateJetLoader progress={loadProgress} isLoaded={isLoaded} />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 object-cover"
      />
    </>
  );
}
