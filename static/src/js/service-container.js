import $ from 'jquery';

const $serviceContainer = $('.service-container');
const $serviceBackground = $serviceContainer.find('.background');

let winHeight;

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

function moveBackground() {
  doTransform(calculateContainerPosition());
}

function calculateContainerPosition() {
  const diff = winHeight - getContainerRect().bottom;
  return diff > 0 ? diff * 0.3 : diff * 0.8;
}

function calculateAllData() {
  winHeight = $(window).height();
}

