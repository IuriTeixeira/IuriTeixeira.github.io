'use client'

import TableComponent from "../../components/UnitTableComponent";
import HeaderComponent from "../../components/UnitHeaderComponent";
import rear from "./unit-data/rear.json";
import React from "react";
import { useState } from "react";

export default function Units() {
    const [unitData, setUnitData]:any = useState(rear)
    const [unitType, setUnitType]:any = useState("rear")
    return (
        <>
            <HeaderComponent setUnitData={setUnitData} setUnitType={setUnitType}/>
            <TableComponent data={unitData} type={unitType}/>
            <HeaderComponent setUnitData={setUnitData} setUnitType={setUnitType}/>
        </>
    )
}