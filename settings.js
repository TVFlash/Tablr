// Saves options to chrome.storage
function save_options() {
  var titleTrue = document.getElementById('titleTrue').checked;
  var clearTrue = document.getElementById('clearTrue').checked;
  chrome.storage.sync.set({
    titleTrue: titleTrue,
    clearTrue: clearTrue
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    titleTrue: true,
    clearTrue: true
  }, function(items) {
    document.getElementById('titleTrue').checked = items.titleTrue;
    document.getElementById('clearTrue').checked = items.clearTrue;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);