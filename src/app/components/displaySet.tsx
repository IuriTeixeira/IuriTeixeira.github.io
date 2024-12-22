import { Image, Flex, SimpleGrid, Tooltip } from '@mantine/core';
import setEffects from "../geardata/sets/sets.json"
import variantSet from "../geardata/sets/letter-variant-sets.json"
import sword from "../geardata/weapons/weapon-data/swords.json"
import wiredlance from "../geardata/weapons/weapon-data/wiredlances.json"
//import partizan from "../geardata/weapons/weapon-data/partizans.json"
import rear from "../geardata/units/unit-data/rear.json"
import arm from "../geardata/units/unit-data/arm.json"
import leg from "../geardata/units/unit-data/leg.json"
import { v4 as uuidv4 } from 'uuid';
import { useLanguageContext } from "../language-provider";

export default function displaySet(setName: string, name: string): any {
    const language = useLanguageContext()
    let set = setEffects.find(set => set.Name === setName)

    function displaySetEffect(set: any, doubleEffect: boolean): any {
        let effect: any[] = []
        set.Effect.forEach((value: any, index: number) => {
            let multiplier: number = 1;
            if (doubleEffect) multiplier = 2;
            let effectValue: number = Math.trunc(set.Effect[index + 1] * multiplier)
            let image: any = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} title={`${set.Effect[index]}`} w={16} h={16} />
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

    function displaySetMembers(set: any, name: string, doubleEffect: boolean): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i += 2) {
            let bufferMembers: any[] = []
            let unitType: string = null
            let itemName: string = null
            bufferMembers.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} title={set.Pieces[i]} w={16} h={16} />, ' ')

            switch (language.language) {
                case 'English Patch':
                    if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                        unitType = set.Pieces[i]
                    }
                    name = name.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('Rear / ', '').replace('Arm / ', '').replace('Leg / ', '')
                    break;
                case 'Global':
                    switch (set.Pieces[i]) {
                        case 'Rear':
                            unitType = 'Back'
                            let rearName: any = rear.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (rearName) itemName = rearName['name_global']
                        case 'Arm':
                            unitType = 'Arm'
                            let armName: any = arm.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (armName) itemName = armName['name_global']
                            break;
                        case 'Leg':
                            unitType = 'Leg'
                            let legName: any = leg.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (legName) itemName = legName['name_global']
                            break;
                        case 'Sword':
                            let swordName: any = sword.find(item => item['name_en'] === set.Pieces[i + 1])
                            if (swordName) itemName = swordName['name_global']
                            break;
                        case 'Wired Lance':
                            let wlName: any = wiredlance.find(item => item['name_en'] === set.Pieces[i + 1])
                            if (wlName) itemName = wlName['name_global']
                            break;
                    }
                    name = name.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('Back / ', '').replace('Arm / ', '').replace('Leg / ', '')
                    break;
                case '日本語':
                    switch (set.Pieces[i]) {
                        case 'Rear':
                            unitType = 'リア'
                            let rearName: any = rear.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (rearName) itemName = rearName['Name (JP)']
                            break;
                        case 'Arm':
                            unitType = 'アーム'
                            let armName: any = arm.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (armName) itemName = armName['Name (JP)']
                            break;
                        case 'Leg':
                            unitType = 'レッグ'
                            let legName: any = leg.find(item => item['name_en'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (legName) itemName = legName['Name (JP)']
                            break;
                        case 'Sword':
                            let swordName: any = sword.find(item => item['name_en'] === set.Pieces[i + 1])
                            if (swordName) itemName = swordName['Name (JP)']
                            break;
                        case 'Wired Lance':
                            let wlName: any = wiredlance.find(item => item['name_en'] === set.Pieces[i + 1])
                            if (wlName) itemName = wlName['Name (JP)']
                            break;
                        /* case 'Partizan':
                            let partizanName: any = partizan.find(item => item['name_en'] === set.Pieces[i + 1])
                            if (partizanName) itemName = partizan['Name (JP)']
                            break; */
                    }
                    name = name.replace('a', '').replace('b', '').replace('c', '').replace('d', '').replace('e', '').replace('リア/', '').replace('アーム/', '').replace('レッグ/', '')
                    break;
            }
            if (itemName) {
                if (itemName === name) {
                    if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                        bufferMembers.push(<strong key={uuidv4()}>{unitType} / {itemName}</strong>)
                    } else {
                        bufferMembers.push(<strong key={uuidv4()}>{itemName}</strong>)
                    }
                } else {
                    if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                        bufferMembers.push(unitType, ' / ', itemName)
                    } else {
                        bufferMembers.push(itemName)
                    }
                }
            } else {
                if (set.Pieces[i + 1] === name) {
                    if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                        bufferMembers.push(<strong key={uuidv4()}>{unitType} / {set.Pieces[i + 1]}</strong>)
                    } else {
                        bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i + 1]}</strong>)
                    }
                } else {
                    if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                        bufferMembers.push(unitType, ' / ', set.Pieces[i + 1])
                    } else {
                        bufferMembers.push(set.Pieces[i + 1])
                    }
                }
            }
            members.push(<Flex align="center" key={uuidv4()} gap={5}>{bufferMembers}</Flex>)
        }

        let bufferMembers: any[] = []
        switch (language.language) {
            case 'English Patch':
            case 'Global':
                if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                break;
            case '日本語':
                if (doubleEffect) bufferMembers.push(`${set.Required + 1}会員が必要`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                else bufferMembers.push(`${set.Required}会員が必要`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                break;
        }

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

    if (set) {
        let bufferReturn: any = []
        let bufferSetInfo: any = []
        switch (language.language) {
            case 'English patch':
            case 'Global':
                bufferSetInfo.push(<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, false))
                bufferReturn.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="Set Effect 1: Hover to show details" w={63} h={18} /></Flex>
                    </Tooltip>
                )
                if (set.Doubles) {
                    let bufferSetInfo: any = [<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, true)]
                    bufferReturn.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                            <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="Set Effect 2: Hover to show details" w={63} h={18} /></Flex>
                        </Tooltip>
                    )
                }
                break;
            case '日本語':
                bufferSetInfo.push(<strong key={uuidv4()}>セット効果:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <strong key={uuidv4()}>会員:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, false))
                bufferReturn.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="Set Effect 1: Hover to show details" w={63} h={18} /></Flex>
                    </Tooltip>
                )
                if (set.Doubles) {
                    let bufferSetInfo: any = [<strong key={uuidv4()}>セット効果:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <strong key={uuidv4()}>会員:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, true)]
                    bufferReturn.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                            <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="Set Effect 2: Hover to show details" w={63} h={18} /></Flex>
                        </Tooltip>
                    )
                }
                break;
        }
        return <Flex align="center" justify="center" key={uuidv4()} gap="xs">{bufferReturn}</Flex>
    } else {
        return '-'
    }
}