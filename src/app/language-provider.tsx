'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { Radio, Group } from '@mantine/core';

export type LanguageType = {
    language: string
}

const languageContextDefaultValue: LanguageType = {
    language: 'English'
};

const LanguageContext = createContext<LanguageType>(languageContextDefaultValue);

export function useLanguageContext() {
    return useContext(LanguageContext)
}

type Props = {
    children: React.ReactNode;
}

export function LanguageProvider({ children }: Props) {
    const [language, setLanguage] = useState<string>('English')
    const value = {
        language
    }

    useEffect(() => {
        const lang = localStorage.getItem('appLanguage')
        if(lang && ['English', 'Global', 'JP'].includes(lang)){
            setLanguage(lang)
        }
    }, [])

    const changeLanguage = (lang: string) => {
        localStorage.setItem('appLanguage', lang)
        setLanguage(lang)
    }

    return (
        <>
            <Radio.Group
                value={language}
                onChange={changeLanguage}
                name="favoriteFramework"
                label="Language"
            >
                <Group mt="xs">
                    <Radio value="English" label="English Patch" />
                    <Radio value="Global" label="Global" />
                    <Radio value="JP" label="日本語" />
                </Group>
            </Radio.Group>
            
            <LanguageContext.Provider value={value}>
                {children}
            </LanguageContext.Provider>
        </>
    )
}