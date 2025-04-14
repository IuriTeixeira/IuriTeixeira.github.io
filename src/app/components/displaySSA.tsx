import { Image, Flex } from "@mantine/core"
import { useLanguageContext } from "../language-provider";

interface DisplaySSAProps {
    listSSA: number[]
    id?: number
}

export default function displaySSA({listSSA, id}: DisplaySSAProps): any {
    const language = useLanguageContext()
    if(!id) id = 0

    let buffer: any[] = []
    let returnList:any[] = []
    
    for (let i = 0; i < listSSA.length; i++) {
        let labelSSA:string = ''
        language.language !== 'JP' ? labelSSA = `SSA Slot ${listSSA[i]} enabled` : labelSSA = `S級特殊能力スロット${listSSA[i]}有効`
        
        buffer.push(<Image fallbackSrc='/Blank.png' key={`ssa-image-${i}-${id}`} src={`/icons/SClassAbility${listSSA[i]}.png`} alt={labelSSA} title={labelSSA} w={18} h={18} />)

        if(buffer.length >= 3 || !listSSA[i+1]) {
            returnList.push(<Flex align="center" key={`ssa-flex-${i}-${id}`} gap={0}>{buffer}</Flex>);
            buffer = []
        }
    }
    return <Flex direction="column" key={`ssa-flex-return-${id}`} gap={0}>{returnList}</Flex>
}