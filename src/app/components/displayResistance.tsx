import { useLanguageContext } from "../language-provider";
import { Image, Flex } from '@mantine/core';
import localization from "../localization.json"
import { v4 as uuidv4 } from 'uuid';

export default function displayResistance(key: string, value: number): any {
    const language = useLanguageContext()
    let statName: any = localization.find(name => name['Name (English)'] === key)
    switch (language.language) {
        case 'Global':
            if (statName) return <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key.replace(' ', '')}.png`} alt={statName['Name (Global)']} title={statName['Name (Global)']} w={16} h={16} />  {value}%</Flex>
        case '日本語':
            if (statName) return <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key.replace(' ', '')}.png`} alt={statName['Name (JP)']} title={statName['Name (JP)']} w={16} h={16} />  {value}%</Flex>
        default:
            return <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key.replace(' ', '')}.png`} alt={key} title={key} w={16} h={16} />  {value}%</Flex>
    }
}