import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { Table } from '@mantine/core';

export default function WeaponTableComponent({ data }) {
    const { language/*, setLanguage*/ } = useLanguageContext()
    const getHeadings:any = () => {
        return Object.keys(data[0]);
    }
    //theadData, tbodyData
    let theadData:any = getHeadings();
    let tbodyData:any = data;

    function calculateMaxAtk(baseATK: number, rarity: number, old_type: boolean): number {
        let maxATK: number = 0;
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

    function displaySSA(array: Element): Element {
        let buffer: Element[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image src={`/icons/UIItemSClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
        }
        return buffer;
    }

    return (
        <Table striped stickyHeader withTableBorder withColumnBorders border='1'>
            <Table.Thead>
                <Table.Tr>
                    {theadData.map(heading => {
                        if (heading != 'old_type') {
                            if (language == 'en') {
                                if (heading != 'name_global') {
                                    switch (heading) {
                                        case 'name_en': return <Table.Th key={heading}>Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /></Table.Th><Table.Th key='S-ATK (Max)'><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /></Table.Th><Table.Th key='R-ATK (Max)'><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'T-ATK': return <React.Fragment><Table.Th key={heading}><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /></Table.Th><Table.Th key='T-ATK (Max)'><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /> (Max)</Table.Th></React.Fragment>
                                        case 'SAF': return <Table.Th key={heading}><Image src="/icons/SpecialAbilityIcon.png" alt="Special Ability Factor" width={16} height={16} /></Table.Th>
                                        case 'Abilities': return <Table.Th key={heading}><Image src="/icons/Ability.png" alt="Default Abilities" width={16} height={16} /></Table.Th>
                                        case 'Potential': return <Table.Th key={heading}><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={heading}><Image src="/icons/SClassAbilityIcon.png" alt="SSA Slots" width={16} height={16} /></Table.Th>
                                        case 'Classes': return <Table.Th key={heading}>Classes</Table.Th>
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
                {tbodyData.map((row: any, index: number) => {
                    return <tr key={index.id}>
                        {theadData.map((key: string, index: number) => {
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
                                        if (row[key]) {
                                            return <Table.Td key={index.id}>{displaySSA(row[key])}</Table.Td>
                                        }
                                    case 'Classes':
                                        if(row[key]){
                                            if(row[key][0] == 'All'){
                                                return <Table.Td key={index.id}>
                                                    <Image src={`/icons/UIClassHuIcon.png`} alt={`Hunter`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassFiIcon.png`} alt={`Fighter`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassRaIcon.png`} alt={`Ranger`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassGuIcon.png`} alt={`Gunner`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassFoIcon.png`} alt={`Force`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassTeIcon.png`} alt={`Techer`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassBrIcon.png`} alt={`Braver`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassBoIcon.png`} alt={`Bouncer`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassSuIcon.png`} alt={`Summoner`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassHrIcon.png`} alt={`Hero`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassPhIcon.png`} alt={`Phantom`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassEtIcon.png`} alt={`Etoile`} width={16} height={16} />
                                                    <Image src={`/icons/UIClassLuIcon.png`} alt={`Luster`} width={16} height={16} />
                                                    </Table.Td>
                                            }else{
                                                return <Table.Td key={index.id}><Image src={`/icons/UIClass${row[key]}Icon.png`} alt={row[key]} width={16} height={16} /></Table.Td>
                                            }
                                        }/*else{
                                            switch(theadData){
                                                case 'Swords': return <Table.Td key={index.id}><Image src={`/icons/UIClassHuIcon.png`} alt={`Hunter`} width={16} height={16} /><Image src={`/icons/UIClassHrIcon.png`} alt={`Hero`} width={16} height={16} /></Table.Td>
                                            }
                                        }*/
                                        
                                    default: return <Table.Td key={index.id}>{row[key]}</Table.Td>
                                }
                            }
                        })}
                    </tr>;
                })}
            </tbody>}
        </Table>
    );
}