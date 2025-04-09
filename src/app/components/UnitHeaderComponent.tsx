import React from "react";
import { Image, Button, Group } from '@mantine/core';
import { useLanguageContext } from "../language-provider";

export default function UnitHeaderComponent({ setUnitType, setVisible }) {
    const language = useLanguageContext()
    let unitTypes: string[] = []
    switch (language.language) {
        case 'Global': unitTypes = ["Back", "Arms", "Legs", "Sub"]; break;
        case 'JP': unitTypes = ["リア", "アーム", "レッグ", "サブ"]; break;
        default: unitTypes = ["Rear", "Arm", "Leg", "Sub"]
    }

    const handleClick = (event) => {
        setVisible.open()
        setUnitType(event.currentTarget.value)
    }

    return (
        <Group justify="center" mt="sm">
            <Button value="Rear" onClick={handleClick}><Image src="/icons/Rear.png" alt={unitTypes[0]} w={16} h={16} /> {unitTypes[0]}</Button>
            <Button value="Arm" onClick={handleClick}><Image src="/icons/Arm.png" alt={unitTypes[1]} w={16} h={16} /> {unitTypes[1]}</Button>
            <Button value="Leg" onClick={handleClick}><Image src="/icons/Leg.png" alt={unitTypes[2]} w={16} h={16} /> {unitTypes[2]}</Button>
            <Button value="Sub" onClick={handleClick}><Image src="/icons/Sub.png" alt={unitTypes[3]} w={16} h={16} /> {unitTypes[3]}</Button>
        </Group>
    )
}