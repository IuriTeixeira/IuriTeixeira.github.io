import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Flex, Image } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import localization from "../localization.json"
import Decimal from 'decimal.js';

export default function displayStat(key: string, value: number | string | Decimal): any[] {
    const language = useLanguageContext()
    let buffer: any[] = []
    let statName: any = localization.find(name => name['Name (English)'] === key)
    let name: string
    let returnValue: number|string

    if (statName) {
        switch (language.language) {
            case 'English':
                name = statName['Name (English)']
                break;
            case 'Global':
                name = statName['Name (Global)']
                break;
            case 'JP':
                name = statName['Name (JP)']
                break;
        }
    }

    if (typeof (value) === 'number' || typeof (value) === 'string') {
        returnValue = value
    } else {
        returnValue = value.toString()
    }
    buffer.push(
        <Flex align="center" key={uuidv4()} gap={5}>
            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key}.png`} alt={name} title={name} w={16} h={16} />
            {returnValue}
        </Flex>);
    return buffer
}