import React from 'react';
import { Text, Flex, Image, SimpleGrid, Tooltip } from '@mantine/core';
import potentialData from "../geardata/weapons/potentials.json"
import { useLanguageContext } from '../language-provider';

interface DisplayPotentialProps {
    potentialList: string[]
    id?: number
}

export default function DisplayPotentials({ potentialList, id }: DisplayPotentialProps): any[] {
    const language = useLanguageContext()
    let buffer: any[] = []
    if (!id) id = 0

    for (let i = 0; i < potentialList.length; i++) {
        let pot = potentialData.find(pot => pot[`Name (English)`] === potentialList[i])
        if (pot) {
            let unlockItem: string;
            let potTypeColor: string;
            let potTypeName: string = ''
            let potName: string
            let potEffect: any

            if (pot[`Name (${language.language})`]) {
                potName = pot[`Name (${language.language})`].replace('(クリファド)', '').replace(' (Qliphad)', '').replace(' (Clifard)', '');
                let potEffectWithLineBreaks: any[] = []
                for (let i = 0; i < pot[`Effect (${language.language})`].length; i++) {
                    if (pot[`Effect (${language.language})`][i] === '\n') {
                        potEffectWithLineBreaks.push(<br key={`pot-effect-line-break-${i}-${id}`} />)
                    } else {
                        potEffectWithLineBreaks.push(pot[`Effect (${language.language})`][i])
                    }
                }
                potEffect = <Text key={`pot-effect-text-${id}`}>{potEffectWithLineBreaks}</Text>
            } else {
                potName = pot["Name (English)"].replace('(クリファド)', '').replace(' (Qliphad)', '').replace(' (Clifard)', '');
                potEffect = <Text key={`pot-effect-text-${id}`}>{pot[`Effect (English})`]}</Text>
            }

            switch (pot.Special) {
                case 'New-Type':
                    potTypeColor = 'paleturquoise'
                    if (language.language === 'JP') {
                        unlockItem = 'フォトンドロップ'
                        potTypeName = '★1~6潜在能力'
                    } else {
                        language.language === 'Global' ? potTypeName = '★1~6' : potTypeName = '★1~6'
                        unlockItem = 'Photon Drop'
                    }
                    break;
                case 'Hidden':
                    potTypeColor = 'red';
                    if (language.language === 'JP') {
                        unlockItem = 'フォトンブースター'
                        potTypeName = '隠し潜在能力'
                    } else {
                        unlockItem = 'Photon Booster'
                        potTypeName = 'Hidden'
                    };
                    break;
                case 'Weaponoid':
                    potTypeColor = 'green';
                    if (language.language === 'JP') {
                        unlockItem = 'ウェポノイドブースター'
                        potTypeName = 'ウェポノイド潜在能力'
                    } else {
                        unlockItem = 'Weaponoid Booster';
                        potTypeName = 'Weaponoid'
                    }
                    break;
                case 'Ether':
                    potTypeColor = 'blue';
                    if (language.language === 'JP') {
                        unlockItem = 'エーテルフューズ'
                        potTypeName = 'エーテル潜在能力'
                    }
                    else {
                        if (language.language === 'Global') {
                            unlockItem = 'Aether Fuse'
                            potTypeName = 'Aether'
                        } else {
                            unlockItem = 'Ether Fuse'
                            potTypeName = 'Ether'
                        }
                    }
                    break;
                case 'Qliphad':
                    potTypeColor = 'orange';
                    if (language.language === 'JP') {
                        unlockItem = 'クリファドフューズ'
                        potTypeName = 'クリファド潜在能力'
                    } else {
                        if (language.language === 'Global') {
                            unlockItem = 'Cliffard Fuse'
                            potTypeName = 'Cliffard'
                        } else {
                            unlockItem = 'Qliphad Fuse'
                            potTypeName = 'Qliphad'
                        }
                    }
                    break;
                case 'Ultimate':
                    potTypeColor = 'indigo';
                    if (language.language === 'JP') {
                        unlockItem = 'アルティメットブースター'
                        potTypeName = 'アルティメット'
                    } else {
                        unlockItem = 'Ultimate Booster'
                        potTypeName = 'Ultimate'
                    }
                    break;
                case 'Arena':
                    potTypeColor = 'yellow';
                    if (language.language === 'JP') {
                        unlockItem = 'アリーナブースター'
                        potTypeName = 'アリーナ'
                    } else {
                        unlockItem = 'Arena Booster'
                        potTypeName = 'Arena'
                    }
                    break;
                case 'Luminmech':
                    potTypeColor = 'grape';
                    if (language.language === 'JP') {
                        unlockItem = '閃機片エメル'
                        potTypeName = '閃機'
                    } else {
                        language.language === 'Global' ? unlockItem = 'Luminfragment Emel' : unlockItem = 'Luminmech Emer Fragment';
                        potTypeName = 'Luminmech'
                    }
                    break;
                default:
                    language.language === "JP" ? unlockItem = "フォトンスフィア" : unlockItem = 'Photon Sphere'
            }
            let potUnlockString: any;
            language.language === 'JP' ?
                potUnlockString =
                <Flex align="center" key={`pot-unlock-flex-${id}`} gap={5}>
                    ※ {potTypeName}潜在能力を解放するには
                    <Image fallbackSrc='/Blank.png' key={`pot-unlock-image-${id}`} src="/icons/Tool.png" alt="Tool" w={16} h={16} />
                    <strong key={`pot-unlock-strong-${id}`}>{unlockItem}</strong>が必要です。
                </Flex>
                :
                potUnlockString =
                <Flex align="center" key={`pot-unlock-flex-${id}`} gap={5}>
                    ※ Requires
                    <Image fallbackSrc='/Blank.png' key={`pot-unlock-image-${id}`} src="/icons/Tool.png" alt="Tool" w={16} h={16} />
                    <strong key={`pot-unlock-strong-${id}`}>{unlockItem}s</strong> to unlock {potTypeName && potTypeName + ' '}Potential
                </Flex>
            let tooltipText: any = <SimpleGrid key={`pot-tooltip-${id}`} cols={1} spacing={0} verticalSpacing={5}>{potEffect}{potUnlockString}</SimpleGrid>
            let potLoc: string = ''
            language.language === "JP" ? potLoc = '潜在能力' : potLoc = 'Potential'
            pot[`Effect (English)`].length > 70
                //pot[`Effect (${language.language})`].length > 70
                ?
                buffer.push(
                    <Tooltip key={`pot-tooltip-${id}`} label={tooltipText} color="dark" multiline w={600}>
                        <Flex align="center" key={`pot-tooltip-flex-${id}`} gap={5}>
                            <Image fallbackSrc='/Blank.png' key={`pot-tooltip-image-${id}`} src="/icons/Potential.png" alt={potLoc} title={potLoc} w={16} h={16} />
                            <Text c={potTypeColor} key={`pot-tooltip-text-${id}`}>
                                {potName}
                            </Text>
                        </Flex>
                    </Tooltip>
                )
                :
                buffer.push(
                    <Tooltip key={`pot-tooltip-${id}`} label={tooltipText} color="dark">
                        <Flex align="center" key={`pot-tooltip-flex-${id}`} gap={5}>
                            <Image fallbackSrc='/Blank.png' key={`pot-tooltip-image-${id}`} src="/icons/Potential.png" alt={potLoc} title={potLoc} w={16} h={16} />
                            <Text c={potTypeColor} key={`pot-tooltip-text-${id}`}>
                                {potName}
                            </Text>
                        </Flex>
                    </Tooltip>
                )
        } else {
            buffer.push(
                <Flex align="center" key={`pot-error-flex-${id}`} gap={5}>
                    <Image fallbackSrc='/Blank.png' key={`pot-error-image-${id}`} src="/icons/RestrictedYellow.png" alt="Potential" title="Potential" w={16} h={16} />
                    <Text c='red' key={`pot-tooltip-text-${id}`}>
                        !Error: Potential not found: {potentialList[i]!}
                    </Text>
                </Flex>
            )
        }
    }
    return buffer;
}