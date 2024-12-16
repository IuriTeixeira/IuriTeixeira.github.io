'use client'

import TableComponent from "../../components/WeaponTableComponent";
import HeaderComponent from "../../components/WeaponHeaderComponent";
import swords from "./weapon-data/swords.json";
import React from "react";
import { useState } from "react";

export default function Weapons() {
    const [weaponData, setWeaponData]:any = useState(swords)
    const [weaponType, setWeaponType]:any = useState("swords")
    return (
        <>
            <HeaderComponent setWeaponData={setWeaponData} setWeaponType={setWeaponType}/>
            <TableComponent data={weaponData} type={weaponType}/>
            <HeaderComponent setWeaponData={setWeaponData} setWeaponType={setWeaponType}/>
        </>
    )
}