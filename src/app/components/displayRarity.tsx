import { Image } from "@mantine/core"

interface DisplayRarityProps {
    rarity: number
    id?: number
}

export default function DisplayRarity({ rarity, id }: DisplayRarityProps) {
    if (!id) id = 0
    if (rarity) {
        return (
            <Image
                fallbackSrc='/Blank.png'
                key={`rarity-${id}`}
                src={`/icons/${rarity}star.png`}
                alt={rarity.toString()}
                title={rarity.toString()}
                w={16}
                h={16}
            />
        )
    }
}