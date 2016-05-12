import $ from 'jquery';

const $logoContainer = $('.logo-container');
const $serviceContainer = $('.service-container');
const $serviceBackground = $serviceContainer.find('.background');

let logoContainerHeight;
let serviceContainerHeight;
let winHeight;
let initialY;

calculateAllData();
doTransform(calculateContainerPosition());

$(document).on('scroll', moveBackground);
$(window).on('resize', calculateAllData);

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
  return diff > 0 ? diff * 0.3 : diff * 0.8;
}

function calculateAllData() {
  logoContainerHeight = $logoContainer.height();
  serviceContainerHeight = $serviceContainer.height();
  winHeight = $(window).height();
  initialY = winHeight - logoContainerHeight - serviceContainerHeight;
}

