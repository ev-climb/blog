const menu = document.querySelector('.menu-section');
const menuMobileBtn = document.querySelector('.menu-mobile-btn');
const menuMobile = document.querySelector('.menu-mobile');
const menuItems = document.querySelectorAll('.menu-mobile-items .menu-item');
const menuMobileBtnClose = document.querySelector('.menu-mobile-btn-close');
const subMenu = document.querySelector('.sub-menu');
const overlay = document.querySelector('.overlay');

let prevScrollpos = window.pageYOffset;
let isMenuSliding = false;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (currentScrollPos > 200) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky', 'slide-up');
  }

  if (!isMenuSliding && currentScrollPos > 400 && currentScrollPos > prevScrollpos) {
    menu.classList.add('slide-up');
    isMenuSliding = true;
  } else if (isMenuSliding && currentScrollPos < prevScrollpos) {
    menu.classList.remove('slide-up');
    isMenuSliding = false;
  }

  prevScrollpos = currentScrollPos;
};

menuMobileBtn.addEventListener('click', () => {
  menuMobile.style.transform = 'translateX(320px)';
  overlay.style.visibility = 'visible';
});

menuMobileBtnClose.addEventListener('click', () => {
  menuMobile.style.transform = 'translateX(-320px)';
  overlay.style.visibility = 'hidden';
});

overlay.addEventListener('click', () => {
  menuMobile.style.transform = 'translateX(-320px)';
  overlay.style.visibility = 'hidden';
});

//
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const currentSubMenu = item.querySelector('.sub-menu');

    if (currentSubMenu.style.visibility === 'visible') {
      currentSubMenu.style.visibility = 'hidden';
      currentSubMenu.style.opacity = '0';
    } else {
      document.querySelectorAll('.sub-menu').forEach((subMenu) => {
        subMenu.style.visibility = 'hidden';
        currentSubMenu.style.opacity = '0';
      });
      currentSubMenu.style.visibility = 'visible';
      currentSubMenu.style.opacity = '1';
    }
  });
});
