import React from 'react';
import Link from 'next/link'
import { useLanguageContext } from "../language-provider";
import { Flex, Image, SimpleGrid, Table, Tooltip } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import displayAbilities from './displayAbilities';
import displayClasses from './displayClasses';
import displayElement from './displayElement';
import displayPA from './displayPA';
import displayPotentials from './displayPotentials';
import displaySet from './displaySet';
import displaySSA from './displaySSA';
import displayStat from './displayStat';
import './WeaponTableComponent.css';
import '@mantine/core/styles/Table.layer.css';
import displayRarity from './displayRarity';

export default function WeaponTableComponent({ data, type }) {
    const language = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(data[0]);
    }
    let theadData: any = getHeadings();
    let tbodyData: any = data;

    function calculateMaxAtk(baseATK: number, rarity: number, saf: string, potential: string): number {
        let maxATK: number = 0;
        if (!saf && type !== 'takts' || type === 'takts' && !potential) {
            switch (rarity) {
                case 1:
                case 2:
                case 3: maxATK = (baseATK * 150) / 100; break;
                case 4:
                case 5:
                case 6: maxATK = (baseATK * 160) / 100; break;
                case 7:
                case 8:
                case 9: maxATK = (baseATK * 175) / 100; break;
                case 10: maxATK = (baseATK * 190) / 100; break;
                case 11: maxATK = (baseATK * 195) / 100; break;
                case 12: maxATK = (baseATK * 200) / 100; break;
                case 13: maxATK = (baseATK * 140) / 100; break;
            }
        } else {
            maxATK = (baseATK * 135) / 100
        }
        return Math.trunc(maxATK)
    }

    

    let headerEnglish: string[] = ["Icon", "Name", "Rarity", "Requirement", "ATK", "ATK (Max)", "Special Ability Factor", "Properties", "Potential", "Classes", "SSA", "Main Classes that can wield this weapon", "S-Class Special Ability Slots Enabled"]
    let headerGlobal: string[] = ["Icon", "Name", "Rarity", "Requirement", "Pwr", "Pwr (Max)", "Augment Factor", "Properties", "Potential", "Classes", "SGA", "Main Classes that can wield this weapon", "S-Grade Augment Slots Enabled"]
    let headerJP: string[] = ["画像", "名称", "装備条件", "レア", "力", "強化力", "特殊能力因子", "特性", "潜在能力", "クラス", "S級特殊能力", "この武器を扱える主なクラス", "S級特殊能力"]
    let tableHeader: string[]
    let filteredData: any
    switch (language.language) {
        case "Global": tableHeader = headerGlobal; filteredData = tbodyData.filter((key: any) => key["Name (Global)"] !== null); break;
        case "JP": tableHeader = headerJP; filteredData = tbodyData.filter((key: any) => key["Name (JP)"] !== null); break;
        default: tableHeader = headerEnglish; filteredData = tbodyData.filter((key: any) => key["Name (JP)"] !== null);
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
                    <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt={tableHeader[6]} title={tableHeader[6]} w={16} h={16} /> {tableHeader[6]}</Flex></Table.Th>
                    <Table.Th key={uuidv4()} className="centerCell">{tableHeader[7]}</Table.Th>
                    <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt={tableHeader[8]} title={tableHeader[8]} w={16} h={16} /> {tableHeader[8]}</Flex></Table.Th>
                    <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/MainClass.png" alt={tableHeader[11]} title={tableHeader[11]} w={16} h={16} /> {tableHeader[9]}</Flex></Table.Th>
                    <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SClassAbility.png" alt={tableHeader[12]} title={tableHeader[12]} w={16} h={16} /> {tableHeader[10]}</Flex></Table.Th>
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
                        {row["Name (English)"] !== "Takt-NT" && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['Name (English)'].replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('/Global', '').replace('/', '')}.png`} alt={iconLabel} w={64} h={64} /></Flex></Table.Td>}
                        {row["Name (English)"] === "Takt-NT" && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/takts/Takt-NT.png`} alt={iconLabel} w={64} h={64} /></Flex></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let itemName: any

                            switch (language.language) {
                                case "Global":
                                    itemName = <Table.Td key={uuidv4()}>{row["Name (Global)"]}</Table.Td>; break;
                                case "JP":
                                    if (row["Name (JP)"].includes("武装エクステンド")) {
                                        itemName = <Table.Td key={uuidv4()}>{row["Name (JP)"]}</Table.Td>
                                    } else {
                                        const exceptionNames: string[] = [
                                            "スレイヴバール-NT",
                                            "アーレスタクト-NT",
                                            "ゲインスクラッパー-NT",
                                            "ハコベハヤセ-NT",
                                            "ブレードスタビライザー-NT",
                                            "ネメシスバール-NT",
                                            "ブレードスタビライザー-NT",
                                            "カドルフ-NT",
                                            "EXPウェポン-NT",
                                            "EXPウェポン2-NT"
                                        ]
                                        if (exceptionNames.includes(row['Name (JP)'])) {
                                            itemName = <Table.Td key={uuidv4()}><Link href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"]}`}>{row["Name (JP)"]}</Link></Table.Td>
                                        } else {
                                            itemName = <Table.Td key={uuidv4()}><Link href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"].replace('-NT', '')}`}>{row["Name (JP)"]}</Link></Table.Td>
                                        }
                                    }
                                    break;
                                default:
                                    itemName = <Table.Td key={uuidv4()}><Flex justify="center" direction="column" key={uuidv4()} gap={5}>{row['Name (English)']}<br key={uuidv4()} />{row['Name (JP)']}</Flex></Table.Td>
                            }

                            let bufferProperties: any[] = [];
                            let bufferATK: any[] = [];
                            let bufferATKMax: any[] = [];
                            switch (key) {
                                case 'Name (JP)':
                                    return itemName
                                case 'Name (English)':
                                case 'Name (Global)':
                                case 'id':
                                    return
                                case 'Rarity':
                                    return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayRarity(row[key])}</Flex></Table.Td>
                                case 'Requirement':
                                    return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                case 'S-ATK':
                                case 'R-ATK':
                                case 'T-ATK':
                                    if (row['S-ATK']) {
                                        bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                        bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['SAF'], row['Potential'])));
                                    }
                                    if (row['R-ATK']) {
                                        bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                        bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['SAF'], row['Potential'])));
                                    }
                                    if (row['T-ATK']) {
                                        bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                        bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['SAF'], row['Potential'])));
                                    }
                                    if (index === 5) {
                                        if (bufferATK[0]) return (
                                            <React.Fragment key={uuidv4()}>
                                                <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferATK}</Flex></Table.Td>
                                                <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferATKMax}</Flex></Table.Td>
                                            </React.Fragment>
                                        )
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    }
                                    return
                                case 'Potential':
                                    if (row[key]) {
                                        return <Table.Td key={uuidv4()}>{displayPotentials(row[key])}</Table.Td>
                                    } else {
                                        return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    }
                                case 'Abilities':
                                case 'Element':
                                case 'PA_enabled':
                                case 'Set':
                                    if (row['Abilities']) {
                                        bufferProperties.push(<span key={uuidv4()}>{displayAbilities(row['Abilities'])}</span>)
                                    }
                                    if (row['Element']) {
                                        bufferProperties.push(<span key={uuidv4()}>{displayElement(row['Element'])}</span>);
                                    }
                                    if (row['PA_enabled']) {
                                        bufferProperties.push(<span key={uuidv4()}>{displayPA(row['PA_enabled'])}</span>);
                                    }
                                    if (row['Set']) {
                                        bufferProperties.push(displaySet(row['Set'], row['Name (English)']));
                                    }
                                    if (index === 9) {
                                        if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    } else {
                                        return;
                                    }
                                case 'SAF':
                                    if (row[key]) {
                                        return <Table.Td key={uuidv4()}><Flex align="center" key={uuidv4()} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
                                    } else {
                                        return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    }
                                case 'SSA Slots':
                                    if (row[key]) {
                                        return <Table.Td key={uuidv4()}>{displaySSA(row[key])}</Table.Td>
                                    } else {
                                        return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                    }
                                case 'Classes': return <Table.Td key={uuidv4()}>{displayClasses(row[key])}</Table.Td>
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