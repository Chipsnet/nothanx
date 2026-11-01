const DEFAULT_SETTINGS = {
    selectedDomain: "vxtwitter.com",
    removeQueryParams: true,
    translateLang: "",
};

const SUPPORTED_LANGS = {
    "vxtwitter.com": ["en", "ja"],
    "fxtwitter.com": ["en", "ja", "kr", "cn"],
    "fixupx.com": ["en", "ja", "kr", "cn"],
};

function isLangSupported(domain, lang) {
    return (SUPPORTED_LANGS[domain] || []).includes(lang);
}
