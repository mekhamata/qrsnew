module.exports = {
  i18n: {
    defaultLocale: "he",
    locales: ["he", "en"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
