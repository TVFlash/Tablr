// Copyright (c) 2014 All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Hello, World!
 *
 * @author Timothy Vincent
 * @author Seung Song
 */  
document.addEventListener('DOMContentLoaded', function () {

  var alpha = document.getElementById('alpha');
  var searched = document.getElementById('searched');
  //var text = document.getElementById('text');
  var hot = document.getElementById('hot');

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

        },

        hotSort: function(){
        var views = new Array();

        for(var i = 0; i < tabs.length; i++)
          chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': Math.round(Math.random() * tabs.length)});

        }
      };
        alpha.addEventListener('click', sort.alphaSort, true); 
        searched.addEventListener('click', sort.searchSort, true);
        //text.addEventListener(sort.searchSort, true);
        hot.addEventListener('click', sort.hotSort, true);

  });

});