const resume = require("./resume/resume.json");
const resumeGenerator = require("jsonresume-theme-paper-plus-plus");
const minify = require("html-minifier").minify;
const fs = require("fs");

const html = resumeGenerator.render(resume);
const minified = minify(html, {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
});

fs.writeFileSync("./index.html", minified);
