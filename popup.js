// Copyright (c) 2014 All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var QUERY = 'dogs';

var playlist = {

  populate: function(){
  //TODO:Grab all active playlists
  },

  play: function(){
    //player.playVideo();
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

var kittenGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=20',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {

  /**var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '50',
        width: '50',
        videoId: 'BLZAlp0if3M',
    });
  }**/

  //  kittenGenerator.requestKittens();
  playlist.populate();
  var play = document.getElementById('play');
  var stop = document.getElementById('stop');
  var reverse = document.getElementById('reverse');
  var next = document.getElementById('next');

  play.addEventListener('click', playlist.play, true); 
  stop.addEventListener('click', playlist.stop, true); 
  reverse.addEventListener('click', playlist.reverse, true); 
  next.addEventListener('click', playlist.next, true); 

  var fourmTabs = new Array();
  chrome.tabs.query({'url': '*://www.youtube.com/*'}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
          fourmTabs[i] = tabs[i];
      }

      // Moved code inside the callback handler
      for (var i = 0; i < fourmTabs.length; i++) {
          if (fourmTabs[i] != null)
             alert(fourmTabs[i].url);
          else {
              window.console.log("??" + i);
          }
      }
  });

});
