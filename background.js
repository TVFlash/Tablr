chrome.commands.onCommand.addListener(function(command) {

    if (command == 'toggle-sort'){
      var titleSearch;
      var clearTrue;

      chrome.storage.sync.get({
        titleTrue: true,
        clearTrue: true
      }, function(items) {
        titleSearch = items.titleTrue;
        clearTrue = items.clearTrue;
      });

    	var fourmTabs = new Array();
    	chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
    	   for (var i = 0; i < tabs.length; i++) {
    	     if(titleSearch)
            fourmTabs[i] = tabs[i].title.toLowerCase() + "$" + tabs[i].id;
          else{
              fourmTabs[i] = tabs[i].url.toLowerCase();
              fourmTabs[i] = fourmTabs[i].replace(/^https?:\/\//,'')
              fourmTabs[i] = fourmTabs[i].replace(/^www\./, '') + "$" + tabs[i].id;
              console.log(tabs[i].url.toLowerCase() + " -> " +fourmTabs[i]);
          }
    	   }

    	  fourmTabs.sort();

          var prev;
          for (var i = 0; i < tabs.length; i++){
            chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': i});

            if(clearTrue && prev == fourmTabs[i].split("$")[0])
              chrome.tabs.remove(parseFloat(fourmTabs[i].split("$")[1]));
            prev = fourmTabs[i].split("$")[0];
          }
      });

	}
});