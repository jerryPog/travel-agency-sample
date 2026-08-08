import { useEffect, useRef, useState } from 'react';
import { PrivateJetLoader } from './PrivateJetLoader';

interface VideoScrollProps {
  videoSrc?: string;
  posterSrc?: string;
}

export function CanvasScroll({
  videoSrc = '/plane-window.mp4',
  posterSrc = '/ezgif-896d010404818b75-jpg/ezgif-frame-001.jpg',
}: VideoScrollProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallbackPoster, setUseFallbackPoster] = useState(false);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isMetadataLoaded = false;

    const handleLoadedMetadata = () => {
      isMetadataLoaded = true;
      setLoadProgress(100);
      setIsLoaded(true);
      updateTargetTime();
    };

    const handleProgress = () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
        setLoadProgress(percent);
      }
    };

    const handleError = () => {
      // Mobile power saving mode or missing video source fallback
      setUseFallbackPoster(true);
      setLoadProgress(100);
      setIsLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('error', handleError);

    // Fallback timer: dismiss loader if metadata event takes > 1.5s
    const fallbackTimer = setTimeout(() => {
      if (!isMetadataLoaded) {
        setLoadProgress(100);
        setIsLoaded(true);
      }
    }, 1500);

    const renderLoop = () => {
      if (video && !isNaN(video.duration) && video.duration > 0) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.01) {
          currentTimeRef.current += diff * 0.25;
          // Clamp currentTime strictly within video duration
          const safeTime = Math.max(0, Math.min(video.duration - 0.01, currentTimeRef.current));
          video.currentTime = safeTime;
          animFrameIdRef.current = requestAnimationFrame(renderLoop);
        } else {
          currentTimeRef.current = targetTimeRef.current;
          const safeTime = Math.max(0, Math.min(video.duration - 0.01, currentTimeRef.current));
          video.currentTime = safeTime;
          animFrameIdRef.current = null;
        }
      } else {
        animFrameIdRef.current = null;
      }
    };

    const triggerLoop = () => {
      if (prefersReducedMotion) return;
      if (animFrameIdRef.current === null) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const updateTargetTime = () => {
      if (!video || isNaN(video.duration) || video.duration <= 0) return;
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
        targetTimeRef.current = 0;
      } else {
        const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        targetTimeRef.current = fraction * video.duration;
      }

      triggerLoop();
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', updateTargetTime, { passive: true });
      window.addEventListener('resize', updateTargetTime, { passive: true });
      updateTargetTime();
    }

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('error', handleError);
      window.removeEventListener('scroll', updateTargetTime);
      window.removeEventListener('resize', updateTargetTime);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <PrivateJetLoader progress={loadProgress} isLoaded={isLoaded} />

      {useFallbackPoster ? (
        <img
          src={posterSrc}
          alt="Private Jet Background"
          aria-hidden="true"
          className="fixed inset-0 w-full h-[100dvh] object-cover pointer-events-none z-0"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="fixed inset-0 w-full h-[100dvh] object-cover pointer-events-none z-0"
        />
      )}
    </>
  );
}
