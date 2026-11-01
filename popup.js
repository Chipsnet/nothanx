document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.getElementById("domainSelect");
    var langSelectElement = document.getElementById("langSelect");
    var removeQueryParamsCheckbox = document.getElementById("removeQueryParamsCheckbox");

    function updateLangOptions() {
        var domain = selectElement.value;
        for (var option of langSelectElement.options) {
            option.disabled = option.value !== "" && !isLangSupported(domain, option.value);
        }

        if (langSelectElement.selectedOptions[0].disabled) {
            langSelectElement.value = "";
            chrome.storage.sync.set({ translateLang: "" });
        }
    }

    chrome.storage.sync.get(DEFAULT_SETTINGS, function (data) {
        selectElement.value = data.selectedDomain;
        langSelectElement.value = data.translateLang;
        removeQueryParamsCheckbox.checked = data.removeQueryParams;
        updateLangOptions();
    });

    selectElement.addEventListener("change", function () {
        var selectedDomain = selectElement.value;
        chrome.storage.sync.set(
            { selectedDomain: selectedDomain },
            function () {
                console.log("Domain is set to " + selectedDomain);
            }
        );
        updateLangOptions();
    });

    langSelectElement.addEventListener("change", function () {
        chrome.storage.sync.set({ translateLang: langSelectElement.value });
    });

    removeQueryParamsCheckbox.addEventListener("change", function () {
        chrome.storage.sync.set({ removeQueryParams: removeQueryParamsCheckbox.checked });
    });
});
