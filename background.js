chrome.commands.onCommand.addListener(function(command) {

    if (command == 'toggle-sort'){

    	var fourmTabs = new Array();
    	chrome.tabs.query({'url': '<all_urls>'}, function (tabs) {
    	  for (var i = 0; i < tabs.length; i++) {
    	        fourmTabs[i] = tabs[i].title.toLowerCase() + "$" + tabs[i].id;
    	  }

    	  fourmTabs.sort();

          var prev;
          for (var i = 0; i < tabs.length; i++){
            chrome.tabs.move(parseFloat(fourmTabs[i].split("$")[1]), {'index': i});

            if(prev == fourmTabs[i].split("$")[0])
              chrome.tabs.remove(parseFloat(fourmTabs[i].split("$")[1]));
            prev = fourmTabs[i].split("$")[0];
          }
      });

	}
});