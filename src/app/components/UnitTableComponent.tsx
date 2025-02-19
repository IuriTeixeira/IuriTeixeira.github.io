import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Image, Flex, SimpleGrid, Table } from '@mantine/core';
import './UnitTableComponent.css';
import '@mantine/core/styles/Table.layer.css';
import { v4 as uuidv4 } from 'uuid';
import displayAbilities from './displayAbilities';
import displaySet from './displaySet';
import displayStat from './displayStat';
import displayResistance from './displayResistance';
import Link from 'next/link';
import displayRarity from './displayRarity';

//import localFont from 'next/font/local'

//const myFont = localFont({src: '/Eurostile/eurostile-round-extended-medium.otf'})

export default function UnitTableComponent({ data, type }) {
    const language = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(data[0]);
    }
    let theadData: any = getHeadings();
    let tbodyData: any = data;

    function calculateMaxDef(baseDEF: number): number {
        return Math.trunc((baseDEF * 140) / 100)
    }

    let headerEnglish: string[] = ["Icon", "Name", "Rarity", "Requirement", "DEF", "DEF (Max)", "HP", "PP", "ATK", "Resistances", "Abilities", "Set Effect"]
    let headerGlobal: string[] = ["Icon", "Name", "Rarity", "Requirement", "Def", "Def (Max)", "HP", "PP", "Pwr", "Resistances", "Augments", "Set Effect"]
    let headerJP: string[] = ["画像", "名称", "レア", "装備条件", "防御", "強化防御", "HP", "PP", "力", "耐性", "特殊能力", "セット効果"]
    let tableHeader: string[]
    let filteredData: any
    switch (language.language) {
        case "Global": tableHeader = headerGlobal; filteredData = tbodyData.filter((key: any) => key["Name (Global)"] !== null).filter((key:any) => key["Type"] === type); break;
        case "JP": tableHeader = headerJP; filteredData = tbodyData.filter((key: any) => key["Name (JP)"] !== null).filter((key:any) => key["Type"] === type); break;
        default: tableHeader = headerEnglish; filteredData = tbodyData.filter((key: any) => key["Name (JP)"] !== null).filter((key:any) => key["Type"] === type);
    }

    filteredData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table highlightOnHover striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[0]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[1]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[2]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[3]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[4]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[5]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[6]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[7]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[8]}</Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[9]}</Table.Th>
                    {type !== 'sub' && <Table.Th key={uuidv4()} className="centerCell">{tableHeader[10]}</Table.Th>}
                    {type !== 'sub' && <Table.Th key={uuidv4()} className="centerCell">{tableHeader[11]}</Table.Th>}
                </Table.Tr>
            </Table.Thead>
            {<Table.Tbody>
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
                    return <Table.Tr key={uuidv4()}>
                        {row["Name (English)"] && type !== 'Sub' && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/${type}/${row['Name (English)'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['Name (English)']}`} w={64} h={64} /></Flex></Table.Td>}
                        {row["Name (English)"] && type === 'Sub' && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/units/sub/SubUnit.png' key={uuidv4()} src={`/units/${type}/${row['Name (English)'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['Name (English)']}`} w={64} h={64} /></Flex></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let itemName: any
                            switch (language.language) {
                                case "Global":
                                    itemName = <Table.Td key={uuidv4()}>{row["Name (Global)"]}</Table.Td>; break;
                                case "JP":
                                    itemName = <Table.Td key={uuidv4()}><Link href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"].replace('リア／', '').replace('アーム／', '').replace('レッグ／', '').replace('サブ／', '').replace('a', '').replace('b', '').replace('c', '').replace('d', '').replace('e', '')}`}>{row["Name (JP)"]}</Link></Table.Td>
                                    break;
                                default:
                                    itemName = <Table.Td key={uuidv4()}><Flex justify="center" direction="column" key={uuidv4()} gap={5}>{row['Name (English)']}<br key={uuidv4()} />{row['Name (JP)']}</Flex></Table.Td>
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
                                    return <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayRarity(row[key])}</Flex></Table.Td>
                                case 'Requirement':
                                    return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                case 'S-DEF':
                                case 'R-DEF':
                                case 'T-DEF':
                                    if (row['S-DEF'] >= 0) {
                                        bufferDEF.push(displayStat('S-DEF', row['S-DEF']));
                                        bufferDEFMax.push(displayStat('S-DEF', calculateMaxDef(row['S-DEF'])));
                                    }
                                    if (row['R-DEF'] >= 0) {
                                        bufferDEF.push(displayStat('R-DEF', row['R-DEF']));
                                        bufferDEFMax.push(displayStat('R-DEF', calculateMaxDef(row['R-DEF'])));
                                    }
                                    if (row['T-DEF'] >= 0) {
                                        bufferDEF.push(displayStat('T-DEF', row['T-DEF']));
                                        bufferDEFMax.push(displayStat('T-DEF', calculateMaxDef(row['T-DEF'])));
                                    }
                                    if (index === 6) {
                                        return (
                                            <React.Fragment key={uuidv4()}>
                                                <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferDEF}</Flex></Table.Td>
                                                <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferDEFMax}</Flex></Table.Td>
                                            </React.Fragment>
                                        )
                                    }
                                case 'S-ATK':
                                case 'R-ATK':
                                case 'T-ATK':
                                case 'DEX':
                                    if (row['S-ATK']) {
                                        bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                    }
                                    if (row['R-ATK']) {
                                        bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                    }
                                    if (row['T-ATK']) {
                                        bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                    }
                                    if (row['DEX']) {
                                        bufferATK.push(displayStat('DEX', row['DEX']));
                                    }
                                    if (index === 11) {
                                        if (bufferATK[0]) return <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferATK}</Flex></Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
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
                                        if (bufferResistance[0]) return <Table.Td key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={0}>{bufferResistance}</SimpleGrid></Flex></Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    }
                                    else return
                                case 'Abilities':
                                case 'SAF':
                                    if (row['SAF']) {
                                        bufferProperties.push(displayAbilities(row['SAF']))
                                    }
                                    if (row['Abilities']) {
                                        bufferProperties.push(displayAbilities(row['Abilities']))
                                    }
                                    if (index === 23) {
                                        if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    } else {
                                        return;
                                    }
                                case 'Set':
                                    return <Table.Td key={uuidv4()} className="centerCell">{displaySet(row[key], row['Name (English)'])}</Table.Td>
                                case 'Default Sub Icon':
                                    return
                                case 'id':
                                    return
                                default:
                                    if (row[key]) return <Table.Td key={uuidv4()} className="centerCell">{row[key]}</Table.Td>
                                    else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                            }
                        })}
                    </Table.Tr>
                })}
            </Table.Tbody>}
        </Table>
    );
}