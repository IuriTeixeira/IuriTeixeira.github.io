import { Image } from "@mantine/core"
import { v4 as uuidv4 } from 'uuid';

interface DisplayRarityProps {
    rarity: number
}

export default function DisplayRarity({rarity}:DisplayRarityProps){
    return(
        <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${rarity}star.png`} alt={rarity.toString()} title={rarity.toString()} w={16} h={16} />
    )
}