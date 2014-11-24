//var cv = require('opencv');
var sketchMap = {

  config: {
    tick: 0
  },

  setup: function() {
    this.size(this.config.video.width, this.config.video.height);
  },

  draw: function() {
    var self = this;

    this.config.tick++;

    if (this.config.tick > 20) {
      this.background(0,0);
      this.noStroke()
      this.fill(255, 255, 255, 50);

      this.config.tick = 0;
      this.config.opencv.readImage(this.config.video.getCurrentFrameData(), function (err, im) {
        if (err) throw err;
        if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

        im.detectObject("./app/car_cascade.xml", {}, function (err, things) {
        //im.detectObject("./node_modules/opencv/data/haarcascade_frontalface_alt.xml", {}, function (err, things) {
          if (err) throw err;
          for (var i = 0; i < things.length; i++) {
            var thing = things[i];
            self.ellipse(
              ((thing.x + thing.width/2) * self.config.video.scaleX) + self.config.video.letterBoxLeft,
              ((thing.y + thing.height/2) * self.config.video.scaleY) + self.config.video.letterBoxTop,
              thing.width * self.config.video.scaleX,
              thing.height * self.config.video.scaleY
            );
          }
        });
      });
    }
  }
}

module.exports = sketchMap;
