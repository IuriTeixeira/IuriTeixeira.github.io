import { Image, Flex, SimpleGrid, Tooltip } from '@mantine/core';
import setEffects from "../geardata/sets/sets.json"
import variantSet from "../geardata/sets/letter-variant-sets.json"
import weapons from "../geardata/weapons/weapons.json"
import units from "../geardata/units/units.json"
import { v4 as uuidv4 } from 'uuid';
import { useLanguageContext } from '../language-provider';

export default function displaySet(setName: string, name: string): any {
    const language = useLanguageContext()
    let set = setEffects.find(set => set.Name === setName)
    let variant = variantSet.find(variant => variant.Set === setName)

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
            let itemName: string = null
            bufferMembers.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} title={set.Pieces[i]} w={16} h={16} />, ' ')

            switch (language.language) {
                case 'English':
                    if (set.Pieces[i] === 'Rear' || set.Pieces[i] === 'Arm' || set.Pieces[i] === 'Leg') {
                        itemName = set.Pieces[i] + ' / ' + set.Pieces[i + 1]
                    } else {
                        itemName = set.Pieces[i + 1]
                    }
                    break;
                case 'Global':
                    switch (set.Pieces[i]) {
                        case 'Rear':
                        case 'Arm':
                        case 'Leg':
                            let unitName: any
                            if (variant) unitName = units.find(item => item['Name (English)'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1] + ' a')
                            else unitName = units.find(item => item['Name (English)'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (unitName) itemName = unitName['Name (Global)'].replace(' A', '')
                        default:
                            let weaponName: any = weapons.find(item => item['Name (English)'] === set.Pieces[i + 1])
                            if (weaponName) itemName = weaponName['Name (Global)']
                    }
                    break;
                case 'JP':
                    switch (set.Pieces[i]) {
                        case 'Rear':
                        case 'Arm':
                        case 'Leg':
                            let unitName: any
                            if (variant) unitName = units.find(item => item['Name (English)'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1] + ' a')
                            else unitName = units.find(item => item['Name (English)'] === set.Pieces[i] + ' / ' + set.Pieces[i + 1])
                            if (unitName) itemName = unitName['Name (JP)'].replace('a', '')
                            break;
                        default:
                            let weaponName: any = weapons.find(item => item['Name (English)'] === set.Pieces[i + 1])
                            if (weaponName) itemName = weaponName['Name (JP)'];
                    }
                    break;
            }
            if (itemName) {
                if (set.Pieces[i] === 'Rear' || set.Pieces[i] === 'Arm' || set.Pieces[i] === 'Leg') {
                    switch (language.language) {
                        case 'English':
                            if (itemName[itemName.length - 2] === ' ') {
                                itemName = itemName.slice(0, -2)
                            }
                            break
                        case 'Global':
                            let globalName: any
                            globalName = units.find(item => item['Name (English)'] === name)
                            if (globalName) itemName = globalName['Name (Global)']
                            if (itemName[itemName.length - 2] === ' ') {
                                itemName = itemName.slice(0, -2)
                            }
                            break
                        case 'JP':
                            let jpName: any
                            jpName = units.find(item => item['Name (English)'] === name)
                            if (jpName) itemName = jpName['Name (JP)']
                            itemName = itemName.replace('a', '').replace('b', '').replace('c', '').replace('d', '').replace('e', '')
                    }
                    if ((variant && itemName === name.slice(0,-2)) || (!variant && itemName === name)) {
                        bufferMembers.push(<strong key={uuidv4()}>{itemName}</strong>)
                    } else {
                        bufferMembers.push(itemName)
                    }
                } else {
                    if (set.Pieces[i + 1] === name) {
                        bufferMembers.push(<strong key={uuidv4()}>{itemName}</strong>)
                    } else {
                        bufferMembers.push(itemName)
                    }
                }
            } else {
                if (set.Pieces[i + 1] === name) {
                    bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i + 1]}</strong>)
                } else {
                    bufferMembers.push(set.Pieces[i + 1])
                }
            }
            members.push(<Flex align="center" key={uuidv4()} gap={5}>{bufferMembers}</Flex>)
        }

        let bufferMembers: any[] = []
        switch (language.language) {
            case 'English':
            case 'Global':
                if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                break;
            case 'JP':
                if (doubleEffect) bufferMembers.push(`${set.Required + 1}種装備が必要`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                else bufferMembers.push(`${set.Required}種装備が必要`, <br key={uuidv4()} />, <br key={uuidv4()} />)
                break;
        }

        if (members.length > 2) {
            bufferMembers.push(<SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
        } else {
            bufferMembers.push(<SimpleGrid key={uuidv4()} cols={2} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
        }

        if (variant) {
            switch (language.language) {
                case 'English':
                    bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (a/b/c) combination works for this set');
                    break;
                case 'Global':
                    bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (A/B/C) combination works for this set');
                    break;
                case 'JP':
                    bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>備考: </strong>, 'a/b/cヴァリアントのどの組み合わせでもセット効果が発生する。');
                    break;
            }
        }

        return bufferMembers
    }

    if (set) {
        let bufferReturn: any = []
        let bufferSetInfo: any = []
        switch (language.language) {
            case 'English':
            case 'Global':
                bufferSetInfo.push(<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, false))
                bufferReturn.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="Set Effect 1" w={63} h={18} /></Flex>
                    </Tooltip>
                )
                if (set.Doubles) {
                    let bufferSetInfo: any = [<strong key={uuidv4()}>Set Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, true)]
                    bufferReturn.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                            <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="Set Effect 2" w={63} h={18} /></Flex>
                        </Tooltip>
                    )
                }
                break;
            case 'JP':
                bufferSetInfo.push(<strong key={uuidv4()}>セット効果:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <strong key={uuidv4()}>種装備:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, false))
                bufferReturn.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="セット効果1" w={63} h={18} /></Flex>
                    </Tooltip>
                )
                if (set.Doubles) {
                    let bufferSetInfo: any = [<strong key={uuidv4()}>セット効果:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <strong key={uuidv4()}>種装備:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name, true)]
                    bufferReturn.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                            <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="セット効果2" w={63} h={18} /></Flex>
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