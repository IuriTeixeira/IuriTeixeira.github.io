'use client'

import React, { useEffect, useState } from 'react'
import { Image, Button, Flex, Table, Checkbox, Group, Select, Text, SimpleGrid } from "@mantine/core";
import { useLanguageContext } from "./language-provider";
import { v4 as uuidv4 } from 'uuid';
import displayGearStats from './components/displayGearStats';
import displayGearAbilities from './components/displayGearAbilities';
import displayResistance from './components/displayResistance';
import displayStat from './components/displayStat';
import raceStats from './races.json'
import classStats from './classes.json'
import weapons from './geardata/weapons/weapons.json'
import units from './geardata/units/units.json'
import localization from './localization.json'
import abilityData from './geardata/abilities.json'

export default function Home() {
    const language = useLanguageContext()

    const raceList: string[] = raceStats.map(item => item[`Name (${language.language})`])
    const magTypeList: string[] = localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map(item => item[`Name (${language.language})`]) //['S-ATK', 'R-ATK', 'T-ATK', 'DEX', 'S-DEF', 'R-DEF', 'T-DEF']
    const mainClassList = classStats.filter(item => item["Name (English)"] !== 'None').map(item => item[`Name (${language.language})`]);
    const subClassList: string[] = classStats.map(item => item[`Name (${language.language})`])
    const successorClassList: string[] = classStats.filter(item => item["Successor"]).map(item => item[`Name (English)`])
    const nonSuccessorClassList: string[] = classStats.filter(item => !item["Successor"]).map(item => item[`Name (${language.language})`])

    const [race, setRace] = useState<string>(raceList[3])
    const [magType, setMagType] = useState<string>(magTypeList[0])
    const [mainClass, setMainClass] = useState<string>(mainClassList[11])
    const [subClass, setSubClass] = useState<string>(subClassList[0])
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
    const [critRateIncrease, setCritRateIncrease] = useState<number>(0)
    const [strikeDmgBoost, setStrikeDmgBoost] = useState<number>(1)
    const [rangedDmgBoost, setRangedDmgBoost] = useState<number>(1)
    const [techDmgBoost, setTechDmgBoost] = useState<number>(1)
    const [paDmgBoost, setPaDmgBoost] = useState<number>(1)
    const [techniqueDmgBoost, setTechniqueDmgBoost] = useState<number>(1)
    const [critDmgBoost, setCritDmgBoost] = useState<number>(1)
    const [naturalPpRecovery, setNaturalPpRecovery] = useState<number>(1)
    const [activePpRecovery, setActivePpRecovery] = useState<number>(1)
    const [ppConsumption, setPpConsumption] = useState<number>(1)
    const [abilityStats, setAbilityStats] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1])
    const [classBoosts, setClassBoosts] = useState<string[]>(classStats.filter(item => !item["Successor"]).map(item => item[`Name (${language.language})`]))
    const [weaponAbilitiesConditionals, setWeaponAbilitiesConditionals] = useState<boolean[][]>([[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]])
    const [weaponAbilitiesStacks, setWeaponAbilitiesStacks] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
    const [rearAbilitiesConditionals, setRearAbilitiesConditionals] = useState<boolean[][]>([[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]])
    const [rearAbilitiesStacks, setRearAbilitiesStacks] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
    const [armAbilitiesConditionals, setArmAbilitiesConditionals] = useState<boolean[][]>([[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]])
    const [armAbilitiesStacks, setArmAbilitiesStacks] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
    const [legAbilitiesConditionals, setLegAbilitiesConditionals] = useState<boolean[][]>([[false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false], [false, false, false]])
    const [legAbilitiesStacks, setLegAbilitiesStacks] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]])
    const [weaponAbilities, setWeaponAbilities] = useState<string[]>([
        'S1:Augment Intent 2',
        'S2:Skilled Intent 2',
        'S3:Skilled Intent 2',
        'S4:Raising Pursuit',
        'S5:Thundering Pursuit',
        'Astral Soul',
        'Ether Factor',
        'Phrase Decay'
    ])
    const [rearAbilities, setRearAbilities] = useState<string[]>([
        'S6:Wise Skill',
        'Ex-Ares Soul',
        'Grace Stamina',
        'Persona Reverie',
        'Power V',
        'Sentence Power',
        'Lesser Stamina IV',
        'ARKS Fever'
    ])
    const [armAbilities, setArmAbilities] = useState<string[]>([
        'S7:S-ATK Up 2',
        'Ex-Ares Soul',
        'Grace Power',
        'Persona Reverie',
        'Mitra Glare',
        'Power V',
        'Sentence Power',
        'ARKS Fever'
    ])
    const [legAbilities, setLegAbilities] = useState<string[]>([
        'S8:Sky Dance\'s Boon',
        'Ex-Ares Soul',
        'Grace Power',
        'Persona Reverie',
        'Varuna Glare',
        'Power V',
        'Sentence Power',
        'ARKS Fever'
    ])

    let weaponData: any = weapons.find(selectedWeapon => selectedWeapon["Name (English)"] === weapon)
    let rearData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === rear)
    let armData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === arm)
    let legData: any = units.find(selectedUnit => selectedUnit["Name (English)"] === leg)

    let raceData: any = raceStats.find(selectedRace => selectedRace[`Name (English)`] === race)
    let mainClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === mainClass)
    let subClassData: any = classStats.find(selectedClass => selectedClass[`Name (English)`] === subClass)

    const raceOptions = raceStats.map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${language.language})`],
    }));
    const [magTypeOptions, setMagTypeOptions] = useState(localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${language.language})`],
    })));
    const mainClassOptions = classStats.filter(item => item["Name (English)"] !== 'None').map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${language.language})`],
    }));

    const [subClassOptions, setSubClassOptions] = useState(classStats.map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${language.language})`],
    })))

    function updateRace(value: string) {
        setRace(value)
        raceData = raceStats.find(selectedRace => selectedRace[`Name (English)`] === value)
        updateStats(classBoosts, magType)
    }

    function updateClass(main: string, sub: string) {
        if (sub === 'None') {
            setSubClassOptions(classStats.filter((item) => (!item["Name (English)"].includes(main))).map((item) => (item)).map((item) => ({
                value: item["Name (English)"],
                label: item[`Name (${language.language})`],
            })))
        } else {
            setSubClassOptions(classStats.map((item) => ({
                value: item["Name (English)"],
                label: item[`Name (${language.language})`],
            })))
        }
        if (main === sub) {
            mainClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === sub)
            subClassData = classStats.find(selectedClass => selectedClass[`Name (English)`] === main)
            main = subClass
            sub = mainClass
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
        setMainClass(main)
        setSubClass(sub)
        updateStats(classBoosts, magType)
    }

    function updateMag(type: string) {
        setMagTypeOptions(localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map((item) => ({
            value: item["Name (English)"],
            label: item[`Name (${language.language})`],
        })))
        setMagType(type)
        updateStats(classBoosts, type)
    }

    function updateGear(newWeapon: string, newRear: string, newArm: string, newLeg: string) {
        setWeapon(newWeapon)
        setRear(newRear)
        setArm(newArm)
        setLeg(newLeg)
        weaponData = weapons.find(selectedWeapon => selectedWeapon["Name (English)"] === weapon)
        rearData = units.find(selectedUnit => selectedUnit["Name (English)"] === newRear)
        armData = units.find(selectedUnit => selectedUnit["Name (English)"] === newArm)
        legData = units.find(selectedUnit => selectedUnit["Name (English)"] === newLeg)
        updateStats(classBoosts, magType)
    }

    function updateStats(classboosts: string[], mag: string) {
        //0  = HP
        //1  = PP
        //2  = S-ATK
        //3  = R-ATK
        //4  = T-ATK
        //5  = DEX
        //6  = S-DEF
        //7  = R-DEF
        //8  = T-DEF
        //9  = Strike Resistance
        //10 = Ranged Resistance
        //11 = Tech Resistance
        //12 = Fire Resistance
        //13 = Ice Resistance
        //14 = Lightning Resistance
        //15 = Wind Resistance
        //16 = Light Resistance
        //17 = Dark Resistance
        //18 = Critical Hit Rate
        //19 = Generic Damage Boost
        //20 = PA Damage Boost
        //21 = Tech Damage Boost
        //22 = Critical Damage Boost
        //23 = Natural PP Recovery
        //24 = Active PP Recovery
        //25 = PP Consumption
        const abStats: number[] = parseAbilities()
        setAbilityStats(abStats)

        setClassBoosts(classboosts)

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

        if (classboosts.includes('Hunter')) {
            bonusBaseStats[0] += 50
            bonusBaseStats[3] += 15
            bonusBaseStats[6] += 40
        }
        if (classboosts.includes('Ranger')) {
            bonusBaseStats[3] += 20
            bonusBaseStats[4] += 15
            bonusBaseStats[7] += 40
        }
        if (classboosts.includes('Force')) {
            bonusBaseStats[3] += 15
            bonusBaseStats[4] += 20
            bonusBaseStats[8] += 40
        }
        if (classboosts.includes('Fighter')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 50
            bonusBaseStats[4] += 15
            bonusBaseStats[8] += 10
        }
        if (classboosts.includes('Gunner')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 15
            bonusBaseStats[3] += 50
            bonusBaseStats[6] += 10
        }
        if (classboosts.includes('Techer')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 15
            bonusBaseStats[4] += 50
            bonusBaseStats[7] += 10
        }
        if (classboosts.includes('Braver')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 20
            bonusBaseStats[3] += 20
            bonusBaseStats[5] += 30
        }
        if (classboosts.includes('Bouncer')) {
            bonusBaseStats[1] += 2
            bonusBaseStats[2] += 20
            bonusBaseStats[4] += 20
            bonusBaseStats[5] += 30
        }
        if (classboosts.includes('Summoner')) {
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

        let totalBonusHp: number = (weaponData["HP"] || 0) + (rearData["HP"] || 0) + (armData["HP"] || 0) + (legData["HP"] || 0) + (abStats[0] || 0)
        let totalBonusPp: number = (weaponData["PP"] || 0) + (rearData["PP"] || 0) + (armData["PP"] || 0) + (legData["PP"] || 0) + (abStats[1] || 0)
        let totalBonusSAtk: number = (weaponData["S-ATK"] || 0) + (rearData["S-ATK"] || 0) + (armData["S-ATK"] || 0) + (legData["S-ATK"] || 0) + (abStats[2] || 0)
        let totalBonusRAtk: number = (weaponData["R-ATK"] || 0) + (rearData["R-ATK"] || 0) + (armData["R-ATK"] || 0) + (legData["R-ATK"] || 0) + (abStats[3] || 0)
        let totalBonusTAtk: number = (weaponData["T-ATK"] || 0) + (rearData["T-ATK"] || 0) + (armData["T-ATK"] || 0) + (legData["T-ATK"] || 0) + (abStats[4] || 0)
        let totalBonusDex: number = (weaponData["DEX"] || 0) + (rearData["DEX"] || 0) + (armData["DEX"] || 0) + (legData["DEX"] || 0) + (abStats[5] || 0)
        let totalBonusSDef: number = (weaponData["S-DEF"] || 0) + (rearData["S-DEF"] || 0) + (armData["S-DEF"] || 0) + (legData["S-DEF"] || 0) + (abStats[6] || 0)
        let totalBonusRDef: number = (weaponData["R-DEF"] || 0) + (rearData["R-DEF"] || 0) + (armData["R-DEF"] || 0) + (legData["R-DEF"] || 0) + (abStats[7] || 0)
        let totalBonusTDef: number = (weaponData["T-DEF"] || 0) + (rearData["T-DEF"] || 0) + (armData["T-DEF"] || 0) + (legData["T-DEF"] || 0) + (abStats[8] || 0)

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

        setStrikeRes(((rearData["Strike Resistance"] || 0) + (armData["Strike Resistance"] || 0) + (legData["Strike Resistance"] || 0)) / 100 + ((abStats[9]) || 0) / 100)
        setRangedRes(((rearData["Ranged Resistance"] || 0) + (armData["Ranged Resistance"] || 0) + (legData["Ranged Resistance"] || 0)) / 100 + ((abStats[10]) || 0) / 100)
        setTechRes(((rearData["Tech Resistance"] || 0) + (armData["Tech Resistance"] || 0) + (legData["Tech Resistance"] || 0)) / 100 + ((abStats[11]) || 0) / 100)
        setFireRes(((rearData["Fire Resistance"] || 0) + (armData["Fire Resistance"] || 0) + (legData["Fire Resistance"] || 0)) / 100 + ((abStats[12]) || 0) / 100)
        setIceRes(((rearData["Ice Resistance"] || 0) + (armData["Ice Resistance"] || 0) + (legData["Ice Resistance"] || 0)) / 100 + ((abStats[13]) || 0) / 100)
        setLightningRes(((rearData["Lightning Resistance"] || 0) + (armData["Lightning Resistance"] || 0) + (legData["Lightning Resistance"] || 0)) / 100 + ((abStats[14]) || 0) / 100)
        setWindRes(((rearData["Wind Resistance"] || 0) + (armData["Wind Resistance"] || 0) + (legData["Wind Resistance"] || 0)) / 100 + ((abStats[15]) || 0) / 100)
        setLightRes(((rearData["Light Resistance"] || 0) + (armData["Light Resistance"] || 0) + (legData["Light Resistance"] || 0)) / 100 + ((abStats[16]) || 0) / 100)
        setDarkRes(((rearData["Dark Resistance"] || 0) + (armData["Dark Resistance"] || 0) + (legData["Dark Resistance"] || 0)) / 100 + ((abStats[17]) || 0) / 100)

        let totalCritRateIncrease = 5 + abStats[18]
        let totalStrikeDmgBoost = abStats[19]
        let totalRangedDmgBoost = abStats[19]
        let totalTechDmgBoost = abStats[19]
        let totalPaDmgBoost = abStats[20]
        let totalTechniqueDmgBoost = abStats[21]
        let totalCritDmgBoost = abStats[22]
        let totalNaturalPpRecovery = abStats[23]
        let totalActivePpRecovery = abStats[24]
        let totalPpConsumption = abStats[25]

        setCritRateIncrease(totalCritRateIncrease)
        setStrikeDmgBoost(totalStrikeDmgBoost)
        setRangedDmgBoost(totalRangedDmgBoost)
        setTechDmgBoost(totalTechDmgBoost)
        setPaDmgBoost(totalPaDmgBoost)
        setTechniqueDmgBoost(totalTechniqueDmgBoost)
        setCritDmgBoost(totalCritDmgBoost)
        setNaturalPpRecovery(totalNaturalPpRecovery)
        setActivePpRecovery(totalActivePpRecovery)
        setPpConsumption(totalPpConsumption)

    }

    useEffect(() => {
        updateClass(mainClass, subClass);
        updateMag(magType);
        updateGear(weapon, rear, arm, leg);
        parseAbilities()
        updateStats(classBoosts, magType)
    }, []);

    useEffect(() => {
        setSubClassOptions(classStats.map((item) => ({
            value: item["Name (English)"],
            label: item[`Name (${language.language})`],
        })))
        setMagTypeOptions(localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map((item) => ({
            value: item["Name (English)"],
            label: item[`Name (${language.language})`],
        })))
    }, [language.language]);
    useEffect(() => {
        updateStats(classBoosts, magType)
    }, [weaponAbilitiesConditionals, rearAbilitiesConditionals, armAbilitiesConditionals, legAbilitiesConditionals]);

    let loc: string[]

    switch (language.language) {
        case 'Global':
            loc = [
                'Pwr',
                'Def',
                'DEX',
                'Damage Boosts',
                'Resistances',
                'Class Boosts',
                'Weapon',
                'Back',
                'Arms',
                'Legs',
                'Classes with the Lv75 stat boost title acquired',
                'CHARACTER INFO',
                'GEAR',
                'SKILLS',
                'Select Skills',
                'Select Weapon',
                'Select Back Unit',
                'Select Arms Unit',
                'Select Legs Unit',
                'Not available for Scion Class',
                'PSO2 Character Planner',
                'PP Recovery',
                'Natural PP Recovery',
                'Active PP Recovery',
                'Critical Hit',
                'Critical Hit Rate',
                'Critical Hit Damage'
            ]
            break
        case 'JP':
            loc = [
                '力',
                '防御',
                '技量',
                '武器上昇',
                '耐性',
                'クラスブースト',
                '武器',
                'リア',
                'アーム',
                'レッグ',
                'Lv75ステータスブースト称号を獲得したクラス',
                'キャラクター情報',
                '武器・防具',
                'スキル',
                'スキルを選ぶ',
                '武器を選ぶ',
                'リアユニットを選ぶ',
                'アームユニットを選ぶ',
                'レッグユニットを選ぶ',
                '後継クラスでは利用できません',
                'PSO2 キャラクターシミュレーター',
                'PP回復',
                'PPの自然回復速度',
                '攻撃時のPP回復',
                'クリティカル',
                'クリティカル率',
                'クリティカル時の与ダメージ'
            ]
            break
        default:
            loc = [
                'ATK',
                'DEF',
                'DEX',
                'Damage Boosts',
                'Resistances',
                'Class Boosts',
                'Weapon',
                'Rear',
                'Arm',
                'Leg',
                'Classes with the Lv75 stat boost title acquired',
                'CHARACTER INFO',
                'GEAR',
                'SKILLS',
                'Select Skills',
                'Select Weapon',
                'Select Rear Unit',
                'Select Arm Unit',
                'Select Leg Unit',
                'Not available for Successor Class',
                'PSO2 Character Planner',
                'PP Recovery',
                'Natural PP Recovery',
                'Active PP Recovery',
                'Critical Hit',
                'Critical Hit Rate',
                'Critical Hit Damage'
            ]
            break

    }

    function parseAbilities(): number[] {
        let weaponAbStats: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        let rearAbStats: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        let armAbStats: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        let legAbStats: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        for (let i = 0; i < weaponAbilities.length; i++) {
            const parsedAbility: number[] = parseAbility(weaponAbilities[i])
            for (let j = 0; j < weaponAbStats.length; j++) {
                if (j < 18) weaponAbStats[j] += parsedAbility[j]
                else weaponAbStats[j] *= parsedAbility[j]
            }
        }
        for (let i = 0; i < rearAbilities.length; i++) {
            const parsedAbility: number[] = parseAbility(rearAbilities[i])
            for (let j = 0; j < rearAbStats.length; j++) {
                if (j < 18) rearAbStats[j] += parsedAbility[j]
                else rearAbStats[j] *= parsedAbility[j]
            }
        }
        for (let i = 0; i < armAbilities.length; i++) {
            const parsedAbility: number[] = parseAbility(armAbilities[i])
            for (let j = 0; j < armAbStats.length; j++) {
                if (j < 18) armAbStats[j] += parsedAbility[j]
                else armAbStats[j] *= parsedAbility[j]
            }
        }
        for (let i = 0; i < legAbilities.length; i++) {
            const parsedAbility: number[] = parseAbility(legAbilities[i])
            for (let j = 0; j < legAbStats.length; j++) {
                if (j < 18) legAbStats[j] += parsedAbility[j]
                else legAbStats[j] *= parsedAbility[j]
            }
        }
        let returnValue: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        for (let i = 0; i < weaponAbStats.length; i++) {
            if (i < 18) returnValue[i] = weaponAbStats[i] + rearAbStats[i] + armAbStats[i] + legAbStats[i]
            else returnValue[i] = weaponAbStats[i] * rearAbStats[i] * armAbStats[i] * legAbStats[i]
        }
        return returnValue
    }

    function parseAbility(ability: string): number[] {
        const ab = abilityData.find(name => name["Name (English)"] === ability);

        let hp: number = 0;
        let pp: number = 0;
        let satk: number = 0;
        let ratk: number = 0;
        let tatk: number = 0;
        let dex: number = 0;
        let sdef: number = 0;
        let rdef: number = 0;
        let tdef: number = 0;
        let sres: number = 0;
        let rres: number = 0;
        let tres: number = 0;
        let fireres: number = 0;
        let iceres: number = 0;
        let lightningres: number = 0;
        let windres: number = 0;
        let lightres: number = 0;
        let darkres: number = 0;
        let critrateincrease: number = 0;
        let dmgboost: number = 1;
        let padmgboost: number = 1;
        let techdmgboost: number = 1;
        let critdmgboost: number = 1
        let naturalpprecovery: number = 1;
        let activepprecovery: number = 1;
        let ppconsumption: number = 1;

        if (ab) {
            if (ab["Effect (English)"][0]) {
                for (let i = 0; i < ab["Effect (English)"].length; i += 2) {
                    const item: string = String(ab["Effect (English)"][i]);
                    const number: number = Number(ab["Effect (English)"][i + 1]);
                    switch (item) {
                        case 'HP':
                            hp += number;
                            break;
                        case 'PP':
                            pp += number;
                            break;
                        case 'All Stats':
                            satk += number;
                            ratk += number;
                            tatk += number;
                            dex += number;
                            sdef += number;
                            rdef += number;
                            tdef += number;
                            break;
                        case 'ATK':
                            satk += number;
                            ratk += number;
                            tatk += number;
                            break;
                        case 'DEF':
                            sdef += number;
                            rdef += number;
                            tdef += number;
                            break;
                        case 'S-ATK':
                            satk += number;
                            break;
                        case 'R-ATK':
                            ratk += number;
                            break;
                        case 'T-ATK':
                            tatk += number;
                            break;
                        case 'DEX':
                            dex += number;
                            break;
                        case 'S-DEF':
                            sdef += number;
                            break;
                        case 'R-DEF':
                            rdef += number;
                            break;
                        case 'T-DEF':
                            tdef += number;
                            break;
                        case 'All Resistance':
                            sres += number;
                            rres += number;
                            tres += number;
                            fireres += number;
                            iceres += number;
                            lightningres += number;
                            windres += number;
                            lightres += number;
                            darkres += number;
                            break;
                        case 'Strike Resistance':
                            sres += number;
                            break;
                        case 'Ranged Resistance':
                            rres += number;
                            break;
                        case 'Technique Resistance':
                            tres += number;
                            break;
                        case 'Fire Resistance':
                            fireres += number;
                            break;
                        case 'Ice Resistance':
                            iceres += number;
                            break;
                        case 'Lightning Resistance':
                            lightningres += number;
                            break;
                        case 'Wind Resistance':
                            windres += number;
                            break;
                        case 'Light Resistance':
                            lightres += number;
                            break;
                        case 'Dark Resistance':
                            darkres += number;
                            break;
                    }
                }
            } else {
                if (ab["Effect"]) {
                    for (let i = 0; i < ab["Effect"].length; i++) {
                        if (ab["Effect"][i] === 'Unique') {

                        } else {
                            switch (ab["Effect"][i]) {
                                case 'Damage Multiplier':
                                    dmgboost *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'PA Damage Multiplier':
                                    padmgboost *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'Tech Damage Multiplier':
                                    techdmgboost *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'Critical Damage Multiplier':
                                    critdmgboost *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'Critical Hit Rate Increase':
                                    critrateincrease += Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'Natural PP Recovery Multiplier':
                                    naturalpprecovery *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'Active PP Recovery Multiplier':
                                    activepprecovery *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                case 'PP Consumption Multiplier':
                                    ppconsumption *= Number(ab["Effect"][i + 1])
                                    i++
                                    break
                                default:
                                    break
                            }
                        }
                    }
                }
            }
        }
        const returnValue: number[] = [hp, pp, satk, ratk, tatk, dex, sdef, rdef, tdef, sres, rres, tres, fireres, iceres, lightningres, windres, lightres, darkres, critrateincrease, dmgboost, padmgboost, techdmgboost, critdmgboost, naturalpprecovery, activepprecovery, ppconsumption];
        return returnValue;
    }

    return (
        <>
            <Flex justify="center" align="center" key={uuidv4()} gap={5}><h1>{loc[20]}</h1></Flex>
            <Table withTableBorder withColumnBorders w='90%' align='center'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th colSpan={10} style={{ backgroundColor: '#151515' }}>
                            <Flex justify='center'><Text fz="h4"><strong>{loc[11]}</strong></Text></Flex>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {language.language !== 'JP' && 'Race'}
                            {language.language === 'JP' && '種族'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={raceOptions}
                                value={race}
                                onChange={updateRace}
                            />
                        </Table.Td>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>HP</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>PP</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[2]}</Flex></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalHp)}</Flex></Table.Td>
                        <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{Math.floor(totalPp)}</Flex></Table.Td>
                        <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('DEX', Math.floor(totalDex))}</Flex></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {language.language !== 'JP' && 'Main Class'}
                            {language.language === 'JP' && 'メインクラス'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={mainClassOptions}
                                value={mainClass}
                                onChange={(value) => updateClass(value, subClass)}
                            />
                        </Table.Td>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[0]}</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[1]}</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[3]}</Flex></Table.Th>
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
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('S-ATK', Math.trunc((strikeDmgBoost - 1) * 100))}%</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('R-ATK', Math.trunc((rangedDmgBoost - 1) * 100))}%</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('T-ATK', Math.trunc((techDmgBoost - 1) * 100))}%</Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {language.language !== 'JP' && 'Sub Class'}
                            {language.language === 'JP' && 'サブクラス'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            {!successorClassList.includes(mainClass) &&
                                <Select
                                    data={subClassOptions}
                                    value={subClass}
                                    onChange={(value) => { updateClass(mainClass, value) }}
                                />
                            }
                            {successorClassList.includes(mainClass) && <Flex justify='center'>{loc[19]}</Flex>}
                        </Table.Td>
                        <Table.Th>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[4]}</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[21]}</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[24]}</Flex>
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                <SimpleGrid key={uuidv4()} cols={3} spacing='xs' verticalSpacing={0}>
                                    {displayResistance('Strike Resistance', Math.trunc(strikeRes * 100))}
                                    {displayResistance('Ranged Resistance', Math.trunc(rangedRes * 100))}
                                    {displayResistance('Tech Resistance', Math.trunc(techRes * 100))}
                                    {displayResistance('Fire Resistance', Math.trunc(fireRes * 100))}
                                    {displayResistance('Ice Resistance', Math.trunc(iceRes * 100))}
                                    {displayResistance('Lightning Resistance', Math.trunc(lightningRes * 100))}
                                    {displayResistance('Wind Resistance', Math.trunc(windRes * 100))}
                                    {displayResistance('Light Resistance', Math.trunc(lightRes * 100))}
                                    {displayResistance('Dark Resistance', Math.trunc(darkRes * 100))}
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>
                                <SimpleGrid key={uuidv4()} cols={2} spacing='xs' verticalSpacing={0}>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[22]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{naturalPpRecovery * 100}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[23]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{activePpRecovery * 100}%</Flex>
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>
                                <SimpleGrid key={uuidv4()} cols={2} spacing='xs' verticalSpacing={0}>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[25]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{critRateIncrease}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[26]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{(critDmgBoost - 1) * 100}%</Flex>
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {language.language !== 'JP' && 'MAG'}
                            {language.language === 'JP' && 'マグ'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={magTypeOptions}
                                value={magType}
                                onChange={(value) => updateMag(value)}
                            />
                        </Table.Td>
                        <Table.Th colSpan={3}>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[5]}</Flex>
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={3}>
                            <Flex justify='center'>
                                <Checkbox.Group description={loc[10]} value={classBoosts} onChange={(val) => updateStats(val, magType)}>
                                    <Group mt="xs">
                                        <Checkbox value="Hunter" label={nonSuccessorClassList[1]} checked />
                                        <Checkbox value="Ranger" label={nonSuccessorClassList[2]} checked />
                                        <Checkbox value="Force" label={nonSuccessorClassList[3]} checked />
                                        <Checkbox value="Fighter" label={nonSuccessorClassList[4]} checked />
                                        <Checkbox value="Gunner" label={nonSuccessorClassList[5]} checked />
                                        <Checkbox value="Techer" label={nonSuccessorClassList[6]} checked />
                                        <Checkbox value="Braver" label={nonSuccessorClassList[7]} checked />
                                        <Checkbox value="Bouncer" label={nonSuccessorClassList[8]} checked />
                                        <Checkbox value="Summoner" label={nonSuccessorClassList[9]} checked />
                                    </Group>
                                </Checkbox.Group>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
            <Table withTableBorder withColumnBorders w='90%' align='center'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th colSpan={10} style={{ backgroundColor: '#151515' }}>
                            <Flex justify='center'><Text fz="h4"><strong>{loc[12]}</strong></Text></Flex>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w='50%' colSpan={2}><Flex justify='center'>{loc[6]}</Flex></Table.Th>
                        <Table.Th w='50%' colSpan={2}><Flex justify='center'>{loc[7]}</Flex></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2} align='center'>
                            <Button size="compact-sm">{loc[15]}</Button>
                        </Table.Td>
                        <Table.Td colSpan={2} align='center'>
                            <Button size="compact-sm">{loc[16]}</Button>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/weapons/${weaponData["Weapon Type"]}/${weapon.replace('\'', '').replace(/ /g, '').replace('/', '').replace('-NT', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                        <Table.Td w='50%'>
                            <Flex justify='center' align='center' direction='column'>
                                {displayGearStats(weapon)}
                            </Flex>
                        </Table.Td>
                        <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/${rearData["Type"]}/${rear.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                        <Table.Td w='50%'>
                            <Flex justify='center' direction='column'>
                                {displayGearStats(rear)}
                            </Flex>
                        </Table.Td>
                        {/* L / Easy Connect +20
                                R / C Strike Striking +20 */}
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(weaponAbilities, weaponAbilitiesConditionals, setWeaponAbilitiesConditionals, weaponAbilitiesStacks, setWeaponAbilitiesStacks)}
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(rearAbilities, rearAbilitiesConditionals, setRearAbilitiesConditionals, rearAbilitiesStacks, setRearAbilitiesStacks)}
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th w='50%' colSpan={2}><Flex justify='center'>{loc[8]}</Flex></Table.Th>
                        <Table.Th w='50%' colSpan={2}><Flex justify='center'>{loc[9]}</Flex></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2} align='center'>
                            <Button size="compact-sm">{loc[17]}</Button>
                        </Table.Td>
                        <Table.Td colSpan={2} align='center'>
                            <Button size="compact-sm">{loc[18]}</Button>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/${armData["Type"]}/${arm.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                        <Table.Td w='50%'>
                            <Flex justify='center' direction='column'>
                                {displayGearStats(arm)}
                            </Flex>
                        </Table.Td>
                        <Table.Td key={uuidv4()}><Flex align="center" justify="center" key={uuidv4()} gap={5}><Image fallbackSrc='/Blank.png' key={uuidv4()} src={`/units/${legData["Type"]}/${leg.replace(' a', '').replace(' b', '').replace(' c', '').replace(' d', '').replace(' e', '').replace('\'', '').replace(/ /g, '').replace('-NT', '').replace('Rear/', '').replace('Arm/', '').replace('Leg/', '').replace('Sub/', '')}.png`} alt={`Icon of ${rear}`} w={64} h={64} /></Flex></Table.Td>
                        <Table.Td w='50%'>
                            <Flex justify='center' direction='column'>
                                {displayGearStats(leg)}
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(armAbilities, armAbilitiesConditionals, setArmAbilitiesConditionals, armAbilitiesStacks, setArmAbilitiesStacks)}
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(legAbilities, legAbilitiesConditionals, setLegAbilitiesConditionals, legAbilitiesStacks, setLegAbilitiesStacks)}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table >
            <Table withTableBorder withColumnBorders w='90%' align='center'>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ backgroundColor: '#151515' }}>
                            <Flex justify='center'><Text fz="h4"><strong>{loc[13]}</strong></Text></Flex>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td><Flex justify='center'><Button>{loc[14]}</Button></Flex></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );
}