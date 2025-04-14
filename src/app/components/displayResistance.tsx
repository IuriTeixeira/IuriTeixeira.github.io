import { Image, Flex } from '@mantine/core';
import localization from "../localization.json"
import Decimal from "decimal.js";
import { useLanguageContext } from '../language-provider';

interface DisplayResistanceProps {
    resist: string
    value: number | string | Decimal
    id?: number
}

export default function DisplayResistance({ resist, value, id }: DisplayResistanceProps): any {
    const language = useLanguageContext()
    if (!id) id = 0

    let returnValue: number | string

    if (typeof (value) === 'number') returnValue = value
    else returnValue = value.toString()

    const statNameLoc: any = localization.find(name => name['Name (English)'] === resist)
    let statName: string = ''

    if (statNameLoc) {
        switch (language.language) {
            case 'Global':
                statName = statNameLoc['Name (Global)']
                break
            case 'JP':
                statName = statNameLoc['Name (JP)']
                break
            default:
                statName = statNameLoc['Name (English)']
                break
        }
        return (
            <Flex align="center" key={`resist-flex-${statName}-${id}`} gap={5}>
                <Image
                    fallbackSrc='/Blank.png'
                    key={`resist-image-${statName}-${id}`}
                    src={`/icons/${resist.replace(' ', '')}.png`}
                    alt={statName}
                    title={statName}
                    w={16}
                    h={16}
                />
                {returnValue}%
            </Flex>
        )
    }
}