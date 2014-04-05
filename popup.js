// Copyright (c) 2014 All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */

var sort = {

  populate: function(){
  //TODO:Grab all active playlists
  },

  play: function(){
    alert("Play");
  },

  stop: function(){
    alert("Stop");
  },

  reverse: function(){
    alert("Reverse");
  },

  next: function(){
    alert("Next");
  },
};

document.addEventListener('DOMContentLoaded', function () {

  var alpha = document.getElementById('alpha');

  alpha.addEventListener('click', sort.play, true); 

  var fourmTabs = new Array();
  chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
    
    for (var i = 0; i < tabs.length; i++) {
          fourmTabs[i] = tabs[i].title.toLowerCase() + "$" + tabs[i].id;
      }

      fourmTabs.sort();

    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': i});
   }
    //alert("+"+fourmTabs[fourmTabs.length - 1 ]+"+");
  });

});