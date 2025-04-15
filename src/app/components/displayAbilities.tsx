import React from "react";
import abilityData from "../geardata/abilities.json"
import { Flex, Image, SimpleGrid, Tooltip } from '@mantine/core';
import { useLanguageContext } from "../language-provider";

interface DisplayAbilitiesProps {
    abilities: string[] | string;
    id?: number
}

export default function DisplayAbilities({ abilities, id }: DisplayAbilitiesProps) {
    const language = useLanguageContext()
    const buffer: JSX.Element[] = []
    let imageIcon: string = 'Ability';
    if (!id) id = 0

    function displayEffect(index: number, effect: (string|number)[]): React.ReactNode {
        const abEffect: React.ReactNode[] = []
        const effectDescription:(string|number) = effect[index]
        const effectValue:(string|number) = effect[index+1]
        if (!isNaN(Number(effectValue))) {
            let abIcon: (string|number) = null
            switch (effectDescription) {
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
                    abIcon = effectDescription
            }
            if (abIcon) {
                switch (abIcon) {
                    case 'HP':
                        if (Number(effectValue) >= 0) abEffect.push(<Flex align="center" justify="center" key={`ab-flex-hp-${index}-${id}`} gap={3}>HP+{effectValue}</Flex>)
                        else abEffect.push(<Flex align="center" justify="center" key={`ab-flex-hp-${index}-${id}`} gap={3}>HP{effectValue}</Flex>)
                        break;
                    case 'PP':
                        if (Number(effectValue) >= 0) abEffect.push(<Flex align="center" justify="center" key={`ab-flex-pp-${index}-${id}`} gap={3}>PP+{effectValue}</Flex>)
                        else abEffect.push(<Flex align="center" justify="center" key={`ab-flex-pp-${index}-${id}`} gap={3}>PP{effectValue}</Flex>)
                        break;
                    case 'ATK':
                        if (Number(effectValue) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={`ab-flex-satk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-satk-${index}-${id}`} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-ratk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-ratk-${index}-${id}`} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-tatk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tatk-${index}-${id}`} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{effectValue}</Flex>
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={`ab-flex-satk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-satk-${index}-${id}`} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> {effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-ratk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-ratk-${index}-${id}`} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> {effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-tatk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tatk-${index}-${id}`} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> {effectValue}</Flex>
                            )
                        }
                        break;
                    case 'DEF':
                        if (Number(effectValue) >= 0) {
                            abEffect.push(
                                <Flex align="center" justify="center" key={`ab-flex-sdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-sdef-${index}-${id}`} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-rdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-rdef-${index}-${id}`} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-tdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tdef-${index}-${id}`} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{effectValue}</Flex>
                            )
                        } else {
                            abEffect.push(
                                <Flex align="center" justify="center" key={`ab-flex-sdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-sdef-${index}-${id}`} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> {effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-rdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-rdef-${index}-${id}`} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> {effectValue}</Flex>,
                                <Flex align="center" justify="center" key={`ab-flex-tdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tdef-${index}-${id}`} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> {effectValue}</Flex>
                            )
                        }
                        break;
                    case 'All Stats':
                        abEffect.push(
                            <Flex align="center" justify="center" key={`ab-flex-satk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-satk-${index}-${id}`} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-ratk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-ratk-${index}-${id}`} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-tatk-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tatk-${index}-${id}`} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-sdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-sdef-${index}-${id}`} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-rdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-rdef-${index}-${id}`} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-tdef-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-tdef-${index}-${id}`} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{effectValue}</Flex>,
                            <Flex align="center" justify="center" key={`ab-flex-dex-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`ab-dex-${index}-${id}`} src={`/icons/DEX.png`} alt="DEX" w={16} h={16} /> +{effectValue}</Flex>,
                        )
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
                        abEffect.push(<Flex align="center" justify="center" key={`flex-${effectDescription}-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`${effectDescription}-${index}-${id}`} src={`/icons/${effectDescription.toString().replace(' ', '')}.png`} alt={effectDescription.toString()} w={16} h={16} /> +{effectValue}%</Flex>)
                        break;
                    case 'All Resistance':
                        abEffect.push(
                            <Flex align="center" justify="center" key={`StrikeResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`StrikeResistance-${index}-${id}`} src={`/icons/StrikeResistance.png`} alt="Strike Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`RangedResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`RangedResistance-${index}-${id}`} src={`/icons/RangedResistance.png`} alt="Ranged Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`TechResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`TechResistance-${index}-${id}`} src={`/icons/TechResistance.png`} alt="Tech Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`FireResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`FireResistance-${index}-${id}`} src={`/icons/FireResistance.png`} alt="Fire Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`IceResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`IceResistance-${index}-${id}`} src={`/icons/IceResistance.png`} alt="Ice Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`LightningResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`LightningResistance-${index}-${id}`} src={`/icons/LightningResistance.png`} alt="Lightning Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`WindResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`WindResistance-${index}-${id}`} src={`/icons/WindResistance.png`} alt="Wind Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`LightResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`LightResistance-${index}-${id}`} src={`/icons/LightResistance.png`} alt="Light Resistance" w={16} h={16} /> +{effectValue}%</Flex>,
                            <Flex align="center" justify="center" key={`DarkResistance-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`DarkResistance-${index}-${id}`} src={`/icons/DarkResistance.png`} alt="Dark Resistance" w={16} h={16} /> +{effectValue}%</Flex>
                        )
                        break;
                    default:
                        if (Number(effectValue) >= 0) {
                            abEffect.push(<Flex align="center" justify="center" key={`flex-${effectDescription}-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`${effectDescription}-${index}-${id}`} src={`/icons/${effectDescription.toString().replace(' ', '')}.png`} alt={effectDescription.toString()} w={16} h={16} /> +{effectValue}</Flex>)
                        } else {
                            abEffect.push(<Flex align="center" justify="center" key={`flex-${effectDescription}-${index}-${id}`} gap={3}><Image fallbackSrc='/Blank.png' key={`${effectDescription}-${index}-${id}`} src={`/icons/${effectDescription.toString().replace(' ', '')}.png`} alt={effectDescription.toString()} w={16} h={16} /> {effectValue}</Flex>)
                        }
                }
            } else {
                if (effectDescription === 'Weapon EXP when grinding' || effectDescription === '新世武器強化時の経験値が増加する') {
                    abEffect.push(<Flex align="center" justify="center" key={`weap-exp-flex-${index}-${id}`} gap={3}>{effectDescription}+{effectValue}</Flex>)
                } else {
                    abEffect.push(<Flex align="center" justify="center" key={`${effectDescription}-${index}-${id}`} gap={3}>{effectDescription}+{effectValue}%</Flex>)
                }
            }
        } else {
            if (isNaN(Number(effectDescription))) {
                const effectBR: React.ReactNode[] = []
                for (let i = 0, j = 0; j < String(effectDescription).length; j++) {
                    if (effectDescription[j] === '\n') {
                        effectBR.push(<br key={`linebreak-${index}-${j}-${index}-${id}`} />)
                    } else {
                        effectBR.push(effectDescription[j])
                    }
                }
                abEffect.push(effectBR)
            }
        }
        return abEffect
    }

    function printLayout(abEffect: React.ReactNode, length: number, check: boolean, index?: number): React.ReactNode {
        if(!index) index = 0
        if (!check) {
            return <SimpleGrid key={`grid-${index}-${id}`} cols={1} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
        } else {
            switch (length) {
                case 1:
                case 2:
                case 3:
                    return <SimpleGrid key={`grid-${index}-${id}`} cols={1} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                case 4:
                case 5:
                    return <SimpleGrid key={`grid-${index}-${id}`} cols={2} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                default:
                    return <SimpleGrid key={`grid-${index}-${id}`} cols={3} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
            }
        }
    }

    interface AbilityInterface{
        "SSA Slot"?: number
        "Name (JP)"?: string
        "Name (English)": string
        "Name (Global)"?: string
        "Effect (JP)"?: (string|number)[]
        "Effect (English)"?: (string|number|null)[]
        "Effect (Global)"?: (string|number)[]
        "Category"?: string
        "Effect"?: (string|number)[]
        "Condition (JP)"?: (string|number)[]
        "Condition (English)"?: (string|number)[]
        "Condition (Global)"?: (string|number)[]
    }

    if (abilities) {
        let name: string = ''
        let effect: (string|number)[] = ['']
        let ab: AbilityInterface
        if (typeof (abilities) === 'string') {
            ab = abilityData.find(ab => ab['Name (English)'] === abilities)
            switch (language.language) {
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
                let abEffect: React.ReactNode[] = []
                imageIcon = 'SpecialAbility'
                let image: JSX.Element = <Image fallbackSrc='/Blank.png' key={`saf-icon-${id}`} src={`/icons/${imageIcon}.png`} alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} />
                let checkLength: boolean = false
                let check: boolean = false
                for (let j = 0; j < effect.length; j++) {
                    if (effect[j] && String(effect[j]).length > 100) checkLength = true
                    if (effect[j] === 'ATK' || effect[j] === 'DEF' || effect[j] === 'All Stats' || effect[j] === 'All Resistance') check = true
                    abEffect[j] = displayEffect(j, effect)
                }
                let abPrint: React.ReactNode = printLayout(abEffect, abEffect.length, check)
                if (checkLength) {
                    buffer.push(
                        <Tooltip key={`tooltip-saf-${id}`} label={abPrint} color="dark" multiline w={600}>
                            <Flex align="center" key={`tooltip-saf-flex-${id}`} gap={5}>
                                {image} {name}
                            </Flex>
                        </Tooltip>
                    )
                } else {
                    buffer.push(
                        <Tooltip key={`tooltip-saf-${id}`} label={abPrint} color="dark">
                            <Flex align="center" key={`tooltip-saf-flex-${id}`} gap={5}>
                                {image} {name}
                            </Flex>
                        </Tooltip>
                    )
                }
            } else {
                return <Flex align="center" key={`error-flex-${id}`} gap={5}><Image fallbackSrc='/Blank.png' key={`error-${id}`} src="/icons/RestrictedYellow.png" alt="Error" w={16} h={16} /> !Ability not found: {abilities}!</Flex>
            }
            return buffer
        } else {
            let imageLabel: string
            switch (language.language) {
                case "JP":
                    imageLabel = "特殊能力追加"
                    break;
                case "Global":
                    imageLabel = "Augment"
                    break;
                default:
                    imageLabel = "Ability"
            }
            for (let i = 0; i < abilities.length; i++) {
                let ab: AbilityInterface = abilityData.find(ab => ab['Name (English)'] === abilities[i])
                switch (language.language) {
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
                    let abEffect: React.ReactNode[] = []
                    let check: boolean = false
                    let checkLength: boolean = false
                    for (let j = 0; j < effect.length; j++) {
                        if (effect[j] && String(effect[j]).length > 100) checkLength = true
                        if (effect[j] === 'ATK' || effect[j] === 'DEF' || effect[j] === 'All Stats' || effect[j] === 'All Resistance') check = true
                        abEffect[j] = displayEffect(j, effect)
                    }
                    let abPrint: React.ReactNode = printLayout(abEffect, abEffect.length, check, i)
                    if (checkLength) {
                        buffer.push(
                            <Tooltip key={`tooltip-ab-${i}-${id}`} label={abPrint} color="dark" multiline w={600}>
                                <Flex align="center" key={`tooltip-ab-flex-${i}-${id}`} gap={5}>
                                    <Image fallbackSrc='/Blank.png' key={`icon-${i}-${id}`} src={`/icons/${imageIcon}.png`} alt={imageLabel} title={imageLabel} w={16} h={16} />
                                    {name}
                                </Flex>
                            </Tooltip>
                        )
                    } else {
                        buffer.push(
                            <Tooltip key={`tooltip-ab-${i}-${id}`} label={abPrint} color="dark">
                                <Flex align="center" key={`tooltip-ab-flex-${i}-${id}`} gap={5}>
                                    <Image fallbackSrc='/Blank.png' key={`icon-${i}-${id}`} src={`/icons/${imageIcon}.png`} alt={imageLabel} title={imageLabel} w={16} h={16} />
                                    {name}
                                </Flex>
                            </Tooltip>
                        )
                    }
                } else {
                    buffer.push(
                        <Flex align="center" key={`error-flex-${i}-${id}`} gap={5}><Image fallbackSrc='/Blank.png' key={`error-${i}-${id}`} src="/icons/RestrictedYellow.png" alt="Error" w={16} h={16} /> !Ability not found: {abilities[i]}!</Flex>
                    )
                }
            }
        }
    } else {
        return '-'
    }
    if (buffer.length == 1)
        return <Flex align="center" key={`ab-return-flex-${id}`}>{buffer}</Flex>
    else
        return <SimpleGrid key={`ab-return-grid-${id}`} cols={2} spacing="md" verticalSpacing={0}>{buffer}</SimpleGrid>
}