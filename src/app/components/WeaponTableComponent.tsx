import React from 'react';
import { useLanguageContext } from "../language-provider";
import { Text, Flex, Image, SimpleGrid, Table, Tooltip } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import potentialData from "../geardata/weapons/weapon-data/potentials.json"
import displayAbilities from './displayAbilities';
import displaySet from './displaySet';
import displaySSA from './displaySSA';
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
                case 3: maxATK = (baseATK * 150) / 100; break;
                case 4:
                case 5:
                case 6: maxATK = (baseATK * 160) / 100; break;
                case 7:
                case 8:
                case 9: maxATK = (baseATK * 175) / 100; break;
                case 10: maxATK = (baseATK * 190) / 100; break;
                case 11: maxATK = (baseATK * 195) / 100; break;
                case 12: maxATK = (baseATK * 200) / 100; break;
                case 13: maxATK = (baseATK * 140) / 100; break;
            }
        } else {
            maxATK = (baseATK * 135) / 100
        }
        return Math.trunc(maxATK)
    }

    function displayStat(key: string, value: number): any[] {
        let buffer: any[] = []
        buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${key}.png`} alt={key} title={key} w={16} h={16} /> {value}</Flex>)
        return buffer
    }

    function displayPotentials(potList: any[]): any[] {
        let buffer: any[] = []
        for (let i = 0; i < potList.length; i++) {
            let pot = potentialData.find(pot => pot.Name === potList[i])
            if (pot) {
                //let specialPotType:string;
                //let unlockItem: string;
                let potTypeColor: string;
                let potEffect = ['* Lv1: ', pot.Effect[0], <br key={uuidv4()} />, '* Lv2: ', pot.Effect[1], <br key={uuidv4()} />, '* Lv3: ', pot.Effect[2]]
                switch (pot.Special) {
                    case 'Hidden': potTypeColor = 'red'; break; //specialPotType = 'Hidden '; unlockItem = 'Photon Booster'; break;
                    case 'Weaponoid': potTypeColor = 'green'; break; //specialPotType = 'Weaponoid '; unlockItem = 'Weaponoid Booster'; break;
                    case 'Ether': potTypeColor = 'blue'; break; //specialPotType = 'Ether '; unlockItem = 'Ether Fuse'; break;
                    case 'Qliphad': potTypeColor = 'orange'; break; //specialPotType = 'Qliphad '; unlockItem = 'Qliphad Fuse'; break;
                    case 'Ultimate': potTypeColor = 'indigo'; break; //specialPotType = 'Ultimate '; unlockItem = 'Ultimate Booster'; break;
                    case 'Arena': potTypeColor = 'yellow'; break; //specialPotType = 'Arena '; unlockItem = 'Arena Booster'; break;
                    case 'Lightweaver': potTypeColor = 'purple'; break; //specialPotType = 'Lightweaver '; unlockItem = 'Luminmech Grainne Crystal'; break;
                    default: null; //unlockItem = 'Photon Sphere';
                }
                //let potUnlockString:any = <Flex align="center" key={uuidv4()} gap={5}><br key={uuidv4()} />* Requires <Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Tool.png" alt="Tool" w={16} h={16} /> <strong key={uuidv4()}>{unlockItem}s</strong> to unlock {specialPotType}Potential</Flex>
                //potEffect.push(potUnlockString)
                if (pot.Effect[0].length > 500 || pot.Effect[2].length > 100 || pot.Effect[2].length > 500) {
                    buffer.push(
                        <Tooltip key={uuidv4()} label={potEffect} color="dark" multiline w={600}>
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potList[i]}</Text></Flex>
                        </Tooltip>
                    )
                }else{
                    buffer.push(
                        <Tooltip key={uuidv4()} label={potEffect} color="dark">
                            <Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/Potential.png" alt="Potential" title="Potential" w={16} h={16} /> <Text c={potTypeColor} key={uuidv4()}>{potList[i]}</Text></Flex>
                        </Tooltip>
                    )
                }
            } else {
                buffer.push(<Flex align="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src="/icons/RestrictedYellow.png" alt="Potential" title="Potential" w={16} h={16} /> !Potential not found: {potList[i]}</Flex>)
            }
        }
        return buffer;
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

    function displayClasses(classes: any[]): any {
        let classList: any[] = []
        if (classes) {
            if (classes[0] === 'All') {
                classList.push(
                    <React.Fragment key={uuidv4()}>
                        <Flex key={uuidv4()} gap={0}>
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hu.png`} alt={`Hunter`} title={`Hunter`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ra.png`} alt={`Ranger`} title={`Ranger`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fo.png`} alt={`Force`} title={`Force`} w={16} h={16} />
                        </Flex>
                        <Flex key={uuidv4()} gap={0}>
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Fi.png`} alt={`Fighter`} title={`Fighter`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Gu.png`} alt={`Gunner`} title={`Gunner`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Te.png`} alt={`Techer`} title={`Techer`} w={16} h={16} />
                        </Flex>
                        <Flex key={uuidv4()} gap={0}>
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Br.png`} alt={`Braver`} title={`Braver`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Bo.png`} alt={`Bouncer`} title={`Bouncer`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Su.png`} alt={`Summoner`} title={`Summoner`} w={16} h={16} />
                        </Flex>
                        <Flex key={uuidv4()} gap={0}>
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Hr.png`} alt={`Hero`} title={`Hero`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Ph.png`} alt={`Phantom`} title={`Phantom`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Et.png`} alt={`Etoile`} title={`Etoile`} w={16} h={16} />
                            <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/Lu.png`} alt={`Luster`} title={`Luster`} w={16} h={16} />
                        </Flex>
                    </React.Fragment>
                )
            } else {
                let classListAux: any[] = []
                let listBreak: number = 1;
                for (let i = 0; i < classes.length; i++) {
                    let currentClass: any = null
                    let className: string = ''
                    switch (classes[i]) {
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
                    currentClass = <Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${classes[i]}.png`} alt={className} title={className} w={16} h={16} />
                    classListAux.push(currentClass)
                    switch (classes.length) {
                        case 4:
                            listBreak = 2;
                            break;
                        default:
                            listBreak = 3;
                    }
                    if (classListAux.length % listBreak === 0 || !classes[i + 1]) {
                        classList.push(<Flex key={uuidv4()} gap={0}>{classListAux}</Flex>)
                        classListAux = []
                    }
                }
            }
            return classList
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
                                        case 'Abilities': return <Table.Th key={uuidv4()} className="centerCell">Properties</Table.Th>
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
                        {row['Name (JP)'] && <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${type}/${row['name_en'].replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${row['name_en']}`} w={64} h={64} /></Flex></Table.Td>}
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
                                        return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} title={`${row[key]} Star`} w={16} h={16} /></Flex></Table.Td>
                                    case 'Requirement':
                                        return <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/icons/${row[key][0]}.png`} alt={row[key][0]} title={row[key][0]} w={16} h={16} /> {row[key][1]}</Flex></Table.Td>
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
                                    case 'Set':
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
                                            bufferProperties.push(displaySet(row['Set'], row['name_en']));
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
                                            return <Table.Td key={uuidv4()}><Flex align="center" key={uuidv4()} gap={5}>{displayAbilities(row['SAF'])}</Flex></Table.Td>
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