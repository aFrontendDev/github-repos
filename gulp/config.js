'use strict';

var paths = {
	styles: {
		src: '_styles/',
		dist: 'src/styles/'
	}
};


var inputFiles = {

  styles: {
    main: paths.styles.src + 'styles.scss',
 		itcss: [
      paths.styles.src + '_00-settings/**/*.scss',
      paths.styles.src + '_01-tools/**/*.scss',
      paths.styles.src + '_02-generic/**/*.scss',
      paths.styles.src + '_03-elements/**/*.scss',
      paths.styles.src + '_04-objects/**/*.scss',
      paths.styles.src + '_05-components/**/*.scss',
      paths.styles.src + '_99-additional/**/*.scss'
    ]
  }
};

var outputFiles = {
  styles: {
    main: 'styles.css',
  }
};

var styleOptions = {
  autoprefixer: {
    browsers: [
      'last 3 versions',
      'ie 9',
      'iOS 7'
    ]
  },
  pxtorem: {
    replace: true,
    selector_black_list: [],
    prop_white_list: []
  }
};


module.exports = {
  paths: paths,
  inputFiles: inputFiles,
  outputFiles: outputFiles,
  styleOptions: styleOptions
};
