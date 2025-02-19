import React from "react";
import { Image, Button, Group } from '@mantine/core';
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
            <Button onClick={() => { setUnitType('Rear') }}><Image src="/icons/Rear.png" alt={unitTypes[0]} w={16} h={16} /> {unitTypes[0]}</Button>
            <Button onClick={() => { setUnitType('Arm') }}><Image src="/icons/Arm.png" alt={unitTypes[1]} w={16} h={16} /> {unitTypes[1]}</Button>
            <Button onClick={() => { setUnitType('Leg') }}><Image src="/icons/Leg.png" alt={unitTypes[2]} w={16} h={16} /> {unitTypes[2]}</Button>
            <Button onClick={() => { setUnitType('Sub') }}><Image src="/icons/Sub.png" alt={unitTypes[3]} w={16} h={16} /> {unitTypes[3]}</Button>
        </Group>
    )
}