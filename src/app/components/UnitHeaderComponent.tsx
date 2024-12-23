import React from "react";
import { Image, Button, Group } from '@mantine/core';
import rear from '../geardata/units/unit-data/rear.json'
import arm from '../geardata/units/unit-data/arm.json'
import leg from '../geardata/units/unit-data/leg.json'
import sub from '../geardata/units/unit-data/sub.json'
import { useLanguageContext } from "../language-provider";

export default function UnitHeaderComponent({ setUnitData, setUnitType }) {
    const language = useLanguageContext()
    switch (language.language) {
        case 'English Patch':
        case 'Global':
            return (
                <Group justify="center" mt="sm">
                    {language.language === 'English Patch' && <Button onClick={() => { setUnitData(rear); setUnitType("rear") }}><Image src="/icons/Rear.png" alt="Rear Units" w={16} h={16} /> Rear</Button>}
                    {language.language === 'Global' && <Button onClick={() => { setUnitData(rear); setUnitType("rear") }}><Image src="/icons/Rear.png" alt="Back Units" w={16} h={16} /> Back</Button>}
                    <Button onClick={() => { setUnitData(arm); setUnitType('arm') }}><Image src="/icons/Arm.png" alt="Arm Units" w={16} h={16} /> Arm</Button>
                    <Button onClick={() => { setUnitData(leg); setUnitType('leg') }}><Image src="/icons/Leg.png" alt="Leg Units" w={16} h={16} /> Leg</Button>
                    <Button onClick={() => { setUnitData(sub); setUnitType('sub') }}><Image src="/icons/Sub.png" alt="Sub Units" w={16} h={16} /> Sub</Button>
                </Group>
            )
        case '日本語':
            return (
                <Group justify="center" mt="sm">
                    <Button onClick={() => { setUnitData(rear); setUnitType("rear") }}><Image src="/icons/Rear.png" alt="リア" w={16} h={16} /> リア</Button>
                    <Button onClick={() => { setUnitData(arm); setUnitType('arm') }}><Image src="/icons/Arm.png" alt="アーム" w={16} h={16} /> アーム</Button>
                    <Button onClick={() => { setUnitData(leg); setUnitType('leg') }}><Image src="/icons/Leg.png" alt="レッグ" w={16} h={16} /> レッグ</Button>
                    <Button onClick={() => { setUnitData(sub); setUnitType('sub') }}><Image src="/icons/Sub.png" alt="サブ" w={16} h={16} /> サブ</Button>
                </Group>
            )
    }
}