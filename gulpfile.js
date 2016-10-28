var gulp = require('gulp');
var resume = require('./resume/resume.json');
var resumeGenerator = require('jsonresume-theme-paper-plus-plus');
var fs = require('fs');

gulp.task('default', function() {
  var html = resumeGenerator.render(resume);
  fs.writeFileSync('./index.html', html);
});
