'use client'

import TableComponent from "../../components/WeaponTableComponent";
import HeaderComponent from "../../components/WeaponHeaderComponent";
import React from "react";
import { useState } from "react";
import { useDisclosure } from '@mantine/hooks';

export default function Weapons() {
    const [weaponType, setWeaponType] = useState<string>("Sword")
    const [visible, setVisible] = useDisclosure(true)

    return (
        <>
            <HeaderComponent setWeaponType={setWeaponType} setVisible={setVisible}/>
            <TableComponent type={weaponType} visible={visible} setVisible={setVisible}/>
            <HeaderComponent setWeaponType={setWeaponType} setVisible={setVisible}/>
        </>
    )
}