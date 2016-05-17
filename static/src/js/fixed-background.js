import $ from 'jquery';

if (!/iPad|iPhone|iPod/.test(navigator.platform)) {
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
      video.setAttribute('height', winHeight);
      video.removeAttribute('width');
    } else {
      video.setAttribute('width', winWidth);
      video.removeAttribute('height');
    }
  }

  $(window).on('resize', resizeVideo);
}
