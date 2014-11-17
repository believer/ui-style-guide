'use strict';

var fs         = require('fs');
var path       = require('path');
var glob       = require('glob');
var mkdirp     = require('mkdirp');
var handlebars = require('handlebars');
var sass       = require('node-sass');
var util       = require('./util');

module.exports = {
  /**
   * Convert supplied JSON files
   * to LESS, SCSS and HTML
   * 
   * @param  {[type]} src     [description]
   * @param  {[type]} dest    [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  convert: function (src, dest, options) {
    if (!src) {
      throw new Error('No source has been supplied');
    }

    if (!dest) {
      throw new Error('No destination folder has been supplied');
    }

    var templatePath = path.resolve(__dirname,'templates/*.hbs');
    var templates = glob.sync(templatePath).map(function (name) {
      return path.basename(name, '.hbs');
    });

    var files = glob.sync(src);
    var themes = [];

    files.forEach(function (name) {
      if (path.extname(name) !== '.json') {
        return;
      }

      var file = fs.readFileSync(name.toString());
      file = JSON.parse(file.toString());

      // Add RGB color value to object
      if (file.type === 'color') {
        file.properties.forEach(function (color) {
          color.rgb = util.convertToRgb(color.hex);
        });
      }

      themes.push({
        "type": file.type,
        "properties": file.properties
      });
    });

    themes.forEach(function (theme) {
      templates.forEach(function (templateName) {
        var templateFile = path.resolve(__dirname, 'templates', templateName.toLowerCase() + '.hbs');
        var template = handlebars.compile(fs.readFileSync(templateFile).toString());
        var output = template(theme);

        mkdirp(dest);
        fs.writeFile(dest + theme.type + '.' + templateName , output, function (err) {
          if (err) {
            throw new Error('File was not saved');
          } else {
            // console.log('File saved!');
          }
        });
      });
    });

    this.renderSass(dest);
  },

  /**
   * Render the style guide CSS to
   * project out folder
   * 
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  renderSass: function (dest) {
    sass.render({
      file: path.resolve(__dirname, 'style', 'general.scss'),
      outputStyle: 'compressed',
      success: function (res) {
        mkdirp(dest + 'style/');
        fs.writeFile(dest + 'style/style.css' , res, function (err) {
          if (err) {
            console.log(err);
          }
        });
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
};