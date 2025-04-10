import React from 'react';
import { Flex, Image } from '@mantine/core';
import localization from "../localization.json"
import Decimal from 'decimal.js';
import { useLanguageContext } from "../language-provider";

interface DisplayStatProps{
    stat: string;
    value: number|string|Decimal
    id?: number
}

export default function DisplayStat({stat, value, id}: DisplayStatProps): any[] {
    const language = useLanguageContext()
    let buffer: any[] = []
    let statName: any = localization.find(name => name['Name (English)'] === stat)
    let name: string
    let returnValue: number|string
    if(!id) id = 0

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
        <Flex align="center" key={`flex-${stat}-${id}`} gap={5}>
            <Image fallbackSrc='/Blank.png' key={`${stat}-${id}`} src={`/icons/${stat}.png`} alt={name} title={name} w={16} h={16} />
            {returnValue}
        </Flex>);
    return buffer
}