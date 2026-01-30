import type { UpdaterFunction } from "./types";

const WAVE_INTENSITY = 50; // ← Tweak this value to dial in the movement

const wave: UpdaterFunction = (
  char,
  charIndex,
  slideProgress,
  isActive,
  charCount,
) => {
  const charProgress = charIndex / charCount;
  const wave = Math.sin((slideProgress * 2 - charProgress) * Math.PI);

  // Fade out the wave effect as we approach slideProgress = 1
  const waveIntensity = 1 - slideProgress;
  const yOffset = isActive
    ? wave * WAVE_INTENSITY * waveIntensity
    : (0.5 - slideProgress) * 25;
  const blur = isActive ? (1 - slideProgress) * 4 : (1 - slideProgress) * 8;

  const opacity = isActive ? 0.5 + slideProgress * 0.5 : slideProgress;
  char.style.transform = `translateY(${yOffset}px)`;
  char.style.opacity = opacity.toString();
  char.style.filter = `blur(${blur}px)`;
};

const blur: UpdaterFunction = (char, _, slideProgress, isActive, __) => {
  const blur = isActive ? (1 - slideProgress) * 10 : (1 - slideProgress) * 20;
  const scale = isActive ? 0.8 + slideProgress * 0.2 : slideProgress;
  const opacity = isActive ? slideProgress : slideProgress * 0.8;
  char.style.transform = `scale(${scale})`;
  char.style.filter = `blur(${blur}px)`;
  char.style.opacity = opacity.toString();
};

const scatter: UpdaterFunction = (
  char,
  charIndex,
  localProgress,
  isActive,
  _,
) => {
  const seed = charIndex * 137.5;
  const randomX = Math.sin(seed) * 100;
  const randomY = Math.cos(seed) * 50;
  const randomRotate = Math.sin(seed * 2) * 45;
  const invProgress = 1 - localProgress;
  const x = isActive ? randomX * invProgress : randomX * invProgress;
  const y = isActive ? randomY * invProgress : randomY * invProgress + 30;
  const rotate = isActive
    ? randomRotate * invProgress
    : randomRotate * invProgress;
  const opacity = localProgress;
  char.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  char.style.opacity = opacity.toString();
  char.style.filter = "none";
};

const flip: UpdaterFunction = (char, charIndex, localProgress, isActive, _) => {
  const delay = charIndex * 0.03;
  const adjustedProgress = Math.max(
    0,
    Math.min(1, (localProgress - delay) / (1 - delay)),
  );
  const rotateX = isActive
    ? (1 - adjustedProgress) * -90
    : (1 - adjustedProgress) * 90;
  const opacity = adjustedProgress;
  char.style.transform = `perspective(500px) rotateX(${rotateX}deg)`;
  char.style.opacity = opacity.toString();
  char.style.filter = "none";
};

export { wave, blur, scatter, flip };
