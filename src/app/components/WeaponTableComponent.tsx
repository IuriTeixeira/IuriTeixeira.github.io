import React from 'react';
import Link from 'next/link'
import { useLanguageContext } from "../language-provider";
import { Flex, Image, SimpleGrid, Table, Tooltip } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import localization from "../localization.json"
import displayAbilities from './displayAbilities';
import displayPotentials from './displayPotentials';
import displaySet from './displaySet';
import displaySSA from './displaySSA';
import displayStat from './displayStat';
import displayClasses from './displayClasses';
import './WeaponTableComponent.css';
import '@mantine/core/styles/Table.layer.css';

export default function WeaponTableComponent({ data, type }) {
    const language = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(data[0]);
    }
    let theadData: any = getHeadings();
    let tbodyData: any = data;

    function calculateMaxAtk(baseATK: number, rarity: number, old_type: boolean): number {
        let maxATK: number = 0;
        if (old_type) {
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

    function displayElement(array: [string, number]): any[] {
        let buffer: any[] = []

        let statName: any = localization.find(name => name['Name (English)'] === array[0])
        let name: string

        if (statName) {
            switch (language.language) {
                case 'English Patch':
                    name = statName['Name (English)']
                    break;
                case 'Global':
                    name = statName['Name (Global)']
                    break;
                case '日本語':
                    name = statName['Name (JP)']
                    break;
            }
        }

        if (!isNaN(array[1])) {
            buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${array[0]}.png`} alt={name} title={name} w={16} h={16} /> {array[1]}</Flex>)
        }
        return buffer;
    }

    function displayPA(namePA: string[]): any[] {
        let buffer: any[] = []
        if (namePA) {
            switch (language.language) {
                case "Global":
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={`Enables usage of specific Photon Arts/Techniques regardless of class or equipment requirements`} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                        </Tooltip>
                    )
                    break;
                case "日本語":
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={`クラスや装備の条件に関係なくPAを使用できる`} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                        </Tooltip>
                    )
                    break;
                default:
                    buffer.push(
                        <Tooltip className='centerCell' key={uuidv4()} label={`Enables usage of specific Photon Arts/Techniques regardless of class or equipment requirements`} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`PA`} w={16} h={16} /> {namePA}</Flex>
                        </Tooltip>
                    )
            }
        }
        return buffer;
    }

    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    {(language.language === 'English Patch' || language.language === 'Global') && <Table.Th className="centerCell">Icon</Table.Th>}
                    {language.language === '日本語' && <Table.Th className="centerCell">画像</Table.Th>}
                    {theadData.map((heading: string) => {
                        if (heading !== 'old_type') {
                            switch (language.language) {
                                case 'English Patch':
                                    switch (heading) {
                                        case 'Name (JP)': return;
                                        case 'name_en': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                        case 'name_global': return;
                                        case 'S-ATK': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">ATK</Table.Th><Table.Th key={uuidv4()} className="centerCell">ATK<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'SAF': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} /> Special Ability Factor</Flex></Table.Th>
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> Potential</Flex></Table.Th>
                                        case 'Classes': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/MainClass.png" alt="Main Classes that can wield this weapon" w={16} h={16} /> {heading}</Flex></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SClassAbility.png" alt="S-Class Special Ability Slots Enabled" title="S-Class Special Ability Slots Enabled" w={16} h={16} /> SSA</Flex></Table.Th>
                                        default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    }
                                    break;
                                case 'Global':
                                    switch (heading) {
                                        case 'Name (JP)': return;
                                        case 'name_en': return;
                                        case 'name_global': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">ATK</Table.Th><Table.Th key={uuidv4()} className="centerCell">ATK<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'SAF': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="Ability Factor" title="Ability Factor" w={16} h={16} /> Ability Factor</Flex></Table.Th>
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> Potential</Flex></Table.Th>
                                        case 'Classes': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/MainClass.png" alt="Main Classes that can wield this weapon" w={16} h={16} /> {heading}</Flex></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SClassAbility.png" alt="S-Grade Augment Slots Enabled" title="S-Grade Augment Slots Enabled" w={16} h={16} /> SGA</Flex></Table.Th>
                                        default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    }
                                    break;
                                case '日本語':
                                    switch (heading) {
                                        case 'Name (JP)': return <Table.Th key={uuidv4()} className="centerCell">名称</Table.Th>;
                                        case 'name_en': return;
                                        case 'name_global': return;
                                        case 'Rarity': return <Table.Th key={uuidv4()} className="centerCell">レア</Table.Th>;
                                        case 'S-ATK': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">力</Table.Th><Table.Th key={uuidv4()} className="centerCell">強化力</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'Requirement': return <Table.Th key={uuidv4()} className="centerCell">装備条件</Table.Th>;
                                        case 'SAF': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="特殊能力因子" title="特殊能力因子" w={16} h={16} /> 特殊能力因子</Flex></Table.Th>
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">特性</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="潜在能力" title="潜在能力" w={16} h={16} /> 潜在能力</Flex></Table.Th>
                                        case 'Classes': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/MainClass.png" alt="この武器を扱える主なクラス" w={16} h={16} /> クラス</Flex></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SClassAbility.png" alt="S級特殊能力" title="S級特殊能力" w={16} h={16} /> S級特殊能力</Flex></Table.Th>
                                        default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    }
                                    break;
                            }
                        }
                    })}
                </Table.Tr>
            </Table.Thead>
            {<Table.Tbody>
                {tbodyData.map((row: any, index: any) => {
                    switch (language.language) {
                        case 'English Patch':
                            return <Table.Tr key={uuidv4()}>
                                {row['Name (JP)'] && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} w={64} h={64} /></Flex></Table.Td>}
                                {theadData.map((key: string, index: any) => {
                                    if (row['Name (JP)']) {
                                        let bufferProperties: any[] = [];
                                        let bufferATK: any[] = [];
                                        let bufferATKMax: any[] = [];
                                        switch (key) {
                                            case 'Name (JP)':
                                                return <Table.Td key={uuidv4()}><Flex justify="center" direction="column" key={uuidv4()} gap={5}>{row['name_en']}<br key={uuidv4()} />{row['Name (JP)']}</Flex></Table.Td>
                                            case 'name_en':
                                            case 'name_global':
                                            case 'old_type':
                                            case 'id':
                                                return;
                                            case 'Rarity':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} title={`${row[key]} Star`} w={16} h={16} /></Flex></Table.Td>
                                            case 'Requirement':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                            case 'S-ATK':
                                            case 'R-ATK':
                                            case 'T-ATK':
                                                if (row['S-ATK']) {
                                                    bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                                    bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['R-ATK']) {
                                                    bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                                    bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['T-ATK']) {
                                                    bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                                    bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (index === 6) {
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
                                                    bufferProperties.push(displaySet(row['Set'], row['name_en']));
                                                }
                                                if (index === 10) {
                                                    if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                                    else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return;
                                                }
                                            case 'SAF':
                                                if (row['old_type']) {
                                                    return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return <Table.Td key={uuidv4()}><Flex align="center" key={uuidv4()} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
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
                                    }
                                })}
                            </Table.Tr>;
                        case 'Global':
                            return <Table.Tr key={uuidv4()}>
                                {row['name_global'] && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_global']}`} w={64} h={64} /></Flex></Table.Td>}
                                {theadData.map((key: string, index: any) => {
                                    if (row['name_global']) {
                                        let bufferProperties: any[] = [];
                                        let bufferATK: any[] = [];
                                        let bufferATKMax: any[] = [];
                                        switch (key) {
                                            case 'name_global':
                                                return <Table.Td key={uuidv4()}>{row[key]}</Table.Td>
                                            case 'Name (JP)':
                                            case 'name_en':
                                            case 'old_type':
                                            case 'id':
                                                return;
                                            case 'Rarity':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} title={`${row[key]} Star`} w={16} h={16} /></Flex></Table.Td>
                                            case 'Requirement':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                            case 'S-ATK':
                                            case 'R-ATK':
                                            case 'T-ATK':
                                                if (row['S-ATK']) {
                                                    bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                                    bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['R-ATK']) {
                                                    bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                                    bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['T-ATK']) {
                                                    bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                                    bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (index === 6) {
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
                                                    bufferProperties.push(displaySet(row['Set'], row['name_global']));
                                                }
                                                if (index === 10) {
                                                    if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                                    else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return;
                                                }
                                            case 'SAF':
                                                if (row['old_type']) {
                                                    return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return <Table.Td key={uuidv4()}><Flex align="center" key={uuidv4()} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
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
                                    }
                                })}
                            </Table.Tr>;
                        case '日本語':
                            return <Table.Tr key={uuidv4()}>
                                {row['Name (JP)'] && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={row['Name (JP)']} w={64} h={64} /></Flex></Table.Td>}
                                {theadData.map((key: string, index: any) => {
                                    if (row['Name (JP)']) {
                                        let bufferProperties: any[] = [];
                                        let bufferATK: any[] = [];
                                        let bufferATKMax: any[] = [];
                                        switch (key) {
                                            case 'Name (JP)':
                                                return <Table.Td key={uuidv4()}><Link href={`https://pso2.swiki.jp/index.php?${row[key]}`}>{row[key]}</Link></Table.Td>
                                            case 'name_en':
                                            case 'name_global':
                                            case 'old_type':
                                            case 'id':
                                                return;
                                            case 'Rarity':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={row[key]} title={row[key]} w={16} h={16} /></Flex></Table.Td>
                                            case 'Requirement':
                                                return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}>{displayStat(row[key][0], row[key][1])}</Flex></Table.Td>
                                            case 'S-ATK':
                                            case 'R-ATK':
                                            case 'T-ATK':
                                                if (row['S-ATK']) {
                                                    bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                                    bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['R-ATK']) {
                                                    bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                                    bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (row['T-ATK']) {
                                                    bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                                    bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                                }
                                                if (index === 6) {
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
                                                    bufferProperties.push(displaySet(row['Set'], row['Name (JP)']));
                                                }
                                                if (index === 10) {
                                                    if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                                    else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return;
                                                }
                                            case 'SAF':
                                                if (row['old_type']) {
                                                    return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                                } else {
                                                    return <Table.Td key={uuidv4()}><Flex align="center" key={uuidv4()} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
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
                                    }
                                })}
                            </Table.Tr>;
                    }
                })}
            </Table.Tbody>}
        </Table>
    );
}