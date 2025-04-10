import { Tooltip, Flex, Image } from "@mantine/core";
import { v4 as uuidv4 } from 'uuid';
import { useLanguageContext } from "../language-provider";

interface DisplayPAProps {
    namePA: string;
    id?: number
}

export default function displayPA({ namePA, id }: DisplayPAProps): any {
    const language = useLanguageContext()
    if (!id) id = 0
    let labelPA = language.language !== 'JP'
        ? 'Enables usage of specific Photon Arts/Techniques regardless of class or equipment requirements'
        : 'クラスや装備の条件に関係なくPAを使用できる'
    if (namePA) {
        return (
            <Tooltip key={`pa-tooltip-${id}`} label={labelPA} color="dark">
                <Flex align="center" key={`pa-flex-${id}`} gap={5}>
                    <Image fallbackSrc='/Blank.png' key={`pa-${id}`} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}
                </Flex>
            </Tooltip>
        )
    }
}