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
        return Math.trunc(maxATK)
    }

    function displayStat(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Image src={`/icons/UIStat${key}.png`} alt={key} width={16} height={16} />, ' ', value,)
        return buffer
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
        <Table striped stickyHeader withColumnBorders>
            <Table.Thead>
                <Table.Tr key={-1000}>
                    <Table.Th key={0} className="centerCell">Icon</Table.Th>
                    {theadData.map((heading, index) => {
                        if (heading !== 'old_type') {
                            if (language === 'en') {
                                if (heading !== 'name_global') {
                                    switch (heading) {
                                        case 'Name (JP)': return;
                                        case 'name_en': return <Table.Th key={index - 25} className="centerCell">Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment><Table.Th key={index - 25} className="centerCell">ATK</Table.Th><Table.Th key='S-ATK (Max)' className="centerCell">ATK<br />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'SAF': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/SpecialAbilityIcon.png" alt="Special Ability Factor" width={16} height={16} /> SAF</Table.Th>
                                        case 'Abilities': return <Table.Th key={index - 25} className="centerCell">Default Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /> Potential</Table.Th>
                                        case 'SSA Slots': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/SClassAbilityIcon.png" alt="SSA Slots" width={16} height={16} /> SSA Slots</Table.Th>
                                        default: return <Table.Th key={index - 25} className="centerCell">{heading}</Table.Th>
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
            {<Table.Tbody>
                {tbodyData.map((row: any, index: any) => {
                    return <Table.Tr key={index}>
                        {row['Name (JP)'] && <Table.Td key={row.id + 1000} className="centerCell"><Image src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            if (row['Name (JP)'] && key !== 'name_global' && key !== 'old_type' && key !== 'id') {
                                let bufferProperties: any[] = [];
                                let bufferATK: any[] = [];
                                let bufferATKMax: any[] = [];
                                if(((row['id'] + 1) * 30) + index === 30) console.log(row['id'], ((row['id'] + 1) * 30) + index)
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index}>{row['name_en']}<br />{row['Name (JP)']}</Table.Td>
                                    case 'name_en':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/UIStat${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row['S-ATK']) {
                                            bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                            bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (row['R-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br />, displayStat('R-ATK', row['R-ATK']));
                                            else bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                            if (bufferATKMax[0]) bufferATKMax.push(<br />, displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                            else bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (row['T-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br />, displayStat('T-ATK', row['T-ATK']));
                                            else bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                            if (bufferATKMax[0]) bufferATKMax.push(<br />, displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                            else bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (index === 6) {
                                            if (bufferATK[0]) return <React.Fragment><Table.Td key={((row['id'] + 1) * 30) + index}>{bufferATK}</Table.Td><Table.Td key={((row['id'] + 1) * 30) + index + 1}>{bufferATKMax}</Table.Td></React.Fragment>
                                            else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        }
                                        return
                                    case 'Potential':
                                        if (row[key]) {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index}>{displayPotentials(row[key])}</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        }
                                    case 'Abilities':
                                    case 'Element':
                                    case 'PA_enabled':
                                    case 'set':
                                        if (row['Abilities']) {
                                            bufferProperties.push(displayAbilities(row['Abilities']))
                                        }
                                        if (row['Element']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br />, displayElement(row['Element']))
                                            else bufferProperties.push(displayElement(row['Element']))
                                        }
                                        if (row['PA_enabled']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br />, displayPA(row['PA_enabled']))
                                            else bufferProperties.push(displayPA(row[key]))
                                        }
                                        if (row['set']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br />, displaySet(row['set']))
                                            else bufferProperties.push(displaySet(row[key]))
                                        }
                                        if (index === 10) {
                                            if (bufferProperties[0]) return <Table.Td key={((row['id'] + 1) * 30) + index}>{bufferProperties}</Table.Td>
                                            else return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        } else {
                                            return;
                                        }
                                    case 'SAF':
                                        if (row['old_type']) {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index}><Image src="/icons/SpecialAbilityIcon.png" alt="Ability" width={16} height={16} /> {row[key]}</Table.Td>
                                        }
                                    case 'SSA Slots':
                                        if (row[key]) {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index}>{displaySSA(row[key])}</Table.Td>
                                        } else {
                                            return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell">-</Table.Td>
                                        }
                                    case 'Classes': return <Table.Td key={((row['id'] + 1) * 30) + index}>{displayClasses(row[key])}</Table.Td>
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