'use client'

import React, { createContext, useState, useContext } from 'react'

export type LanguageType = {
    language: string
}

const languageContextDefaultValue: LanguageType = {
    language: 'en'
};

const LanguageContext = createContext<LanguageType>(languageContextDefaultValue);

export function useLanguageContext() {
    return useContext(LanguageContext)
}

type Props = {
    children: ReactNode;
}

export function LanguageProvider({children}: Props){
    const [language, setLanguage] = useState<string>('en')
    const value = {
        language
    }
    return(
        <>
            <LanguageContext.Provider value={value}>
                {children}
            </LanguageContext.Provider>
        </>
    )
}