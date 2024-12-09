import Image from "next/image";
import React from 'react';
import { useState } from "react";
import { useLanguageContext } from "../../language-provider";
import { Table } from '@mantine/core';
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
        return baseDEF * 1.4
    }

    function displayResistance(key: string, array: any[]): any[] {
        let buffer: any[] = []
        buffer.push(<Image src={`/icons/${key.replace(' ', '')}.png`} alt={key} width={16} height={16} />, ' ', array)
        return buffer
    }

    const ImageWithFallback = (props) => {
        const { src, fallbackSrc, ...rest } = props;
        const [imgSrc, setImgSrc] = useState(src);

        return (
            <Image
                {...rest}
                src={imgSrc}
                onError={() => {
                    setImgSrc(fallbackSrc);
                }}
            />
        );
    };

    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withTableBorder withColumnBorders border={1}>
            <Table.Thead>
                <Table.Tr>
                    {<Table.Th className="centerCell">Icon</Table.Th>}
                    {theadData.map((heading, index) => {
                        if (language === 'en') {
                            if (heading !== 'name_global') {
                                switch (heading) {
                                    case 'name_en': return <Table.Th key={index - 25} className="centerCell">Name</Table.Th>;
                                    case 'S-DEF': return <React.Fragment><Table.Th key={index - 25} className="centerCell"><Image src="/icons/UIStatS-DEF.png" alt="S-DEF" width={16} height={16} /></Table.Th><Table.Th key='S-DEF (Max)' className="centerCell"><Image src="/icons/UIStatS-DEF.png" alt="S-DEF" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
                                    case 'R-DEF': return <React.Fragment><Table.Th key={index - 25} className="centerCell"><Image src="/icons/UIStatR-DEF.png" alt="R-DEF" width={16} height={16} /></Table.Th><Table.Th key='R-DEF (Max)' className="centerCell"><Image src="/icons/UIStatR-DEF.png" alt="R-DEF" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
                                    case 'T-DEF': return <React.Fragment><Table.Th key={index - 25} className="centerCell"><Image src="/icons/UIStatT-DEF.png" alt="T-DEF" width={16} height={16} /></Table.Th><Table.Th key='T-DEF (Max)' className="centerCell"><Image src="/icons/UIStatT-DEF.png" alt="T-DEF" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
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
                                    case 'set': return <Table.Th key={index - 25} className="centerCell">Set</Table.Th>
                                    default: return <Table.Th key={index - 25} className="centerCell">{heading}</Table.Th>
                                }
                            }
                        }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={heading}>Name</Table.Th>;
                                    case 'S-DEF': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatSDEF.png" alt="MEL" width={16} height={16} /></Table.Th>
                                    case 'R-DEF': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatRDEF.png" alt="RNG" width={16} height={16} /></Table.Th>
                                    case 'T-DEF': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatTDEF.png" alt="TEC" width={16} height={16} /></Table.Th>
                                    default: return <Table.Th key={heading}>{heading}</Table.Th>
                                }
                            }
                        }*/
                    })}
                </Table.Tr>
            </Table.Thead>
            {<tbody>
                {tbodyData.map((row: any, index: any) => {
                    console.log(Object.keys(row))
                    return <tr key={index}>
                        {row['Name (JP)'] && <Table.Td key={row.id + 1000} className="centerCell"><ImageWithFallback src={`/units/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('α', '').replace('β', '').replace('γ', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${row['name_en']}`} fallbackSrc='/units/sub/SubUnit.png' width={64} height={64} /></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let buffer: any[] = [];
                            if (row['Name (JP)'] && key !== 'name_global' && key !== 'id' && key) {
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index}>{row[key]}</Table.Td>
                                    case 'name_en':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index}>{row[key]}</Table.Td>
                                    case 'Rarity':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell"><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell"><Image src={`/icons/UIStat${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-DEF':
                                    case 'R-DEF':
                                    case 'T-DEF':
                                        if (row[key]) {
                                            return <React.Fragment><Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell">{row[key]}</Table.Td><Table.Td key={index + 500} className="centerCell">{Math.trunc(calculateMaxDef(row[key]))}</Table.Td></React.Fragment>
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
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Strike Resistance', row['Strike Resistance']));
                                            else buffer.push(displayResistance('Strike Resistance', row['Strike Resistance']));
                                        }
                                        if (row['Ranged Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                            else buffer.push(displayResistance('Ranged Resistance', row['Ranged Resistance']));
                                        }
                                        if (row['Tech Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Tech Resistance', row['Tech Resistance']));
                                            else buffer.push(displayResistance('Tech Resistance', row['Tech Resistance']));
                                        }
                                        if (row['Fire Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Fire Resistance', row['Fire Resistance']));
                                            else buffer.push(displayResistance('Fire Resistance', row['Fire Resistance']));
                                        }
                                        if (row['Ice Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Ice Resistance', row['Ice Resistance']));
                                            else buffer.push(displayResistance('Ice Resistance', row['Ice Resistance']));
                                        }
                                        if (row['Lightning Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                            else buffer.push(displayResistance('Lightning Resistance', row['Lightning Resistance']));
                                        }
                                        if (row['Wind Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Wind Resistance', row['Wind Resistance']));
                                            else buffer.push(displayResistance('Wind Resistance', row['Wind Resistance']));
                                        }
                                        if (row['Light Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Light Resistance', row['Light Resistance']));
                                            else buffer.push(displayResistance('Light Resistance', row['Light Resistance']));
                                        }
                                        if (row['Dark Resistance']) {
                                            if (buffer[0]) buffer.push(<br />, displayResistance('Dark Resistance', row['Dark Resistance']));
                                            else buffer.push(displayResistance('Dark Resistance', row['Dark Resistance']));
                                        }
                                        if (index === 13) return <Table.Td key={((row['id'] + 1) * 24) + index}>{buffer}</Table.Td>
                                        else return
                                    default:
                                        if (row[key]) return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell">{row[key]}</Table.Td>
                                        else return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell">-</Table.Td>
                                }
                            }
                        })}
                    </tr>;
                })}
            </tbody>}
        </Table>
    );
}