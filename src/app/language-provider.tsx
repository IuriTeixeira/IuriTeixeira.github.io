'use client'

import React, { createContext, useState, useContext } from 'react'
import { InputBase, Combobox, useCombobox } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

export type LanguageType = {
    language: string
}

const languageContextDefaultValue: LanguageType = {
    language: 'English Patch'
};

const LanguageContext = createContext<LanguageType>(languageContextDefaultValue);

export function useLanguageContext() {
    return useContext(LanguageContext)
}

type Props = {
    children: React.ReactNode;
}

export function LanguageProvider({ children }: Props) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [language, setLanguage] = useState<string>('English Patch')
    const value = {
        language
    }

    return (
        <>
            <Combobox store={combobox} onOptionSubmit={(val) => {
                setLanguage(val);
                combobox.closeDropdown();
            }}>
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents="none"
                        onClick={() => combobox.toggleDropdown()}
                    >
                        {language}
                    </InputBase>
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Options>
                        <Combobox.Option key={uuidv4()} value='English Patch' >
                            English Patch
                        </Combobox.Option>
                        <Combobox.Option key={uuidv4()} value='Global' >
                            Global
                        </Combobox.Option>
                        <Combobox.Option key={uuidv4()} value='日本語' >
                            日本語
                        </Combobox.Option>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>

            <LanguageContext.Provider value={value}>
                {children}
            </LanguageContext.Provider>
        </>
    )
}