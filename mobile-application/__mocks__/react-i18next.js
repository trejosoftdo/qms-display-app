'use strict';

const i18n = {
  changeLanguage: (language) => `Language changed to ${language}`,
};

exports.useTranslation = () => {
  return {
    t: (key, data = {}) => `Translated[${key}](${JSON.stringify(data)})`,
    i18n,
  };
};

exports.i18n = i18n;
