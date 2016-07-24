//================================================
/*

Proper Menubar
Add the black menubar below the address bar. To get easy and fast access to all your Google products.
Copyright (C) 2016 Stefan vd
www.stefanvd.net

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

chrome.runtime.onMessage.addListener(function request(request,sender,sendMessage){
if (request.name == "navOFF") {
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/navremove.js"});
            }
        }
    );
}
else if (request.name == "navON") {
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/navadd.js"});
            }
        }
    );
}
});

// update when refresh on the tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if ((tab.url.match(/^http/i))) {
			chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {action: "addremove"});
			});
		}
});

// update when click on the tab
chrome.tabs.onHighlighted.addListener(function(){
    	chrome.windows.getCurrent(function (w) {
        	chrome.tabs.getSelected(w.id,
        	function (response) {
            	tabId = response.id;
            	chrome.tabs.sendMessage(tabId, {action: "addremove"});
        	});
		});
});

// contextMenus
function onClickHandler(info, tab) {
if (info.menuItemId == "totlguideemenu") {window.open(linkguide, "_blank");}
else if (info.menuItemId == "totldevelopmenu") {window.open(donatewebsite, "_blank");}
else if (info.menuItemId == "totlratemenu") {window.open(writereview, "_blank");}
else if (info.menuItemId == "totlsharemenu") {window.open(propermenubarwebsite, "_blank");}
else if (info.menuItemId == "totlshareemail") {window.open("mailto:youremail?subject=Proper Menubar extension&body=Hé, This is amazing. I just tried today this Proper Menubar Browser extension"+propermenubarproduct+"", "_blank");}
else if (info.menuItemId == "totlsharetwitter") {var spropermenubarproductcodeurl = encodeURIComponent("The Best and Amazing Proper Menubar Browser extension "+propermenubarproduct+"");window.open("https://twitter.com/home?status="+spropermenubarproductcodeurl+"", "_blank");}
else if (info.menuItemId == "totlsharefacebook") {window.open("https://www.facebook.com/sharer/sharer.php?u="+propermenubarproduct, "_blank");}
else if (info.menuItemId == "totlsharegoogleplus") {window.open("https://plus.google.com/share?url="+propermenubarproduct, "_blank");}
}

chrome.runtime.onInstalled.addListener(function() {
// check to remove all contextmenus
chrome.contextMenus.removeAll(function() {
//console.log("contextMenus.removeAll callback");
});

// pageaction
var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenupostongoogleplus = chrome.i18n.getMessage("sharemenupostongoogleplus");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");

var contexts = ["page_action", "browser_action"];
chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts":contexts});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts":contexts});
var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenupostongoogleplus, "id": "totlsharegoogleplus", "parentId": parent});
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function refreshtoolbar() {
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { action: "toolbarrefresh" });
        }
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
      if(changes['backgroundcolor']){ refreshtoolbar() }
      if(changes['backgroundhex']){ refreshtoolbar() }
      if(changes['backgroundimage']){ refreshtoolbar() }
      if(changes['backgroundimagesource']){ refreshtoolbar() }
      if(changes['opacity']){ refreshtoolbar() }
      if(changes['googleplus']){ refreshtoolbar() }
      if(changes['fontcolor']){ refreshtoolbar() }
      if(changes['search']){ refreshtoolbar() }
      if(changes['existingtab']){ refreshtoolbar() }
      if(changes['googlesites']){ refreshtoolbar() }
      if(changes['propermenuonly']){ refreshtoolbar() }
	  if(changes['dropshadow']){ refreshtoolbar() }
	  if(changes['link1a']){ refreshtoolbar() }
	  if(changes['link2a']){ refreshtoolbar() }
	  if(changes['link3a']){ refreshtoolbar() }
	  if(changes['link4a']){ refreshtoolbar() }
	  if(changes['link5a']){ refreshtoolbar() }
	  if(changes['link6a']){ refreshtoolbar() }
	  if(changes['link7a']){ refreshtoolbar() }
	  if(changes['link8a']){ refreshtoolbar() }
	  if(changes['link9a']){ refreshtoolbar() }
	  if(changes['link10a']){ refreshtoolbar() }
	  if(changes['link11a']){ refreshtoolbar() }
	  if(changes['link12a']){ refreshtoolbar() }
	  if(changes['link13a']){ refreshtoolbar() }
	  if(changes['link14a']){ refreshtoolbar() }
	  if(changes['link15a']){ refreshtoolbar() }
	  if(changes['link16a']){ refreshtoolbar() }
	  if(changes['link17a']){ refreshtoolbar() }
	  if(changes['link18a']){ refreshtoolbar() }
	  if(changes['link19a']){ refreshtoolbar() }
	  if(changes['link20a']){ refreshtoolbar() }
	  if(changes['link21a']){ refreshtoolbar() }
	  if(changes['link22a']){ refreshtoolbar() }
	  if(changes['link23a']){ refreshtoolbar() }
	  if(changes['link24a']){ refreshtoolbar() }
	  if(changes['link25a']){ refreshtoolbar() }
	  if(changes['link26a']){ refreshtoolbar() }
      if(changes['link27a']){ refreshtoolbar() }
      if(changes['link28a']){ refreshtoolbar() }
      if(changes['display']){ refreshtoolbar() }
    }
})

chrome.commands.onCommand.addListener(function(command) {
    if(command == "toggle-feature-propermenubar"){
        var addbar = null;
        chrome.storage.sync.get(['addbar'], function(items){
        if(items['addbar']){addbar = items['addbar'];}if(addbar == null)addbar = false;
            chrome.tabs.getSelected(null, function(tab) {
            if(addbar == true){
            chrome.storage.sync.set({ "addbar": false});
            chrome.tabs.sendMessage(tab.id, {action: "addremove"});
            }else{
            chrome.storage.sync.set({ "addbar": true});
            chrome.tabs.sendMessage(tab.id, {action: "addremove"});
            }
            });
        });
    }
});

try{ chrome.runtime.setUninstallUrl(linkuninstall); }
catch(e){}

// Fired when an update is available
chrome.runtime.onUpdateAvailable.addListener(function() {chrome.runtime.reload();});

chrome.storage.sync.get(['firstRun'], function(chromeset){
if ((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
  chrome.tabs.create({url: linkwelcomepage, selected:true})
  chrome.storage.sync.set({"firstRun": "false"});
  chrome.storage.sync.set({"version": "2.0"});
}
});