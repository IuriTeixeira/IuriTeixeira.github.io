import Image from "next/image";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { SimpleGrid, Table, Tooltip } from '@mantine/core';
import setEffects from "../../sets/sets.json"
import variantSet from "../../sets/letter-variant-sets.json"
import './WeaponTableComponent.css';
import '@mantine/core/styles/Table.layer.css';
import { v4 as uuidv4 } from 'uuid';

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
        buffer.push(<Image key={uuidv4()} src={`/icons/${key}.png`} alt={key} width={16} height={16} />, ' ', value)
        return buffer
    }

    function displaySSA(array: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image key={uuidv4()} src={`/icons/SClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
        }
        return buffer;
    }

    function displayPotentials(array: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image key={uuidv4()} src="/icons/Potential.png" alt="Potential" width={16} height={16} />)
            buffer.push(" " + array[i])
            if (array[i + 1]) {
                buffer.push(<br key={uuidv4()} />)
            }
        }
        return buffer;
    }

    function displayAbilities(array: any[]): any[] {
        let buffer: any[] = []
        if (array) {
            for (let i = 0; i < array.length; i++) {
                buffer.push(<Image key={uuidv4()} src="/icons/Ability.png" alt="Ability" width={16} height={16} />)
                buffer.push(" " + array[i])
                if (array[i + 1]) {
                    buffer.push(<br key={uuidv4()} />)
                }
            }
        }
        return buffer;
    }

    function displayElement(array: [string, number]): any[] {
        let buffer: any[] = []
        if (!isNaN(array[1])) {
            buffer.push(<Image key={uuidv4()} src={`/icons/${array[0]}.png`} alt="Element" width={16} height={16} />, ' ', array[1])
        }
        return buffer;
    }

    function displayPA(array: string[]): any[] {
        let buffer: any[] = []
        if (array) {
            buffer.push(<Image key={uuidv4()} src={`/icons/Photon_Art.png`} alt="Enables Photon Art" width={16} height={16} />, ' ', array)
        }
        return buffer;
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

    function displayClasses(array: any[]): any[] {
        let buffer: any[] = []
        if (array) {
            if (array[0] === 'All') {
                buffer.push(
                    <React.Fragment key={uuidv4()}>
                        <Image key={uuidv4()} src={`/icons/Hu.png`} alt={`Hunter`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Fi.png`} alt={`Fighter`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Ra.png`} alt={`Ranger`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Gu.png`} alt={`Gunner`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Fo.png`} alt={`Force`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Te.png`} alt={`Techer`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Br.png`} alt={`Braver`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Bo.png`} alt={`Bouncer`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Su.png`} alt={`Summoner`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Hr.png`} alt={`Hero`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Ph.png`} alt={`Phantom`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Et.png`} alt={`Etoile`} width={16} height={16} />
                        <Image key={uuidv4()} src={`/icons/Lu.png`} alt={`Luster`} width={16} height={16} />
                    </React.Fragment>)
            } else {
                for (let i = 0; i < array.length; i++) {
                    buffer.push(<Image key={uuidv4()} src={`/icons/${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16} />)
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
                <Table.Tr>
                    <Table.Th className="centerCell">Icon</Table.Th>
                    {theadData.map((heading, index) => {
                        if (heading !== 'old_type') {
                            if (language === 'en') {
                                if (heading !== 'name_global') {
                                    switch (heading) {
                                        case 'Name (JP)': return;
                                        case 'name_en': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">ATK</Table.Th><Table.Th key={uuidv4()} className="centerCell">ATK<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'SAF': return <Table.Th key={uuidv4()} className="centerCell"><Image key={uuidv4()} src="/icons/SpecialAbility.png" alt="Special Ability Factor" width={16} height={16} /> SAF</Table.Th>
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">Default Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={uuidv4()} className="centerCell"><Image key={uuidv4()} src="/icons/Potential.png" alt="Potential" width={16} height={16} /> Potential</Table.Th>
                                        case 'SSA Slots': return <Table.Th key={uuidv4()} className="centerCell"><Image key={uuidv4()} src="/icons/SClassAbility.png" alt="SSA Slots" width={16} height={16} /> SSA Slots</Table.Th>
                                        default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    }
                                }
                            }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={uuidv4()}>Name</Table.Th>;
                                    case 'S-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Image key={uuidv4()} src="/icons/SATK.png" alt="MEL" width={16} height={16} /></Table.Th>
                                    case 'R-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Image key={uuidv4()} src="/icons/RATK.png" alt="RNG" width={16} height={16} /></Table.Th>
                                    case 'T-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Image key={uuidv4()} src="/icons/TATK.png" alt="TEC" width={16} height={16} /></Table.Th>
                                    default: return <Table.Th key={uuidv4()}>{heading}</Table.Th>
                                }
                            }
                        }*/
                        }
                    })}
                </Table.Tr>
            </Table.Thead>
            {<Table.Tbody>
                {tbodyData.map((row: any, index: any) => {
                    return <Table.Tr key={uuidv4()}>
                        {row['Name (JP)'] && <Table.Td key={uuidv4()} className="centerCell"><Image key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} width={64} height={64} /></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            if (row['Name (JP)'] && key !== 'name_global' && key !== 'old_type' && key !== 'id') {
                                let bufferProperties: any[] = [];
                                let bufferATK: any[] = [];
                                let bufferATKMax: any[] = [];
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={uuidv4()}>{row['name_en']}<br key={uuidv4()} />{row['Name (JP)']}</Table.Td>
                                    case 'name_en':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Image key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Image key={uuidv4()} src={`/icons/${row[key][0]}.png`} alt={row[key][0]} width={16} height={16} /> {row[key][1]}</Table.Td>
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row['S-ATK']) {
                                            bufferATK.push(displayStat('S-ATK', row['S-ATK']));
                                            bufferATKMax.push(displayStat('S-ATK', calculateMaxAtk(row['S-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (row['R-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br key={uuidv4()} />, displayStat('R-ATK', row['R-ATK']));
                                            else bufferATK.push(displayStat('R-ATK', row['R-ATK']));
                                            if (bufferATKMax[0]) bufferATKMax.push(<br key={uuidv4()} />, displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                            else bufferATKMax.push(displayStat('R-ATK', calculateMaxAtk(row['R-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (row['T-ATK']) {
                                            if (bufferATK[0]) bufferATK.push(<br key={uuidv4()} />, displayStat('T-ATK', row['T-ATK']));
                                            else bufferATK.push(displayStat('T-ATK', row['T-ATK']));
                                            if (bufferATKMax[0]) bufferATKMax.push(<br key={uuidv4()} />, displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                            else bufferATKMax.push(displayStat('T-ATK', calculateMaxAtk(row['T-ATK'], row['Rarity'], row['old_type'])));
                                        }
                                        if (index === 6) {
                                            if (bufferATK[0]) return <React.Fragment key={uuidv4()}><Table.Td key={uuidv4()}>{bufferATK}</Table.Td><Table.Td key={((row['id'] + 1) * 30) + index + 1}>{bufferATKMax}</Table.Td></React.Fragment>
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
                                    case 'set':
                                        if (row['Abilities']) {
                                            bufferProperties.push(displayAbilities(row['Abilities']))
                                        }
                                        if (row['Element']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br key={uuidv4()} />);
                                            bufferProperties.push(displayElement(row['Element']));
                                        }
                                        if (row['PA_enabled']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br key={uuidv4()} />);
                                            bufferProperties.push(displayPA(row['PA_enabled']));
                                        }
                                        if (row['Set']) {
                                            if (bufferProperties[0]) bufferProperties.push(<br key={uuidv4()} />, <br key={uuidv4()} />);
                                            bufferProperties.push(displaySet(row['Set'], row['name_en']));
                                        }
                                        if (index === 10) {
                                            if (bufferProperties[0]) return <Table.Td key={uuidv4()}>{bufferProperties}</Table.Td>
                                            else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        } else {
                                            return;
                                        }
                                    case 'SAF':
                                        if (row['old_type']) {
                                            return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        } else {
                                            return <Table.Td key={uuidv4()}><Image key={uuidv4()} src="/icons/SpecialAbility.png" alt="Ability" width={16} height={16} /> {row[key]}</Table.Td>
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
                })}
            </Table.Tbody>}
        </Table>
    );
}