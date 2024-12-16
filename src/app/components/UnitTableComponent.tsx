import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Image, Flex, SimpleGrid, Table } from '@mantine/core';
import './UnitTableComponent.css';
import '@mantine/core/styles/Table.layer.css';
import { v4 as uuidv4 } from 'uuid';
import displaySet from './displaySet';
import displayAbilities from './displayAbilities';

//import localFont from 'next/font/local'

//const myFont = localFont({src: '/Eurostile/eurostile-round-extended-medium.otf'})

export default function UnitTableComponent({ data, type }) {
    const { language/*, setLanguage*/ } = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(data[0]);
    }
    let theadData: any = getHeadings();
    let tbodyData: any = data;

    function calculateMaxDef(baseDEF: number): number {
        return Math.trunc((baseDEF * 140)/100)
    }

    function displayStat(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key}.png`} alt={key} title={key} w={16} h={16} /> {value}</Flex>)
        return buffer
    }

    function displayResistance(key: string, value: number): any {
        let buffer: any[] = []
        buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key.replace(' ', '')}.png`} alt={key} title={key} w={16} h={16} />, ' ', value, '%')
        return <Flex align="center" key={uuidv4()} gap={5}>{buffer}</Flex>
    }

    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    {<Table.Th className="centerCell">Icon</Table.Th>}
                    {theadData.map((heading: string) => {
                        if (language === 'en') {
                            if (heading !== 'name_global') {
                                switch (heading) {
                                    case 'Name (JP)': return
                                    case 'name_en': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                    case 'S-DEF': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">DEF</Table.Th><Table.Th key={uuidv4()} className="centerCell">DEF<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                    case 'R-DEF': return
                                    case 'T-DEF': return
                                    case 'S-ATK': return <Table.Th key={uuidv4()} className="centerCell">Stats</Table.Th>
                                    case 'R-ATK': return
                                    case 'T-ATK': return
                                    case 'DEX': return
                                    case 'Strike Resistance': return <Table.Th key={uuidv4()} className="centerCell">Resistances</Table.Th>
                                    case 'Ranged Resistance': return
                                    case 'Tech Resistance': return
                                    case 'Fire Resistance': return
                                    case 'Ice Resistance': return
                                    case 'Lightning Resistance': return
                                    case 'Wind Resistance': return
                                    case 'Light Resistance': return
                                    case 'Dark Resistance': return
                                    case 'id': return;
                                    case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    case 'Set': return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    case 'Default Sub Icon': return
                                    default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                }
                            }
                        }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={uuidv4()}>Name</Table.Th>;
                                }
                            }
                        }*/
                    })}
                </Table.Tr>
            </Table.Thead>
            {<Table.Tbody>
                {tbodyData.map((row: any, index: any) => {
                    return <Table.Tr key={uuidv4()}>
                        {row['Name (JP)'] && type!=='sub' && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/${type}/${row['name_en'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['name_en']}`} w={64} h={64} /></Flex></Table.Td>}
                        {row['Name (JP)'] && type=='sub' && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/units/sub/SubUnit.png' key={uuidv4()} src={`/units/${type}/${row['name_en'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['name_en']}`} w={64} h={64} /></Flex></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let bufferDEF: any[] = [];
                            let bufferDEFMax: any[] = [];
                            let bufferResistance: any[] = [];
                            let bufferATK: any[] = [];
                            if (row['Name (JP)']) {
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={uuidv4()}>{row['name_en']}<br key={uuidv4()} />{row['Name (JP)']}</Table.Td>
                                    case 'name_en':
                                        return
                                    case 'name_global':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center"  key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} title={`${row[key]} Star`} w={16} h={16} /></Flex></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key][0]}.png`} alt={row[key][0]} title={row[key][0]} w={16} h={16} /> {row[key][1]}</Flex></Table.Td>
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
                                        if (index === 5) {
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
                                        if (index === 12) {
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
                                        if (index === 13) {
                                            if (bufferResistance[0]) return <Table.Td key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={0}>{bufferResistance}</SimpleGrid></Flex></Table.Td>
                                            else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        }
                                        else return
                                    case 'Abilities':
                                        return <Table.Td key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayAbilities(row['Abilities'])}</Flex></Table.Td>
                                    case 'Set':
                                        return <Table.Td key={uuidv4()} className="centerCell">{displaySet(row[key], row['name_en'])}</Table.Td>
                                    case 'Default Sub Icon':
                                        return
                                    case 'id':
                                        return
                                    default:
                                        if (row[key]) return <Table.Td key={uuidv4()} className="centerCell">{row[key]}</Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                }
                            }
                        })}
                    </Table.Tr>;
                })}
            </Table.Tbody>}
        </Table>
    );
}