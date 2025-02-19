'use client'

import TableComponent from "../../components/WeaponTableComponent";
import HeaderComponent from "../../components/WeaponHeaderComponent";
import weapons from '../../geardata/weapons/weapons.json'
import React from "react";
import { useState } from "react";

export default function Weapons() {
    const [weaponData, setWeaponData]:any = useState(weapons)
    const [weaponType, setWeaponType]:any = useState("Sword")
    return (
        <>
            <HeaderComponent setWeaponData={setWeaponData} setWeaponType={setWeaponType}/>
            <TableComponent data={weaponData} type={weaponType}/>
            <HeaderComponent setWeaponData={setWeaponData} setWeaponType={setWeaponType}/>
        </>
    )
}