import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from './redux/store.js'
import {Provider} from 'react-redux'

// Import translations
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import mlTranslation from './locales/ml.json';

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      ml:{translation: mlTranslation}
    },
    lng: 'en', // Default language
    interpolation: { escapeValue: false }
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <App/>
  </Provider>
  </React.StrictMode>,
)
