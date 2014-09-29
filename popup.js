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
  var text =  document.querySelector('#search');
  var hot = document.getElementById('hot');
  var titleSearch;
  var clearTrue;

  chrome.storage.sync.get({
    titleTrue: true,
    clearTrue: true
  }, function(items) {
    titleSearch = items.titleTrue;
    clearTrue = items.clearTrue;
  });

  var query;
  var fourmTabs = new Array();
  chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
          if(titleSearch)
            fourmTabs[i] = tabs[i].title.toLowerCase() + "$" + tabs[i].id;
          else{
              fourmTabs[i] = tabs[i].url.toLowerCase();
              fourmTabs[i] = fourmTabs[i].replace(/^https?:\/\//,'')
              fourmTabs[i] = fourmTabs[i].replace(/^www\./, '') + "$" + tabs[i].id;
          }
      }
        var sort = {
          alphaSort: function(){
            fourmTabs.sort();

            var prev;
            for (var i = 0; i < tabs.length; i++){
              chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': i});

              if(clearTrue && prev == fourmTabs[i].split("$")[0])
                chrome.tabs.remove(parseFloat(fourmTabs[i].split("$")[1]));
              prev = fourmTabs[i].split("$")[0];
            }
          },

        searchSort: function(){
          query = search.value.toLowerCase(); 

          for (var i = 0; i < tabs.length; i++) {
            if (fourmTabs[i].indexOf(query)!= -1){
              chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': 0});
              chrome.tabs.update(parseFloat(fourmTabs[i].split("$")[1]), {'active': true });
            }
          }

        },

        hotSort: function(){
          var win=window.open('settings.html', '_blank');
          win.focus();
        }
      };
        alpha.addEventListener('click', sort.alphaSort, true); 
        searched.addEventListener('click', sort.searchSort, true);
        hot.addEventListener('click', sort.hotSort, true);
        text.addEventListener('keypress', function(e){
          var key = e.which || e.keyCode;

          if(key == 13)
            sort.searchSort();
        });

  });

});
