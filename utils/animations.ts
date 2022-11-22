export const popIn = (
  tl: GSAPTimeline,
  targets: gsap.TweenTarget,
  from?: gsap.TweenVars,
  to?: gsap.TweenVars,
  position?: gsap.Position
) =>
  tl.fromTo(
    targets,
    { scale: 0, ease: "elastic", duration: 0.5, ...from },
    { scale: 1, ...to },
    position
  );
export const fadeIn = (
  tl: GSAPTimeline,
  targets: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  position?: gsap.Position
) =>
  tl.fromTo(
    targets,
    { y: "-=10%", autoAlpha: 0, ease: "power4.out", ...from },
    { y: 0, autoAlpha: 1, ...to },
    position
  );
