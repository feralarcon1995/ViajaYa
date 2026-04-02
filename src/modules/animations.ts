import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function fadeInUp(selector: string, delay = 0): void {
  if (reduced) return;
  const targets = gsap.utils.toArray<HTMLElement>(selector);
  if (!targets.length) return;
  gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    delay,
    scrollTrigger: { trigger: targets[0], start: 'top 85%', once: true },
  });
}

export function staggerCards(selector: string): void {
  if (reduced) return;
  const targets = gsap.utils.toArray<HTMLElement>(selector);
  if (!targets.length) return;
  gsap.from(targets, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: { trigger: targets[0], start: 'top 80%', once: true },
  });
}

export function heroEntrance(headline: string, sub: string, ctas: string): void {
  if (reduced) return;
  const h = document.querySelector(headline);
  const s = document.querySelector(sub);
  const c = document.querySelector(ctas);
  if (!h) return;
  const tl = gsap.timeline();
  tl.from(h, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' });
  if (s) tl.from(s, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
  if (c) tl.from(c, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}
