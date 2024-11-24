// src/LanguageContext.js

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'id' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
