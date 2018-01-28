'use strict';

var cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  COLOR: 'rgba(255, 255, 255, 1)',
  SHADOW: {
    GAP: 10,
    COLOR: 'rgba(0, 0, 0, 0.7)'
  }
};
var textTitle = {
  COLOR: 'rgba(0, 0, 0, 1)',
  FONT: '16px PT Mono',
  X: 120,
  Y: 40,
  GAP: 20
};
var histogram = {
  WIDTH: 40,
  SPACE: 50,
  COLOR_PLAYER: 'rgba(255, 0, 0, 1)'
};
var renderCloud = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.strokeRect(x, y, width, height);
  ctx.fillRect(x, y, width, height);
};
var drawTextTitle = function (ctx, color, font, string, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(string, x, y);
};
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.SHADOW.COLOR, cloud.X + cloud.SHADOW.GAP, cloud.Y + cloud.SHADOW.GAP, cloud.WIDTH, cloud.HEIGHT);
  renderCloud(ctx, cloud.COLOR, cloud.X, cloud.Y, cloud.WIDTH, cloud.HEIGHT);
  drawTextTitle(ctx, textTitle.COLOR, textTitle.FONT, 'Ура вы победили!', textTitle.X, textTitle.Y);
  drawTextTitle(ctx, textTitle.COLOR, textTitle.FONT, 'Список результатов:', textTitle.X, textTitle.Y + textTitle.GAP);
  var drawHistogram = function () {
    var selectionColor = function (name) {
      if (name === 'Вы') {
        ctx.fillStyle = histogram.COLOR_PLAYER;
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
      }
    };
    var drawBar = function (time, name) {
      ctx.fillRect(textTitle.X + (histogram.WIDTH + histogram.SPACE) * j, cloud.HEIGHT - cloud.Y - textTitle.GAP - time * barHeight, histogram.WIDTH, time * barHeight);
      ctx.fillStyle = textTitle.COLOR;
      ctx.fillText(name, textTitle.X + (histogram.WIDTH + histogram.SPACE) * j, (cloud.HEIGHT - cloud.Y));
    };
    var graphHeight = 150;
    var barHeight = graphHeight / (getMaxElement(times));
    for (var j = 0; j < times.length; j++) {
      selectionColor(names[j]);
      drawBar(times[j], names[j]);
    }
  };

  drawHistogram();
};
