import { Image, Flex } from "@mantine/core";
import { useLanguageContext } from "../language-provider";
import { v4 as uuidv4 } from 'uuid';
import localization from '../localization.json'

export default function displayElement(array: [string, number]): any[] {
    const language = useLanguageContext()
    let buffer: any[] = []

    let statName: any = localization.find(name => name['Name (English)'] === array[0])
    let name: string

    if (statName) {
        switch (language.language) {
            case 'Global':
                name = statName['Name (Global)']
                break;
            case 'JP':
                name = statName['Name (JP)']
                break;
            default:
                name = statName['Name (English)']
        }
    }

    if (!isNaN(array[1])) {
        buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${array[0]}.png`} alt={name} title={name} w={16} h={16} /> {array[1]}</Flex>)
    }
    return buffer;
}