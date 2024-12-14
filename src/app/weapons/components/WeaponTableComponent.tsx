import { Flex, Image } from "@mantine/core";
import React from 'react';
import { useLanguageContext } from "../../language-provider";
import { SimpleGrid, Table, Tooltip } from '@mantine/core';
import setEffects from "../../sets/sets.json"
import variantSet from "../../sets/letter-variant-sets.json"
import potentials from "../../weapons/weapon-data/potentials.json"
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
        buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key}.png`} alt={key} title={key} w={16} h={16} /> {value}</Flex>)
        return buffer
    }

    function displaySSA(array: any[]): any {
        let buffer: any[] = []
        for (let i = 0; i < array.length; i++) {
            buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/SClassAbility${array[i]}.png`} alt={`SSA Slot ${array[i]} enabled`} title={`SSA Slot ${array[i]} enabled`} w={16} h={16} />)
        }
        return <Flex align="center" key={uuidv4()} gap={0}>{buffer}</Flex>
    }

    function displayPotentials(potList: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < potList.length; i++) {
            let pot = potentials.find(pot => pot.Name === potList[i])
            if (pot) {
                let potEffect = [pot.Effect[0], <br key={uuidv4()} />, pot.Effect[1], <br key={uuidv4()} />, pot.Effect[2]]
                buffer.push(
                    <Tooltip key={uuidv4()} label={potEffect} color="dark">
                        <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> {potList[i]}</Flex>
                    </Tooltip>
                )
            }else{
                buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> {potList[i]}</Flex>)
            }
        }
        return buffer;
    }

    function displayAbilities(abilities: any[]): any {
        let buffer: any[] = []
        if (abilities) {
            for (let i = 0; i < abilities.length; i++) {
                buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Ability.png" alt="Ability" title="Ability" w={16} h={16} /> {abilities[i]}</Flex>)
            }
        }
        return <SimpleGrid key={uuidv4()} cols={2} spacing={0} verticalSpacing={0}>{buffer}</SimpleGrid>;
    }

    function displayElement(array: [string, number]): any[] {
        let buffer: any[] = []
        if (!isNaN(array[1])) {
            buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${array[0]}.png`} alt={`${array[0]} Element`} title={`${array[0]} Element`} w={16} h={16} /> {array[1]}</Flex>)
        }
        return buffer;
    }

    function displayPA(namePA: string[]): any[] {
        let buffer: any[] = []
        if (namePA) {
            buffer.push(
                <Tooltip className='centerCell' key={uuidv4()} label={`Enables the ${namePA} Photon Art`} color="dark">
                    <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Photon_Art.png`} alt={`Enables the ${namePA} Photon Art`} w={16} h={16} /> {namePA}</Flex>
                </Tooltip>
            )
        }
        return buffer;
    }

    function displaySetEffect(set: any, doubleEffect: boolean): any {
        let effect: any[] = []
        set.Effect.forEach((value: any, index: number) => {
            if (doubleEffect) {
                if (index % 2 === 0) {
                    if (set.Effect[index] === 'HP' || set.Effect[index] === 'PP') effect.push(<Flex key={uuidv4()} gap={5}><strong key={uuidv4()}>{set.Effect[index]}</strong> {Math.trunc(set.Effect[index + 1] * 2)}</Flex>);
                    else effect.push(<Flex key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} title={`${set.Effect[index]}`} w={16} h={16} /> {Math.trunc(set.Effect[index + 1] * 2)}</Flex>);
                }
            } else {
                if (index % 2 === 0) {
                    if (set.Effect[index] === 'HP' || set.Effect[index] === 'PP') effect.push(<Flex key={uuidv4()} gap={5}><strong key={uuidv4()}>{set.Effect[index]}</strong> {Math.trunc(set.Effect[index + 1])}</Flex>);
                    else effect.push(<Flex key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Effect[index].toString().replace(' ', '')}.png`} alt={`${set.Effect[index]}`} title={`${set.Effect[index]}`} w={16} h={16} /> {Math.trunc(set.Effect[index + 1])}</Flex>);
                }
            }
        }
        )
        return effect
    }

    function displaySetMembers(set: any, name_en: string, doubleEffect: boolean): any {
        let members: any[] = []
        for (let i = 0; i < set.Pieces.length; i += 2) {
            let bufferMembers: any[] = []
            bufferMembers.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${set.Pieces[i].replace(' ', '')}.png`} alt={set.Pieces[i]} title={set.Pieces[i]} w={16} h={16} />, ' ')
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
            members.push(<Flex align="center" key={uuidv4()} gap={5}>{bufferMembers}</Flex>)
        }

        let bufferMembers: any[] = []
        if (doubleEffect) bufferMembers.push(`Requires ${set.Required + 1} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)
        else bufferMembers.push(`Requires ${set.Required} pieces`, <br key={uuidv4()} />, <br key={uuidv4()} />)

        bufferMembers.push(<SimpleGrid key={uuidv4()} cols={3} spacing="xs" verticalSpacing={0}>{members}</SimpleGrid>)

        let variant = variantSet.find(variant => variant.Set === set.Name)
        if (variant) {
            bufferMembers.push(<br key={uuidv4()} />, <strong key={uuidv4()}>Note: </strong>, 'Any variant (a,b,c) combination works for this set');
        }

        return bufferMembers
    }

    function displaySet(setName: string, name_en: string): any {
        let set = setEffects.find(set => set.Name === setName)
        if (set) {
            let bufferReturn: any = []
            let bufferSetInfo: any = [<strong key={uuidv4()}>Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, false), <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, false)]
            bufferReturn.push(
                <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                    <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set1.png`} alt="Set Effect 1: Hover to show details" w={63} h={18} /></Flex>
                </Tooltip>
            )
            if (set.Doubles) {
                let bufferSetInfo: any = [<strong key={uuidv4()}>Effect:</strong>, <br key={uuidv4()} />, displaySetEffect(set, true), <strong key={uuidv4()}>Set Pieces:</strong>, <br key={uuidv4()} />, displaySetMembers(set, name_en, false)]
                bufferReturn.push(
                    <Tooltip className='centerCell' key={uuidv4()} label={bufferSetInfo} color="dark">
                        <Flex align="center" justify="center" key={uuidv4()} gap="xs"><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Set2.png`} alt="Set Effect 2: Hover to show details" w={63} h={18} /></Flex>
                    </Tooltip>
                )
            }
            return <Flex align="center" justify="center" key={uuidv4()} gap="xs">{bufferReturn}</Flex>
        } else {
            return
        }
    }

    function displayClasses(array: any[]): any {
        let buffer: any[] = []
        if (array) {
            if (array[0] === 'All') {
                buffer.push(
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt={`Hunter`} title={`Hunter`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt={`Fighter`} title={`Fighter`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt={`Ranger`} title={`Ranger`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Gu.png`} alt={`Gunner`} title={`Gunner`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt={`Force`} title={`Force`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt={`Techer`} title={`Techer`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt={`Braver`} title={`Braver`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Bo.png`} alt={`Bouncer`} title={`Bouncer`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt={`Summoner`} title={`Summoner`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt={`Hero`} title={`Hero`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ph.png`} alt={`Phantom`} title={`Phantom`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt={`Etoile`} title={`Etoile`} w={16} h={16} />,
                    <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt={`Luster`} title={`Luster`} w={16} h={16} />
                )
            } else {
                for (let i = 0; i < array.length; i++) {
                    let className = ''
                    switch (array[i]) {
                        case 'Hu': className = "Hunter"; break;
                        case 'Fi': className = "Fighter"; break;
                        case 'Ra': className = "Ranger"; break;
                        case 'Gu': className = "Gunner"; break;
                        case 'Fo': className = "Force"; break;
                        case 'Te': className = "Techer"; break;
                        case 'Br': className = "Braver"; break;
                        case 'Bo': className = "Bouncer"; break;
                        case 'Su': className = "Summoner"; break;
                        case 'Hr': className = "Hero"; break;
                        case 'Ph': className = "Phantom"; break;
                        case 'Et': className = "Etoile"; break;
                        case 'Lu': className = "Luster"; break;

                    }
                    buffer.push(<Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${array[i]}.png`} alt={className} title={className} w={16} h={16} />)
                }
            }
            return <Flex key={uuidv4()} gap={0}>{buffer}</Flex>
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
                    {theadData.map((heading: string) => {
                        if (heading !== 'old_type') {
                            if (language === 'en') {
                                if (heading !== 'name_global') {
                                    switch (heading) {
                                        case 'Name (JP)': return;
                                        case 'name_en': return <Table.Th key={uuidv4()} className="centerCell">Name</Table.Th>;
                                        case 'S-ATK': return <React.Fragment key={uuidv4()}><Table.Th key={uuidv4()} className="centerCell">ATK</Table.Th><Table.Th key={uuidv4()} className="centerCell">ATK<br key={uuidv4()} />(Max)</Table.Th></React.Fragment>
                                        case 'R-ATK': return;
                                        case 'T-ATK': return;
                                        case 'SAF': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} /> SAF</Flex></Table.Th>
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">Default Properties</Table.Th>
                                        case 'Element': return;
                                        case 'id': return;
                                        case 'Potential': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> Potential</Flex></Table.Th>
                                        case 'Classes': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/MainClass.png" alt="Main Classes that can wield this weapon" w={16} h={16} /> {heading}</Flex></Table.Th>
                                        case 'SSA Slots': return <Table.Th key={uuidv4()}><Flex justify="center" align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SClassAbility.png" alt="S-Class Special Ability Slots Enabled" title="S-Class Special Ability Slots Enabled" w={16} h={16} /> SSA Slots</Flex></Table.Th>
                                        default: return <Table.Th key={uuidv4()} className="centerCell">{heading}</Table.Th>
                                    }
                                }
                            }/*else{
                            if(heading && heading !== 'name_en' && heading !== 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <Table.Th key={uuidv4()}>Name</Table.Th>;
                                    case 'S-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Flex key={uuidv4()} gap={0}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SATK.png" alt="MEL" w={16} h={16} /></Table.Th>
                                    case 'R-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Flex key={uuidv4()} gap={0}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/RATK.png" alt="RNG" w={16} h={16} /></Table.Th>
                                    case 'T-ATK': return <Table.Th key={uuidv4()} colSpan='2'><Flex key={uuidv4()} gap={0}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/TATK.png" alt="TEC" w={16} h={16} /></Table.Th>
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
                        {row['Name (JP)'] && <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} w={64} h={64} /></Flex></Table.Td>}
                        {theadData.map((key: string, index: any) => {
                            if (row['Name (JP)'] && key !== 'name_global' && key !== 'old_type' && key !== 'id') {
                                let bufferProperties: any[] = [];
                                let bufferATK: any[] = [];
                                let bufferATKMax: any[] = [];
                                switch (key) {
                                    case 'Name (JP)':
                                        return <Table.Td key={uuidv4()}><Flex justify="center" direction="column" key={uuidv4()} gap={5}>{row['name_en']}<br key={uuidv4()} />{row['Name (JP)']}</Flex></Table.Td>
                                    case 'name_en':
                                        return
                                    case 'Rarity':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} title={`${row[key]} Star`} w={16} h={16} /></Flex></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={uuidv4()} className="centerCell"><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key][0]}.png`} alt={row[key][0]} title={row[key][0]} w={16} h={16} /> {row[key][1]}</Flex></Table.Td>
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
                                            if (bufferATK[0]) return (
                                                <React.Fragment key={uuidv4()}>
                                                    <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferATK}</Flex></Table.Td>
                                                    <Table.Td key={uuidv4()}><Flex justify="center" align="center" direction="column" key={uuidv4()} gap={0}>{bufferATKMax}</Flex></Table.Td>
                                                </React.Fragment>
                                            )
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
                                            bufferProperties.push(<span key={uuidv4()}>{displayAbilities(row['Abilities'])}</span>)
                                        }
                                        if (row['Element']) {
                                            bufferProperties.push(<span key={uuidv4()}>{displayElement(row['Element'])}</span>);
                                        }
                                        if (row['PA_enabled']) {
                                            bufferProperties.push(<span key={uuidv4()}>{displayPA(row['PA_enabled'])}</span>);
                                        }
                                        if (row['Set']) {
                                            bufferProperties.push(<span className="centerCell" key={uuidv4()}>{displaySet(row['Set'], row['name_en'])}</span>);
                                        }
                                        if (index === 10) {
                                            if (bufferProperties[0]) return <Table.Td key={uuidv4()}><SimpleGrid key={uuidv4()} cols={1} spacing={0} verticalSpacing={5}>{bufferProperties}</SimpleGrid></Table.Td>
                                            else return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        } else {
                                            return;
                                        }
                                    case 'SAF':
                                        if (row['old_type']) {
                                            return <Table.Td key={uuidv4()} className="centerCell">-</Table.Td>
                                        } else {
                                            return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/SpecialAbility.png" alt="Special Ability Factor" title="Special Ability Factor" w={16} h={16} /> {row[key]}</Flex></Table.Td>
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