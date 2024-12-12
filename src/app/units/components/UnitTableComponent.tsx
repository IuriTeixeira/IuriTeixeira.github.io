import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { SimpleGrid, Table, Tooltip } from '@mantine/core';
import setEffects from "../../sets/sets.json"
import variantSet from "../../sets/letter-variant-sets.json"
import './UnitTableComponent.css';
import '@mantine/core/styles/Table.layer.css';
import { v4 as uuidv4 } from 'uuid';

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
        buffer.push(<Image key={uuidv4()} src={`/icons/${key}.png`} alt={key} width={16} height={16} />, ' ', value)
        return buffer
    }

    function displayResistance(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Image key={uuidv4()} src={`/icons/${key.replace(' ', '')}.png`} alt={key} width={16} height={16} />, ' ', value, '%')
        return buffer
    }

    function displaySetEffect(set: any, doubleEffect: boolean): any {
        let effect: any[] = []
        set.Effect.forEach((value: any, index: number) => {
            if (index % 2 === 0) {
                if (set.Effect[index] === 'HP' || set.Effect[index] === 'PP') effect.push(<strong key={uuidv4()}>{set.Effect[index]}</strong>);
                else effect.push(<Image key={uuidv4()} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} width={16} height={16} />);
            }
            else {
                if (doubleEffect) effect.push(' ', set.Effect[index] * 2);
                else effect.push(' ', set.Effect[index]);
                if (set.Effect[index + 1]) {
                    effect.push(<br key={uuidv4()} />);
                }
            }
        })
        return effect
    }

    function displaySetMembers(set: any, name_en: string, doubleEffect: boolean): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i += 2) {
            let bufferMembers: any[] = []
            bufferMembers.push(<Image key={uuidv4()} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} width={16} height={16} />, ' ')
            let name: string = name_en.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('Rear / ', '').replace('Arm / ', '').replace('Leg / ', '')
            if (set.Pieces[i + 1] === name) {
                if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                    bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i]} / {set.Pieces[i + 1]}</strong>)
                } else {
                    bufferMembers.push(<strong key={uuidv4()}>{set.Pieces[i + 1]}</strong>)
                }
            } else {
                if (set.Pieces[i] == 'Rear' || set.Pieces[i] == 'Arm' || set.Pieces[i] == 'Leg') {
                    bufferMembers.push(set.Pieces[i], ' / ', set.Pieces[i + 1])
                } else {
                    bufferMembers.push(set.Pieces[i + 1])
                }
            }
            members.push(<span key={uuidv4()}>{bufferMembers}</span>)
        }

        let bufferMembers: any[] = []
        if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
        else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)

        if (set.Pieces.length > 12) bufferMembers.push(<SimpleGrid key={uuidv4()} cols={3} spacing="sm" verticalSpacing="sm">{members}</SimpleGrid>)
        else if (set.Pieces.length > 6) bufferMembers.push(<SimpleGrid key={uuidv4()} cols={2} spacing="sm" verticalSpacing="sm">{members}</SimpleGrid>)
        else bufferMembers.push(<SimpleGrid key={uuidv4()} cols={1} spacing="sm" verticalSpacing="sm">{members}</SimpleGrid>)

        let variant = variantSet.find(variant => variant.Set === set.Name)
        if (variant) {
            if (variant.Type == 1) {
                bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (a,b,c) combination works for this set');
            } else {
                bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (a,b) combination works for this set');
            }
        }

        return bufferMembers
    }

    function displaySet(setName: string, name_en: string): any[] {
        let set = setEffects.find(set => set.Name === setName)
        if (set) {
            let bufferReturn: any = []
            let bufferSetInfo: any = [<strong key={uuidv4()}>Effect:</strong>, <br key={uuidv4()} />, <br key={uuidv4()} />, displaySetEffect(set, false), <br key={uuidv4()} />, <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, false)]
            bufferReturn.push(
                <Tooltip key={uuidv4()} label={bufferSetInfo} color="dark">
                    <Image key={uuidv4()} src={`/icons/Set1.png`} alt="Set 1" width={63} height={18} />
                </Tooltip>
            )
            if (set.Doubles) {
                let bufferSetInfo: any = [<strong key={uuidv4()}>Effect:</strong>, <br key={uuidv4()} />, <br key={uuidv4()} />, displaySetEffect(set, true), <br key={uuidv4()} />, <br key={uuidv4()} />, <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, false)]
                bufferReturn.push(
                    <br key={uuidv4()} />,
                    <Tooltip key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Image key={uuidv4()} src={`/icons/Set2.png`} alt="Set 1" width={63} height={18} />
                    </Tooltip>
                )
            }
            return bufferReturn;
        } else {
            return
        }
    }

    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    {<Table.Th className="centerCell">Icon</Table.Th>}
                    {theadData.map((heading, index) => {
                        if (language === 'en') {
                            if (heading !== 'name_global') {
                                switch (heading) {
                                    case 'Name (JP)': return
                                    case 'name_en': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                    case 'S-DEF': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">DEF</Table.Th><Table.Th key={uuidv4()} className="centerCell">DEF<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                    case 'R-DEF': return
                                    case 'T-DEF': return
                                    case 'S-ATK': return <Table.Th key={uuidv4()} className="centerCell">ATK</Table.Th>
                                    case 'R-ATK': return
                                    case 'T-ATK': return
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
                                    case 'Set': return <Table.Th key={uuidv4()} className="centerCell">Set</Table.Th>
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
                        {row['Name (JP)'] && row['Default Sub Icon'] && <Table.Td key={uuidv4()} className="centerCell"><Image key={uuidv4()} src={`/units/sub/SubUnit.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {row['Name (JP)'] && !row['Default Sub Icon'] && <Table.Td key={uuidv4()} className="centerCell"><Image key={uuidv4()} src={`/units/${type}/${row['name_en'].replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
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
                                        return <Table.Td key={uuidv4()} className="centerCell"><br key={uuidv4()} /><Image key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={uuidv4()} className="centerCell"><br key={uuidv4()} /><Image key={uuidv4()} src={`/icons/${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-DEF':
                                    case 'R-DEF':
                                    case 'T-DEF':
                                        if (row['S-DEF']) {
                                            bufferDEF.push(displayStat('S-DEF', row['S-DEF']));
                                            bufferDEFMax.push(displayStat('S-DEF', calculateMaxDef(row['S-DEF'])));
                                        }
                                        if (row['R-DEF']) {
                                            if (bufferDEF[0]) {
                                                bufferDEF.push(<br key={uuidv4()} />)
                                                bufferDEFMax.push(<br key={uuidv4()} />)
                                            }
                                            bufferDEF.push(displayStat('R-DEF', row['R-DEF']));
                                            bufferDEFMax.push(displayStat('R-DEF', calculateMaxDef(row['R-DEF'])));
                                        }
                                        if (row['T-DEF']) {
                                            if (bufferDEF[0]) {
                                                bufferDEF.push(<br key={uuidv4()} />)
                                                bufferDEFMax.push(<br key={uuidv4()} />)
                                            }
                                            bufferDEF.push(displayStat('T-DEF', row['T-DEF']));
                                            bufferDEFMax.push(displayStat('T-DEF', calculateMaxDef(row['T-DEF'])));
                                        }
                                        if (index === 5) {
                                            return (
                                                <React.Fragment key={uuidv4()}>
                                                    <Table.Td key={uuidv4()}>{bufferDEF}</Table.Td>
                                                    <Table.Td key={uuidv4()}>{bufferDEFMax}</Table.Td>
                                                </React.Fragment>
                                            )
                                        }

                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row['S-ATK']) {
                                            bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                        }
                                        if (row['R-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br key={uuidv4()} />, displayStat('R-ATK', row['R-ATK']));
                                            else bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                        }
                                        if (row['T-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br key={uuidv4()} />, displayStat('T-ATK', row['T-ATK']));
                                            else bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                        }
                                        if (index === 12) {
                                            if (bufferATK[0]) return <Table.Td key={uuidv4()}>{bufferATK}</Table.Td>
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
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Strike Resistance', row['Strike Resistance']));
                                            else bufferResistance.push(displayResistance('Strike Resistance', row['Strike Resistance']));
                                        }
                                        if (row['Ranged Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                            else bufferResistance.push(displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                        }
                                        if (row['Tech Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Tech Resistance', row['Tech Resistance']));
                                            else bufferResistance.push(displayResistance('Tech Resistance', row['Tech Resistance']));
                                        }
                                        if (row['Fire Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Fire Resistance', row['Fire Resistance']));
                                            else bufferResistance.push(displayResistance('Fire Resistance', row['Fire Resistance']));
                                        }
                                        if (row['Ice Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Ice Resistance', row['Ice Resistance']));
                                            else bufferResistance.push(displayResistance('Ice Resistance', row['Ice Resistance']));
                                        }
                                        if (row['Lightning Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                            else bufferResistance.push(displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                        }
                                        if (row['Wind Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Wind Resistance', row['Wind Resistance']));
                                            else bufferResistance.push(displayResistance('Wind Resistance', row['Wind Resistance']));
                                        }
                                        if (row['Light Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Light Resistance', row['Light Resistance']));
                                            else bufferResistance.push(displayResistance('Light Resistance', row['Light Resistance']));
                                        }
                                        if (row['Dark Resistance']) {
                                            if (bufferResistance[0]) bufferResistance.push(<br key={uuidv4()} />, displayResistance('Dark Resistance', row['Dark Resistance']));
                                            else bufferResistance.push(displayResistance('Dark Resistance', row['Dark Resistance']));
                                        }
                                        if (index === 13) {
                                            if (bufferResistance[0]) return <Table.Td key={uuidv4()}>{bufferResistance}</Table.Td>
                                            else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        }
                                        else return
                                    case 'Set':
                                        if (row[key] && displaySet(row[key], row['name_en'])) return <Table.Td key={uuidv4()} className="centerCell">{displaySet(row[key], row['name_en'])}</Table.Td>
                                        else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
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