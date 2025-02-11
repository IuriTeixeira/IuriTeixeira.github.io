'use client'

import React, { useEffect, useState } from 'react'
import { Image, Button, Flex, Table, InputBase, Combobox, useCombobox, Checkbox, Group, Tooltip } from "@mantine/core";
import { useLanguageContext } from "./language-provider";
import { v4 as uuidv4 } from 'uuid';
import displayAbilities from './components/displayAbilities';
import displayResistance from './components/displayResistance';
import displayStat from './components/displayStat';
import raceStats from './races.json'
import classStats from './classes.json'
import units from './geardata/units/unit-data/units.json'

export default function Home() {
    const language = useLanguageContext()
    const [race, setRace] = useState<string>('Newman Female')
    const [magType, setMagType] = useState<string>('S-ATK')
    const [mainClass, setMainClass] = useState<string>('Etoile')
    const [subClass, setSubClass] = useState<string>('None')
    const [weapon, setWeapon] = useState<string>('Lightweaver Cras Glide')
    const [rear, setRear] = useState<string>('Rear / Cras Dyne')
    const [arm, setArm] = useState<string>('Arm / Cras Noom')
    const [leg, setLeg] = useState<string>('Leg / Cras Ment')
    const [bonusHp, setBonusHp] = useState<number>(0)
    const [totalHp, setTotalHp] = useState<number>(0)
    const [bonusPp, setBonusPp] = useState<number>(0)
    const [totalPp, setTotalPp] = useState<number>(0)
    const [bonusSAtk, setBonusSAtk] = useState<number>(0)
    const [totalSAtk, setTotalSAtk] = useState<number>(0)
    const [bonusRAtk, setBonusRAtk] = useState<number>(0)
    const [totalRAtk, setTotalRAtk] = useState<number>(0)
    const [bonusTAtk, setBonusTAtk] = useState<number>(0)
    const [totalTAtk, setTotalTAtk] = useState<number>(0)
    const [bonusDex, setBonusDex] = useState<number>(0)
    const [totalDex, setTotalDex] = useState<number>(0)
    const [bonusSDef, setBonusSDef] = useState<number>(0)
    const [totalSDef, setTotalSDef] = useState<number>(0)
    const [bonusRDef, setBonusRDef] = useState<number>(0)
    const [totalRDef, setTotalRDef] = useState<number>(0)
    const [bonusTDef, setBonusTDef] = useState<number>(0)
    const [totalTDef, setTotalTDef] = useState<number>(0)
    const [strikeRes, setStrikeRes] = useState<number>(0)
    const [rangedRes, setRangedRes] = useState<number>(0)
    const [techRes, setTechRes] = useState<number>(0)
    const [fireRes, setFireRes] = useState<number>(0)
    const [iceRes, setIceRes] = useState<number>(0)
    const [lightningRes, setLightningRes] = useState<number>(0)
    const [windRes, setWindRes] = useState<number>(0)
    const [lightRes, setLightRes] = useState<number>(0)
    const [darkRes, setDarkRes] = useState<number>(0)
    const [classBoosts, setClassBoosts] = useState<string[]>(['Hunter', 'Ranger', 'Force', 'Fighter', 'Gunner', 'Techer', 'Braver', 'Bouncer', 'Summoner'])

    let rearData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === rear)
    let armData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === arm)
    let legData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === leg)

    let raceData: any = raceStats.find(selectedRace => selectedRace[`Name (English)`] === race)
    let mainClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === mainClass)
    let subClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === subClass)
    const raceList: string[] = ['Human Male', 'Human Female', 'Newman Male', 'Newman Female', 'CAST Male', 'CAST Female', 'Dewman Male', 'Dewman Female']
    const magTypeList: string[] = ['S-ATK', 'R-ATK', 'T-ATK', 'DEX', 'S-DEF', 'R-DEF', 'T-DEF']
    const mainClassList: string[] = ['Hunter', 'Ranger', 'Force', 'Fighter', 'Gunner', 'Techer', 'Braver', 'Bouncer', 'Summoner', 'Hero', 'Phantom', 'Etoile', 'Luster']
    const subClassList: string[] = ['None', 'Hunter', 'Ranger', 'Force', 'Fighter', 'Gunner', 'Techer', 'Braver', 'Bouncer', 'Summoner', 'Phantom', 'Etoile', 'Luster']
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
    const [subClassOptions, setSubClassOptions] = useState(
        subClassList.map((item) => (
            <Combobox.Option value={item} key={uuidv4()}>{item}</Combobox.Option>
        )));

    function updateRace(value: string) {
        setRace(value)
        raceData = raceStats.find(selectedRace => selectedRace[`Name (English)`] === value)
        updateStats(classBoosts, magType)
    }

    function updateClass(main: string, sub: string) {
        if (sub === 'None') {
            setSubClassOptions(subClassList.filter((item) => (!item.includes(main))).map((item) => (
                <Combobox.Option value={item} key={uuidv4()}>{item}</Combobox.Option>
            )))
        } else {
            setSubClassOptions(subClassList.map((item) => (
                <Combobox.Option value={item} key={uuidv4()}>{item}</Combobox.Option>
            )))
        }
        if (main === sub) {
            main = subClass
            sub = mainClass
            mainClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === subClass)
            subClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === mainClass)
            setMainClass(main)
            setSubClass(sub)
        } else {
            if (successorClassList.includes(main)) {
                sub = 'None'
                setSubClass(sub)
                subClassData = null
            }
            mainClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === main)
            setSubClass(sub)
            if (sub !== 'None') {
                subClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === sub)
            } else {
                subClassData = null
            }
        }
        updateStats(classBoosts, magType)
    }

    function updateMag(type: string) {
        setMagType(type)
        updateStats(classBoosts, type)
    }

    function updateGear(newWeapon: string, newRear: string, newArm: string, newLeg: string) {
        setWeapon(newWeapon)
        setRear(newRear)
        setArm(newArm)
        setLeg(newLeg)
        rearData = units.find(selectedUnit => selectedUnit["Name (English)"] === newRear)
        armData = units.find(selectedUnit => selectedUnit["Name (English)"] === newArm)
        legData = units.find(selectedUnit => selectedUnit["Name (English)"] === newLeg)
        updateStats(classBoosts, magType)
    }

    function updateStats(value: string[], mag: string) {
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
            bonusBaseStats[4] += 15
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

        let totalBaseHp: number
        let totalBasePp: number
        let totalBaseSAtk: number
        let totalBaseRAtk: number
        let totalBaseTAtk: number
        let totalBaseDex: number
        let totalBaseSDef: number
        let totalBaseRDef: number
        let totalBaseTDef: number
        if (subClassData) {
            totalBaseHp = ((mainClassData["HP"] * raceData["HP"]) + (subClassData["HP"] * 0.2) + bonusBaseStats[0])
            totalBasePp = ((mainClassData["PP"] * raceData["PP"]) + (subClassData["PP"] * 0.2) + bonusBaseStats[1])
            totalBaseSAtk = ((mainClassData["S-ATK"] * raceData["S-ATK"]) + (subClassData["S-ATK"] * 0.2) + bonusBaseStats[2])
            totalBaseRAtk = ((mainClassData["R-ATK"] * raceData["R-ATK"]) + (subClassData["R-ATK"] * 0.2) + bonusBaseStats[3])
            totalBaseTAtk = ((mainClassData["T-ATK"] * raceData["T-ATK"]) + (subClassData["T-ATK"] * 0.2) + bonusBaseStats[4])
            totalBaseDex = ((mainClassData["DEX"] * raceData["DEX"]) + (subClassData["DEX"] * 0.2) + bonusBaseStats[5])
            totalBaseSDef = ((mainClassData["S-DEF"] * raceData["S-DEF"]) + (subClassData["S-DEF"] * 0.2) + bonusBaseStats[6])
            totalBaseRDef = ((mainClassData["R-DEF"] * raceData["R-DEF"]) + (subClassData["R-DEF"] * 0.2) + bonusBaseStats[7])
            totalBaseTDef = ((mainClassData["T-DEF"] * raceData["T-DEF"]) + (subClassData["T-DEF"] * 0.2) + bonusBaseStats[8])
        } else {
            totalBaseHp = ((mainClassData["HP"] * raceData["HP"]) + bonusBaseStats[0])
            totalBasePp = ((mainClassData["PP"] * raceData["PP"]) + bonusBaseStats[1])
            totalBaseSAtk = ((mainClassData["S-ATK"] * raceData["S-ATK"]) + bonusBaseStats[2])
            totalBaseRAtk = ((mainClassData["R-ATK"] * raceData["R-ATK"]) + bonusBaseStats[3])
            totalBaseTAtk = ((mainClassData["T-ATK"] * raceData["T-ATK"]) + bonusBaseStats[4])
            totalBaseDex = ((mainClassData["DEX"] * raceData["DEX"]) + bonusBaseStats[5])
            totalBaseSDef = ((mainClassData["S-DEF"] * raceData["S-DEF"]) + bonusBaseStats[6])
            totalBaseRDef = ((mainClassData["R-DEF"] * raceData["R-DEF"]) + bonusBaseStats[7])
            totalBaseTDef = ((mainClassData["T-DEF"] * raceData["T-DEF"]) + bonusBaseStats[8])
        }
        switch (mag) {
            case 'S-ATK':
                totalBaseSAtk += 200;
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseRAtk += 200;
                    totalBaseTAtk += 200;
                }
                break;
            case 'R-ATK':
                totalBaseRAtk += 200;
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseSAtk += 200;
                    totalBaseTAtk += 200;
                }
                break;
            case 'T-ATK':
                totalBaseTAtk += 200;
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseSAtk += 200;
                    totalBaseRAtk += 200;
                }
                break;
            case 'DEX':
                totalBaseDex += 200;
                if (mainClass === 'Phantom' || subClass === 'Phantom') {
                    totalBaseSAtk += 200;
                    totalBaseRAtk += 200;
                    totalBaseTAtk += 200;
                }
                if (mainClass === 'Braver' || subClass === 'Braver') {
                    totalBaseSAtk += 200;
                    totalBaseRAtk += 200;
                }
                if (mainClass === 'Bouncer' || subClass === 'Bouncer') {
                    totalBaseSAtk += 200;
                    totalBaseTAtk += 200;
                }
                break;
            case 'S-DEF':
                totalBaseSDef += 200; break;
            case 'R-DEF':
                totalBaseRDef += 200; break;
            case 'T-DEF':
                totalBaseTDef += 200; break;
        }

        let totalBonusHp: number = (rearData["HP"] || 0) + (armData["HP"] || 0) + (legData["HP"] || 0)
        let totalBonusPp: number = (rearData["PP"] || 0) + (armData["PP"] || 0) + (legData["PP"] || 0)
        let totalBonusSAtk: number = (rearData["S-ATK"] || 0) + (armData["S-ATK"] || 0) + (legData["S-ATK"] || 0)
        let totalBonusRAtk: number = (rearData["R-ATK"] || 0) + (armData["R-ATK"] || 0) + (legData["R-ATK"] || 0)
        let totalBonusTAtk: number = (rearData["T-ATK"] || 0) + (armData["T-ATK"] || 0) + (legData["T-ATK"] || 0)
        let totalBonusDex: number = (rearData["DEX"] || 0) + (armData["DEX"] || 0) + (legData["DEX"] || 0)
        let totalBonusSDef: number = (rearData["S-DEF"] || 0) + (armData["S-DEF"] || 0) + (legData["S-DEF"] || 0)
        let totalBonusRDef: number = (rearData["R-DEF"] || 0) + (armData["R-DEF"] || 0) + (legData["R-DEF"] || 0)
        let totalBonusTDef: number = (rearData["T-DEF"] || 0) + (armData["T-DEF"] || 0) + (legData["T-DEF"] || 0)


        setTotalHp(totalBaseHp + totalBonusHp)
        setTotalPp(totalBasePp + totalBonusPp)
        setTotalSAtk(totalBaseSAtk + totalBonusSAtk)
        setTotalRAtk(totalBaseRAtk + totalBonusRAtk)
        setTotalTAtk(totalBaseTAtk + totalBonusTAtk)
        setTotalDex(totalBaseDex + totalBonusDex)
        setTotalSDef(totalBaseSDef + totalBonusSDef)
        setTotalRDef(totalBaseRDef + totalBonusRDef)
        setTotalTDef(totalBaseTDef + totalBonusTDef)

        setBonusHp(totalBonusHp)
        setBonusPp(totalBonusPp)
        setBonusSAtk(totalBonusSAtk)
        setBonusRAtk(totalBonusRAtk)
        setBonusTAtk(totalBonusTAtk)
        setBonusDex(totalBonusDex)
        setBonusSDef(totalBonusSDef)
        setBonusRDef(totalBonusRDef)
        setBonusTDef(totalBonusTDef)

        setStrikeRes(1 - (1 - (rearData["Strike Resistance"] || 0) / 100) * (1 - (armData["Strike Resistance"] || 0) / 100) * (1 - (legData["Strike Resistance"] || 0) / 100))
        setRangedRes(1 - (1 - (rearData["Ranged Resistance"] || 0) / 100) * (1 - (armData["Ranged Resistance"] || 0) / 100) * (1 - (legData["Ranged Resistance"] || 0) / 100))
        setTechRes(1 - (1 - (rearData["Tech Resistance"] || 0) / 100) * (1 - (armData["Tech Resistance"] || 0) / 100) * (1 - (legData["Tech Resistance"] || 0) / 100))
        setFireRes(1 - (1 - (rearData["Fire Resistance"] || 0) / 100) * (1 - (armData["Fire Resistance"] || 0) / 100) * (1 - (legData["Fire Resistance"] || 0) / 100))
        setIceRes(1 - (1 - (rearData["Ice Resistance"] || 0) / 100) * (1 - (armData["Ice Resistance"] || 0) / 100) * (1 - (legData["Ice Resistance"] || 0) / 100))
        setLightningRes(1 - (1 - (rearData["Lightning Resistance"] || 0) / 100) * (1 - (armData["Lightning Resistance"] || 0) / 100) * (1 - (legData["Lightning Resistance"] || 0) / 100))
        setWindRes(1 - (1 - (rearData["Wind Resistance"] || 0) / 100) * (1 - (armData["Wind Resistance"] || 0) / 100) * (1 - (legData["Wind Resistance"] || 0) / 100))
        setLightRes(1 - (1 - (rearData["Light Resistance"] || 0) / 100) * (1 - (armData["Light Resistance"] || 0) / 100) * (1 - (legData["Light Resistance"] || 0) / 100))
        setDarkRes(1 - (1 - (rearData["Dark Resistance"] || 0) / 100) * (1 - (armData["Dark Resistance"] || 0) / 100) * (1 - (legData["Dark Resistance"] || 0) / 100))
    }

    useEffect(() => {
        updateClass(mainClass, subClass);
        updateMag(magType);
        updateGear(weapon, rear, arm, leg);
        updateStats(classBoosts, magType)
    }, []);

    switch (language.language) {
        default:
            return (
                <>
                    {/* <>{JSON.stringify(rearData, null, 2)}</> */}
                    <Flex justify="center" align="center" key={uuidv4()} gap={5}><h1>PSO2 Character Simulator</h1></Flex>
                    <Table withColumnBorders w='90%' align='center'>
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
                                        updateClass(val, subClass)
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
                                            updateClass(mainClass, val)
                                            updateStats(classBoosts, magType)
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
                    <Table withColumnBorders w='90%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Flex justify='center'>CLASS BOOSTS</Flex>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>
                                    <Flex justify='center'>
                                        <Checkbox.Group description="Classes with the Lv75 stat boost title acquired" value={classBoosts} onChange={(val) => updateStats(val, magType)}>
                                            <Group mt="xs">
                                                <Checkbox value="Hunter" label="Hunter" checked />
                                                <Checkbox value="Ranger" label="Ranger" checked />
                                                <Checkbox value="Force" label="Force" checked />
                                                <Checkbox value="Fighter" label="Fighter" checked />
                                                <Checkbox value="Gunner" label="Gunner" checked />
                                                <Checkbox value="Techer" label="Techer" checked />
                                                <Checkbox value="Braver" label="Braver" checked />
                                                <Checkbox value="Bouncer" label="Bouncer" checked />
                                                <Checkbox value="Summoner" label="Summoner" checked />
                                            </Group>
                                        </Checkbox.Group>
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                    <Table withColumnBorders w='90%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={10}><Flex justify='center'>GEAR</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th w='25%' colSpan={2}><Flex justify='center'>Weapon</Flex></Table.Th>
                                <Table.Th w='25%' colSpan={2}><Flex justify='center'>Rear</Flex></Table.Th>
                                <Table.Th w='25%' colSpan={2}><Flex justify='center'>Arm</Flex></Table.Th>
                                <Table.Th w='25%' colSpan={2}><Flex justify='center'>Leg</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/dualblades/${weapon.replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td w='25%'>
                                    <Flex justify='center' align='center' direction='column'>
                                        <strong>{weapon}</strong>
                                        <Table>
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th colSpan={2}>
                                                        <Flex justify='center' align='center'>Special Abilities</Flex>
                                                    </Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S1:Augment Intent 2'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 1</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S2:Skilled Intent 2'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 2</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S3:Skilled Intent 2'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 3</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S4:Raising Pursuit'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 4</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S5:Thundering Pursuit'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 5</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Astral Soul'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 6</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Ether Factor'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 7</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Phrase Decay'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 8</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        </Table>
                                        <br />
                                        <Button size="compact-sm">Choose Weapon</Button>
                                    </Flex>
                                </Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/rear/${rear.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                <Table.Td w='25%'>
                                    <Flex justify='center' direction='column'>
                                        <strong>{rear}</strong>
                                        <Table>
                                            <Table.Thead>
                                                <Table.Tr>
                                                    <Table.Th colSpan={2}>
                                                        <Flex justify='center' align='center'>Special Abilities</Flex>
                                                    </Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['S6:Wise Skill'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 1</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Ex-Ares Soul'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 2</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Grace Stamina'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 3</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Persona Reverie'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 4</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Power V'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 5</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Sentence Power'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 6</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['Lesser Stamina IV'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 7</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td w='66%'>
                                                        {displayAbilities(['ARKS Fever'])}
                                                    </Table.Td>
                                                    <Table.Td w='66%'>
                                                        <Button size="compact-xs">Choose Slot 8</Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        </Table>
                                        <br />
                                        <Button size="compact-sm">Choose Rear Unit</Button></Flex></Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/arm/${arm.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                {/* S7: S-ATK Up 2
                                Ex Ares Soul
                                Grace Power
                                Persona Reverie
                                Mitra Glare
                                Power V
                                Sentence Power
                                ARKS Fever */}
                                <Table.Td w='25%'><Flex justify='center' direction='column'>{arm}<Button>Choose Arm Unit</Button></Flex></Table.Td>
                                <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/leg/${leg.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                                {/* S8:Sky Dance's Boon
                                Ex Ares Soul
                                Grace Power
                                Persona Reverie
                                Varuna Glare
                                Power V
                                Sentence Power
                                ARKS Fever */}
                                <Table.Td w='25%'><Flex justify='center' direction='column'>{leg}<Button>Choose Leg Unit</Button></Flex></Table.Td>
                                {/* L / Easy Connect +20
                                R / C Strike Striking +20 */}
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                    <Table withColumnBorders w='90%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th><Flex justify='center'>SKILLS</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td><Flex justify='center'><Button>Set Skills</Button></Flex></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                    <Table withColumnBorders w='90%' align='center'>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={3}><Flex justify='center'>STATS</Flex></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>HP</Flex></Table.Th>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>PP</Flex></Table.Th>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEX</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalHp)}</Flex></Table.Td>
                                <Table.Td w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalPp)}</Flex></Table.Td>
                                <Table.Td w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('DEX', Math.floor(totalDex))}</Flex></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>ATK</Flex></Table.Th>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>DEF</Flex></Table.Th>
                                <Table.Th w='33%'><Flex justify="center" align="center" key={uuidv4()} gap={5}>Damage Boosts</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-ATK', Math.floor(totalSAtk))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-ATK', Math.floor(totalRAtk))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-ATK', Math.floor(totalTAtk))}</Flex>
                                </Table.Td>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-DEF', Math.floor(totalSDef))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-DEF', Math.floor(totalRDef))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-DEF', Math.floor(totalTDef))}</Flex>
                                </Table.Td>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('S-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('R-ATK', 100)}%</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('T-ATK', 100)}%</Flex>
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={3}><Flex justify="center" align="center" key={uuidv4()} gap={5}>RESISTANCES</Flex></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Strike Resistance', Math.trunc(strikeRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ranged Resistance', Math.trunc(rangedRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Tech Resistance', Math.trunc(techRes * 100))}</Flex>
                                </Table.Td>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Fire Resistance', Math.trunc(fireRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Ice Resistance', Math.trunc(iceRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Lightning Resistance', Math.trunc(lightningRes * 100))}</Flex>
                                </Table.Td>
                                <Table.Td w='33%'>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Wind Resistance', Math.trunc(windRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Light Resistance', Math.trunc(lightRes * 100))}</Flex>
                                    <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayResistance('Dark Resistance', Math.trunc(darkRes * 100))}</Flex>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table >
                </>
            );
    }
}