// TODO move file reading stuff
var fs = require('fs');
var path = require('path');

var config = require('./config');
var fileUtils = require('./fileUtils');

function getKrumelur(req, res) {
  var amount = parseInt(req.params.amount);

  console.log("GET krumelurer", amount);

  // res.send(getRandomKrumelurer(amount));
  res.send([]);
}

function postKrumelur(req, res) {
  var file = req.files[0];

  console.log("POST Krumelur", file.originalname);

  fs.writeFile(path.resolve(config.FS_ROOT, 'krumelurer', fileUtils.getKrumelurFileName()), file.buffer, 'utf8');

  res.sendStatus(200);
}

// Sends JSON representation of all files in a miniscreen folder
function getMiniscreen(req, res) {
  var screenId = req.params.id;
  var screenDir = path.resolve(config.FS_ROOT, 'miniskärmar', screenId);
  console.log("getMiniscreen", screenId);

  fs.readdir(screenDir, function(err, files) {
    if (err) {
      console.log(err);
    } else {
      var mediaArr = files.map(function(file) {
        return fileUtils.parseFile(file);
      });

      res.json(mediaArr);
    }
  });
}

module.exports = {
  getKrumelur: getKrumelur,
  postKrumelur: postKrumelur,
  getMiniscreen: getMiniscreen
};
