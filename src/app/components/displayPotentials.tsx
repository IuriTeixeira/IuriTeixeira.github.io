import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Text, Flex, Image, SimpleGrid, Tooltip, List } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import potentialData from "../geardata/weapons/weapon-data/potentials.json"

export default function displayPotentials(potList: any[]): any[] {
    const language = useLanguageContext()
    let buffer: any[] = []
    let localization: string
    switch (language.language) {
        case "Global": localization = "Global"; break;
        case "日本語": localization = "JP"; break;
        default: localization = "English";
    }
    for (let i = 0; i < potList.length; i++) {
        let pot = potentialData.find(pot => pot[`Name (English)`] === potList[i])
        if (pot) {
            let unlockItem: string;
            let potTypeColor: string;
            let potName: string
            let potEffect: any
            
            if (pot[`Name (${localization})`]) {
                potName = pot[`Name (${localization})`];
            } else {
                potName = pot["Name (English)"];
                localization = "English"
            }
            
            potEffect = <Text key={uuidv4()}>{pot[`Effect (${localization})`]}</Text>

            /*potEffect =
                <List>
                    <List.Item>Lv1: {pot[`Effect (${localization})`][0]}</List.Item>
                    <List.Item>Lv2: {pot[`Effect (${localization})`][1]}</List.Item>
                    <List.Item>Lv3: {pot[`Effect (${localization})`][2]}</List.Item>
                </List>*/
            
            switch (pot.Special) {
                case 'New-Type':
                    potTypeColor = 'paleturquoise'
                    if (localization === 'JP') unlockItem = 'フォトンドロップ'
                    else unlockItem = 'Photon Drop'
                    break;
                case 'Hidden':
                    potTypeColor = 'red';
                    if (localization === 'JP') unlockItem = 'フォトンブースター'
                    else unlockItem = 'Photon Booster';
                    break;
                case 'Weaponoid':
                    potTypeColor = 'green';
                    if (localization === 'JP') unlockItem = 'ウェポノイドブースター'
                    else unlockItem = 'Weaponoid Booster';
                    break;
                case 'Ether':
                    potTypeColor = 'blue';
                    if (localization === 'JP') {
                        unlockItem = 'エーテルフューズ'
                    } else {
                        if (localization === 'Global') {
                            unlockItem = 'Aether Fuse'
                        } else {
                            unlockItem = 'Ether Fuse';
                        }
                    }
                    break;
                case 'Qliphad':
                    potTypeColor = 'orange';
                    if (localization === 'JP') {
                        unlockItem = 'クリファドフューズ'
                    } else {
                        if (localization === 'Global') {
                            unlockItem = 'Cliffard Fuse'
                        } else {
                            unlockItem = 'Qliphad Fuse';
                        }
                    }
                    break;
                case 'Ultimate':
                    potTypeColor = 'indigo';
                    if (localization === 'JP') unlockItem = 'アルティメットブースター'
                    else unlockItem = 'Ultimate Booster';
                    break;
                case 'Arena':
                    potTypeColor = 'yellow';
                    if (localization === 'JP') unlockItem = 'アリーナブースター'
                    else unlockItem = 'Arena Booster';
                    break;
                case 'Luminmech':
                    potTypeColor = 'grape';
                    if (localization === 'JP') {
                        unlockItem = '閃機片エメル'
                    } else {
                        if (localization === 'Global') {
                            unlockItem = 'Luminfragment Emel'
                        } else {
                            unlockItem = 'Luminmech Emer Fragment';
                        }
                    }
                    break;
                default:
                    if (localization === "JP") unlockItem = "フォトンスフィア"
                    else unlockItem = 'Photon Sphere';
            }
            let potUnlockString: any;
            switch (localization) {
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
            if (pot[`Effect (${localization})`].length > 70) {
                if (localization === "JP") {
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
                if (localization === "JP") {
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