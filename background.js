let color ='red';

//if we want to do some background operations//
//after installing our extension we can add an listener//
//storage is an api in browser, color is the object passed here//

chrome.runtime.onInstalled.addListener(() => {

    //if we want to pass any data or configuration, then it can be done through storage api's
    chrome.storage.sync.set({color});
});

function getBgcolors (tab) {
    alert('The browser action was clicked!');
}

//