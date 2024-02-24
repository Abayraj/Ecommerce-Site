// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select className=' border-2 border-black rounded-xl cursor-pointer' onChange={handleLanguageChange} value={i18n.language}>
      <option value="en">English</option>
      <option value="fr">French</option>
      <option value="ml">Malayalam</option>
    </select>
  );
};

export default LanguageSelector;
