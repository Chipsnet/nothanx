let settings = { ...DEFAULT_SETTINGS };

(function () {
    chrome.storage.sync.get(DEFAULT_SETTINGS, function (data) {
        settings = data;
    });
})();

const TWITTER_URL_PATTERN = /https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com(?:\/[^\s]*)?/g;

function transformUrl(rawUrl) {
    let url;
    try {
        url = new URL(rawUrl);
    } catch {
        return rawUrl;
    }

    url.hostname = settings.selectedDomain;

    if (settings.removeQueryParams) {
        url.search = "";
    }

    const lang = settings.translateLang;
    if (
        lang &&
        isLangSupported(settings.selectedDomain, lang) &&
        /\/status\/\d+\/?$/.test(url.pathname)
    ) {
        url.pathname = url.pathname.replace(/\/?$/, "/" + lang);
    }

    return url.toString();
}

document.addEventListener("copy", (e) => {
    const link = window.getSelection().toString() || "";

    const modifiedLink = link.replace(TWITTER_URL_PATTERN, transformUrl);
    if (modifiedLink === link) {
        return;
    }

    e.clipboardData.clearData();
    e.clipboardData.setData('text/plain', modifiedLink);
    e.preventDefault();
});
