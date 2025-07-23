import gsap from "gsap";

export function animateLogo(ref) {
  gsap.fromTo(
    ref.current,
    { scale: 0.9, opacity: 0 },
    {
      scale: 1.2,
      opacity: 1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    }
  );
}
