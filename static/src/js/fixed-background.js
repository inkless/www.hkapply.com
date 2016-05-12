import $ from 'jquery';

const hwRatio = 1080 / 1920;
const $video = $('#home-video');
const video = $video.get(0);
resizeVideo();
$video.removeClass('hide');
video.play();

function resizeVideo() {
  const winHeight = $(window).height();
  const winWidth = $(window).width();
  if (winHeight / winWidth > hwRatio) {
    console.log('height', winHeight);
    video.setAttribute('height', winHeight);
    video.removeAttribute('width');
  } else {
    console.log('width', winWidth);
    video.setAttribute('width', winWidth);
    video.removeAttribute('height');
  }
}

$(window).on('resize', resizeVideo);
