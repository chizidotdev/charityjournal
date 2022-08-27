import gsap from 'gsap';

export const hideNav = () => {
  const toggleMenu = gsap.timeline({ paused: true });

  toggleMenu
    .to(
      '.nav-menu-toggle',
      {
        duration: 0.3,
        delay: 0.5,
        y: -100,
        transition: 'Power3.easeInOut',
      },
      'one'
    )
    .to(
      '.bottom-border',
      {
        opacity: 0,
      },
      'one'
    )
    .to('.bottom-border', {
      y: -80,
    });

  toggleMenu.play();
};

export const showNav = () => {
  const toggleMenu = gsap.timeline({ paused: true });

  toggleMenu
    .to('.nav-menu-toggle', {
      delay: 0.5,
      duration: 0.3,
      y: 0,
    })
    .to('.bottom-border', {
      delay: -0.5,
      y: 0,
    })
    .to('.bottom-border', {
      opacity: 1,
    });

  toggleMenu.play();
};
