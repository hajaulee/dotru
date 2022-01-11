const replace = require('replace-in-file');

let newVersion = "";

function increaseVersionNumber(version) {
  console.log("Current version:", version);
  let [major, minor, patch, _] = version.slice(1).split(".")
  let buildDate  = new Date().toISOString().replace(/[-T:.]/g, '').slice(2, 10)
  console.log({major, minor, patch});
  patch = parseInt(patch) + 1;
  console.log("Increase patch to:", patch);

  newVersion = `v${major}.${minor}.${patch}.${buildDate}`;
  return newVersion;
}
const options = {
    files: 'src/environments/environment.prod.ts',
    from: /v\d.\d.\d.\d*/g,
    to: (match) => increaseVersionNumber(match),
    allowEmptyPaths: false,
};

try {
    let changedFiles = replace.sync(options);
    console.log('Build version set: ' + newVersion);
}
catch (error) {
    console.error('Error occurred:', error);
}
