import React from "react";
import Image from "next/image";
import { Button, Group } from '@mantine/core';
import rear from '../geardata/units/unit-data/rear.json'
import arm from '../geardata/units/unit-data/arm.json'
import leg from '../geardata/units/unit-data/leg.json'
import sub from '../geardata/units/unit-data/sub.json'

export default function UnitHeaderComponent({ setUnitData, setUnitType }) {
    return (
        <Group justify="center" mt="sm">
            <Button onClick={() => { setUnitData(rear); setUnitType("rear")}}><Image src="/icons/Rear.png" alt="Rear Units" width={16} height={16} /> Rear</Button>
            <Button onClick={() => { setUnitData(arm); setUnitType('arm') }}><Image src="/icons/Arm.png" alt="Arm Units" width={16} height={16} /> Arm</Button>
            <Button onClick={() => { setUnitData(leg); setUnitType('leg') }}><Image src="/icons/Leg.png" alt="Leg Units" width={16} height={16} /> Leg</Button>
            <Button onClick={() => { setUnitData(sub); setUnitType('sub') }}><Image src="/icons/Sub.png" alt="Sub Units" width={16} height={16} /> Sub</Button>
        </Group>
    )
}