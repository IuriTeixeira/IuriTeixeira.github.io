import { Image, Flex, SimpleGrid, Tooltip } from '@mantine/core';
import setEffects from "../geardata/sets/sets.json"
import variantSet from "../geardata/sets/letter-variant-sets.json"
import { v4 as uuidv4 } from 'uuid';

function displaySetEffect(set: any, doubleEffect: boolean): any {
    let effect: any[] = []
    set.Effect.forEach((value: any, index: number) => {
        let multiplier:number = 1;
        if (doubleEffect) multiplier = 2;
        let effectValue:number = Math.trunc(set.Effect[index + 1] * multiplier)
        let image:any = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} title={`${set.Effect[index]}`} w={16} h={16} />
        if (index % 2 === 0) {
            switch (set.Effect[index]) {
                case 'HP':
                case 'PP':
                    effect.push(<Flex justify="center" align="center" key={uuidv4()} gap={5}>{set.Effect[index]} {effectValue}</Flex>);
                    break;
                case 'Strike Resistance':
                case 'Ranged Resistance':
                case 'Tech Resistance':
                case 'Fire Resistance':
                case 'Ice Resistance':
                case 'Lightning Resistance':
                case 'Wind Resistance':
                case 'Light Resistance':
                case 'Dark Resistance':
                    effect.push(<Flex justify="center" align="center" key={uuidv4()} gap={5}>{image} {effectValue}%</Flex>);
                    break;
                default:
                    effect.push(<Flex justify="center" align="center" key={uuidv4()} gap={5}>{image} {effectValue}</Flex>);
            }
        }
    }
    )
    let colsAmount: number
    if (effect.length < 2) {
        colsAmount = 1
    } else {
        if (effect.length < 3) {
            colsAmount = 2
        } else {
            colsAmount = 3
        }
    }
    return <Flex justify="center" align="center" direction="column" key={uuidv4()} gap={5}><SimpleGrid key={uuidv4()} cols={colsAmount} spacing="lg" verticalSpacing={5}>{effect}</SimpleGrid></Flex>
}

function displaySetMembers(set: any, name_en: string, doubleEffect: boolean): any {
    let members: any[] = []
    for (let i = 0; i < set.Pieces.length; i += 2) {
        let bufferMembers: any[] = []
        bufferMembers.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} title={set.Pieces[i]} w={16} h={16} />, ' ')
        let name: string = name_en.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('Rear / ', '').replace('Arm / ', '').replace('Leg / ', '')
        if (set.Pieces[i + 1] === name) {
            if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i]} / {set.Pieces[i + 1]}</strong>)
            } else {
                bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i + 1]}</strong>)
            }
        } else {
            if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                bufferMembers.push(set.Pieces[i], ' / ', set.Pieces[i + 1])
            } else {
                bufferMembers.push(set.Pieces[i + 1])
            }
        }
        members.push(<Flex align="center" key={uuidv4()} gap={5}>{bufferMembers}</Flex>)
    }

    let bufferMembers: any[] = []
    if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
    else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)

    if (members.length > 2) {
        bufferMembers.push(<SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
    } else {
        bufferMembers.push(<SimpleGrid key={uuidv4()} cols={2} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
    }

    let variant = variantSet.find(variant => variant.Set === set.Name)
    if (variant) {
        bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (a,b,c) combination works for this set');
    }

    return bufferMembers
}

export default function displaySet(setName: string, name_en: string): any {
    let set = setEffects.find(set => set.Name === setName)
    if (set) {
        let bufferReturn: any = []
        let bufferSetInfo: any = [<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, false)]
        bufferReturn.push(
            <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="Set Effect 1: Hover to show details" w={63} h={18} /></Flex>
            </Tooltip>
        )
        if (set.Doubles) {
            let bufferSetInfo: any = [<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, true)]
            bufferReturn.push(
                <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                    <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="Set Effect 2: Hover to show details" w={63} h={18} /></Flex>
                </Tooltip>
            )
        }
        return <Flex align="center" justify="center" key={uuidv4()} gap="xs">{bufferReturn}</Flex>
    } else {
        return '-'
    }
}