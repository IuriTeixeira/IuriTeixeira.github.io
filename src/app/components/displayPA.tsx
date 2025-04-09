import { Tooltip, Flex, Image } from "@mantine/core";
import { v4 as uuidv4 } from 'uuid';

export default function displayPA(namePA: string[]): any[] {
    let buffer: any[] = []
    if (namePA) {
        switch (localStorage.getItem('appLanguage')) {
            case "Global":
                buffer.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={`Enables usage of specific Photon Arts/Techniques regardless of class or equipment requirements`} color="dark">
                        <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                    </Tooltip>
                )
                break;
            case "JP":
                buffer.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={`クラスや装備の条件に関係なくPAを使用できる`} color="dark">
                        <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                    </Tooltip>
                )
                break;
            default:
                buffer.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={`Enables usage of specific Photon Arts/Techniques regardless of class or equipment requirements`} color="dark">
                        <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                    </Tooltip>
                )
        }
    }
    return buffer;
}