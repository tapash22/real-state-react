import gsap from "gsap";

export interface AnimateCardsOptions {
  container: HTMLElement;
  cardSelector?: string;
}

export interface AnimateEmptyStateOptions {
  container: HTMLElement;
  floatingIconSelector?: string;
}

/**
 * Smoothly animates property grid items during initial render and filtering updates.
 * Prevents screen flashing by killing ongoing tweens and clearing transform props on complete.
 */
export const animatePropertyGrid = ({
  container,
  cardSelector = ".property-card-item",
}: AnimateCardsOptions): gsap.Context => {
  return gsap.context(() => {
    const cards = container.querySelectorAll(cardSelector);

    if (cards.length > 0) {
      // Kill active tweens to prevent stutter when tabs are clicked rapidly
      gsap.killTweensOf(cards);

      // Smooth fade and subtle slide up with a 2-second stagger delay per card
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: {
            each: .3, // 1 second delay between each card
          },
          // Clear transform and opacity inline styles on complete for hover effects
          clearProps: "transform,opacity",
        }
      );
    }
  }, container);
};

/**
 * Animates the empty state card and sets up the floating icon loop.
 */
export const animateEmptyState = ({
  container,
  floatingIconSelector = ".floating-icon",
}: AnimateEmptyStateOptions): gsap.Context => {
  return gsap.context(() => {
    // Entrance animation
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );

    // Continuous floating bobbing animation
    const floatingIcon = container.querySelector(floatingIconSelector);
    if (floatingIcon) {
      gsap.to(floatingIcon, {
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, container);
};