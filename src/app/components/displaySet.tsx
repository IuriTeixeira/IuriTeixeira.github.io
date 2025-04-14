import { Image, Flex, SimpleGrid, Tooltip } from '@mantine/core';
import setEffects from "../geardata/sets/sets.json"
import variantSet from "../geardata/sets/letter-variant-sets.json"
import weapons from "../geardata/weapons/weapons.json"
import units from "../geardata/units/units.json"
import { useLanguageContext } from '../language-provider';

interface DisplaySetProps {
    setName: string
    name: string
    id?: number
}

export default function DisplaySet({ setName, name, id }: DisplaySetProps): any {
    const language = useLanguageContext()
    let set = setEffects.find(set => set.Name === setName)
    let variant = variantSet.find(variant => variant.Set === setName)
    if (!id) id = 0

    function displaySetEffect(set: any, doubleEffect: boolean): any {
        let effect: any[] = []
        set.Effect.forEach((value: any, index: number) => {
            let multiplier: number = 1;
            if (doubleEffect) multiplier = 2;
            let effectValue: number = Math.trunc(set.Effect[index + 1] * multiplier)
            let image: any = <Image fallbackSrc='/Blank.png' key={`set-stat-icon-${index}`} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} title={`${set.Effect[index]}`} w={16} h={16} />
            if (index % 2 === 0) {
                switch (set.Effect[index]) {
                    case 'HP':
                    case 'PP':
                        effect.push(<Flex justify="center" align="center" key={`set-${set.Effect[index]}-${index}`} gap={5}>{set.Effect[index]} {effectValue}</Flex>);
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
                        effect.push(<Flex justify="center" align="center" key={`set-${set.Effect[index]}-${index}`} gap={5}>{image} {effectValue}%</Flex>);
                        break;
                    default:
                        effect.push(<Flex justify="center" align="center" key={`set-${set.Effect[index]}-${index}`} gap={5}>{image} {effectValue}</Flex>);
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
        return <Flex justify="center" align="center" direction="column" key={`set-effect-flex-${id}`} gap={5}><SimpleGrid key={`set-effect-grid-${id}`} cols={colsAmount} spacing="lg" verticalSpacing={5}>{effect}</SimpleGrid></Flex>
    }

    function displaySetMembers(set: any, name: string, doubleEffect: boolean): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i += 2) {
            let bufferMembers: any[] = []
            let itemName: string = null
            bufferMembers.push(<Image fallbackSrc='/Blank.png' key={`set-members-${i}-${id}`} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} title={set.Pieces[i]} w={16} h={16} />, ' ')

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
                    if ((variant && itemName === name.slice(0, -2)) || (!variant && itemName === name)) {
                        bufferMembers.push(<strong key={`set-current-member-${id}`}>{itemName}</strong>)
                    } else {
                        bufferMembers.push(itemName)
                    }
                } else {
                    if (set.Pieces[i + 1] === name) {
                        bufferMembers.push(<strong key={`set-current-member-${id}`}>{itemName}</strong>)
                    } else {
                        bufferMembers.push(itemName)
                    }
                }
            } else {
                if (set.Pieces[i + 1] === name) {
                    bufferMembers.push(<strong key={`set-current-member-${id}`}>{set.Pieces[i + 1]}</strong>)
                } else {
                    bufferMembers.push(set.Pieces[i + 1])
                }
            }
            members.push(<Flex align="center" key={`set-members-flex-${id}`} gap={5}>{bufferMembers}</Flex>)
        }

        let bufferMembers: any[] = []
        switch (language.language) {
            case 'English':
            case 'Global':
                if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={`set-line-break-1-${id}`} />, <br key={`set-line-break-2-${id}`} />)
                else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={`set-line-break-1-${id}`} />, <br key={`set-line-break-2-${id}`} />)
                break;
            case 'JP':
                if (doubleEffect) bufferMembers.push(`${set.Required + 1}種装備が必要`, <br key={`set-line-break-1-${id}`} />, <br key={`set-line-break-2-${id}`} />)
                else bufferMembers.push(`${set.Required}種装備が必要`, <br key={`set-line-break-1-${id}`} />, <br key={`set-line-break-2-${id}`} />)
                break;
        }

        if (members.length > 2) {
            bufferMembers.push(<SimpleGrid key={`set-members-grid-${id}`} cols={3} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
        } else {
            bufferMembers.push(<SimpleGrid key={`set-members-grid-${id}`} cols={2} spacing="xs" verticalSpacing={3}>{members}</SimpleGrid>)
        }

        if (variant) {
            switch (language.language) {
                case 'English':
                    bufferMembers.push(<br key={`set-variant-line-break-1-${id}`} />, <strong key={`set-variant-strong-${id}`}>Note: </strong>, 'Any variant (a/b/c) combination works for this set');
                    break;
                case 'Global':
                    bufferMembers.push(<br key={`set-variant-line-break-1-${id}`} />, <strong key={`set-variant-strong-${id}`}>Note: </strong>, 'Any variant (A/B/C) combination works for this set');
                    break;
                case 'JP':
                    bufferMembers.push(<br key={`set-variant-line-break-1-${id}`} />, <strong key={`set-variant-strong-${id}`}>備考: </strong>, 'a/b/cヴァリアントのどの組み合わせでもセット効果が発生する。');
                    break;
            }
        }

        return bufferMembers
    }

    if (set) {
        let bufferReturn: any = []
        let bufferSetInfo: any = []
        const setInfoEN: string[] = ['Set Effect', 'Set Pieces']
        const setInfoJP: string[] = ['セット効果', '種装備']
        let setInfo: string[]
        language.language === 'JP' ? setInfo = setInfoJP : setInfo = setInfoEN
        console.log(set.Name, id)
        bufferSetInfo.push(
            <strong key={`set-info-strong-1-${id}`}>
                {setInfo[0]}:
            </strong>,
            <br key={`set-info-line-break-1-${id}`} />,
            displaySetEffect(set, false),
            <br key={`set-info-line-break-2-${id}`} />,
            <strong key={`set-info-strong-2-${id}`}>
                {setInfo[1]}:
            </strong>,
            <br key={`set-info-line-break-3-${id}`} />,
            displaySetMembers(set, name, false)
        )
        bufferReturn.push(
            <Tooltip key={`set-tooltip-${id}`} label={bufferSetInfo} color="dark">
                <Flex align="center" justify="center" key={`set-display-flex-${id}`} gap="xs">
                    <Image fallbackSrc='/Blank.png' key={`set-display-image-${id}`} src={`/icons/Set1.png`} alt="Set Effect 1" w={63} h={18} />
                </Flex>
            </Tooltip>
        )
        if (set.Doubles) {
            let bufferSetInfo: any = [
                <strong key={`set-info-double-strong-1-${id}`}>
                    Set Effect:
                </strong>,
                <br key={`set-info-double-line-break-1-${id}`} />,
                displaySetEffect(set, true),
                <br key={`set-info-double-line-break-2-${id}`} />,
                <strong key={`set-info-double-strong-2-${id}`}>
                    Set Pieces:
                </strong>,
                <br key={`set-info-double-line-break-3-${id}`} />,
                displaySetMembers(set, name, true)
            ]
            bufferReturn.push(
                <Tooltip key={`set-tooltip-double-${id}`} label={bufferSetInfo} color="dark">
                    <Flex align="center" justify="center" key={`set-display-double-flex-${id}`} gap="xs">
                        <Image fallbackSrc='/Blank.png' key={`set-display-image-${id}`} src={`/icons/Set2.png`} alt="Set Effect 2" w={63} h={18} />
                    </Flex>
                </Tooltip>
            )
        }
        return <Flex align="center" justify="center" key={`set-display-full-flex-${id}`} gap="xs">{bufferReturn}</Flex>
    } else {
        return '-'
    }
}