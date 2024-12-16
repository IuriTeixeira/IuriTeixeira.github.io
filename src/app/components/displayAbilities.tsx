import React, { Fragment } from "react";
import abilityData from "../geardata/abilities.json"
import { Flex, Image, SimpleGrid, Table, Tooltip } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

export default function displayAbilities(abilities: any[], SSA: boolean): any {
    let buffer: any[] = []
    if (abilities) {
        if (SSA) {
            let image = <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} />
            buffer.push(
                <Flex align="center" key={uuidv4()} gap={5}>
                    {image} {abilities}
                </Flex>
            )
        } else {
            let image = <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Ability.png" alt="Ability" title="Ability" w={16} h={16} />
            for (let i = 0; i < abilities.length; i++) {
                let ab = abilityData.find(ab => ab.Name === abilities[i])
                if (ab) {
                    let abEffect: any[] = []
                    let check: boolean = false
                    for (let j = 0; j < ab.Effect.length; j++) {
                        if (!isNaN(Number(ab.Effect[j + 1]))) {
                            let abIcon: any = null
                            switch (ab.Effect[j]) {
                                case 'Meseta Droprate':
                                case 'Item Drop Rate':
                                case 'Experience Gained':
                                    abIcon = null;
                                    break;
                                default:
                                    abIcon = ab.Effect[j]
                            }
                            if (abIcon) {
                                switch (abIcon) {
                                    case 'HP':
                                        abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>HP+{ab.Effect[j + 1]}</Flex>)
                                        break;
                                    case 'PP':
                                        abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}>PP+{ab.Effect[j + 1]}</Flex>)
                                        break;
                                    case 'ATK':
                                        check = true;
                                        abEffect.push(
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>
                                        )
                                        break;
                                    case 'DEF':
                                        check = true;
                                        abEffect.push(
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>
                                        )
                                        break;
                                    case 'All Stats':
                                        check = true;
                                        abEffect.push(
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-ATK.png`} alt="S-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-ATK.png`} alt="R-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-ATK.png`} alt="T-ATK" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/S-DEF.png`} alt="S-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/R-DEF.png`} alt="R-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/T-DEF.png`} alt="T-DEF" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DEX.png`} alt="DEX" w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>,
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
                                        abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${ab.Effect[j].toString().replace(' ', '')}.png`} alt={ab.Effect[j].toString()} w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>)
                                        break;
                                    case 'All Resistance':
                                        check = true;
                                        abEffect.push(
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/StrikeResistance.png`} alt="Strike Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/RangedResistance.png`} alt="Ranged Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/TechResistance.png`} alt="Tech Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/FireResistance.png`} alt="Fire Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/IceResistance.png`} alt="Ice Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightningResistance.png`} alt="Lightning Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/WindResistance.png`} alt="Wind Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/LightResistance.png`} alt="Light Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>,
                                            <Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/DarkResistance.png`} alt="Dark Resistance" w={16} h={16} /> +{ab.Effect[j + 1]}%</Flex>
                                        )
                                        break;
                                    default:
                                        abEffect.push(<Flex align="center" justify="center" key={uuidv4()} gap={3}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${ab.Effect[j].toString().replace(' ', '')}.png`} alt={ab.Effect[j].toString()} w={16} h={16} /> +{ab.Effect[j + 1]}</Flex>)
                                }
                            } else {
                                abEffect.push(ab.Effect[j], '+', ab.Effect[j + 1], '%')
                            }
                        } else {
                            if (isNaN(Number(ab.Effect[j]))) {
                                abEffect.push(ab.Effect[j])
                            }
                        }
                    }
                    let abPrint: any;
                    let switchCheck: number
                    if (check) {
                        switchCheck = abEffect.length
                    } else {
                        switchCheck = ab.Effect.length
                    }
                    switch (switchCheck) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            abPrint = <SimpleGrid key={uuidv4()} cols={1} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                            break;
                        case 6:
                        case 8:
                            abPrint = <SimpleGrid key={uuidv4()} cols={2} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                            break;
                        default:
                            abPrint = <SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={0}>{abEffect}</SimpleGrid>
                    }
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={abPrint} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}>
                                {image} {abilities[i]}
                            </Flex>
                        </Tooltip>
                    )
                } else {
                    buffer.push(
                        <Flex align="center" key={uuidv4()} gap={5}>
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Ability.png" alt="Ability" title="Ability" w={16} h={16} /> {abilities[i]}
                        </Flex>
                    )
                }
            }
        }
    } else {
        return '-'
    }
    if (SSA) return buffer
    else return <SimpleGrid key={uuidv4()} cols={2} spacing="md" verticalSpacing={0}>{buffer}</SimpleGrid>;
}