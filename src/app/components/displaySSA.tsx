import { Image, Flex } from "@mantine/core"
import { v4 as uuidv4 } from 'uuid';
export default function displaySSA(listSSA: any[]): any {
    let buffer: any[] = []
    let returnList:any[] = []
    for (let i = 0; i < listSSA.length; i++) {
        buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/SClassAbility${listSSA[i]}.png`} alt={`SSA Slot ${listSSA[i]} enabled`} title={`SSA Slot ${listSSA[i]} enabled`} w={16} h={16} />)
        if(buffer.length >= 3 || !listSSA[i+1]) {
            returnList.push(<Flex align="center" key={uuidv4()} gap={0}>{buffer}</Flex>);
            buffer = []
        }
    }
    return <Flex direction="column" key={uuidv4()} gap={0}>{returnList}</Flex>
}