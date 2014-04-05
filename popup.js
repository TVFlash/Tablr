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
  var searched = document.getElementById('searched');
  var search = document.getElementById('search');

  var query;
  var fourmTabs = new Array();
  chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
          fourmTabs[i] = tabs[i].title.toLowerCase() + "$" + tabs[i].id;
      }
        var sort = {
          alphaSort: function(){
            fourmTabs.sort();

            var prev;
            for (var i = 0; i < tabs.length; i++){
              chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': i});

              if(prev == fourmTabs[i].split("$")[0])
                chrome.tabs.remove(parseFloat(fourmTabs[i].split("$")[1]));
              prev = fourmTabs[i].split("$")[0];
            }
          },

        searchSort: function(){
          query = search.value.toLowerCase(); 

          for (var i = 0; i < tabs.length; i++) {
            if (fourmTabs[i].indexOf(query)!= -1){
              chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': 0});
            }
          }

        }
      };
        alpha.addEventListener('click', sort.alphaSort, true); 
        searched.addEventListener('click', sort.searchSort, true);

  });

});