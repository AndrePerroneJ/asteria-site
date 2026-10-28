"use client";

import React, { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(active: boolean): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!active) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [active]);

  return mousePosition;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return reduced;
}

export interface ParticleColor {
  hex: string;
  weight: number;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  colors?: ParticleColor[];
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  let value = hex.replace("#", "");

  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(value, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

function pickRgb(colors: ParticleColor[] | undefined, fallback: number[]): number[] {
  if (!colors?.length) return fallback;
  const total = colors.reduce((sum, item) => sum + Math.max(0, item.weight), 0);
  if (total <= 0) return fallback;
  let roll = Math.random() * total;
  for (const item of colors) {
    roll -= Math.max(0, item.weight);
    if (roll <= 0) return hexToRgb(item.hex);
  }
  return hexToRgb(colors[colors.length - 1].hex);
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  rgb: number[];
};

const ALPHA_CAP = 0.6;

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  colors,
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<number | null>(null);
  const initCanvasRef = useRef<() => void>(() => {});
  const onMouseMoveRef = useRef<() => void>(() => {});
  const animateRef = useRef<() => void>(() => {});
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const mousePosition = useMousePosition(!reduced);
  const colorsKey = colors?.map((item) => `${item.hex}:${item.weight}`).join("|") ?? "";

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvasRef.current();
    if (document.visibilityState !== "hidden" && !reducedRef.current) {
      animateRef.current();
    }

    const handleResize = () => {
      if (resizeTimeout.current != null) window.clearTimeout(resizeTimeout.current);
      resizeTimeout.current = window.setTimeout(() => {
        initCanvasRef.current();
        if (document.visibilityState !== "hidden" && !reducedRef.current && rafID.current == null) {
          animateRef.current();
        }
      }, 200);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (rafID.current != null) window.cancelAnimationFrame(rafID.current);
        rafID.current = null;
        return;
      }
      if (!reducedRef.current && rafID.current == null) animateRef.current();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafID.current != null) window.cancelAnimationFrame(rafID.current);
      rafID.current = null;
      if (resizeTimeout.current != null) window.clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [color, colorsKey, quantity, size, refresh, reduced]);

  useEffect(() => {
    if (reduced) {
      mouse.current.x = 0;
      mouse.current.y = 0;
      return;
    }
    onMouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y, reduced]);

  const initCanvas = () => {
    resizeCanvas();
  };

  const onMouseMove = () => {
    if (reducedRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
    if (inside) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  };

  const resizeCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawParticles();
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.floor(Math.random() * 2) + size;
    const targetAlpha = Math.min(ALPHA_CAP, parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)));
    const still = reducedRef.current;
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: pSize,
      alpha: still ? targetAlpha : 0,
      targetAlpha,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
      rgb: pickRgb(colors, hexToRgb(color)),
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: circleSize, alpha, rgb } = circle;
    const paintAlpha = Math.min(ALPHA_CAP, alpha);
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, circleSize, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${paintAlpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) circles.current.push(circle);
  };

  const clearContext = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  };

  const drawParticles = () => {
    clearContext();
    circles.current = [];
    for (let i = 0; i < quantity; i += 1) {
      drawCircle(circleParams());
    }
  };

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (document.visibilityState === "hidden") {
      rafID.current = null;
      return;
    }

    clearContext();
    const still = reducedRef.current;
    for (let i = circles.current.length - 1; i >= 0; i -= 1) {
      const circle = circles.current[i];
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha || circle.alpha > ALPHA_CAP) {
          circle.alpha = Math.min(circle.targetAlpha, ALPHA_CAP);
        }
      } else {
        circle.alpha = Math.min(ALPHA_CAP, circle.targetAlpha * remapClosestEdge);
      }

      if (!still) {
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      }

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        drawCircle(circleParams());
      }
    }

    if (still) {
      rafID.current = null;
      return;
    }

    rafID.current = window.requestAnimationFrame(animateRef.current);
  };

  initCanvasRef.current = initCanvas;
  onMouseMoveRef.current = onMouseMove;
  animateRef.current = animate;

  return (
    <div
      {...props}
      ref={canvasContainerRef}
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
