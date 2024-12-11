import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { Container, Group, SimpleGrid, Table } from '@mantine/core';
import setEffects from "../../sets/sets.json"
import './UnitTableComponent.css';
import '@mantine/core/styles/Table.layer.css';

export default function UnitTableComponent({ data, type }) {
    const { language/*, setLanguage*/ } = useLanguageContext()
    const getHeadings: any = () => {
        return Object.keys(data[0]);
    }
    let theadData: any = getHeadings();
    let tbodyData: any = data;

    function calculateMaxDef(baseDEF: number): number {
        return Math.trunc(baseDEF * 1.4)
    }

    function displayStat(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Image src={`/icons/${key}.png`} alt={key} width={16} height={16} />, ' ', value,)
        return buffer
    }

    function displayResistance(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Image src={`/icons/${key.replace(' ', '')}.png`} alt={key} width={16} height={16} />, ' ', value, '%')
        return buffer
    }

    function displaySetEffect(set: any, doubleEffect: boolean): any {
        let effect: any[] = []
        set.Effect.forEach((value: any, index: number) => {
            if (index % 2 === 0) {
                if (set.Effect[index] === 'HP' || set.Effect[index] === 'PP') effect.push(<strong>{set.Effect[index]}</strong>);
                else effect.push(<Image src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} width={16} height={16} />);
            }
            else {
                if (doubleEffect) effect.push(' ', set.Effect[index] * 2);
                else effect.push(' ', set.Effect[index]);
                if (set.Effect[index + 1]) {
                    effect.push(<br />);
                }
            }
        })
        return effect
    }

    function displaySetMembers(set: any): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i++) {
            if (i % 2 === 0) {
                members.push(<Image src={`/icons/${set.Pieces[i].replace(' ','')}.png`} alt={set.Pieces[i]} width={16} height={16} />);
            } else {
                //TODO: popover to display a/b/c on the unit names to explain any of them works
                if(set.Pieces[i-1] == 'Rear' || set.Pieces[i-1] == 'Arm' || set.Pieces[i-1] == 'Leg') members.push(' ', set.Pieces[i - 1], " / ", set.Pieces[i])
                else members.push(' ', set.Pieces[i])
                if (set.Pieces[i + 1]) {
                    members.push(<br />)
                }
            }
        }
        return members
    }

    function displaySet(setName: string): any[] {
        let set = setEffects.find(set => set.Name === setName)
        let bufferReturn: any = []
        let header: any[] = [<Image src={`/icons/Set1.png`} alt="Set 1" width={63} height={18} />, <br />, <strong>{`${set.Required} pieces required`}</strong>, <br />]
        let setEffect = displaySetEffect(set,false)
        bufferReturn.push(header, setEffect)
        if (set.Doubles) {
            header = [];
            header.push(<br />, <Image src={`/icons/Set2.png`} alt="Set 2" width={63} height={18} />, <br />, set.Required + 1, ' pieces required');
            setEffect = displaySetEffect(set, true);
            bufferReturn.push(<br />, header, <br />, setEffect)
        }
        bufferReturn.push(<br />,<br/>, <strong>Set Pieces:</strong>, <br />, displaySetMembers(set))
        return bufferReturn;
    }

    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr key={-1000}>
                    {<Table.Th key={0} className="centerCell">Icon</Table.Th>}
                    {theadData.map((heading, index) => {
                        if (language === 'en') {
                            if (heading !== 'name_global') {
                                switch (heading) {
                                    case 'Name (JP)': return
                                    case 'name_en': return <Table.Th key={index - 25} className="centerCell">Name</Table.Th>;
                                    case 'S-DEF': return <React.Fragment><Table.Th key={index - 25} className="centerCell">DEF</Table.Th><Table.Th key='S-DEF (Max)' className="centerCell">DEF<br />(Max)</Table.Th></React.Fragment>
                                    case 'R-DEF': return
                                    case 'T-DEF': return
                                    case 'S-ATK': return <Table.Th key={index - 25} className="centerCell">ATK</Table.Th>
                                    case 'R-ATK': return
                                    case 'T-ATK': return
                                    case 'Strike Resistance': return <Table.Th key={index - 25} className="centerCell">Resistances</Table.Th>
                                    case 'Ranged Resistance': return
                                    case 'Tech Resistance': return
                                    case 'Fire Resistance': return
                                    case 'Ice Resistance': return
                                    case 'Lightning Resistance': return
                                    case 'Wind Resistance': return
                                    case 'Light Resistance': return
                                    case 'Dark Resistance': return
                                    case 'id': return;
                                    case 'Set': return <Table.Th key={index - 25} className="centerCell">Set</Table.Th>
                                    case 'Default Sub Icon': return
                                    default: return <Table.Th key={index - 25} className="centerCell">{heading}</Table.Th>
                                }
                            }
                        }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={heading}>Name</Table.Th>;
                                }
                            }
                        }*/
                    })}
                </Table.Tr>
            </Table.Thead>
            {<Table.Tbody>
                {tbodyData.map((row: any, index: any) => {
                    return <Table.Tr key={index}>
                        {row['Name (JP)'] && row['Default Sub Icon'] && <Table.Td key={row.id + 1000} className="centerCell"><Image src={`/units/sub/SubUnit.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {row['Name (JP)'] && !row['Default Sub Icon'] && <Table.Td key={row.id + 1000} className="centerCell"><Image src={`/units/${type}/${row['name_en'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let bufferDEF: any[] = [];
                            let bufferDEFMax: any[] = [];
                            let bufferResistance: any[] = [];
                            let bufferATK: any[] = [];
                            let bufferSet: any[] = [];
                            if (row['Name (JP)']) {
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index}>{row['name_en']}<br />{row['Name (JP)']}</Table.Td>
                                    case 'name_en':
                                        return
                                    case 'name_global':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-DEF':
                                    case 'R-DEF':
                                    case 'T-DEF':
                                        if (row['S-DEF']) {
                                            bufferDEF.push(displayStat('S-DEF', row['S-DEF']));
                                            bufferDEFMax.push(displayStat('S-DEF', calculateMaxDef(row['S-DEF'])));
                                        }
                                        if (row['R-DEF']) {
                                            if (bufferDEF[0]) bufferDEF.push(<br />, displayStat('R-DEF', row['R-DEF']));
                                            else bufferDEF.push(displayStat('R-DEF', row['R-DEF']));
                                            if (bufferDEFMax[0]) bufferDEFMax.push(<br />, displayStat('R-DEF', calculateMaxDef(row['R-DEF'])));
                                            else bufferDEFMax.push(displayStat('R-DEF', calculateMaxDef(row['R-DEF'])));
                                        }
                                        if (row['T-DEF']) {
                                            if (bufferDEF[0]) bufferDEF.push(<br />, displayStat('T-DEF', row['T-DEF']));
                                            else bufferDEF.push(displayStat('T-DEF', row['T-DEF']));
                                            if (bufferDEFMax[0]) bufferDEFMax.push(<br />, displayStat('T-DEF', calculateMaxDef(row['T-DEF'])));
                                            else bufferDEFMax.push(displayStat('T-DEF', calculateMaxDef(row['T-DEF'])));
                                        }
                                        if (index === 5) {
                                            if (bufferDEF[0]) return <React.Fragment><Table.Td key={((row['id'] + 1) * 30) + index}>{bufferDEF}</Table.Td><Table.Td key={((row['id'] + 1) * 30) + index + 1}>{bufferDEFMax}</Table.Td></React.Fragment>
                                            else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        }
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row['S-ATK']) {
                                            bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                        }
                                        if (row['R-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br />, displayStat('R-ATK', row['R-ATK']));
                                            else bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                        }
                                        if (row['T-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br />, displayStat('T-ATK', row['T-ATK']));
                                            else bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                        }
                                        if (index === 12) {
                                            if (bufferATK[0]) return <Table.Td key={((row['id'] + 1) * 30) + index}>{bufferATK}</Table.Td>
                                            else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
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
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Strike Resistance', row['Strike Resistance']));
                                            else bufferResistance.push(displayResistance('Strike Resistance', row['Strike Resistance']));
                                        }
                                        if (row['Ranged Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                            else bufferResistance.push(displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                        }
                                        if (row['Tech Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Tech Resistance', row['Tech Resistance']));
                                            else bufferResistance.push(displayResistance('Tech Resistance', row['Tech Resistance']));
                                        }
                                        if (row['Fire Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Fire Resistance', row['Fire Resistance']));
                                            else bufferResistance.push(displayResistance('Fire Resistance', row['Fire Resistance']));
                                        }
                                        if (row['Ice Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Ice Resistance', row['Ice Resistance']));
                                            else bufferResistance.push(displayResistance('Ice Resistance', row['Ice Resistance']));
                                        }
                                        if (row['Lightning Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                            else bufferResistance.push(displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                        }
                                        if (row['Wind Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Wind Resistance', row['Wind Resistance']));
                                            else bufferResistance.push(displayResistance('Wind Resistance', row['Wind Resistance']));
                                        }
                                        if (row['Light Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Light Resistance', row['Light Resistance']));
                                            else bufferResistance.push(displayResistance('Light Resistance', row['Light Resistance']));
                                        }
                                        if (row['Dark Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br />, displayResistance('Dark Resistance', row['Dark Resistance']));
                                            else bufferResistance.push(displayResistance('Dark Resistance', row['Dark Resistance']));
                                        }
                                        if (index === 13) {
                                            if (bufferResistance[0]) return <Table.Td key={((row['id'] + 1) * 30) + index}>{bufferResistance}</Table.Td>
                                            else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        }
                                        else return
                                    case 'Set':
                                        if (row[key]) return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">{displaySet(row['Set'])}</Table.Td>
                                        else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                    case 'Default Sub Icon':
                                        return
                                    case 'id':
                                        return
                                    default:
                                        if (row[key]) return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">{row[key]}</Table.Td>
                                        else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                }
                            }
                        })}
                    </Table.Tr>;
                })}
            </Table.Tbody>}
        </Table>
    );
}