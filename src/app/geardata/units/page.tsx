'use client'

import TableComponent from "../../components/UnitTableComponent";
import HeaderComponent from "../../components/UnitHeaderComponent";
import units from "./units.json";
import React from "react";
import { useState } from "react";

export default function Units() {
    const [unitData, setUnitData]:any = useState(units)
    const [unitType, setUnitType]:any = useState("Rear")
    return (
        <>
            <HeaderComponent setUnitData={setUnitData} setUnitType={setUnitType}/>
            <TableComponent data={unitData} type={unitType}/>
            <HeaderComponent setUnitData={setUnitData} setUnitType={setUnitType}/>
        </>
    )
}