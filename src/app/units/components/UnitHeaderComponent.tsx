import React from "react";
import Image from "next/image";
import { Button, Group } from '@mantine/core';
import rear from '../unit-data/rear.json'
//import arm from '../unit-data/arm.json'
//import leg from '../unit-data/leg.json'
import sub from '../unit-data/sub.json'

export default function UnitHeaderComponent({ setUnitData, setUnitType }) {
    return (
        <Group justify="center" mt="sm">
            <Button onClick={() => { setUnitData(rear); setUnitType("rear")}}><Image src="/icons/UIUnitRearIcon.png" alt="Rear Units" width={16} height={16} /> Rear</Button>
            <Button onClick={() => { /*setUnitData(arm); setUnitType('arm') */}}><Image src="/icons/UIUnitArmIcon.png" alt="Arm Units" width={16} height={16} /> Arm</Button>
            <Button onClick={() => { /*setUnitData(leg); setUnitType('leg') */}}><Image src="/icons/UIUnitLegIcon.png" alt="Leg Units" width={16} height={16} /> Leg</Button>
            <Button onClick={() => { setUnitData(sub); setUnitType('sub') }}><Image src="/icons/UIUnitSubIcon.png" alt="Sub Units" width={16} height={16} /> Sub</Button>
        </Group>
    )
}