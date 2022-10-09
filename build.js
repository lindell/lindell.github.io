const resume = require("./resume/resume.json");
const resumeGenerator = require("jsonresume-theme-paper-plus-plus");
const minify = require("html-minifier").minify;
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const buildDir = "build";

const html = resumeGenerator.render(resume);
const minified = minify(html, {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
});

fse.removeSync(buildDir);
fs.mkdirSync(buildDir);

fs.writeFileSync(path.join(buildDir, "index.html"), minified);
fse.copySync("images", path.join(buildDir, "images"));
fse.copyFileSync("CNAME", path.join(buildDir, "CNAME"));
