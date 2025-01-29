import React from "react";
import { Image, Button, Group } from '@mantine/core';
import rear from '../geardata/units/unit-data/rear.json'
import arm from '../geardata/units/unit-data/arm.json'
import leg from '../geardata/units/unit-data/leg.json'
import sub from '../geardata/units/unit-data/sub.json'
import { useLanguageContext } from "../language-provider";

export default function UnitHeaderComponent({ setUnitData, setUnitType }) {
    const language = useLanguageContext()
    let unitTypes: string[] = []
    switch (language.language) {
        case 'Global': unitTypes = ["Back", "Arms", "Legs", "Sub"]; break;
        case 'JP': unitTypes = ["リア", "アーム", "レッグ", "サブ"]; break;
        default: unitTypes = ["Rear", "Arm", "Leg", "Sub"]
    }
    return (
        <Group justify="center" mt="sm">
            <Button onClick={() => { setUnitData(rear); setUnitType('rear') }}><Image src="/icons/Rear.png" alt={unitTypes[0]} w={16} h={16} /> {unitTypes[0]}</Button>
            <Button onClick={() => { setUnitData(arm); setUnitType('arm') }}><Image src="/icons/Arm.png" alt={unitTypes[1]} w={16} h={16} /> {unitTypes[1]}</Button>
            <Button onClick={() => { setUnitData(leg); setUnitType('leg') }}><Image src="/icons/Leg.png" alt={unitTypes[2]} w={16} h={16} /> {unitTypes[2]}</Button>
            <Button onClick={() => { setUnitData(sub); setUnitType('sub') }}><Image src="/icons/Sub.png" alt={unitTypes[3]} w={16} h={16} /> {unitTypes[3]}</Button>
        </Group>
    )
}