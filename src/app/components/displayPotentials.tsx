import React from 'react';
import { Text, Flex, Image, SimpleGrid, Tooltip, List } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import potentialData from "../geardata/weapons/potentials.json"

export default function displayPotentials(potList: any[]): any[] {
    let buffer: any[] = []
    for (let i = 0; i < potList.length; i++) {
        let pot = potentialData.find(pot => pot[`Name (English)`] === potList[i])
        if (pot) {
            let unlockItem: string;
            let potTypeColor: string;
            let potName: string
            let potEffect: any

            if (pot[`Name (${localStorage.getItem('appLanguage')})`]) {
                potName = pot[`Name (${localStorage.getItem('appLanguage')})`].replace('(クリファド)','').replace(' (Qliphad)','').replace(' (Clifard)','');
                let potEffectWithLineBreaks: any[] = []
                for (let i = 0; i < pot[`Effect (${localStorage.getItem('appLanguage')})`].length; i++) {
                    if (pot[`Effect (${localStorage.getItem('appLanguage')})`][i] === '\n') {
                        potEffectWithLineBreaks.push(<br key={uuidv4()} />)
                    } else {
                        potEffectWithLineBreaks.push(pot[`Effect (${localStorage.getItem('appLanguage')})`][i])
                    }
                }
                potEffect = <Text key={uuidv4()}>{potEffectWithLineBreaks}</Text>
            } else {
                potName = pot["Name (English)"].replace('(クリファド)','').replace(' (Qliphad)','').replace(' (Clifard)','');
                potEffect = <Text key={uuidv4()}>{pot[`Effect (English})`]}</Text>
            }

            switch (pot.Special) {
                case 'New-Type':
                    potTypeColor = 'paleturquoise'
                    if (localStorage.getItem('appLanguage') === 'JP') unlockItem = 'フォトンドロップ'
                    else unlockItem = 'Photon Drop'
                    break;
                case 'Hidden':
                    potTypeColor = 'red';
                    if (localStorage.getItem('appLanguage') === 'JP') unlockItem = 'フォトンブースター'
                    else unlockItem = 'Photon Booster';
                    break;
                case 'Weaponoid':
                    potTypeColor = 'green';
                    if (localStorage.getItem('appLanguage') === 'JP') unlockItem = 'ウェポノイドブースター'
                    else unlockItem = 'Weaponoid Booster';
                    break;
                case 'Ether':
                    potTypeColor = 'blue';
                    if (localStorage.getItem('appLanguage') === 'JP') {
                        unlockItem = 'エーテルフューズ'
                    } else {
                        if (localStorage.getItem('appLanguage') === 'Global') {
                            unlockItem = 'Aether Fuse'
                        } else {
                            unlockItem = 'Ether Fuse';
                        }
                    }
                    break;
                case 'Qliphad':
                    potTypeColor = 'orange';
                    if (localStorage.getItem('appLanguage') === 'JP') {
                        unlockItem = 'クリファドフューズ'
                    } else {
                        if (localStorage.getItem('appLanguage') === 'Global') {
                            unlockItem = 'Cliffard Fuse'
                        } else {
                            unlockItem = 'Qliphad Fuse';
                        }
                    }
                    break;
                case 'Ultimate':
                    potTypeColor = 'indigo';
                    if (localStorage.getItem('appLanguage') === 'JP') unlockItem = 'アルティメットブースター'
                    else unlockItem = 'Ultimate Booster';
                    break;
                case 'Arena':
                    potTypeColor = 'yellow';
                    if (localStorage.getItem('appLanguage') === 'JP') unlockItem = 'アリーナブースター'
                    else unlockItem = 'Arena Booster';
                    break;
                case 'Luminmech':
                    potTypeColor = 'grape';
                    if (localStorage.getItem('appLanguage') === 'JP') {
                        unlockItem = '閃機片エメル'
                    } else {
                        if (localStorage.getItem('appLanguage') === 'Global') {
                            unlockItem = 'Luminfragment Emel'
                        } else {
                            unlockItem = 'Luminmech Emer Fragment';
                        }
                    }
                    break;
                default:
                    if (localStorage.getItem('appLanguage') === "JP") unlockItem = "フォトンスフィア"
                    else unlockItem = 'Photon Sphere';
            }
            let potUnlockString: any;
            switch (localStorage.getItem('appLanguage')) {
                case "English":
                    potUnlockString =
                        <Flex align="center" key={uuidv4()} gap={5}>
                            ※ Requires
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Tool.png" alt="Tool" w={16} h={16} />
                            <strong key={uuidv4()}>{unlockItem}s</strong> to unlock Potential
                        </Flex>
                    break;
                case "Global":
                    potUnlockString =
                        <Flex align="center" key={uuidv4()} gap={5}>
                            ※ Requires
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Tool.png" alt="Tool" w={16} h={16} />
                            <strong key={uuidv4()}>{unlockItem}s</strong> to unlock Potential
                        </Flex>
                    break;
                case "JP":
                    potUnlockString =
                        <Flex align="center" key={uuidv4()} gap={5}>
                            ※ 潜在能力を解放するには
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Tool.png" alt="Tool" w={16} h={16} />
                            <strong key={uuidv4()}>{unlockItem}</strong>が必要です。
                        </Flex>
                    break;

            }
            let tooltipText: any = <SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{potEffect}{potUnlockString}</SimpleGrid>
            if (pot[`Effect (English)`].length > 70) {
            //if (pot[`Effect (${localStorage.getItem('appLanguage')})`].length > 70) {
                if (localStorage.getItem('appLanguage') === "JP") {
                    buffer.push(
                        <Tooltip key={uuidv4()} label={tooltipText} color="dark" multiline w={600}>
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="潜在能力" title="潜在能力" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potName}</Text></Flex>
                        </Tooltip>
                    )
                } else {
                    buffer.push(
                        <Tooltip key={uuidv4()} label={tooltipText} color="dark" multiline w={600}>
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potName}</Text></Flex>
                        </Tooltip>
                    )
                }
            } else {
                if (localStorage.getItem('appLanguage') === "JP") {
                    buffer.push(
                        <Tooltip key={uuidv4()} label={tooltipText} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="潜在能力" title="潜在能力" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potName}</Text></Flex>
                        </Tooltip>
                    )
                } else {
                    buffer.push(
                        <Tooltip key={uuidv4()} label={tooltipText} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potName}</Text></Flex>
                        </Tooltip>
                    )
                }
            }
        } else {
            buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/RestrictedYellow.png" alt="Potential" title="Potential" w={16} h={16} /> !Potential not found: {potList[i]}</Flex>)
        }
    }
    return buffer;
}