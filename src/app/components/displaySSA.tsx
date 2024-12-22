import { Image, Flex } from "@mantine/core"
import { v4 as uuidv4 } from 'uuid';
import { useLanguageContext } from "../language-provider";

export default function displaySSA(listSSA: any[]): any {
    const language = useLanguageContext()
    let buffer: any[] = []
    let returnList:any[] = []
    for (let i = 0; i < listSSA.length; i++) {
        switch (language.language) {
            case 'English Patch':
                buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/SClassAbility${listSSA[i]}.png`} alt={`SSA Slot ${listSSA[i]} enabled`} title={`SSA Slot ${listSSA[i]} enabled`} w={16} h={16} />)
                break;
            case 'Global':
                buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/SClassAbility${listSSA[i]}.png`} alt={`SGA Slot ${listSSA[i]} enabled`} title={`SGA Slot ${listSSA[i]} enabled`} w={16} h={16} />)
                break;
            case '日本語':
                buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/SClassAbility${listSSA[i]}.png`} alt={`S級特殊能力スロット${listSSA[i]}有効`} title={`S級特殊能力スロット${listSSA[i]}有効`} w={16} h={16} />)
                break;
        }

        if(buffer.length >= 3 || !listSSA[i+1]) {
            returnList.push(<Flex align="center" key={uuidv4()} gap={0}>{buffer}</Flex>);
            buffer = []
        }
    }
    return <Flex direction="column" key={uuidv4()} gap={0}>{returnList}</Flex>
}