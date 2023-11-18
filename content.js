let selectedDomain = "vxtwitter.com";

(function () {
    chrome.storage.sync.get("selectedDomain", function (data) {
        if (data.selectedDomain) {
            selectedDomain = data.selectedDomain;
        }
    });
})();

document.addEventListener("copy", (e) => {
    const link = window.getSelection().toString() || "";

    let modifiedLink = link.replace(/(x\.com|twitter\.com)/g, selectedDomain);

    e.clipboardData.clearData();
    e.clipboardData.setData('text/plain', modifiedLink);
    e.preventDefault();
});
