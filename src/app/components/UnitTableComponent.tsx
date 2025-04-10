'use client'
import React, { useEffect } from 'react';
import { useLanguageContext } from "../language-provider";
import { Image, Flex, SimpleGrid, Table, LoadingOverlay } from '@mantine/core';
import DisplayAbilities from './DisplayAbilities';
import displaySet from './displaySet';
import DisplayStat from './DisplayStat';
import displayResistance from './displayResistance';
import Link from 'next/link';
import displayRarity from './DisplayRarity';
import units from '../geardata/units/units.json'

//import localFont from 'next/font/local'

//const myFont = localFont({src: '/Eurostile/eurostile-round-extended-medium.otf'})

export default function UnitTableComponent({ type, visible, setVisible }) {
    const language = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(units[0]);
    }
    let theadData: any = getHeadings();
    let filteredData: any

    useEffect(() => {
        setVisible.open()
        setTimeout(() => {
            parseData()
            setVisible.close()
        }, 0)
    }, [])

    useEffect(() => {
        setVisible.open()
        setTimeout(() => {
            parseData()
            setVisible.close()
        }, 0)
    }, [type, language.language])

    function parseData() {
        let tableHeader: string[]
        let headerEnglish: string[] = ["Icon", "Name", "Rarity", "Requirement", "DEF", "DEF (Max)", "HP", "PP", "ATK", "Resistances", "Abilities", "Set Effect"]
        let headerGlobal: string[] = ["Icon", "Name", "Rarity", "Requirement", "Def", "Def (Max)", "HP", "PP", "Pwr", "Resistances", "Augments", "Set Effect"]
        let headerJP: string[] = ["画像", "名称", "レア", "装備条件", "防御", "強化防御", "HP", "PP", "力", "耐性", "特殊能力", "セット効果"]
        switch (language.language) {
            case "Global": tableHeader = headerGlobal; filteredData = units.filter((key: any) => key["Name (Global)"] !== null).filter((key: any) => key["Type"] === type); break;
            case "JP": tableHeader = headerJP; filteredData = units.filter((key: any) => key["Name (JP)"] !== null).filter((key: any) => key["Type"] === type); break;
            default: tableHeader = headerEnglish; filteredData = units.filter((key: any) => key["Name (JP)"] !== null).filter((key: any) => key["Type"] === type);
        }

        filteredData.map((item: any, id: number) => {
            Object.assign(item, { id })
        })

        return (
            <Table highlightOnHover striped stickyHeader withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th key={`header-0`}><Flex justify="center" align="center" key={`header-flex-0`} gap={5}>{tableHeader[0]}</Flex></Table.Th>
                        <Table.Th key={`header-1`}><Flex justify="center" align="center" key={`header-flex-1`} gap={5}>{tableHeader[1]}</Flex></Table.Th>
                        <Table.Th key={`header-2`}><Flex justify="center" align="center" key={`header-flex-2`} gap={5}>{tableHeader[2]}</Flex></Table.Th>
                        <Table.Th key={`header-3`}><Flex justify="center" align="center" key={`header-flex-3`} gap={5}>{tableHeader[3]}</Flex></Table.Th>
                        <Table.Th key={`header-4`}><Flex justify="center" align="center" key={`header-flex-4`} gap={5}>{tableHeader[4]}</Flex></Table.Th>
                        <Table.Th key={`header-5`}><Flex justify="center" align="center" key={`header-flex-5`} gap={5}>{tableHeader[5]}</Flex></Table.Th>
                        <Table.Th key={`header-6`}><Flex justify="center" align="center" key={`header-flex-6`} gap={5}>{tableHeader[6]}</Flex></Table.Th>
                        <Table.Th key={`header-7`}><Flex justify="center" align="center" key={`header-flex-7`} gap={5}>{tableHeader[7]}</Flex></Table.Th>
                        <Table.Th key={`header-8`}><Flex justify="center" align="center" key={`header-flex-8`} gap={5}>{tableHeader[8]}</Flex></Table.Th>
                        <Table.Th key={`header-9`}><Flex justify="center" align="center" key={`header-flex-9`} gap={5}>{tableHeader[9]}</Flex></Table.Th>
                        {type !== 'sub' && <Table.Th key={`header-10`}><Flex justify="center" align="center" key={`header-flex-10`} gap={5}>{tableHeader[10]}</Flex></Table.Th>}
                        {type !== 'sub' && <Table.Th key={`header-11`}><Flex justify="center" align="center" key={`header-flex-11`} gap={5}>{tableHeader[11]}</Flex></Table.Th>}
                    </Table.Tr>
                </Table.Thead>
                {visible &&
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td colSpan={12} h={300} pos="relative">
                                <LoadingOverlay
                                    visible={visible}
                                    zIndex={1000}
                                    overlayProps={{ radius: 'sm', blur: 2 }}
                                    loaderProps={{ type: 'dots' }}
                                />
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                }
                {!visible &&
                    <Table.Tbody>
                        {filteredData.map((row: any, index: any) => {
                            let iconLabelEnglish: string = `Icon of ${row['Name (English)']}`
                            let iconLabelGlobal: string = `Icon of ${row['Name (Global)']}`
                            let iconLabelJP: string = `${row['Name (JP)']}のアイコン`
                            let iconLabel: string
                            switch (language.language) {
                                case "Global": iconLabel = iconLabelGlobal; break;
                                case "JP": iconLabel = iconLabelJP; break;
                                default: iconLabel = iconLabelEnglish; break;
                            }
                            return <Table.Tr key={`row-${row.id}`}>
                                {row["Name (English)"] && type !== 'Sub' && <Table.Td key={`icon-cell-${row.id}`}><Flex align="center" justify="center" key={`icon-flex-${row.id}`} gap={5}><Image fallbackSrc='/Blank.png' key={`icon-${row.id}`} src={`/units/${type}/${row['Name (English)'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['Name (English)']}`} w={64} h={64} /></Flex></Table.Td>}
                                {row["Name (English)"] && type === 'Sub' && <Table.Td key={`icon-cell-${row.id}`}><Flex align="center" justify="center" key={`icon-flex-${row.id}`} gap={5}><Image fallbackSrc='/units/sub/SubUnit.png' key={`icon-${row.id}`} src={`/units/${type}/${row['Name (English)'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['Name (English)']}`} w={64} h={64} /></Flex></Table.Td>}
                                {theadData.map((key: string, index: any) => {
                                    let itemName: any
                                    switch (language.language) {
                                        case "Global":
                                            itemName = <Table.Td key={`name-${row.id}`}>{row["Name (Global)"]}</Table.Td>; break;
                                        case "JP":
                                            itemName = <Table.Td key={`name-${row.id}`}><Link href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"].replace('リア／', '').replace('アーム／', '').replace('レッグ／', '').replace('サブ／', '').replace('a', '').replace('b', '').replace('c', '').replace('d', '').replace('e', '')}`}>{row["Name (JP)"]}</Link></Table.Td>
                                            break;
                                        default:
                                            itemName = <Table.Td key={`name-${row.id}`}><Flex justify="center" direction="column" key={`name-flex-${row.id}`} gap={5}>{row['Name (English)']}<br key={`name-line-break-${row.id}`} />{row['Name (JP)']}</Flex></Table.Td>
                                    }

                                    let bufferDEF: any[] = [];
                                    let bufferDEFMax: any[] = [];
                                    let bufferResistance: any[] = [];
                                    let bufferATK: any[] = [];
                                    let bufferProperties: any[] = [];
                                    switch (key) {
                                        case 'Name (JP)':
                                            return itemName
                                        case 'Type':
                                        case 'Name (English)':
                                        case 'Name (Global)':
                                        case 'Default Sub Icon':
                                        case 'id':
                                            return
                                        case 'Rarity':
                                            return <Table.Td key={`rarity-${row.id}`} className="centerCell"><Flex align="center" justify="center" key={`rarity-flex-${row.id}`} gap={5}>{displayRarity(row[key])}</Flex></Table.Td>
                                        case 'Requirement':
                                            return <Table.Td key={`req-${row.id}`}><Flex align="center" justify="center" key={`req-flex-${row.id}`} gap={5}>{DisplayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                        case 'S-DEF':
                                        case 'R-DEF':
                                        case 'T-DEF':
                                            if (row['S-DEF'] >= 0) {
                                                bufferDEF.push(DisplayStat('S-DEF', row['S-DEF']));
                                                bufferDEFMax.push(DisplayStat('S-DEF', calculateMaxDef(row['S-DEF'])));
                                            }
                                            if (row['R-DEF'] >= 0) {
                                                bufferDEF.push(DisplayStat('R-DEF', row['R-DEF']));
                                                bufferDEFMax.push(DisplayStat('R-DEF', calculateMaxDef(row['R-DEF'])));
                                            }
                                            if (row['T-DEF'] >= 0) {
                                                bufferDEF.push(DisplayStat('T-DEF', row['T-DEF']));
                                                bufferDEFMax.push(DisplayStat('T-DEF', calculateMaxDef(row['T-DEF'])));
                                            }
                                            if (index === 6) {
                                                return (
                                                    <React.Fragment key={`def-fragment-${row.id}`}>
                                                        <Table.Td key={`def-${row.id}`}><Flex justify="center" align="center" direction="column" key={`def-flex-${row.id}`} gap={0}>{bufferDEF}</Flex></Table.Td>
                                                        <Table.Td key={`def-max-${row.id}`}><Flex justify="center" align="center" direction="column" key={`def-max-flex-${row.id}`} gap={0}>{bufferDEFMax}</Flex></Table.Td>
                                                    </React.Fragment>
                                                )
                                            }
                                        case 'S-ATK':
                                        case 'R-ATK':
                                        case 'T-ATK':
                                        case 'DEX':
                                            if (row['S-ATK']) {
                                                bufferATK.push(DisplayStat('S-ATK', row['S-ATK']));
                                            }
                                            if (row['R-ATK']) {
                                                bufferATK.push(DisplayStat('R-ATK', row['R-ATK']));
                                            }
                                            if (row['T-ATK']) {
                                                bufferATK.push(DisplayStat('T-ATK', row['T-ATK']));
                                            }
                                            if (row['DEX']) {
                                                bufferATK.push(DisplayStat('DEX', row['DEX']));
                                            }
                                            if (index === 11) {
                                                if (bufferATK[0]) return <Table.Td key={`atk-${row.id}`}><Flex justify="center" align="center" direction="column" key={`atk-flex-${row.id}`} gap={0}>{bufferATK}</Flex></Table.Td>
                                                else return <Table.Td key={`atk-${row.id}`}><Flex justify="center" align="center" direction="column" key={`atk-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                            }
                                        case 'Strike Resistance':
                                        case 'Ranged Resistance':
                                        case 'Tech Resistance':
                                        case 'Fire Resistance':
                                        case 'Ice Resistance':
                                        case 'Lightning Resistance':
                                        case 'Wind Resistance':
                                        case 'Light Resistance':
                                        case 'Dark Resistance':
                                            if (row['Strike Resistance']) {
                                                bufferResistance.push(displayResistance('Strike Resistance', row['Strike Resistance']));
                                            }
                                            if (row['Ranged Resistance']) {
                                                bufferResistance.push(displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                            }
                                            if (row['Tech Resistance']) {
                                                bufferResistance.push(displayResistance('Tech Resistance', row['Tech Resistance']));
                                            }
                                            if (row['Fire Resistance']) {
                                                bufferResistance.push(displayResistance('Fire Resistance', row['Fire Resistance']));
                                            }
                                            if (row['Ice Resistance']) {
                                                bufferResistance.push(displayResistance('Ice Resistance', row['Ice Resistance']));
                                            }
                                            if (row['Lightning Resistance']) {
                                                bufferResistance.push(displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                            }
                                            if (row['Wind Resistance']) {
                                                bufferResistance.push(displayResistance('Wind Resistance', row['Wind Resistance']));
                                            }
                                            if (row['Light Resistance']) {
                                                bufferResistance.push(displayResistance('Light Resistance', row['Light Resistance']));
                                            }
                                            if (row['Dark Resistance']) {
                                                bufferResistance.push(displayResistance('Dark Resistance', row['Dark Resistance']));
                                            }
                                            if (index === 14) {
                                                if (bufferResistance[0]) return <Table.Td key={`res-${row.id}`}><Flex justify="center" align="center" key={`res-flex-${row.id}`} gap={5}><SimpleGrid key={`res-grid-${row.id}`} cols={3} spacing="xs" verticalSpacing={0}>{bufferResistance}</SimpleGrid></Flex></Table.Td>
                                                else return <Table.Td key={`res-${row.id}`}><Flex justify="center" align="center" direction="column" key={`res-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                            }
                                            else return
                                        case 'Abilities':
                                        case 'SAF':
                                            if (row['SAF']) {
                                                bufferProperties.push(DisplayAbilities(row['SAF']))
                                            }
                                            if (row['Abilities']) {
                                                bufferProperties.push(DisplayAbilities(row['Abilities']))
                                            }
                                            if (index === 23) {
                                                if (bufferProperties[0]) return <Table.Td key={`properties-${row.id}`}><SimpleGrid key={`properties-grid-${row.id}`} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                                else return <Table.Td key={`properties-${row.id}`}><Flex justify="center" align="center" direction="column" key={`properties-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                            } else {
                                                return;
                                            }
                                        case 'Set':
                                            return <Table.Td key={`set-${row.id}`}><Flex justify="center" align="center" direction="column" key={`set-flex-${row.id}`} gap={0}>{displaySet(row[key], row['Name (English)'])}</Flex></Table.Td>
                                        case 'HP':
                                            if(row["HP"]){
                                                return <Table.Td key={`hp-${row.id}`}><Flex justify="center" align="center" direction="column" key={`hp-flex-${row.id}`} gap={0}>{row["HP"]}</Flex></Table.Td>
                                            }else{
                                                return <Table.Td key={`hp-${row.id}`}><Flex justify="center" align="center" direction="column" key={`hp-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                            }
                                        case 'PP':
                                            if(row["PP"]){
                                                return <Table.Td key={`pp-${row.id}`}><Flex justify="center" align="center" direction="column" key={`pp-flex-${row.id}`} gap={0}>{row["PP"]}</Flex></Table.Td>
                                            }else{
                                                return <Table.Td key={`pp-${row.id}`}><Flex justify="center" align="center" direction="column" key={`pp-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                            }
                                        case 'Default Sub Icon':
                                            return
                                        case 'id':
                                            return
                                    }
                                })}
                            </Table.Tr>
                        })}
                    </Table.Tbody>
                }
            </Table >
        );
    }

    function calculateMaxDef(baseDEF: number): number {
        return Math.trunc((baseDEF * 140) / 100)
    }

    return parseData()
}