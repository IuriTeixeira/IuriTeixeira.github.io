import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { SimpleGrid, Table, Tooltip } from '@mantine/core';
import setEffects from "../../sets/sets.json"
import variantSet from "../../sets/letter-variant-sets.json"
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
        buffer.push(<Image src={`/icons/${key}.png`} alt={key} width={16} height={16} />, ' ', value,)
        return buffer
    }

    function displaySSA(array: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image src={`/icons/SClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
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
            buffer.push(<Image src={`/icons/${array[0]}.png`} alt="Element" width={16} height={16} />, ' ', array[1])
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

    function displaySetMembers(set: any, name_en: string, doubleEffect: boolean): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i += 2) {
            let bufferMembers: any[] = []
            if (set.Pieces[i - 1] == 'Rear' || set.Pieces[i - 1] == 'Arm' || set.Pieces[i - 1] == 'Leg') {
                bufferMembers.push(<Image src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} width={16} height={16} />, ' ', set.Pieces[i], ' / ')
            } else {
                bufferMembers.push(<Image src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} width={16} height={16} />, ' ')
            }
            let name: string = name_en.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('Rear / ', '').replace('Arm / ', '').replace('Leg / ', '')
            if (set.Pieces[i + 1] === name) bufferMembers.push(<strong>{set.Pieces[i + 1]}</strong>)
            else bufferMembers.push(set.Pieces[i + 1])
            members.push(<span>{bufferMembers}</span>)
        }

        let bufferMembers: any[] = []
        if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br />, <br />)
        else bufferMembers.push(`Requires ${set.Required} pieces`, <br />, <br />)

        bufferMembers.push(<SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">{members}</SimpleGrid>)

        if (variantSet.find(variant => variant.Set === set.Name)) bufferMembers.push(<br />, <strong>Note: </strong>, 'Any variant (a,b,c) combination works for this set');

        return bufferMembers
    }

    function displaySet(setName: string, name_en: string): any[] {
        let set = setEffects.find(set => set.Name === setName)
        if (set) {
            let bufferReturn: any = []
            let bufferSetInfo: any = [<strong>Effect:</strong>, <br />, <br />, displaySetEffect(set, false), <br />, <br />, <strong>Set Pieces:</strong>, <br />, displaySetMembers(set, name_en, false)]
            bufferReturn.push(
                <Tooltip label={bufferSetInfo} color="dark">
                    <Image src={`/icons/Set1.png`} alt="Set 1" width={63} height={18} />
                </Tooltip>
            )
            if (set.Doubles) {
                let bufferSetInfo: any = [<strong>Effect:</strong>, <br />, <br />, displaySetEffect(set, true), <br />, <br />, <strong>Set Pieces:</strong>, <br />, displaySetMembers(set, name_en, false)]
                bufferReturn.push(
                    <br/>,
                    <Tooltip label={bufferSetInfo} color="dark">
                        <Image src={`/icons/Set2.png`} alt="Set 1" width={63} height={18} />
                    </Tooltip>
                )
            }
            return bufferReturn;
        } else {
            return
        }
    }

    function displayClasses(array: any[]): any[] {
        let buffer: any[] = []
        if (array) {
            if (array[0] === 'All') {
                buffer.push(
                    <React.Fragment>
                        <Image src={`/icons/Hu.png`} alt={`Hunter`} width={16} height={16} />
                        <Image src={`/icons/Fi.png`} alt={`Fighter`} width={16} height={16} />
                        <Image src={`/icons/Ra.png`} alt={`Ranger`} width={16} height={16} />
                        <Image src={`/icons/Gu.png`} alt={`Gunner`} width={16} height={16} />
                        <Image src={`/icons/Fo.png`} alt={`Force`} width={16} height={16} />
                        <Image src={`/icons/Te.png`} alt={`Techer`} width={16} height={16} />
                        <Image src={`/icons/Br.png`} alt={`Braver`} width={16} height={16} />
                        <Image src={`/icons/Bo.png`} alt={`Bouncer`} width={16} height={16} />
                        <Image src={`/icons/Su.png`} alt={`Summoner`} width={16} height={16} />
                        <Image src={`/icons/Hr.png`} alt={`Hero`} width={16} height={16} />
                        <Image src={`/icons/Ph.png`} alt={`Phantom`} width={16} height={16} />
                        <Image src={`/icons/Et.png`} alt={`Etoile`} width={16} height={16} />
                        <Image src={`/icons/Lu.png`} alt={`Luster`} width={16} height={16} />
                    </React.Fragment>)
            } else {
                for (let i = 0; i < array.length; i++) {
                    buffer.push(<Image src={`/icons/${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
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
                                        case 'SAF': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/SpecialAbility.png" alt="Special Ability Factor" width={16} height={16} /> SAF</Table.Th>
                                        case 'Abilities': return <Table.Th key={index - 25} className="centerCell">Default Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /> Potential</Table.Th>
                                        case 'SSA Slots': return <Table.Th key={index - 25} className="centerCell"><Image src="/icons/SClassAbility.png" alt="SSA Slots" width={16} height={16} /> SSA Slots</Table.Th>
                                        default: return <Table.Th key={index - 25} className="centerCell">{heading}</Table.Th>
                                    }
                                }
                            }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={heading}>Name</Table.Th>;
                                    case 'S-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/SATK.png" alt="MEL" width={16} height={16} /></Table.Th>
                                    case 'R-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/RATK.png" alt="RNG" width={16} height={16} /></Table.Th>
                                    case 'T-ATK': return <Table.Th key={heading} colSpan='2'><Image src="/icons/TATK.png" alt="TEC" width={16} height={16} /></Table.Th>
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
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index}>{row['name_en']}<br />{row['Name (JP)']}</Table.Td>
                                    case 'name_en':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={((row['id'] + 1) * 30) + index} className="centerCell"><Image src={`/icons/${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
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
                                            if (bufferProperties[0]) bufferProperties.push(<br />);
                                            bufferProperties.push(displayElement(row['Element']));
                                        }
                                        if (row['PA_enabled']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br />);
                                            bufferProperties.push(displayPA(row['PA_enabled']));
                                        }
                                        if (row['Set']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br />,<br/>);
                                            bufferProperties.push(displaySet(row['Set'], row['name_en']));
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
                                            return <Table.Td key={((row['id'] + 1) * 30) + index}><Image src="/icons/SpecialAbility.png" alt="Ability" width={16} height={16} /> {row[key]}</Table.Td>
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