'use client'

import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { Table } from '@mantine/core';

export default function TableComponent({ theadData, tbodyData }) {
    const {language/*, setLanguage*/} = useLanguageContext()

    function calculateMaxAtk(baseATK:number, rarity:number, old_type:boolean):number{
        let maxATK:number = 0;
        if (old_type) {
            switch (rarity) {
                case 1:
                case 2:
                case 3: maxATK = baseATK * 1.5; break;
                case 4:
                case 5:
                case 6: maxATK = baseATK * 1.6; break;
                case 7:
                case 8:
                case 9: maxATK = baseATK * 1.75; break;
                case 10: maxATK = baseATK * 1.9; break;
                case 11: maxATK = baseATK * 1.95; break;
                case 12: maxATK = baseATK * 2; break;
                case 13: maxATK = baseATK * 1.4; break;
            }
        } else {
            maxATK = baseATK * 1.35
        }
        return maxATK
    }

    function displaySSA(array:Element):Element{
        let buffer: Element[] = []
        for(let i=0; i<array.length; i++){
            buffer.push(<Image src={`/icons/UIItemSClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16}/>)
        }
        return buffer;
    }

    return (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    {theadData.map(heading => {
                        if (heading != 'old_type') {
                            if (language == 'en') {
                                if (heading != 'name_global') {
                                    switch (heading) {
                                        case 'name_en': return <Table.Th key={heading}>Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /></Table.Th><Table.Th key={heading+' (Max)'}><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /></Table.Th><Table.Th key={heading+' (Max)'}><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'T-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /></Table.Th><Table.Th key={heading+' (Max)'}><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'SAF': return <Table.Th key={heading}><Image src="/icons/SpecialAbilityIcon.png" alt="Special Ability Factor" width={16} height={16} /></Table.Th>
                                        case 'Abilities': return <Table.Th key={heading}><Image src="/icons/Ability.png" alt="Default Abilities" width={16} height={16} /></Table.Th>
                                        case 'Potential': return <Table.Th key={heading}><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={heading}><Image src="/icons/SClassAbilityIcon.png" alt="SSA Slots" width={16} height={16} /></Table.Th>
                                        default: return <Table.Th key={heading}>{heading}</Table.Th>
                                    }
                                }
                            }/*else{
                            if(heading != null && heading != 'name_en' && heading != 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={heading}>Name</Table.Th>;
                                    case 'S-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatSATK.png" alt="MEL" width={16} height={16} /></Table.Th>
                                    case 'R-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatRATK.png" alt="RNG" width={16} height={16} /></Table.Th>
                                    case 'T-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/UIStatTATK.png" alt="TEC" width={16} height={16} /></Table.Th>
                                    default: return <Table.Th key={heading}>{heading}</Table.Th>
                                }
                            }
                        }*/
                        }
                    })}
                </Table.Tr>
            </Table.Thead>
            {<tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index.id}>
                        {theadData.map((key, index) => {
                            if (row['Name (JP)'] != null && key != 'name_global' && key != 'old_type') {
                                switch (key) {
                                    case 'Rarity':
                                        return <Table.Td key={index.id}><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement': return <Table.Td key={index.id}><Image src={`/icons/UIStat${row[key][0]}.png`} alt="S-ATK" width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row[key]) {
                                            return <React.Fragment><Table.Td key={index.id}>{row[key]}</Table.Td><Table.Td key={index.id + 500}>{Math.trunc(calculateMaxAtk(row[key], row['Rarity'], row['old_type']))}</Table.Td></React.Fragment>
                                        } else {
                                            return <React.Fragment><Table.Td></Table.Td><Table.Td></Table.Td></React.Fragment>
                                        }
                                    case 'SSA Slots':
                                        if(row[key]){
                                            return <Table.Td key={index.id}>{displaySSA(row[key])}</Table.Td>
                                        }
                                    default: return <Table.Td key={index.id}>{row[key]}</Table.Td>
                                }
                            }
                            //return <Table.Td key={index.id}>{row[key]}</Table.Td>
                        })}
                    </tr>;
                })}
            </tbody>}
        </Table>
    );
}