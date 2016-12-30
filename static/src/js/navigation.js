import 'styles/navigation';
import $ from 'jquery';

const $menuIcon = $('.title-bar .menu-icon');
const $navMenu = $('#nav-menu');
const $menuList = $navMenu.find('ul.menu');

let isMenuOpen = false;
$menuIcon.on('click', () => {
  if (isMenuOpen) {
    $navMenu.removeClass('active');
    isMenuOpen = false;
  } else {
    $navMenu.addClass('active');
    isMenuOpen = true;
  }
});

$menuList.on('click', 'a', () => {
  $navMenu.removeClass('active');
});
