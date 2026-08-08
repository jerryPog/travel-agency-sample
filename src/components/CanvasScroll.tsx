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
  const lastDrawnFrameRef = useRef(-1);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dynamic Mobile Resolution Scaling: 1:1 viewport pixels on mobile screens
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    updateCanvasSize();

    // Fast direct cover image drawing
    const drawCoverImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
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

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const renderFrameIndex = (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true,
      }) as CanvasRenderingContext2D | null;

      if (!ctx) return;

      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex));
      const images = imagesRef.current;
      const img = images[clampedIndex];

      if (img && img.complete && img.naturalWidth > 0) {
        drawCoverImage(ctx, img);
        lastDrawnFrameRef.current = clampedIndex;
      } else {
        // Fallback to nearest loaded frame
        for (let fallback = clampedIndex; fallback >= 0; fallback--) {
          if (images[fallback] && images[fallback].complete && images[fallback].naturalWidth > 0) {
            drawCoverImage(ctx, images[fallback]);
            lastDrawnFrameRef.current = fallback;
            break;
          }
        }
      }
    };

    const renderDesktopBlend = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true,
      }) as CanvasRenderingContext2D | null;

      if (!ctx) return;

      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      const index1 = Math.floor(clampedFrame);
      const index2 = Math.min(TOTAL_FRAMES - 1, index1 + 1);
      const blend = clampedFrame - index1;

      const images = imagesRef.current;
      const img1 = images[index1];
      const img2 = images[index2];

      if (img1 && img1.complete && img1.naturalWidth > 0) {
        drawCoverImage(ctx, img1);
      }
      if (blend > 0.01 && index1 !== index2 && img2 && img2.complete && img2.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = blend;
        drawCoverImage(ctx, img2);
        ctx.restore();
      }
    };

    // Desktop Smooth Lerp Loop
    const renderLoopDesktop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.22;
        renderDesktopBlend();
        animFrameIdRef.current = requestAnimationFrame(renderLoopDesktop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        renderDesktopBlend();
        animFrameIdRef.current = null;
      }
    };

    const triggerLoopDesktop = () => {
      if (prefersReducedMotion) return;
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoopDesktop);
      }
    };

    // Load single frame with async decoding strategy
    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';

        const handleSuccess = async () => {
          try {
            if ('decode' in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode failure
          }
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / 30) * 100));
          if (index === 0) renderFrameIndex(0);
          resolve(img);
        };

        img.onload = handleSuccess;
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

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Direct Raw Mobile Sync: Render matching frame instantly without lerping dampening delay
        currentFrameRef.current = targetFrameRef.current;
        const targetIndex = Math.round(currentFrameRef.current);
        if (targetIndex !== lastDrawnFrameRef.current) {
          if (animFrameIdRef.current === null) {
            animFrameIdRef.current = requestAnimationFrame(() => {
              renderFrameIndex(targetIndex);
              animFrameIdRef.current = null;
            });
          }
        }
      } else {
        triggerLoopDesktop();
      }
    };

    const handleResize = () => {
      updateCanvasSize();
      if (!prefersReducedMotion) {
        updateTargetFrame();
      } else {
        renderFrameIndex(0);
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', updateTargetFrame, { passive: true });
      updateTargetFrame();
    }

    window.addEventListener('resize', handleResize, { passive: true });

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
        className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-0 object-cover"
      />
    </>
  );
}
