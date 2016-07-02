import $ from 'jquery';

if (!/iPad|iPhone|iPod/.test(navigator.platform)) {
  const $video = $('#home-video');
  const video = $video.get(0);
  resizeVideo(video);
  $video.removeClass('hide');
  video.play();

  $(window).on('resize', () => {
    resizeVideo(video);
  });
}

function resizeVideo(video) {
  const hwRatio = 1080 / 1920;
  const winHeight = $(window).height();
  const winWidth = $(window).width();
  if (winHeight / winWidth > hwRatio) {
    video.setAttribute('height', winHeight);
    video.removeAttribute('width');
  } else {
    video.setAttribute('width', winWidth);
    video.removeAttribute('height');
  }
}

