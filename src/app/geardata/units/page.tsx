'use client'

import TableComponent from "../../components/UnitTableComponent";
import HeaderComponent from "../../components/UnitHeaderComponent";
import React from "react";
import { useState } from "react";
import { useDisclosure } from '@mantine/hooks';

export default function Units() {
    const [unitType, setUnitType]:any = useState("Rear")
    const [visible, setVisible] = useDisclosure(true)

    return (
        <>
            <HeaderComponent setUnitType={setUnitType} setVisible={setVisible} />
            <TableComponent type={unitType} visible={visible} setVisible={setVisible} />
            <HeaderComponent setUnitType={setUnitType} setVisible={setVisible} />
        </>
    )
}