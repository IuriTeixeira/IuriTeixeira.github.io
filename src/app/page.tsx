'use client'

import React, { useEffect, useState } from 'react'
import { Image, Button, Flex, Table, InputBase, Combobox, useCombobox, Checkbox, Group } from "@mantine/core";
import { useLanguageContext } from "./language-provider";
import { v4 as uuidv4 } from 'uuid';
import displayResistance from './components/displayResistance';
import displayStat from './components/displayStat';
import raceStats from './races.json'
import classStats from './classes.json'

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
    const [baseHp, setBaseHp] = useState<number>(650)
    const [bonusHp, setBonusHp] = useState<number>(0)
    const [totalHp, setTotalHp] = useState<number>(650)
    const [basePp, setBasePp] = useState<number>(110)
    const [bonusPp, setBonusPp] = useState<number>(0)
    const [totalPp, setTotalPp] = useState<number>(110)
    const [baseSAtk, setBaseSAtk] = useState<number>(540)
    const [bonusSAtk, setBonusSAtk] = useState<number>(0)
    const [totalSAtk, setTotalSAtk] = useState<number>(540)
    const [baseRAtk, setBaseRAtk] = useState<number>(540)
    const [bonusRAtk, setBonusRAtk] = useState<number>(0)
    const [totalRAtk, setTotalRAtk] = useState<number>(540)
    const [baseTAtk, setBaseTAtk] = useState<number>(540)
    const [bonusTAtk, setBonusTAtk] = useState<number>(0)
    const [totalTAtk, setTotalTAtk] = useState<number>(540)
    const [baseDex, setBaseDex] = useState<number>(415)
    const [bonusDex, setBonusDex] = useState<number>(0)
    const [totalDex, setTotalDex] = useState<number>(415)
    const [baseSDef, setBaseSDef] = useState<number>(450)
    const [bonusSDef, setBonusSDef] = useState<number>(0)
    const [totalSDef, setTotalSDef] = useState<number>(450)
    const [baseRDef, setBaseRDef] = useState<number>(450)
    const [bonusRDef, setBonusRDef] = useState<number>(0)
    const [totalRDef, setTotalRDef] = useState<number>(450)
    const [baseTDef, setBaseTDef] = useState<number>(450)
    const [bonusTDef, setBonusTDef] = useState<number>(0)
    const [totalTDef, setTotalTDef] = useState<number>(450)
    const [classBoosts, setClassBoosts] = useState<string[]>([])//<boolean[]>([false,false,false,false,false,false,false,false,false,false,false,false])

    let raceData: any = raceStats.find(selectedRace => selectedRace[`Name (English)`] === race)
    let mainClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === mainClass)
    let subClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === subClass)
    const raceList: string[] = ['Human Male', 'Human Female', 'Newman Male', 'Newman Female', 'CAST Male', 'Cast Female', 'Dewman Male', 'Dewman Female']
    const magTypeList: string[] = ['S-ATK', 'R-ATK', 'T-ATK', 'DEX', 'S-DEF', 'R-DEF', 'T-DEF']
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

    function updateRace(value:string){
        setRace(value)
        raceData = raceStats.find(selectedRace => selectedRace[`Name (English)`] === value)
        updateStats(classBoosts,magType)
    }

    function updateClass(main:string, sub:string){
        setMainClass(main)
        setSubClass(sub)
        mainClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === main)
        if(sub) subClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === sub)
        updateStats(classBoosts,magType)
    }

    function updateMag(type:string){
        setMagType(type)
        updateStats(classBoosts,type)
    }

    function updateStats(value: string[], mag:string) {
        setClassBoosts(value)
        //0 = HP
        //1 = PP
        //2 = S-ATK
        //3 = R-ATK
        //4 = T-ATK
        //5 = DEX
        //6 = S-DEF
        //7 = R-DEF
        //8 = T-DEF
        let bonusBaseStats: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        if (value.includes('Hunter')) {
            bonusBaseStats[0] += 50
            bonusBaseStats[3] += 15
            bonusBaseStats[6] += 40
        }
        if (value.includes('Ranger')) {
            bonusBaseStats[3] += 20
            bonusBaseStats[4] += 15
            bonusBaseStats[7] += 40
        }
        if (value.includes('Force')) {
            bonusBaseStats[3] += 15
            bonusBaseStats[4] += 20
            bonusBaseStats[8] += 40
        }
        if (value.includes('Fighter')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 50
            bonusBaseStats[4] += 5
            bonusBaseStats[8] += 10
        }
        if (value.includes('Gunner')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 15
            bonusBaseStats[3] += 50
            bonusBaseStats[6] += 10
        }
        if (value.includes('Techer')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 15
            bonusBaseStats[4] += 50
            bonusBaseStats[7] += 10
        }
        if (value.includes('Braver')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 20
            bonusBaseStats[3] += 20
            bonusBaseStats[5] += 30
        }
        if (value.includes('Bouncer')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 20
            bonusBaseStats[4] += 20
            bonusBaseStats[5] += 30
        }
        if (value.includes('Summoner')) {
            bonusBaseStats[0] += 10
            bonusBaseStats[6] += 40
            bonusBaseStats[7] += 40
            bonusBaseStats[8] += 40
        }

        let totalBaseHp:number
        let totalBasePp:number
        let totalBaseSAtk:number
        let totalBaseRAtk:number
        let totalBaseTAtk:number
        let totalBaseDex:number
        let totalBaseSDef:number
        let totalBaseRDef:number
        let totalBaseTDef:number
        if (subClassData) {
            totalBaseHp = ((baseHp + bonusBaseStats[0]) * raceData["HP"] * mainClassData["HP"] + ((baseHp + bonusBaseStats[0]) * (subClassData["HP"] * 0.2)))
            totalBasePp = ((basePp + bonusBaseStats[1]) * raceData["PP"] * mainClassData["PP"] + ((basePp + bonusBaseStats[1]) * (subClassData["PP"] * 0.2)))
            totalBaseSAtk = ((baseSAtk + bonusBaseStats[2]) * raceData["S-ATK"] * mainClassData["S-ATK"] + ((baseSAtk + bonusBaseStats[2]) * (subClassData["S-ATK"] * 0.2)))
            totalBaseRAtk = ((baseRAtk + bonusBaseStats[3]) * raceData["R-ATK"] * mainClassData["R-ATK"] + ((baseRAtk + bonusBaseStats[3]) * (subClassData["R-ATK"] * 0.2)))
            totalBaseTAtk = ((baseTAtk + bonusBaseStats[4]) * raceData["T-ATK"] * mainClassData["T-ATK"] + ((baseTAtk + bonusBaseStats[4]) * (subClassData["T-ATK"] * 0.2)))
            totalBaseDex = ((baseDex + bonusBaseStats[5]) * raceData["DEX"] * mainClassData["DEX"] + ((baseDex + bonusBaseStats[5]) * (subClassData["DEX"] * 0.2)))
            totalBaseSDef = ((baseSDef + bonusBaseStats[6]) * raceData["S-DEF"] * mainClassData["S-DEF"] + ((baseSDef + bonusBaseStats[6]) * (subClassData["S-DEF"] * 0.2)))
            totalBaseRDef = ((baseRDef + bonusBaseStats[7]) * raceData["R-DEF"] * mainClassData["R-DEF"] + ((baseRDef + bonusBaseStats[7]) * (subClassData["R-DEF"] * 0.2)))
            totalBaseTDef = ((baseTDef + bonusBaseStats[8]) * raceData["T-DEF"] * mainClassData["T-DEF"] + ((baseTDef + bonusBaseStats[8]) * (subClassData["T-DEF"] * 0.2)))
        } else {
            totalBaseHp = ((baseHp + bonusBaseStats[0]) * raceData["HP"] * mainClassData["HP"])
            totalBasePp = ((basePp + bonusBaseStats[1]) * raceData["PP"] * mainClassData["PP"])
            totalBaseSAtk = ((baseSAtk + bonusBaseStats[2]) * raceData["S-ATK"] * mainClassData["S-ATK"])
            totalBaseRAtk = ((baseRAtk + bonusBaseStats[3]) * raceData["R-ATK"] * mainClassData["R-ATK"])
            totalBaseTAtk = ((baseTAtk + bonusBaseStats[4]) * raceData["T-ATK"] * mainClassData["T-ATK"])
            totalBaseDex = ((baseDex + bonusBaseStats[5]) * raceData["DEX"] * mainClassData["DEX"])
            totalBaseSDef = ((baseSDef + bonusBaseStats[6]) * raceData["S-DEF"] * mainClassData["S-DEF"])
            totalBaseRDef = ((baseRDef + bonusBaseStats[7]) * raceData["R-DEF"] * mainClassData["R-DEF"])
            totalBaseTDef = ((baseTDef + bonusBaseStats[8]) * raceData["T-DEF"] * mainClassData["T-DEF"])
        }
        switch (mag) {
            case 'S-ATK':
                totalBaseSAtk += 200; break;
            case 'R-ATK':
                totalBaseRAtk += 200; break;
            case 'T-ATK':
                totalBaseTAtk += 200; break;
            case 'DEX':
                totalBaseDex += 200; break;
            case 'S-DEF':
                totalBaseSDef += 200; break;
            case 'R-DEF':
                totalBaseRDef += 200; break;
            case 'T-DEF':
                totalBaseTDef += 200; break;
        }

        setTotalHp(totalBaseHp + bonusHp)
        setTotalPp(totalBasePp + bonusPp)
        setTotalSAtk(totalBaseSAtk + bonusSAtk)
        setTotalRAtk(totalBaseRAtk + bonusRAtk)
        setTotalTAtk(totalBaseTAtk + bonusTAtk)
        setTotalDex(totalBaseDex + bonusDex)
        setTotalSDef(totalBaseSDef + bonusSDef)
        setTotalRDef(totalBaseRDef + bonusRDef)
        setTotalTDef(totalBaseTDef + bonusTDef)
}

    useEffect(() => {
        updateStats([],magType);
    }, []);

    switch (language.language) {
        default:
            return (
                <>
                    <Flex justify="center" align="center" key={uuidv4()} gap={5}><h1>PSO2 Character Simulator</h1></Flex>
                    <Table withColumnBorders w='70%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>CHARACTER SHEET</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th>Race</Table.Th>
                                <Table.Td>
                                    <Combobox store={raceCombobox} onOptionSubmit={(val) => {
                                        updateRace(val)
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
                                        updateClass(val,subClass)
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
                                            updateClass(mainClass,val)
                                            updateStats(classBoosts,magType)
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
                                        updateMag(val)
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
                    <Table withColumnBorders w='70%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th><Flex justify='center'>CLASS BONUSES</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>
                                    <Flex justify='center'>
                                        <Checkbox.Group value={classBoosts} onChange={(val) => updateStats(val,magType)}>
                                            <Group mt="xs">
                                                <Checkbox value="Hunter" label="Hunter" />
                                                <Checkbox value="Ranger" label="Ranger" />
                                                <Checkbox value="Force" label="Force" />
                                                <Checkbox value="Fighter" label="Fighter" />
                                                <Checkbox value="Gunner" label="Gunner" />
                                                <Checkbox value="Techer" label="Techer" />
                                                <Checkbox value="Braver" label="Braver" />
                                                <Checkbox value="Bouncer" label="Bouncer" />
                                                <Checkbox value="Summoner" label="Summoner" />
                                            </Group>
                                        </Checkbox.Group>
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                    <Table withColumnBorders w='70%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>GEAR</Flex></Table.Th>
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
                    <Table withColumnBorders w='70%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>SKILLS</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td><Flex justify='center'><Button>Set Skills</Button></Flex></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table withColumnBorders w='70%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>STATS</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>HP</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>PP</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEX</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalHp)}</Flex></Table.Td>
                                <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalPp)}</Flex></Table.Td>
                                <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('DEX', Math.floor(totalDex))}</Flex></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>ATK</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEF</Flex></Table.Th>
                                <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>Damage Boosts</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-ATK', Math.floor(totalSAtk))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-ATK', Math.floor(totalRAtk))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-ATK', Math.floor(totalTAtk))}</Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-DEF', Math.floor(totalSDef))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-DEF', Math.floor(totalRDef))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-DEF', Math.floor(totalTDef))}</Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('S-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('R-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('T-ATK', 100)}%</Flex>
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={9}><Flex justify="center" align="center" key={uuidv4()} gap={5}>RESISTANCES</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Strike Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ranged Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Tech Resistance', 10)}</Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Fire Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ice Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Lightning Resistance', 10)}</Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Wind Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Light Resistance', 10)}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Dark Resistance', 10)}</Flex>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                </>
            );
    }
}