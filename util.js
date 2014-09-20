
module.exports = {

  /* Convert HEX to RGB */
  convertToRgb: function (hex) {
    if (hex.length < 6) {
      hex = hex + hex.substr(1);
    }

    var colorGroups = hex.match(/([a-f\d]{2})/ig);

    var r = parseInt(colorGroups[0], 16);
    var g = parseInt(colorGroups[1], 16);
    var b = parseInt(colorGroups[2], 16);

    return r + ' ' + g + ' ' + b;
  }

};