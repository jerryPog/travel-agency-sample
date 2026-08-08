import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PrivateJetLoader } from './PrivateJetLoader';

const TOTAL_FRAMES = 300;
const FRAME_FOLDER = '/ezgif-896d010404818b75-jpg';
const EIFFEL_TOWER_MOBILE_BG = '/eiffel-clouds-bg.jpg';
const REFERENCE_SCROLL_HEIGHT = 2800;

function getFrameUrl(index: number): string {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `${FRAME_FOLDER}/ezgif-frame-${paddedIndex}.jpg`;
}

export function CanvasScroll() {
  const location = useLocation();
  const isSubpage = location.pathname !== '/';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    if (mobile || isSubpage) {
      // On Mobile or any Subpage: Render Eiffel Tower background image (instant 100% loaded)
      setLoadProgress(100);
      setIsLoaded(true);
      return;
    }

    // On Desktop Home Page: 300-frame Canvas scroll sequence
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    updateCanvasSize();

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

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.12;
        renderFrame();
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        renderFrame();
        animFrameIdRef.current = null;
      }
    };

    const triggerLoop = () => {
      if (prefersReducedMotion) return;
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

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
            // Ignore decode failures
          }
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / 30) * 100));
          if (index === 0) renderFrame();
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

      for (let i = 30; i < TOTAL_FRAMES; i++) {
        loadSingleImage(i);
      }
    };

    imagesRef.current = imgArray;
    preloadAll();

    const updateTargetFrame = () => {
      if (prefersReducedMotion) return;
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      const fraction = Math.max(0, Math.min(1, scrollTop / REFERENCE_SCROLL_HEIGHT));
      targetFrameRef.current = fraction * (TOTAL_FRAMES - 1);

      triggerLoop();
    };

    const handleResize = () => {
      const mobileNow = checkMobile();
      if (!mobileNow && !isSubpage) {
        updateCanvasSize();
        if (!prefersReducedMotion) {
          updateTargetFrame();
        } else {
          renderFrame();
        }
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', updateTargetFrame, { passive: true });
      triggerLoop();
    }

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTargetFrame);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      currentFrameRef.current = 0;
      targetFrameRef.current = 0;
    };
  }, [isSubpage]);

  return (
    <>
      <PrivateJetLoader progress={loadProgress} isLoaded={isLoaded} />

      {isMobile || isSubpage ? (
        <img
          src={EIFFEL_TOWER_MOBILE_BG}
          alt="Eiffel Tower Paris"
          aria-hidden="true"
          className="fixed inset-0 w-full h-[100dvh] object-cover pointer-events-none z-0 brightness-90"
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-0 object-cover"
        />
      )}
    </>
  );
}
