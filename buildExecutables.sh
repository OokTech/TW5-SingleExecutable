#!/bin/bash

pkg . --targets latest-win --output tiddlyWin.exe
pkg . --targets latest-macos --output tiddlyOSX.command
pkg . --targets latest-linux --output tiddlyLinux
