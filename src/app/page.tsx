'use client'

import React, { useState } from 'react'
import { Image, Button, Flex, Table, InputBase, Combobox, useCombobox, SimpleGrid } from "@mantine/core";
import { useLanguageContext } from "./language-provider";
import { v4 as uuidv4 } from 'uuid';
import displayResistance from './components/displayResistance';
import displayStat from './components/displayStat';

export default function Home() {
    const language = useLanguageContext()
    const [race, setRace] = useState<string>('Human Male')
    const [magType, setMagType] = useState<string>('S-ATK')
    const [mainClass, setMainClass] = useState<string>('Hunter')
    const [subClass, setSubClass] = useState<string>(null)
    const [weapon, setWeapon] = useState<string>('Lightweaver Cras Edge')
    const [rear, setRear] = useState<string>('Rear / Cras Dyne')
    const [arm, setArm] = useState<string>('Rear / Cras Noom')
    const [leg, setLeg] = useState<string>('Rear / Cras Ment')
    const [hp, setHp] = useState<number>(650)
    const [pp, setPp] = useState<number>(120)
    const [sAtk, setSAtk] = useState<number>(540)
    const [rAtk, setRAtk] = useState<number>(540)
    const [tAtk, setTAtk] = useState<number>(540)
    const [dex, setDex] = useState<number>(415)
    const [sDef, setSDef] = useState<number>(450)
    const [rDef, setRDef] = useState<number>(450)
    const [tDef, setTDef] = useState<number>(450)

    const raceList: string[] = ['Human Male', 'Human Female', 'Newman Male', 'Newman Female', 'CAST Male', 'Cast Female', 'Dewman Male', 'Dewman Female']
    const magTypeList: string[] = ['S-ATK', 'R-ATK', 'T-ATK', 'DEX']
    const mainClassList: string[] = ['Hunter', 'Ranger', 'Force', 'Fighter', 'Gunner', 'Techer', 'Summoner', 'Hero', 'Phantom', 'Etoile', 'Luster']
    const subClassList: string[] = [null, 'Hunter', 'Ranger', 'Force', 'Fighter', 'Gunner', 'Techer', 'Summoner', 'Phantom', 'Etoile', 'Luster']
    const successorClassList: string[] = ['Hero', 'Phantom', 'Etoile', 'Luster']

    const raceCombobox = useCombobox({
        onDropdownClose: () => raceCombobox.resetSelectedOption(),
    });
    const magCombobox = useCombobox({
        onDropdownClose: () => magCombobox.resetSelectedOption(),
    });
    const mainClassCombobox = useCombobox({
        onDropdownClose: () => mainClassCombobox.resetSelectedOption(),
    });
    const subClassCombobox = useCombobox({
        onDropdownClose: () => subClassCombobox.resetSelectedOption(),
    });

    const raceOptions = raceList.map((item) => (
        <Combobox.Option value={item} key={uuidv4()}>
            {item}
        </Combobox.Option>
    ));
    const magTypeOptions = magTypeList.map((item) => (
        <Combobox.Option value={item} key={uuidv4()}>
            {item}
        </Combobox.Option>
    ));
    const mainClassOptions = mainClassList.map((item) => (
        <Combobox.Option value={item} key={uuidv4()}>
            {item}
        </Combobox.Option>
    ));
    const subClassOptions = subClassList.map((item) => (
        <Combobox.Option value={item} key={uuidv4()}>
            {item}
        </Combobox.Option>
    ));

    switch (language.language) {
        case 'English Patch':
            return (
                <>
                    <h1>PSO2 Character Simulator</h1>
                    <Table withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>Character Sheet</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td rowSpan={2}><Flex justify='center'><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/portraits/${race}.png`} alt="S-ATK" w={62} h={62} /></Flex></Table.Td>
                                <Table.Th>Race</Table.Th>
                                <Table.Td>
                                    <Combobox store={raceCombobox} onOptionSubmit={(val) => {
                                        setRace(val);
                                        raceCombobox.closeDropdown();
                                    }}>
                                        <Combobox.Target>
                                            <InputBase
                                                component="button"
                                                type="button"
                                                pointer
                                                rightSection={<Combobox.Chevron />}
                                                rightSectionPointerEvents="none"
                                                onClick={() => raceCombobox.toggleDropdown()}
                                            >
                                                {race}
                                            </InputBase>
                                        </Combobox.Target>
                                        <Combobox.Dropdown>
                                            <Combobox.Options>
                                                {raceOptions}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>
                                </Table.Td>
                                <Table.Th>Main Class</Table.Th>
                                <Table.Td>
                                    <Combobox store={mainClassCombobox} onOptionSubmit={(val) => {
                                        setMainClass(val);
                                        mainClassCombobox.closeDropdown();
                                    }}>
                                        <Combobox.Target>
                                            <InputBase
                                                component="button"
                                                type="button"
                                                pointer
                                                rightSection={<Combobox.Chevron />}
                                                rightSectionPointerEvents="none"
                                                onClick={() => mainClassCombobox.toggleDropdown()}
                                            >
                                                {mainClass}
                                            </InputBase>
                                        </Combobox.Target>
                                        <Combobox.Dropdown>
                                            <Combobox.Options>
                                                {mainClassOptions}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>
                                </Table.Td>
                                <Table.Th>Sub Class</Table.Th>
                                <Table.Td>
                                    {!successorClassList.includes(mainClass) &&
                                        <Combobox store={subClassCombobox} onOptionSubmit={(val) => {
                                            setSubClass(val);
                                            subClassCombobox.closeDropdown();
                                        }}>
                                            <Combobox.Target>
                                                <InputBase
                                                    component="button"
                                                    type="button"
                                                    pointer
                                                    rightSection={<Combobox.Chevron />}
                                                    rightSectionPointerEvents="none"
                                                    onClick={() => subClassCombobox.toggleDropdown()}
                                                >
                                                    {subClass}
                                                </InputBase>
                                            </Combobox.Target>
                                            <Combobox.Dropdown>
                                                <Combobox.Options>
                                                    {subClassOptions}
                                                </Combobox.Options>
                                            </Combobox.Dropdown>
                                        </Combobox>
                                    }
                                    {successorClassList.includes(mainClass) && <Flex justify='center'>Not available for Successor Class</Flex>}
                                </Table.Td>
                                <Table.Th>MAG Type</Table.Th>
                                <Table.Td>
                                    <Combobox store={magCombobox} onOptionSubmit={(val) => {
                                        setMagType(val);
                                        magCombobox.closeDropdown();
                                    }}>
                                        <Combobox.Target>
                                            <InputBase
                                                component="button"
                                                type="button"
                                                pointer
                                                rightSection={<Combobox.Chevron />}
                                                rightSectionPointerEvents="none"
                                                onClick={() => magCombobox.toggleDropdown()}
                                            >
                                                {magType}
                                            </InputBase>
                                        </Combobox.Target>
                                        <Combobox.Dropdown>
                                            <Combobox.Options>
                                                {magTypeOptions}
                                            </Combobox.Options>
                                        </Combobox.Dropdown>
                                    </Combobox>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>Gear</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th colSpan={2}><Flex justify='center'>Weapon</Flex></Table.Th>
                                <Table.Th colSpan={2}><Flex justify='center'>Rear</Flex></Table.Th>
                                <Table.Th colSpan={2}><Flex justify='center'>Arm</Flex></Table.Th>
                                <Table.Th colSpan={2}><Flex justify='center'>Leg</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/swords/${weapon.replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td><Flex justify='center' direction='column'>{weapon}<Button>Choose Weapon</Button></Flex></Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/rear/${rear.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td><Flex justify='center' direction='column'>{rear}<Button>Choose Rear Unit</Button></Flex></Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/arm/${arm.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td><Flex justify='center' direction='column'>{arm}<Button>Choose Arm Unit</Button></Flex></Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/leg/${leg.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td><Flex justify='center' direction='column'>{leg}<Button>Choose Leg Unit</Button></Flex></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>Character Sheet</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td><Flex justify='center'><Button>Set Skills</Button></Flex></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>Stats</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>HP</Flex></Table.Th>
                                <Table.Th colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>PP</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{hp}</Flex></Table.Td>
                                <Table.Td colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{pp}</Flex></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>ATK</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEX</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEF</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>Damage Boosts</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                        {magType === 'S-ATK' && displayStat('S-ATK', sAtk + 200)}
                                        {magType !== 'S-ATK' && displayStat('S-ATK', sAtk)}
                                    </Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                        {magType === 'R-ATK' && displayStat('R-ATK', rAtk + 200)}
                                        {magType !== 'R-ATK' && displayStat('R-ATK', rAtk)}
                                    </Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                        {magType === 'T-ATK' && displayStat('T-ATK', tAtk + 200)}
                                        {magType !== 'T-ATK' && displayStat('T-ATK', tAtk)}
                                    </Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                        {magType === 'DEX' && displayStat('DEX', dex + 200)}
                                        {magType !== 'DEX' && displayStat('DEX', dex)}
                                    </Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-DEF', sDef)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-DEF', rDef)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-DEF', tDef)}</Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('S-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('R-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('T-ATK', 100)}%</Flex>
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={9}><Flex justify="center" align="center" key={uuidv4()} gap={5}>Resistances</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td colSpan={9}>
                                    <SimpleGrid cols={3} spacing={0} verticalSpacing={0}>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Strike Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ranged Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Tech Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Fire Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ice Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Lightning Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Wind Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Light Resistance', 10)}</Flex>
                                        <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Dark Resistance', 10)}</Flex>
                                    </SimpleGrid>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                </>
            );
    }
}