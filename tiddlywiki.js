#!/usr/bin/env node

// Check to make sure that the index wiki exists
var fs = require('fs');
var path = require('path');
if (!fs.existsSync(path.join(process.cwd(), 'IndexWiki'))) {
  // Recursively copy files from the virtual file system in the packaged
  // executable into the real file system outside it.
  // NOTE: None of the fs copying functions work on the virtual file system.
  // That is why I made this function.
  function specialCopy (source, destination) {
    fs.mkdirSync(destination);
    var currentDir = fs.readdirSync(source)
    currentDir.forEach(function (item) {
      if (fs.statSync(path.join(source, item)).isFile()) {
        var fd = fs.readFileSync(path.join(source, item), {encoding: 'utf8'});
        fs.writeFileSync(path.join(destination, item), fd, {encoding: 'utf8'});
      } else {
        //Recurse!! Because it is a folder.
        // But make sure it is a directory first.
        if (fs.statSync(path.join(source, item)).isDirectory()) {
          specialCopy(path.join(source, item), path.join(destination, item));
        }
      }
    });
  }

  // If we don't have an index wiki already in this location, make one.
  var destination = path.join(process.cwd(), 'IndexWiki');
  var source = path.join(__dirname, 'editions/MultiUser')
  specialCopy(source, destination)
}

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

// Pass the command line arguments to the boot kernel
//$tw.boot.argv = Array.prototype.slice.call(process.argv,2);

$tw.boot.argv = ["./IndexWiki", "--wsserver"];

// Boot the TW5 app
$tw.boot.boot();

require("openurl").open("http://127.0.0.1:8080");
