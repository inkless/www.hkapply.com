import $ from 'jquery';

const $logoContainer = $('.logo-container.small-section');
const $serviceContainer = $('.service-container.small-section');
const $serviceBackground = $serviceContainer.find('.background');

const logoContainerHeight = $logoContainer.height();
const serviceContainerHeight = $serviceContainer.height();
const winHeight = $(window).height();
const initialY = winHeight - logoContainerHeight - serviceContainerHeight;

function getContainerRect() {
  return $serviceContainer.get(0).getBoundingClientRect();
}

function doTransform(y) {
  $serviceBackground.css('transform', `translate3d(0px, ${y}px, 0px)`);
}

function moveBackground(event) {
  doTransform(calculateContainerPosition());
}

function calculateContainerPosition() {
  const diff = winHeight - getContainerRect().bottom;
  return diff > 0 ? diff * .2 : diff;
}

doTransform(calculateContainerPosition());
$(document).on('scroll', moveBackground);

