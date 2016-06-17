const vfs = require('vinyl-fs');
const map = require('map-stream');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const opts = {
  plugins: [
    imageminMozjpeg({
      quality: 90,
    }),
    imageminPngquant({
      quality: '65-80',
    }),
  ],
};

vfs.src(['static/src/images/**', '!static/src/images/hd/**'])
  .pipe(map(function(file, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    imagemin.buffer(file.contents, opts)
      .then(data => {
        file.contents = data;
        cb(null, file);
      })
      .catch(err => {
        cb(err);
      });
  }))
  .pipe(vfs.dest('static/dist/images'));
