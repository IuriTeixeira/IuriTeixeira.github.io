import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { Table } from '@mantine/core';
import './WeaponTableComponent.css';
import '@mantine/core/styles/Table.layer.css';

export default function WeaponTableComponent({ data, type }) {
    const { language/*, setLanguage*/ } = useLanguageContext()
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

    function displaySSA(array: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image src={`/icons/UIItemSClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
        }
        return buffer;
    }

    function displayPotentials(array: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image src="/icons/Potential.png" alt="Potential" width={16} height={16} />)
            buffer.push(" " + array[i])
            if (array[i + 1]) {
                buffer.push(<br />)
            }
        }
        return buffer;
    }

    function displayAbilities(array: any[]): any[] {
        let buffer: any[] = []
        if (array) {
            for (let i = 0; i < array.length; i++) {
                buffer.push(<Image src="/icons/Ability.png" alt="Ability" width={16} height={16} />)
                buffer.push(" " + array[i])
                if (array[i + 1]) {
                    buffer.push(<br />)
                }
            }
        }
        return buffer;
    }

    function displayElement(array: [string, number]): any[] {
        let buffer: any[] = []
        if (!isNaN(array[1])) {
            buffer.push(<Image src={`/icons/UI${array[0]}Icon.png`} alt="Element" width={16} height={16} />, ' ', array[1])
        }
        return buffer;
    }

    function displayPA(array: string[]): any[] {
        let buffer: any[] = []
        if (array) {
            buffer.push(<Image src={`/icons/Photon_Art.png`} alt="Enables Photon Art" width={16} height={16} />, ' ', array)
        }
        return buffer;
    }

    function displaySet(array: any[]): any {
        let buffer: any[] = []
        if (array) {
            buffer.push(<Image src={`/icons/UIUnitRearIcon.png`} alt="Set Effect" width={16} height={16} />, ' ', array)
        }
        return buffer;
    }

    function displayClasses(array: any[]): any[] {
        let buffer: any[] = []
        if (array) {
            if (array[0] === 'All') {
                buffer.push(
                    <React.Fragment>
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
                    </React.Fragment>)
            } else {
                for (let i = 0; i < array.length; i++) {
                    buffer.push(<Image src={`/icons/UIClass${array[i]}Icon.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
                }
            }
            return buffer
        } else { return null }
    }


    tbodyData.map((item: any, id: number) => {
        Object.assign(item, { id })
    })

    return (
        <Table striped stickyHeader withTableBorder withColumnBorders border={1}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th className="centerCell">Icon</Table.Th>
                    {theadData.map((heading, index) => {
                        if (heading !== 'old_type') {
                            if (language === 'en') {
                                if (heading !== 'name_global') {
                                    switch (heading) {
                                        case 'name_en': return <Table.Th key={index-16} className="centerCell">Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment><Table.Th key={index-16} className="centerCell"><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /></Table.Th><Table.Th key='S-ATK (Max)' className="centerCell"><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return <React.Fragment><Table.Th key={index-16} className="centerCell"><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /></Table.Th><Table.Th key='R-ATK (Max)' className="centerCell"><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
                                        case 'T-ATK': return <React.Fragment><Table.Th key={index-16} className="centerCell"><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /></Table.Th><Table.Th key='T-ATK (Max)' className="centerCell"><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /><br />(Max)</Table.Th></React.Fragment>
                                        case 'SAF': return <Table.Th key={index-16} className="centerCell"><Image src="/icons/SpecialAbilityIcon.png" alt="Special Ability Factor" width={16} height={16} /> SAF</Table.Th>
                                        case 'Abilities': return <Table.Th key={index-16} className="centerCell">Default Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={index-16} className="centerCell"><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /> Potential</Table.Th>
                                        case 'SSA Slots': return <Table.Th key={index-16} className="centerCell"><Image src="/icons/SClassAbilityIcon.png" alt="SSA Slots" width={16} height={16} /> SSA Slots</Table.Th>
                                        default: return <Table.Th key={index-16} className="centerCell">{heading}</Table.Th>
                                    }
                                }
                            }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
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
                {tbodyData.map((row: any, index: any) => {
                    return <tr key={index}>
                        {row['Name (JP)'] && <Table.Td key={row.id + 1000} className="centerCell"><Image src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            let buffer: any[] = [];
                            if (row['Name (JP)'] && key !== 'name_global' && key !== 'old_type' && key !== 'id') {
                                let indexProperties = -1;
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index}>{row[key]}</Table.Td>
                                    case 'name_en':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index}>{row[key]}</Table.Td>
                                    case 'Rarity':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell"><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={((row['id'] + 1) * 24) + index} className="centerCell"><Image src={`/icons/UIStat${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row[key]) {
                                            return <React.Fragment><Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">{row[key]}</Table.Td><Table.Td key={index + 500} className="centerCell">{Math.trunc(calculateMaxAtk(row[key], row['Rarity'], row['old_type']))}</Table.Td></React.Fragment>
                                        } else {
                                            return <React.Fragment><Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td><Table.Td className="centerCell">-</Table.Td></React.Fragment>
                                        }
                                    case 'Potential':
                                        if (row[key]) {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index}>{displayPotentials(row[key])}</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td>
                                        }
                                    case 'Abilities':
                                        indexProperties = index;
                                    case 'Element':
                                    case 'PA_enabled':
                                    case 'set':
                                        if (row['Abilities']) {
                                            buffer.push(displayAbilities(row['Abilities']))
                                        }
                                        if (row['Element']) {
                                            if (buffer[0]) buffer.push(<br />, displayElement(row['Element']))
                                            else buffer.push(displayElement(row['Element']))
                                        }
                                        if (row['PA_enabled']) {
                                            if (buffer[0]) buffer.push(<br />, displayPA(row['PA_enabled']))
                                            else buffer.push(displayPA(row[key]))
                                        }
                                        if (row['set']) {
                                            if (buffer[0]) buffer.push(<br />, displaySet(row['set']))
                                            else buffer.push(displaySet(row[key]))
                                        }
                                        if (index === indexProperties) {
                                            if (buffer[0]) return <Table.Td key={((row['id'] + 1) * 16) + index}>{buffer}</Table.Td>
                                            else return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td>
                                        } else {
                                            return;
                                        }
                                    case 'SAF':
                                        if (row['old_type']) {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index}><Image src="/icons/SpecialAbilityIcon.png" alt="Ability" width={16} height={16} /> {row[key]}</Table.Td>
                                        }
                                    case 'SSA Slots':
                                        if (row[key]) {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index}>{displaySSA(row[key])}</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td>
                                        }
                                    case 'Classes': return <Table.Td key={((row['id'] + 1) * 16) + index}>{displayClasses(row[key])}</Table.Td>
                                    default:
                                        if (row[key]) return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">{row[key]}</Table.Td>
                                        else return <Table.Td key={((row['id'] + 1) * 16) + index} className="centerCell">-</Table.Td>
                                }
                            }
                        })}
                    </tr>;
                })}
            </tbody>}
        </Table>
    );
}