'use client'
import React, { useEffect } from 'react';
import Link from 'next/link'
import { useLanguageContext } from "../language-provider";
import { Flex, Image, LoadingOverlay, SimpleGrid, Table } from '@mantine/core';
import displayAbilities from './displayAbilities';
import displayClasses from './displayClasses';
import displayElement from './displayElement';
import displayPA from './displayPA';
import displayPotentials from './displayPotentials';
import displayRarity from './displayRarity';
import displaySet from './displaySet';
import displaySSA from './displaySSA';
import displayStat from './displayStat';
import weapons from '../geardata/weapons/weapons.json'

export default function WeaponTableComponent({ type, visible, setVisible }) {
    const language = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(weapons[0]);
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
        let headerEnglish: string[] = ["Icon", "Name", "Rarity", "Requirement", "ATK", "ATK (Max)", "Special Ability Factor", "Properties", "Potential", "Classes", "SSA", "Main Classes that can wield this weapon", "S-Class Special Ability Slots Enabled"]
        let headerGlobal: string[] = ["Icon", "Name", "Rarity", "Requirement", "Pwr", "Pwr (Max)", "Augment Factor", "Properties", "Potential", "Classes", "SGA", "Main Classes that can wield this weapon", "S-Grade Augment Slots Enabled"]
        let headerJP: string[] = ["画像", "名称", "装備条件", "レア", "力", "強化力", "特殊能力因子", "特性", "潜在能力", "クラス", "S級特殊能力", "この武器を扱える主なクラス", "S級特殊能力"]

        switch (language.language) {
            case "Global": tableHeader = headerGlobal; filteredData = weapons.filter((key: any) => key["Name (Global)"] !== null).filter((key: any) => key["Weapon Type"] === type); break;
            case "JP": tableHeader = headerJP; filteredData = weapons.filter((key: any) => key["Name (JP)"] !== null).filter((key: any) => key["Weapon Type"] === type); break;
            default: tableHeader = headerEnglish; filteredData = weapons.filter((key: any) => key["Name (JP)"] !== null).filter((key: any) => key["Weapon Type"] === type);
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
                        <Table.Th key={`header-6`}><Flex justify="center" align="center" key={`header-flex-6`} gap={5}><Image fallbackSrc='/Blank.png' key={`header-icon-6`} src="/icons/SpecialAbility.png" alt={tableHeader[6]} title={tableHeader[6]} w={16} h={16} /> {tableHeader[6]}</Flex></Table.Th>
                        <Table.Th key={`header-7`}><Flex justify="center" align="center" key={`header-flex-7`} gap={5}>{tableHeader[5]}</Flex></Table.Th>
                        <Table.Th key={`header-8`}><Flex justify="center" align="center" key={`header-flex-8`} gap={5}><Image fallbackSrc='/Blank.png' key={`header-icon-8`} src="/icons/Potential.png" alt={tableHeader[8]} title={tableHeader[8]} w={16} h={16} /> {tableHeader[8]}</Flex></Table.Th>
                        <Table.Th key={`header-9`}><Flex justify="center" align="center" key={`header-flex-9`} gap={5}><Image fallbackSrc='/Blank.png' key={`header-icon-9`} src="/icons/MainClass.png" alt={tableHeader[11]} title={tableHeader[11]} w={16} h={16} /> {tableHeader[9]}</Flex></Table.Th>
                        <Table.Th key={`header-10`}><Flex justify="center" align="center" key={`header-flex-10`} gap={5}><Image fallbackSrc='/Blank.png' key={`header-icon-10`} src="/icons/SClassAbility.png" alt={tableHeader[12]} title={tableHeader[12]} w={16} h={16} /> {tableHeader[10]}</Flex></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {visible &&
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td colSpan={11} h={300} pos="relative">
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
                            return (
                                <Table.Tr key={`row-${row.id}`}>
                                    {//weapon icon
                                        row["Name (English)"] !== "Takt-NT" &&
                                        <Table.Td key={`icon-cell-${row.id}`}>
                                            <Flex align="center" justify="center" key={`icon-flex-${row.id}`} gap={5}>
                                                <Image fallbackSrc='/Blank.png' key={`icon-${row.id}`} src={`/weapons/${type}/${row['Name (English)'].replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('/Global', '').replace('/', '')}.png`} alt={iconLabel} w={64} h={64} />
                                            </Flex>
                                        </Table.Td>
                                    }
                                    {//weapon icon exception, since Takt-NT is the only NT weapon with a different icon from its OT counterpart
                                        row["Name (English)"] === "Takt-NT" &&
                                        <Table.Td key={`icon-cell-${row.id}`}>
                                            <Flex align="center" justify="center" key={`icon-flex-${row.id}`} gap={5}>
                                                <Image fallbackSrc='/Blank.png' key={`icon-${row.id}`} src={`/weapons/Takt/Takt-NT.png`} alt={iconLabel} w={64} h={64} />
                                            </Flex>
                                        </Table.Td>
                                    }
                                    {theadData.map((key: string, index: any) => {
                                        let itemName: any

                                        switch (language.language) {
                                            case "Global":
                                                itemName = <Table.Td key={`name-${row.id}`}>{row["Name (Global)"]}</Table.Td>; break;
                                            case "JP":
                                                if (row["Name (JP)"].includes("武装エクステンド")) {
                                                    itemName = <Table.Td key={`name-${row.id}`}>{row["Name (JP)"]}</Table.Td>
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
                                                        itemName = <Table.Td key={`name-${row.id}`}><Link key={`name-link-${row.id}`} href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"]}`}>{row["Name (JP)"]}</Link></Table.Td>
                                                    } else {
                                                        itemName = <Table.Td key={`name-${row.id}`}><Link key={`name-link-${row.id}`} href={`https://pso2.swiki.jp/index.php?${row["Name (JP)"].replace('-NT', '')}`}>{row["Name (JP)"]}</Link></Table.Td>
                                                    }
                                                }
                                                break;
                                            default:
                                                itemName = <Table.Td key={`name-${row.id}`}><Flex justify="center" direction="column" key={`name-flex-${row.id}`} gap={5}>{row['Name (English)']}<br key={`name-line-break-${row.id}`} />{row['Name (JP)']}</Flex></Table.Td>
                                        }

                                        let bufferProperties: any[] = [];
                                        let bufferATK: any[] = [];
                                        let bufferATKMax: any[] = [];
                                        switch (key) {
                                            case 'Name (JP)':
                                                return itemName
                                            case 'Weapon Type':
                                            case 'Name (English)':
                                            case 'Name (Global)':
                                            case 'id':
                                                return
                                            case 'Rarity':
                                                return <Table.Td key={`rarity-cell-${row.id}`}><Flex align="center" justify="center" key={`rarity-flex-${row.id}`} gap={5}>{displayRarity(row[key])}</Flex></Table.Td>
                                            case 'Requirement':
                                                return <Table.Td key={`req-cell-${row.id}`}><Flex align="center" justify="center" key={`req-flex-${row.id}`} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
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
                                                if (index === 6) {
                                                    if (!bufferATK[0]) {
                                                        bufferATK.push('-')
                                                        bufferATKMax.push('-')
                                                    }
                                                    return (
                                                        <React.Fragment key={`atk-fragment-${row.id}`}>
                                                            <Table.Td key={`atk-${row.id}`}><Flex justify="center" align="center" direction="column" key={`atk-flex-${row.id}`} gap={0}>{bufferATK}</Flex></Table.Td>
                                                            <Table.Td key={`atk-max-${row.id}`}><Flex justify="center" align="center" direction="column" key={`atk-max-flex-${row.id}`} gap={0}>{bufferATKMax}</Flex></Table.Td>
                                                        </React.Fragment>
                                                    )
                                                }
                                                return
                                            case 'Potential':
                                                if (row[key]) {
                                                    return <Table.Td key={`potential-${row.id}`}>{displayPotentials(row[key])}</Table.Td>
                                                } else {
                                                    return <Table.Td key={`potential-${row.id}`}><Flex justify="center" align="center" direction="column" key={`potential-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                                }
                                            case 'Abilities':
                                            case 'Element':
                                            case 'PA_enabled':
                                            case 'Set':
                                                if (row['Abilities']) {
                                                    bufferProperties.push(displayAbilities(row['Abilities']))
                                                }
                                                if (row['Element']) {
                                                    bufferProperties.push(displayElement(row['Element']));
                                                }
                                                if (row['PA_enabled']) {
                                                    bufferProperties.push(displayPA(row['PA_enabled']));
                                                }
                                                if (row['Set']) {
                                                    bufferProperties.push(displaySet(row['Set'], row['Name (English)']));
                                                }
                                                if (index === 10) {
                                                    if (bufferProperties[0]) return <Table.Td key={`properties-${row.id}`}><SimpleGrid key={`properties-grid-${row.id}`} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                                    else return <Table.Td key={`properties-${row.id}`}><Flex justify="center" align="center" direction="column" key={`properties-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                                } else {
                                                    return;
                                                }
                                            case 'SAF':
                                                if (row[key]) {
                                                    return <Table.Td key={`saf-${row.id}`}><Flex align="center" key={`saf-flex-${row.id}`} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
                                                } else {
                                                    return <Table.Td key={`saf-${row.id}`}><Flex justify="center" align="center" direction="column" key={`saf-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                                }
                                            case 'SSA Slots':
                                                if (row[key]) {
                                                    return <Table.Td key={`ssa-${row.id}`}>{displaySSA(row[key])}</Table.Td>
                                                } else {
                                                    return <Table.Td key={`ssa-${row.id}`}><Flex justify="center" align="center" direction="column" key={`ssa-flex-${row.id}`} gap={0}>-</Flex></Table.Td>
                                                }
                                            case 'Classes': return <Table.Td key={`classes-${row.id}`}>{displayClasses(row[key])}</Table.Td>
                                        }
                                    })}
                                </Table.Tr>
                            )
                        })}
                    </Table.Tbody>
                }
            </Table>
        );
    }

    function calculateMaxAtk(baseATK: number, rarity: number, saf: string, potential: string): number {
        let maxATK: number = 0;
        if (!saf && type !== 'Takt' || type === 'Takt' && !potential) {
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

    return parseData()
}