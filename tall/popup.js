


var tmallurl = 'http://localhost:8070/#/';
var tabData = {
    windowId: 0,
    index: 0,
    id: 0
};
var init = function () {
    console.info("init");
    chrome.tabs.query({}, function (tabArr) {
        for (i in tabArr) {
            if (tabArr[i].url === tmallurl) {
                tabData.id = tabArr[i].id;
                tabData.windowId = tabArr[i].windowId;
                tabData.index = tabArr[i].index;
                console.count("tabData count");
                if (tabArr[i].active) {
                    hideTmallbtn();
                } else {
                    showTmallbtn();
                }
                return;
            }
        }
        showTmallbtn();
    });
};
var opentmall = function () {
    console.info("opentmall");
    if (tabData.id <= 0) {
        chrome.tabs.create({
            url: tmallurl
        });
    } else {
        chrome.tabs.highlight({
            windowId: tabData.windowId,
            tabs: [tabData.index]
        });
    }
}
var openwrap = function (ele) {
    if (tabData.id > 0) {
        var data = {
            code: ele.target.id,
            name : ele.target.text
        }
        chrome.tabs.sendMessage(tabData.id, data, function (response) {
            console.info("respones success " + response.response);
        });
    } else {
        console.error("tmall id is " + tabData.id + " no defind");
    }
};

function showTmallbtn() {
    removeClass(document.getElementById("tmall"));
    addClass(document.getElementById("ZYW0001"));
    addClass(document.getElementById("ZYW0002"));
}

function hideTmallbtn() {
    addClass(document.getElementById("tmall"));
    removeClass(document.getElementById("ZYW0001"));
    removeClass(document.getElementById("ZYW0002"));
}

function hasClass(elements) {
    return !!elements.className.match(new RegExp("(\\s|^)hide(\\s|$)"));
};

function addClass(elements) {
    if (!hasClass(elements)) {
        elements.className += " hide";
    };
};

function removeClass(elements) {
    if (hasClass(elements)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)hide(\\s|$)"), " ");
    };
};

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#ZYW0001').addEventListener(
        'click', openwrap);
    document.querySelector('#ZYW0002').addEventListener(
        'click', openwrap);
    document.querySelector('#tmall').addEventListener(
        'click', opentmall);
    init();
});