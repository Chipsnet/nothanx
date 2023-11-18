document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.getElementById("domainSelect");

    chrome.storage.sync.get("selectedDomain", function (data) {
        if (data.selectedDomain) {
            selectElement.value = data.selectedDomain;
        }
    });

    selectElement.addEventListener("change", function () {
        var selectedDomain = selectElement.value;
        chrome.storage.sync.set(
            { selectedDomain: selectedDomain },
            function () {
                console.log("Domain is set to " + selectedDomain);
            }
        );
    });
});