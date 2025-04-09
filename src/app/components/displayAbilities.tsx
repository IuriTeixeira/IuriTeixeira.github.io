import React from "react";
import abilityData from "../geardata/abilities.json"
import { Flex, Image, SimpleGrid, Tooltip } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

export default function displayAbilities(abilities: any[]): any {
    let buffer: any[] = []
    let imageIcon: string = 'Ability';

    function displayEffect(abEffect: any, index: number, effect: string): any {
        if (!isNaN(Number(effect[index + 1]))) {
            let abIcon: any = null
            switch (effect[index]) {
                case 'Meseta Earned':
                case 'Rare Drop Rate':
                case 'Experience Earned':
                case 'Experience Earned until Lv30':
                case 'Weapon EXP when grinding':
                case '出現するメセタが増加':
                case '取得する経験値が増加':
                case 'レアドロップ倍率が増加':
                case 'Lv30に到達するまで取得する経験値が増加する':
                case '新世武器強化時の経験値が増加する':
                    abIcon = null;
                    break;
                default:
                    abIcon = effect[index]
            }
            if (abIcon) {
                switch (abIcon) {
                    case 'HP':
                        if (Number(effect[index + 1]) >= 0) abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>HP+{effect[index + 1]}</Flex>)
                        else abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>HP{effect[index + 1]}</Flex>)
                        break;
                    case 'PP':
                        abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>PP+{effect[index + 1]}</Flex>)
                        break;
                    case 'ATK':
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>
                            )
                        }
                        break;
                    case 'DEF':
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>
                            )
                        }
                        break;
                    case 'All Stats':
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DEX.png`} alt="DEX" w={16} h={16} /> +{effect[index + 1]}</Flex>,
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> {effect[index + 1]}</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DEX.png`} alt="DEX" w={16} h={16} /> {effect[index + 1]}</Flex>,
                            )
                        }
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
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${effect[index].toString().replace(' ', '')}.png`} alt={effect[index].toString()} w={16} h={16} /> +{effect[index + 1]}%</Flex>)
                        } else {
                            abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${effect[index].toString().replace(' ', '')}.png`} alt={effect[index].toString()} w={16} h={16} /> {effect[index + 1]}%</Flex>)
                        }
                        break;
                    case 'All Resistance':
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/StrikeResistance.png`} alt="Strike Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/RangedResistance.png`} alt="Ranged Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/TechResistance.png`} alt="Tech Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/FireResistance.png`} alt="Fire Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/IceResistance.png`} alt="Ice Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightningResistance.png`} alt="Lightning Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/WindResistance.png`} alt="Wind Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightResistance.png`} alt="Light Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DarkResistance.png`} alt="Dark Resistance" w={16} h={16} /> +{effect[index + 1]}%</Flex>
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/StrikeResistance.png`} alt="Strike Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/RangedResistance.png`} alt="Ranged Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/TechResistance.png`} alt="Tech Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/FireResistance.png`} alt="Fire Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/IceResistance.png`} alt="Ice Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightningResistance.png`} alt="Lightning Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/WindResistance.png`} alt="Wind Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightResistance.png`} alt="Light Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>,
                                <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DarkResistance.png`} alt="Dark Resistance" w={16} h={16} /> {effect[index + 1]}%</Flex>
                            )
                        }
                        break;
                    default:
                        if (Number(effect[index + 1]) >= 0) {
                            abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${effect[index].toString().replace(' ', '')}.png`} alt={effect[index].toString()} w={16} h={16} /> +{effect[index + 1]}</Flex>)
                        } else {
                            abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${effect[index].toString().replace(' ', '')}.png`} alt={effect[index].toString()} w={16} h={16} /> {effect[index + 1]}</Flex>)
                        }
                }
            } else {
                if(effect[index] === 'Weapon EXP when grinding' || effect[index] === '新世武器強化時の経験値が増加する'){
                    abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>{effect[index]}+{effect[index + 1]}</Flex>)
                }else{
                    abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>{effect[index]}+{effect[index + 1]}%</Flex>)
                }
            }
        } else {
            if (isNaN(Number(effect[index]))) {
                let effectBR: any[] = []
                for (let i = 0, j = 0; j < effect[index].length; j++) {
                    if (effect[index][j] === '\n') {
                        effectBR.push(<br key={uuidv4()} />)
                    } else {
                        effectBR.push(effect[index][j])
                    }
                }
                abEffect.push(effectBR)
            }
        }
        return abEffect
    }

    function printLayout(abEffect: any, length: number, check: boolean): any {
        if (!check) {
            return <SimpleGrid key={uuidv4()} cols={1} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
        } else {
            switch (length) {
                case 1:
                case 2:
                case 3:
                    return <SimpleGrid key={uuidv4()} cols={1} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                case 4:
                case 5:
                    return <SimpleGrid key={uuidv4()} cols={2} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                default:
                    return <SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
            }
        }
    }

    if (abilities) {
        let name: string = ''
        let effect: string = ''
        let ab: any
        if (typeof (abilities) === 'string') {
            ab = abilityData.find(ab => ab['Name (English)'] === abilities)
            switch (localStorage.getItem('appLanguage')) {
                case 'Global':
                    if (ab) {
                        name = ab['Name (Global)'];
                        if (ab['Effect (Global)']) effect = ab['Effect (Global)']
                        else effect = ab['Effect (English)']
                    }
                    break;
                case 'JP':
                    if (ab) {
                        name = ab['Name (JP)'];
                        if (ab['Effect (JP)']) effect = ab['Effect (JP)']
                        else effect = ab['Effect (English)']
                    }
                    break;
                default:
                    if (ab) {
                        name = ab['Name (English)'];
                        effect = ab['Effect (English)']
                    }

            }
            if (ab) {
                let abEffect: any[] = []
                imageIcon = 'SpecialAbility'
                let image = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${imageIcon}.png`} alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} />
                let checkLength: boolean = false
                let check: boolean = false
                for (let j = 0; j < effect.length; j++) {
                    if (effect[j] && effect[j].length > 100) checkLength = true
                    if (effect[j] === 'ATK' || effect[j] === 'DEF' || effect[j] === 'All Stats' || effect[j] === 'All Resistance') check = true
                    abEffect = displayEffect(abEffect, j, effect)
                }
                let abPrint: any = printLayout(abEffect, abEffect.length, check)
                if (checkLength) {
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={abPrint} color="dark" multiline>
                            <Flex align="center" key={uuidv4()} gap={5}>
                                {image} {name}
                            </Flex>
                        </Tooltip>
                    )
                } else {
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={abPrint} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}>
                                {image} {name}
                            </Flex>
                        </Tooltip>
                    )
                }
            } else {
                return <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/RestrictedYellow.png" alt="Error" w={16} h={16} /> !Ability not found: {abilities}</Flex>
            }
            return buffer
        } else {
            let imageLabel: string
            switch (localStorage.getItem('appLanguage')) {
                case "JP":
                    imageLabel = "特殊能力追加"
                    break;
                case "Global":
                    imageLabel = "Augment"
                    break;
                default:
                    imageLabel = "Ability"
            }
            let image = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${imageIcon}.png`} alt={imageLabel} title={imageLabel} w={16} h={16} />
            for (let i = 0; i < abilities.length; i++) {
                let ab: any = abilityData.find(ab => ab['Name (English)'] === abilities[i])
                switch (localStorage.getItem('appLanguage')) {
                    case 'Global':
                        if (ab) {
                            name = ab['Name (Global)'];
                            if (ab['Effect (Global)']) effect = ab['Effect (Global)']
                            else effect = ab['Effect (English)']
                        }
                        break;
                    case 'JP':
                        if (ab) {
                            name = ab['Name (JP)'];
                            if (ab['Effect (JP)']) effect = ab['Effect (JP)']
                            else effect = ab['Effect (English)']
                        }
                        break;
                    default:
                        if (ab) {
                            name = ab['Name (English)'];
                            effect = ab['Effect (English)']
                        }

                }
                if (ab) {
                    let abEffect: any[] = []
                    let check: boolean = false
                    let checkLength: boolean = false
                    for (let j = 0; j < effect.length; j++) {
                        if (effect[j] && effect[j].length > 100) checkLength = true
                        if (effect[j] === 'ATK' || effect[j] === 'DEF' || effect[j] === 'All Stats' || effect[j] === 'All Resistance') check = true
                        abEffect = displayEffect(abEffect, j, effect)
                    }
                    let abPrint: any = printLayout(abEffect, abEffect.length, check)
                    if (checkLength) {
                        buffer.push(
                            <Tooltip className='centerCell' key={uuidv4()} label={abPrint} color="dark" multiline>
                                <Flex align="center" key={uuidv4()} gap={5}>
                                    {image} {name}
                                </Flex>
                            </Tooltip>
                        )
                    } else {
                        buffer.push(
                            <Tooltip className='centerCell' key={uuidv4()} label={abPrint} color="dark">
                                <Flex align="center" key={uuidv4()} gap={5}>
                                    {image} {name}
                                </Flex>
                            </Tooltip>
                        )
                    }
                } else {
                    buffer.push(
                        <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/RestrictedYellow.png" alt="Error" w={16} h={16} /> !Ability not found: {abilities[i]}</Flex>
                    )
                }
            }
        }
    } else {
        return '-'
    }
    if(buffer.length == 1)
        return <Flex align="center" key={uuidv4()}>{buffer}</Flex>
    else
        return <SimpleGrid key={uuidv4()} cols={2} spacing="md" verticalSpacing={0}>{buffer}</SimpleGrid>
}