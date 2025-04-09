'use client'

import React, { useEffect, useState } from 'react'
import { Image, Button, Flex, Table, Checkbox, Group, Select, Text, SimpleGrid } from "@mantine/core";
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
import Decimal from 'decimal.js';

export default function Home() {
    const raceList: string[] = raceStats.map(item => item[`Name (${localStorage.getItem('appLanguage')})`])
    const magTypeList: string[] = localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map(item => item[`Name (${localStorage.getItem('appLanguage')})`]) //['S-ATK', 'R-ATK', 'T-ATK', 'DEX', 'S-DEF', 'R-DEF', 'T-DEF']
    const mainClassList = classStats.filter(item => item["Name (English)"] !== 'None').map(item => item[`Name (${localStorage.getItem('appLanguage')})`]);
    const subClassList: string[] = classStats.map(item => item[`Name (${localStorage.getItem('appLanguage')})`])
    const successorClassList: string[] = classStats.filter(item => item["Successor"]).map(item => item[`Name (English)`])
    const nonSuccessorClassList: string[] = classStats.filter(item => !item["Successor"]).map(item => item[`Name (${localStorage.getItem('appLanguage')})`])

    const [race, setRace] = useState<string>(raceList[3])
    const [magType, setMagType] = useState<string>(magTypeList[0])
    const [mainClass, setMainClass] = useState<string>(mainClassList[11])
    const [subClass, setSubClass] = useState<string>(subClassList[0])
    const [weapon, setWeapon] = useState<string>('Lightweaver Cras Glide')
    const [rear, setRear] = useState<string>('Rear / Cras Dyne')
    const [arm, setArm] = useState<string>('Arm / Cras Noom')
    const [leg, setLeg] = useState<string>('Leg / Cras Ment')
    const [bonusHp, setBonusHp] = useState<Decimal>(new Decimal(0))
    const [totalHp, setTotalHp] = useState<Decimal>(new Decimal(0))
    const [bonusPp, setBonusPp] = useState<Decimal>(new Decimal(0))
    const [totalPp, setTotalPp] = useState<Decimal>(new Decimal(0))
    const [bonusSAtk, setBonusSAtk] = useState<Decimal>(new Decimal(0))
    const [totalSAtk, setTotalSAtk] = useState<Decimal>(new Decimal(0))
    const [bonusRAtk, setBonusRAtk] = useState<Decimal>(new Decimal(0))
    const [totalRAtk, setTotalRAtk] = useState<Decimal>(new Decimal(0))
    const [bonusTAtk, setBonusTAtk] = useState<Decimal>(new Decimal(0))
    const [totalTAtk, setTotalTAtk] = useState<Decimal>(new Decimal(0))
    const [bonusDex, setBonusDex] = useState<Decimal>(new Decimal(0))
    const [totalDex, setTotalDex] = useState<Decimal>(new Decimal(0))
    const [bonusSDef, setBonusSDef] = useState<Decimal>(new Decimal(0))
    const [totalSDef, setTotalSDef] = useState<Decimal>(new Decimal(0))
    const [bonusRDef, setBonusRDef] = useState<Decimal>(new Decimal(0))
    const [totalRDef, setTotalRDef] = useState<Decimal>(new Decimal(0))
    const [bonusTDef, setBonusTDef] = useState<Decimal>(new Decimal(0))
    const [totalTDef, setTotalTDef] = useState<Decimal>(new Decimal(0))
    const [strikeRes, setStrikeRes] = useState<Decimal>(new Decimal(0))
    const [rangedRes, setRangedRes] = useState<Decimal>(new Decimal(0))
    const [techRes, setTechRes] = useState<Decimal>(new Decimal(0))
    const [fireRes, setFireRes] = useState<Decimal>(new Decimal(0))
    const [iceRes, setIceRes] = useState<Decimal>(new Decimal(0))
    const [lightningRes, setLightningRes] = useState<Decimal>(new Decimal(0))
    const [windRes, setWindRes] = useState<Decimal>(new Decimal(0))
    const [lightRes, setLightRes] = useState<Decimal>(new Decimal(0))
    const [darkRes, setDarkRes] = useState<Decimal>(new Decimal(0))
    const [critRateIncrease, setCritRateIncrease] = useState<Decimal>(new Decimal(0))
    const [strikeDmgBoost, setStrikeDmgBoost] = useState<Decimal>(new Decimal(1))
    const [rangedDmgBoost, setRangedDmgBoost] = useState<Decimal>(new Decimal(1))
    const [techDmgBoost, setTechDmgBoost] = useState<Decimal>(new Decimal(1))
    const [normalAtkDmgBoost, setNormalAtkDmgBoost] = useState<Decimal>(new Decimal(1))
    const [paDmgBoost, setPaDmgBoost] = useState<Decimal>(new Decimal(1))
    const [techniqueDmgBoost, setTechniqueDmgBoost] = useState<Decimal>(new Decimal(1))
    const [critDmgBoost, setCritDmgBoost] = useState<Decimal>(new Decimal(1))
    const [naturalPpRecovery, setNaturalPpRecovery] = useState<Decimal>(new Decimal(1))
    const [activePpRecovery, setActivePpRecovery] = useState<Decimal>(new Decimal(1))
    const [dmgTaken, setDmgTaken] = useState<Decimal>(new Decimal(1))
    const [ppConsumption, setPpConsumption] = useState<Decimal>(new Decimal(1))
    const [abilityStats, setAbilityStats] = useState<Decimal[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num)))
    const [classBoosts, setClassBoosts] = useState<string[]>(classStats.filter(item => !item["Successor"]).map(item => item[`Name (${localStorage.getItem('appLanguage')})`]))
    const [weaponAbilitiesConditionals, setWeaponAbilitiesConditionals] = useState<boolean[]>([false, false, false, false, false, false, false, false])
    const [weaponAbilitiesStacks, setWeaponAbilitiesStacks] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
    const [rearAbilitiesConditionals, setRearAbilitiesConditionals] = useState<boolean[]>([false, false, false, false, false, false, false, false])
    const [rearAbilitiesStacks, setRearAbilitiesStacks] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
    const [armAbilitiesConditionals, setArmAbilitiesConditionals] = useState<boolean[]>([false, false, false, false, false, false, false, false])
    const [armAbilitiesStacks, setArmAbilitiesStacks] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
    const [legAbilitiesConditionals, setLegAbilitiesConditionals] = useState<boolean[]>([false, false, false, false, false, false, false, false])
    const [legAbilitiesStacks, setLegAbilitiesStacks] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
    const [weaponAbilities, setWeaponAbilities] = useState<string[]>([
        "S1:Red Petal Flash",
        "S2:Nature's Skill",
        "S3:Umbrageous Intent",
        "S4:Harmonized Rainbow",
        "S5:Tethered Eclipse",
        "Astral Soul",
        "Ether Factor",
        "Phrase Decay"
    ])
    const [rearAbilities, setRearAbilities] = useState<string[]>([
        "S6:Rainbow's Shield",
        "Ex-Ares Soul",
        "Grace Stamina",
        "Persona Reverie",
        "Power V",
        "Sentence Power",
        "Lesser Stamina IV",
        "ARKS Fever"
    ])
    const [armAbilities, setArmAbilities] = useState<string[]>([
        "S7:Rainbow's Skill",
        "Ex-Ares Soul",
        "Grace Power",
        "Persona Reverie",
        "Mitra Glare",
        "Power V",
        "Sentence Power",
        "ARKS Fever"
    ])
    const [legAbilities, setLegAbilities] = useState<string[]>([
        "S8:Rainbow's Decay",
        "Ex-Ares Soul",
        "Grace Power",
        "Persona Reverie",
        "Varuna Glare",
        "Power V",
        "Sentence Power",
        "ARKS Fever"
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
        label: item[`Name (${localStorage.getItem('appLanguage')})`],
    }));
    const [magTypeOptions, setMagTypeOptions] = useState(localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${localStorage.getItem('appLanguage')})`],
    })));
    const mainClassOptions = classStats.filter(item => item["Name (English)"] !== 'None').map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${localStorage.getItem('appLanguage')})`],
    }));

    const [subClassOptions, setSubClassOptions] = useState(classStats.map((item) => ({
        value: item["Name (English)"],
        label: item[`Name (${localStorage.getItem('appLanguage')})`],
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
                label: item[`Name (${localStorage.getItem('appLanguage')})`],
            })))
        } else {
            setSubClassOptions(classStats.map((item) => ({
                value: item["Name (English)"],
                label: item[`Name (${localStorage.getItem('appLanguage')})`],
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
            label: item[`Name (${localStorage.getItem('appLanguage')})`],
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
        //18 = Base S-ATK
        //19 = Base R-ATK
        //20 = Base T-ATK
        //21 = Critical Hit Rate
        //22 = Generic Damage Boost
        //23 = Strike Damage Boost
        //24 = Ranged Damage Boost
        //25 = Tech Damage Boost
        //26 = Normal Attack Damage Boost
        //27 = PA Damage Boost
        //28 = Technique Damage Boost
        //29 = Critical Damage Boost
        //30 = Natural PP Recovery
        //31 = Active PP Recovery
        //32 = PP Consumption
        //33 = Damage Taken
        const abStats: number[] | Decimal[] = parseAbilities()
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

        //adding base stats from unit SSAs
        bonusBaseStats[2] += abStats[18].toNumber()
        bonusBaseStats[3] += abStats[19].toNumber()
        bonusBaseStats[4] += abStats[20].toNumber()

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

        let totalBaseHp: Decimal = new Decimal(0)
        let totalBasePp: Decimal = new Decimal(0)
        let totalBaseSAtk: Decimal = new Decimal(0)
        let totalBaseRAtk: Decimal = new Decimal(0)
        let totalBaseTAtk: Decimal = new Decimal(0)
        let totalBaseDex: Decimal = new Decimal(0)
        let totalBaseSDef: Decimal = new Decimal(0)
        let totalBaseRDef: Decimal = new Decimal(0)
        let totalBaseTDef: Decimal = new Decimal(0)

        if (subClassData) {
            totalBaseHp = totalBaseHp.plus(((mainClassData["HP"] * raceData["HP"]) + (subClassData["HP"] * 0.2) + bonusBaseStats[0]))
            totalBasePp = totalBasePp.plus(((mainClassData["PP"] * raceData["PP"]) + (subClassData["PP"] * 0.2) + bonusBaseStats[1]))
            totalBaseSAtk = totalBaseSAtk.plus(((mainClassData["S-ATK"] * raceData["S-ATK"]) + (subClassData["S-ATK"] * 0.2) + bonusBaseStats[2]))
            totalBaseRAtk = totalBaseRAtk.plus(((mainClassData["R-ATK"] * raceData["R-ATK"]) + (subClassData["R-ATK"] * 0.2) + bonusBaseStats[3]))
            totalBaseTAtk = totalBaseTAtk.plus(((mainClassData["T-ATK"] * raceData["T-ATK"]) + (subClassData["T-ATK"] * 0.2) + bonusBaseStats[4]))
            totalBaseDex = totalBaseDex.plus(((mainClassData["DEX"] * raceData["DEX"]) + (subClassData["DEX"] * 0.2) + bonusBaseStats[5]))
            totalBaseSDef = totalBaseSDef.plus(((mainClassData["S-DEF"] * raceData["S-DEF"]) + (subClassData["S-DEF"] * 0.2) + bonusBaseStats[6]))
            totalBaseRDef = totalBaseRDef.plus(((mainClassData["R-DEF"] * raceData["R-DEF"]) + (subClassData["R-DEF"] * 0.2) + bonusBaseStats[7]))
            totalBaseTDef = totalBaseTDef.plus(((mainClassData["T-DEF"] * raceData["T-DEF"]) + (subClassData["T-DEF"] * 0.2) + bonusBaseStats[8]))
        } else {
            totalBaseHp = totalBaseHp.plus(((mainClassData["HP"] * raceData["HP"]) + bonusBaseStats[0]))
            totalBasePp = totalBasePp.plus(((mainClassData["PP"] * raceData["PP"]) + bonusBaseStats[1]))
            totalBaseSAtk = totalBaseSAtk.plus(((mainClassData["S-ATK"] * raceData["S-ATK"]) + bonusBaseStats[2]))
            totalBaseRAtk = totalBaseRAtk.plus(((mainClassData["R-ATK"] * raceData["R-ATK"]) + bonusBaseStats[3]))
            totalBaseTAtk = totalBaseTAtk.plus(((mainClassData["T-ATK"] * raceData["T-ATK"]) + bonusBaseStats[4]))
            totalBaseDex = totalBaseDex.plus(((mainClassData["DEX"] * raceData["DEX"]) + bonusBaseStats[5]))
            totalBaseSDef = totalBaseSDef.plus(((mainClassData["S-DEF"] * raceData["S-DEF"]) + bonusBaseStats[6]))
            totalBaseRDef = totalBaseRDef.plus(((mainClassData["R-DEF"] * raceData["R-DEF"]) + bonusBaseStats[7]))
            totalBaseTDef = totalBaseTDef.plus(((mainClassData["T-DEF"] * raceData["T-DEF"]) + bonusBaseStats[8]))
        }
        switch (mag) {
            case 'S-ATK':
                totalBaseSAtk = totalBaseSAtk.plus(200);
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseRAtk = totalBaseRAtk.plus(200);
                    totalBaseTAtk = totalBaseTAtk.plus(200);
                }
                break;
            case 'R-ATK':
                totalBaseRAtk = totalBaseRAtk.plus(200);
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseSAtk = totalBaseSAtk.plus(200);
                    totalBaseTAtk = totalBaseTAtk.plus(200);
                }
                break;
            case 'T-ATK':
                totalBaseTAtk = totalBaseTAtk.plus(200);
                if (mainClass === 'Hero' || mainClass === 'Etoile' || mainClass === 'Luster' || subClass === 'Etoile' || subClass === 'Luster') {
                    totalBaseSAtk = totalBaseSAtk.plus(200);
                    totalBaseRAtk = totalBaseRAtk.plus(200);
                }
                break;
            case 'DEX':
                totalBaseDex = totalBaseDex.plus(200);
                if (mainClass === 'Phantom' || subClass === 'Phantom') {
                    totalBaseSAtk = totalBaseSAtk.plus(200);
                    totalBaseRAtk = totalBaseRAtk.plus(200);
                    totalBaseTAtk = totalBaseTAtk.plus(200);
                }
                if (mainClass === 'Braver' || subClass === 'Braver') {
                    totalBaseSAtk = totalBaseSAtk.plus(200);
                    totalBaseRAtk = totalBaseRAtk.plus(200);
                }
                if (mainClass === 'Bouncer' || subClass === 'Bouncer') {
                    totalBaseSAtk = totalBaseSAtk.plus(200);
                    totalBaseTAtk = totalBaseTAtk.plus(200);
                }
                break;
            case 'S-DEF':
                totalBaseSDef = totalBaseSDef.plus(200); break;
            case 'R-DEF':
                totalBaseRDef = totalBaseRDef.plus(200); break;
            case 'T-DEF':
                totalBaseTDef = totalBaseTDef.plus(200); break;
        }

        let totalBonusHp: Decimal = new Decimal(abStats[0].plus(weaponData["HP"] || 0).plus(rearData["HP"] || 0).plus(armData["HP"] || 0).plus(legData["HP"] || 0))
        let totalBonusPp: Decimal = new Decimal(abStats[1].plus(weaponData["PP"] || 0).plus(rearData["PP"] || 0).plus(armData["PP"] || 0).plus(legData["PP"] || 0))
        let totalBonusSAtk: Decimal = new Decimal(abStats[2].plus(weaponData["S-ATK"] || 0).plus(rearData["S-ATK"] || 0).plus(armData["S-ATK"] || 0).plus(legData["S-ATK"] || 0))
        let totalBonusRAtk: Decimal = new Decimal(abStats[3].plus(weaponData["R-ATK"] || 0).plus(rearData["R-ATK"] || 0).plus(armData["R-ATK"] || 0).plus(legData["R-ATK"] || 0))
        let totalBonusTAtk: Decimal = new Decimal(abStats[4].plus(weaponData["T-ATK"] || 0).plus(rearData["T-ATK"] || 0).plus(armData["T-ATK"] || 0).plus(legData["T-ATK"] || 0))
        let totalBonusDex: Decimal = new Decimal(abStats[5].plus(weaponData["DEX"] || 0).plus(rearData["DEX"] || 0).plus(armData["DEX"] || 0).plus(legData["DEX"] || 0))
        let totalBonusSDef: Decimal = new Decimal(abStats[6].plus(weaponData["S-DEF"] || 0).plus(rearData["S-DEF"] || 0).plus(armData["S-DEF"] || 0).plus(legData["S-DEF"] || 0))
        let totalBonusRDef: Decimal = new Decimal(abStats[7].plus(weaponData["R-DEF"] || 0).plus(rearData["R-DEF"] || 0).plus(armData["R-DEF"] || 0).plus(legData["R-DEF"] || 0))
        let totalBonusTDef: Decimal = new Decimal(abStats[8].plus(weaponData["T-DEF"] || 0).plus(rearData["T-DEF"] || 0).plus(armData["T-DEF"] || 0).plus(legData["T-DEF"] || 0))

        setTotalHp(totalBaseHp.plus(totalBonusHp))
        setTotalPp(totalBasePp.plus(totalBonusPp))
        setTotalSAtk(totalBaseSAtk.plus(totalBonusSAtk))
        setTotalRAtk(totalBaseRAtk.plus(totalBonusRAtk))
        setTotalTAtk(totalBaseTAtk.plus(totalBonusTAtk))
        setTotalDex(totalBaseDex.plus(totalBonusDex))
        setTotalSDef(totalBaseSDef.plus(totalBonusSDef))
        setTotalRDef(totalBaseRDef.plus(totalBonusRDef))
        setTotalTDef(totalBaseTDef.plus(totalBonusTDef))

        setBonusHp(totalBonusHp)
        setBonusPp(totalBonusPp)
        setBonusSAtk(totalBonusSAtk)
        setBonusRAtk(totalBonusRAtk)
        setBonusTAtk(totalBonusTAtk)
        setBonusDex(totalBonusDex)
        setBonusSDef(totalBonusSDef)
        setBonusRDef(totalBonusRDef)
        setBonusTDef(totalBonusTDef)

        setStrikeRes(new Decimal(abStats[9].plus((rearData["Strike Resistance"] || 0) / 100).plus((armData["Strike Resistance"] || 0) / 100).plus((legData["Strike Resistance"] || 0) / 100)))
        setRangedRes(new Decimal(abStats[10].plus((rearData["Ranged Resistance"] || 0) / 100).plus((armData["Ranged Resistance"] || 0) / 100).plus((legData["Ranged Resistance"] || 0) / 100)))
        setTechRes(new Decimal(abStats[11].plus((rearData["Tech Resistance"] || 0) / 100).plus((armData["Tech Resistance"] || 0) / 100).plus((legData["Tech Resistance"] || 0) / 100)))
        setFireRes(new Decimal(abStats[12].plus((rearData["Fire Resistance"] || 0) / 100).plus((armData["Fire Resistance"] || 0) / 100).plus((legData["Fire Resistance"] || 0) / 100)))
        setIceRes(new Decimal(abStats[13].plus((rearData["Ice Resistance"] || 0) / 100).plus((armData["Ice Resistance"] || 0) / 100).plus((legData["Ice Resistance"] || 0) / 100)))
        setLightningRes(new Decimal(abStats[14].plus((rearData["Lightning Resistance"] || 0) / 100).plus((armData["Lightning Resistance"] || 0) / 100).plus((legData["Lightning Resistance"] || 0) / 100)))
        setWindRes(new Decimal(abStats[15].plus((rearData["Wind Resistance"] || 0) / 100).plus((armData["Wind Resistance"] || 0) / 100).plus((legData["Wind Resistance"] || 0) / 100)))
        setLightRes(new Decimal(abStats[16].plus((rearData["Light Resistance"] || 0) / 100).plus((armData["Light Resistance"] || 0) / 100).plus((legData["Light Resistance"] || 0) / 100)))
        setDarkRes(new Decimal(abStats[17].plus((rearData["Dark Resistance"] || 0) / 100).plus((armData["Dark Resistance"] || 0) / 100).plus((legData["Dark Resistance"] || 0) / 100)))

        let totalCritRateIncrease: Decimal = abStats[21].plus(5)
        let totalStrikeDmgBoost: Decimal = abStats[22].times(abStats[23])
        let totalRangedDmgBoost: Decimal = abStats[22].times(abStats[24])
        let totalTechDmgBoost: Decimal = abStats[22].times(abStats[25])
        let totalNormalAtkDmgBoost: Decimal = abStats[26]
        let totalPaDmgBoost: Decimal = abStats[27]
        let totalTechniqueDmgBoost: Decimal = abStats[28]
        let totalCritDmgBoost: Decimal = abStats[29]
        let totalNaturalPpRecovery: Decimal = abStats[30]
        let totalActivePpRecovery: Decimal = abStats[31]
        let totalPpConsumption: Decimal = abStats[32]
        let totalDmgTaken: Decimal = abStats[33]

        setCritRateIncrease(totalCritRateIncrease)
        setStrikeDmgBoost(totalStrikeDmgBoost)
        setRangedDmgBoost(totalRangedDmgBoost)
        setTechDmgBoost(totalTechDmgBoost)
        setNormalAtkDmgBoost(totalNormalAtkDmgBoost)
        setPaDmgBoost(totalPaDmgBoost)
        setTechniqueDmgBoost(totalTechniqueDmgBoost)
        setCritDmgBoost(totalCritDmgBoost)
        setNaturalPpRecovery(totalNaturalPpRecovery)
        setActivePpRecovery(totalActivePpRecovery)
        setPpConsumption(totalPpConsumption)
        setDmgTaken(totalDmgTaken)
    }

    //runs once at first load
    useEffect(() => {
        updateClass(mainClass, subClass);
        updateMag(magType);
        updateGear(weapon, rear, arm, leg);
        parseAbilities()
        updateStats(classBoosts, magType)
    }, []);

    //updates subclass and mag names when changing language
    useEffect(() => {
        setSubClassOptions(classStats.map((item) => ({
            value: item["Name (English)"],
            label: item[`Name (${localStorage.getItem('appLanguage')})`],
        })))
        setMagTypeOptions(localization.filter(item => item["Name (English)"].includes('-ATK') || item["Name (English)"].includes('-DEF') || item["Name (English)"] === 'DEX').map((item) => ({
            value: item["Name (English)"],
            label: item[`Name (${localStorage.getItem('appLanguage')})`],
        })))
    }, [localStorage.getItem('appLanguage')]);

    //updates ability conditional values when toggling ability conditionals
    useEffect(() => {
        updateStats(classBoosts, magType)
    }, [weaponAbilitiesConditionals, rearAbilitiesConditionals, armAbilitiesConditionals, legAbilitiesConditionals]);

    let loc: string[]

    switch (localStorage.getItem('appLanguage')) {
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
                'Others',
                'Natural PP Recovery',
                'Active PP Recovery',
                'Critical Hit',
                'Critical Hit Rate',
                'Critical Hit Damage',
                'Normal Attack',
                'Photon Art',
                "Technique",
                "Damage Reduction"
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
                'その他',
                'PPの自然回復速度',
                '攻撃時のPP回復',
                'クリティカル',
                'クリティカル率',
                'クリティカル時の与ダメージ',
                'Normal Attack',
                'Photon Art',
                "Technique",
                "Damage Reduction"
            ]
            break
        default:
            loc = [
                'ATK',                                                  //0
                'DEF',                                                  //1
                'DEX',                                                  //2
                'Damage Boosts',                                        //3
                'Resistances',                                          //4
                'Class Boosts',                                         //5
                'Weapon',                                               //6
                'Rear',                                                 //7
                'Arm',                                                  //8
                'Leg',                                                  //9
                'Classes with the Lv75 stat boost title acquired',      //10
                'CHARACTER INFO',                                       //11
                'GEAR',                                                 //12
                'SKILLS',                                               //13
                'Select Skills',                                        //14
                'Select Weapon',                                        //15
                'Select Rear Unit',                                     //16
                'Select Arm Unit',                                      //17
                'Select Leg Unit',                                      //18
                'Not available for Successor Class',                    //19
                'PSO2 Character Planner',                               //20
                'Others',                                               //21
                'Natural PP Recovery',                                  //22
                'Active PP Recovery',                                   //23
                'Critical Hit',                                         //24
                'Critical Hit Rate',                                    //25
                'Critical Hit Damage',                                  //26
                'Normal Attack',                                        //27
                'Photon Art',                                           //28
                "Technique",                                            //29
                "Damage Reduction"                                      //30
            ]
            break

    }

    function parseAbilities(): Decimal[] {
        let weaponAbStats: Decimal[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num))
        let rearAbStats: Decimal[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num))
        let armAbStats: Decimal[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num))
        let legAbStats: Decimal[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num))
        let checkAnthesis: boolean = false
        for (let i = 0; i < weaponAbilities.length; i++) {
            if (weaponAbilities[i] === 'S5:Anthesis Cultivation') checkAnthesis = true
            const parsedAbility: Decimal[] = parseAbility(weaponAbilities[i], 'Weapon', i)
            for (let j = 0; j < weaponAbStats.length; j++) {
                if (j < 22) weaponAbStats[j] = weaponAbStats[j].plus(parsedAbility[j])
                else weaponAbStats[j] = weaponAbStats[j].times(parsedAbility[j])
            }
        }
        if (checkAnthesis) {
            for (let i = 0; i < 8; i++) {
                weaponAbStats[i] = weaponAbStats[i].times(2)
            }
        }
        if (weaponAbilities.includes('S1:Strike Boost')) {
            let strikeCount: number = weaponAbStats[2].dividedBy(60).trunc().dividedBy(100).toNumber()
            if (weaponAbStats[2].greaterThanOrEqualTo(200)) strikeCount += 0.02
            weaponAbStats[27] = weaponAbStats[27].times(strikeCount)
        }
        if (weaponAbilities.includes('S1:Shoot Boost')) {
            let strikeCount: number = weaponAbStats[3].dividedBy(60).trunc().dividedBy(100).toNumber()
            if (weaponAbStats[3].greaterThanOrEqualTo(200)) strikeCount += 0.02
            weaponAbStats[28] = weaponAbStats[28].times(strikeCount)
        }
        if (weaponAbilities.includes('S1:Technique Boost')) {
            let strikeCount: number = weaponAbStats[4].dividedBy(60).trunc().dividedBy(100).toNumber()
            if (weaponAbStats[4].greaterThanOrEqualTo(200)) strikeCount += 0.02
            weaponAbStats[29] = weaponAbStats[29].times(strikeCount)
        }
        for (let i = 0; i < rearAbilities.length; i++) {
            const parsedAbility: Decimal[] = parseAbility(rearAbilities[i], 'Rear', i)
            for (let j = 0; j < rearAbStats.length; j++) {
                if (j < 22) rearAbStats[j] = rearAbStats[j].plus(parsedAbility[j])
                else rearAbStats[j] = rearAbStats[j].times(parsedAbility[j])
            }
        }
        for (let i = 0; i < armAbilities.length; i++) {
            const parsedAbility: Decimal[] = parseAbility(armAbilities[i], 'Arm', i)
            for (let j = 0; j < armAbStats.length; j++) {
                if (j < 22) armAbStats[j] = armAbStats[j].plus(parsedAbility[j])
                else armAbStats[j] = armAbStats[j].times(parsedAbility[j])
            }
        }
        for (let i = 0; i < legAbilities.length; i++) {
            const parsedAbility: Decimal[] = parseAbility(legAbilities[i], 'Leg', i)
            for (let j = 0; j < legAbStats.length; j++) {
                if (j < 22) legAbStats[j] = legAbStats[j].plus(parsedAbility[j])
                else legAbStats[j] = legAbStats[j].times(parsedAbility[j])
            }
        }
        let returnValue: Decimal[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(num => new Decimal(num))
        for (let i = 0; i < weaponAbStats.length; i++) {
            if (i < 22) returnValue[i] = returnValue[i].plus(weaponAbStats[i]).plus(rearAbStats[i]).plus(armAbStats[i]).plus(legAbStats[i])
            else returnValue[i] = returnValue[i].times(weaponAbStats[i]).times(rearAbStats[i]).times(armAbStats[i]).times(legAbStats[i])
        }
        return returnValue
    }

    function parseAbility(ability: string, gearType: string, abilitySlot: number): Decimal[] {
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
        let basesatk: number = 0;
        let baseratk: number = 0;
        let basetatk: number = 0;
        let critrateincrease: number = 0;
        let dmgboost: Decimal = new Decimal(1);
        let strikeatkdmgboost: Decimal = new Decimal(1);
        let rangedatkdmgboost: Decimal = new Decimal(1);
        let techatkdmgboost: Decimal = new Decimal(1);
        let normaldmgboost: Decimal = new Decimal(1);
        let padmgboost: Decimal = new Decimal(1);
        let techdmgboost: Decimal = new Decimal(1);
        let critdmgboost: Decimal = new Decimal(1);
        let naturalpprecovery: Decimal = new Decimal(1);
        let activepprecovery: Decimal = new Decimal(1);
        let ppconsumption: Decimal = new Decimal(1);
        let dmgtaken: Decimal = new Decimal(1)

        if (ab) {
            if (ab["Effect (English)"][0]) {
                for (let i = 0; i < ab["Effect (English)"].length; i += 2) {
                    const item: string = String(ab["Effect (English)"][i]);
                    const value: number = Number(ab["Effect (English)"][i + 1]);
                    switch (item) {
                        case 'HP':
                            hp += value;
                            break;
                        case 'PP':
                            pp += value;
                            break;
                        case 'All Stats':
                            satk += value;
                            ratk += value;
                            tatk += value;
                            dex += value;
                            sdef += value;
                            rdef += value;
                            tdef += value;
                            break;
                        case 'ATK':
                            satk += value;
                            ratk += value;
                            tatk += value;
                            break;
                        case 'DEF':
                            sdef += value;
                            rdef += value;
                            tdef += value;
                            break;
                        case 'S-ATK':
                            satk += value;
                            break;
                        case 'R-ATK':
                            ratk += value;
                            break;
                        case 'T-ATK':
                            tatk += value;
                            break;
                        case 'DEX':
                            dex += value;
                            break;
                        case 'S-DEF':
                            sdef += value;
                            break;
                        case 'R-DEF':
                            rdef += value;
                            break;
                        case 'T-DEF':
                            tdef += value;
                            break;
                        case 'All Resistance':
                            sres += value;
                            rres += value;
                            tres += value;
                            fireres += value;
                            iceres += value;
                            lightningres += value;
                            windres += value;
                            lightres += value;
                            darkres += value;
                            break;
                        case 'Strike Resistance':
                            sres += value;
                            break;
                        case 'Ranged Resistance':
                            rres += value;
                            break;
                        case 'Technique Resistance':
                            tres += value;
                            break;
                        case 'Fire Resistance':
                            fireres += value;
                            break;
                        case 'Ice Resistance':
                            iceres += value;
                            break;
                        case 'Lightning Resistance':
                            lightningres += value;
                            break;
                        case 'Wind Resistance':
                            windres += value;
                            break;
                        case 'Light Resistance':
                            lightres += value;
                            break;
                        case 'Dark Resistance':
                            darkres += value;
                            break;
                    }
                }
            } else {
                if (ab["Effect"]) {
                    for (let i = 0; i < ab["Effect"].length; i++) {
                        let gearConditionals: boolean[]
                        switch (gearType) {
                            case 'Weapon':
                                gearConditionals = weaponAbilitiesConditionals
                                break
                            case 'Rear':
                                gearConditionals = rearAbilitiesConditionals
                                break
                            case 'Arm':
                                gearConditionals = armAbilitiesConditionals
                                break
                            case 'Leg':
                                gearConditionals = legAbilitiesConditionals
                                break
                        }
                        if (ab["Effect"][i] === 'Unique') {
                            switch (ab["Effect"][i + 1]) {
                                case 'Ripper':
                                case 'Slayer':
                                    let gearConditionals: boolean[]
                                    switch (gearType) {
                                        case 'Weapon':
                                            gearConditionals = weaponAbilitiesConditionals
                                            break
                                        case 'Rear':
                                            gearConditionals = rearAbilitiesConditionals
                                            break
                                        case 'Arm':
                                            gearConditionals = armAbilitiesConditionals
                                            break
                                        case 'Leg':
                                            gearConditionals = legAbilitiesConditionals
                                            break
                                    }
                                    if (gearConditionals[abilitySlot]) {
                                        switch (weaponData["Rarity"]) {
                                            case 15:
                                                dmgboost = dmgboost.times(1.01)
                                                i++
                                                break;
                                            case 14:
                                                dmgboost = dmgboost.times(1.03)
                                                i++
                                                break;
                                            case 13:
                                            case 12:
                                            case 11:
                                                dmgboost = dmgboost.times(1.07)
                                                i++
                                                break;
                                            default:
                                                dmgboost = dmgboost.times(1.12)
                                                i++
                                                break;
                                        }
                                    }
                                    break;
                                case 'Augment Intent':
                                case 'Augment Intent 2':
                                    let dmgMultiplier: number
                                    let slotMultiplier: number
                                    if (ab["Effect"][i + 1] === 'Augment Intent 2') slotMultiplier = 0.75
                                    else slotMultiplier = 0.5
                                    switch (gearType) {
                                        case 'Weapon':
                                            dmgMultiplier = (weaponAbilities.length * slotMultiplier) + 1
                                            break
                                        case 'Rear':
                                            dmgMultiplier = (rearAbilities.length * slotMultiplier) + 1
                                            break
                                        case 'Arm':
                                            dmgMultiplier = (armAbilities.length * slotMultiplier) + 1
                                            break
                                        case 'Leg':
                                            dmgMultiplier = (legAbilities.length * slotMultiplier) + 1
                                            break
                                    }
                                    dmgboost = dmgboost.times(dmgMultiplier)
                                    break;
                                case 'Skill Reduction':
                                    if (gearConditionals[abilitySlot]) {
                                        ppconsumption = ppconsumption.times(0.7)
                                    } else {
                                        ppconsumption = ppconsumption.times(0.95)
                                    }
                                    break
                                case 'Heavenly Keeper':
                                case 'Heavenly Keeper 2':
                                    let heavenlyppreduction: number
                                    let heavenlypprecovery: number
                                    if (ab["Effect"][i + 1] === 'Heavenly Keeper 2') {
                                        heavenlyppreduction = 0.85
                                        heavenlypprecovery = 1.25
                                    } else {
                                        heavenlyppreduction = 0.92
                                        heavenlypprecovery = 1.2
                                    }
                                    if (gearConditionals[abilitySlot]) {
                                        ppconsumption = ppconsumption.times(heavenlyppreduction)
                                    } else {
                                        naturalpprecovery = naturalpprecovery.times(heavenlypprecovery)
                                        activepprecovery = activepprecovery.times(heavenlypprecovery)
                                    }
                                    break
                                case 'Radiant Response':
                                    let radiantvalue: Decimal = new Decimal(totalPp.minus(120).dividedBy(1000))
                                    ppconsumption = ppconsumption.times(1 - radiantvalue.toNumber())
                                    naturalpprecovery = naturalpprecovery.times(radiantvalue.plus(1))
                                    activepprecovery = activepprecovery.times(radiantvalue.plus(1))
                                    break
                                case 'Rapid-fire Arrow':
                                    if (gearConditionals[abilitySlot] && weaponData["Weapon Type"] === 'Bullet Bow') {
                                        dmgboost = dmgboost.times(1.03)
                                    }
                                    break
                                case 'Shining Cyclone':
                                    if (weaponData["Weapon Type"] === 'Twin Daggers') {
                                        if (gearConditionals[abilitySlot]) {
                                            naturalpprecovery = naturalpprecovery.times(0)
                                        } else {
                                            ppconsumption = ppconsumption.times(0.7)
                                            naturalpprecovery = naturalpprecovery.times(2)
                                        }
                                    }
                                    break
                                case 'Vigorous Response':
                                    if (totalHp.greaterThanOrEqualTo(1000)) {
                                        dmgtaken = dmgtaken.times(0.95)
                                        if (totalHp.greaterThanOrEqualTo(2000)) {
                                            dmgboost = dmgboost.times(0.04 * weaponAbilitiesStacks[abilitySlot])
                                        }
                                    }
                                    break
                                default:
                                    break
                            }
                        } else {
                            if (String(ab["Effect"][i]).includes("Conditional")) {
                                if (gearConditionals[abilitySlot]) {
                                    switch (ab["Effect"][i]) {
                                        case 'Conditional Damage Multiplier':
                                            dmgboost = dmgboost.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional Normal Attack Damage Multiplier':
                                            normaldmgboost = normaldmgboost.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional PA Damage Multiplier':
                                            padmgboost = padmgboost.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional Tech Damage Multiplier':
                                            techdmgboost = techdmgboost.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional Critical Hit Damage Multiplier':
                                            critdmgboost = critdmgboost.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional Critical Hit Rate Increase':
                                            critrateincrease += Number(ab["Effect"][i + 1])
                                            i++
                                            break
                                        case 'Conditional Natural PP Recovery Multiplier':
                                            naturalpprecovery = naturalpprecovery.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional Active PP Recovery Multiplier':
                                            activepprecovery = activepprecovery.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Conditional PP Consumption Multiplier':
                                            ppconsumption = ppconsumption.times(Number(ab["Effect"][i + 1]))
                                            i++
                                            break
                                        case 'Damage Taken Multiplier':
                                            dmgtaken = dmgtaken.times(Number(ab["Effect"][i + 1]))
                                            i++
                                        default:
                                            break
                                    }
                                }
                            } else {
                                switch (ab["Effect"][i]) {
                                    case 'Damage Multiplier':
                                        dmgboost = dmgboost.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Normal Attack Damage Multiplier':
                                        normaldmgboost = normaldmgboost.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'PA Damage Multiplier':
                                        padmgboost = padmgboost.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Tech Damage Multiplier':
                                        techdmgboost = techdmgboost.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Critical Hit Damage Multiplier':
                                        critdmgboost = critdmgboost.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Critical Hit Rate Increase':
                                        critrateincrease += Number(ab["Effect"][i + 1])
                                        i++
                                        break
                                    case 'Natural PP Recovery Multiplier':
                                        naturalpprecovery = naturalpprecovery.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Active PP Recovery Multiplier':
                                        activepprecovery = activepprecovery.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'PP Consumption Multiplier':
                                        ppconsumption = ppconsumption.times(Number(ab["Effect"][i + 1]))
                                        i++
                                        break
                                    case 'Damage Taken Multiplier':
                                        dmgtaken = dmgtaken.times(Number(ab["Effect"][i + 1]))
                                        i++
                                    case 'Base S-ATK':
                                        basesatk += Number(ab["Effect"][i + 1])
                                        i++
                                        break;
                                    case 'Base R-ATK':
                                        baseratk += Number(ab["Effect"][i + 1])
                                        i++
                                        break;
                                    case 'Base T-ATK':
                                        basetatk += Number(ab["Effect"][i + 1])
                                        i++
                                        break;
                                    default:
                                        break
                                }
                            }
                        }
                    }
                }
            }
        }
        const returnValue: Decimal[] = [hp, pp, satk, ratk, tatk, dex, sdef, rdef, tdef, sres, rres, tres, fireres, iceres, lightningres, windres, lightres, darkres, basesatk, baseratk, basetatk, critrateincrease, dmgboost, strikeatkdmgboost, rangedatkdmgboost, techatkdmgboost, normaldmgboost, padmgboost, techdmgboost, critdmgboost, naturalpprecovery, activepprecovery, ppconsumption, dmgtaken].map(num => new Decimal(num));
        return returnValue;
    }

    return (
        <>
            <Flex justify="center" align="center" key={uuidv4()} gap={5}><h1>{loc[20]}</h1></Flex>
            <Table withTableBorder withColumnBorders w='95%' align='center'>
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
                            {localStorage.getItem('appLanguage') !== 'JP' && 'Race'}
                            {localStorage.getItem('appLanguage') === 'JP' && '種族'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={raceOptions}
                                value={race}
                                onChange={updateRace}
                            />
                        </Table.Td>
                        <Table.Th colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>HP</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>PP</Flex></Table.Th>
                        <Table.Th colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[2]}</Flex></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{totalHp.trunc().toString()}</Flex></Table.Td>
                        <Table.Td><Flex justify="center" align="center" key={uuidv4()} gap={5}>{totalPp.trunc().toString()}</Flex></Table.Td>
                        <Table.Td colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('DEX', totalDex.trunc())}</Flex></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {localStorage.getItem('appLanguage') !== 'JP' && 'Main Class'}
                            {localStorage.getItem('appLanguage') === 'JP' && 'メインクラス'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={mainClassOptions}
                                value={mainClass}
                                onChange={(value) => updateClass(value, subClass)}
                            />
                        </Table.Td>
                        <Table.Th colSpan={2}><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[0]}</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[1]}</Flex></Table.Th>
                        <Table.Th><Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[4]}</Flex></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={2}>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-ATK', totalSAtk.trunc())}</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-ATK', totalRAtk.trunc())}</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-ATK', totalTAtk.trunc())}</Flex>
                        </Table.Td>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('S-DEF', totalSDef.trunc())}</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('R-DEF', totalRDef.trunc())}</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{displayStat('T-DEF', totalTDef.trunc())}</Flex>
                        </Table.Td>
                        <Table.Td w='20%'>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>
                                <SimpleGrid key={uuidv4()} cols={3} spacing='xs' verticalSpacing={0}>
                                    {displayResistance('Strike Resistance', strikeRes.times(100))}
                                    {displayResistance('Ranged Resistance', rangedRes.times(100))}
                                    {displayResistance('Tech Resistance', techRes.times(100))}
                                    {displayResistance('Fire Resistance', fireRes.times(100))}
                                    {displayResistance('Ice Resistance', iceRes.times(100))}
                                    {displayResistance('Lightning Resistance', lightningRes.times(100))}
                                    {displayResistance('Wind Resistance', windRes.times(100))}
                                    {displayResistance('Light Resistance', lightRes.times(100))}
                                    {displayResistance('Dark Resistance', darkRes.times(100))}
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {localStorage.getItem('appLanguage') !== 'JP' && 'Sub Class'}
                            {localStorage.getItem('appLanguage') === 'JP' && 'サブクラス'}
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
                        <Table.Th colSpan={2}>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[3]}</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[24]}</Flex>
                        </Table.Th>
                        <Table.Th>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[21]}</Flex>
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('S-ATK', ((strikeDmgBoost.minus(1)).times(100)).toFixed(2))}%</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('R-ATK', ((rangedDmgBoost.minus(1)).times(100)).toFixed(2))}%</Flex>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>{displayStat('T-ATK', ((techDmgBoost.minus(1)).times(100)).toFixed(2))}%</Flex>
                        </Table.Td>
                        <Table.Td w='20%'>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>
                                <SimpleGrid key={uuidv4()} cols={2} spacing={7} verticalSpacing={0}>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[27]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{((normalAtkDmgBoost.minus(1)).times(100)).toFixed(2)}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[28]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{((paDmgBoost.minus(1)).times(100)).toFixed(2)}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[29]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{((techniqueDmgBoost.minus(1)).times(100)).toFixed(2)}%</Flex>
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>
                                <SimpleGrid key={uuidv4()} cols={2} spacing='xs' verticalSpacing={0}>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[25]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{critRateIncrease.toFixed(2)}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[26]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{(critDmgBoost.minus(1).times(100)).toFixed(2)}%</Flex>
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                        <Table.Td>
                            <Flex justify="center" align="center" key={uuidv4()} gap={0}>
                                <SimpleGrid key={uuidv4()} cols={2} spacing='xs' verticalSpacing={0}>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[22]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{(naturalPpRecovery.times(100)).toFixed(2)}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[23]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{(activePpRecovery.times(100)).toFixed(2)}%</Flex>
                                    <Flex justify="right" align="center" key={uuidv4()} gap={5}>{loc[30]}</Flex>
                                    <Flex justify="left" align="center" key={uuidv4()} gap={5}>{(dmgTaken.minus(1).times(100)).toFixed(2)}%</Flex>
                                </SimpleGrid>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th rowSpan={2}>
                            {localStorage.getItem('appLanguage') !== 'JP' && 'MAG'}
                            {localStorage.getItem('appLanguage') === 'JP' && 'マグ'}
                        </Table.Th>
                        <Table.Td rowSpan={2}>
                            <Select
                                data={magTypeOptions}
                                value={magType}
                                onChange={(value) => updateMag(value)}
                            />
                        </Table.Td>
                        <Table.Th colSpan={4}>
                            <Flex justify="center" align="center" key={uuidv4()} gap={5}>{loc[5]}</Flex>
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td colSpan={4}>
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
            <Table withTableBorder withColumnBorders w='95%' align='center'>
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
                            {displayGearAbilities(weaponAbilities, weaponAbilitiesConditionals, setWeaponAbilitiesConditionals, weaponAbilitiesStacks, setWeaponAbilitiesStacks, weaponAbilities, weaponAbilitiesConditionals)}
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(rearAbilities, rearAbilitiesConditionals, setRearAbilitiesConditionals, rearAbilitiesStacks, setRearAbilitiesStacks, weaponAbilities, weaponAbilitiesConditionals)}
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
                            {displayGearAbilities(armAbilities, armAbilitiesConditionals, setArmAbilitiesConditionals, armAbilitiesStacks, setArmAbilitiesStacks, weaponAbilities, weaponAbilitiesConditionals)}
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            {displayGearAbilities(legAbilities, legAbilitiesConditionals, setLegAbilitiesConditionals, legAbilitiesStacks, setLegAbilitiesStacks, weaponAbilities, weaponAbilitiesConditionals)}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table >
            <Table withTableBorder withColumnBorders w='95%' align='center'>
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