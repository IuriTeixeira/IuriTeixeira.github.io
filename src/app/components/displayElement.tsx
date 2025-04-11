import { Image, Flex } from "@mantine/core";
import localization from '../localization.json'
import { useLanguageContext } from "../language-provider";

interface DisplayElementProps {
    element: [string, number]
    id?: number
}

export default function DisplayElement({element, id}: DisplayElementProps): any {
    const language = useLanguageContext()
    if(!id) id = 0

    let statName: any = localization.find(name => name['Name (English)'] === element[0])
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

    if (!isNaN(element[1])) {
        return <Flex align="center" key={`element-flex-${id}`} gap={5}><Image fallbackSrc='/Blank.png' key={`element-${id}`} src={`/icons/${element[0]}.png`} alt={name} title={name} w={16} h={16} /> {element[1]}</Flex>
    }
}