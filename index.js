'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var mkdirp = require('mkdirp');
var handlebars = require('handlebars');

module.exports = {
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

    console.log(files);

    files.forEach(function (name) {
      if (path.extname(name) !== '.json') {
        return;
      }

      var file = fs.readFileSync(name.toString());
      file = JSON.parse(file.toString());

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
  }
};