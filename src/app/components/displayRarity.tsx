import { Image } from "@mantine/core"
import { v4 as uuidv4 } from 'uuid';

export default function displayRarity(rarity:number){
    return(
        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${rarity}star.png`} alt={rarity.toString()} title={rarity.toString()} w={16} h={16} />
    )
}