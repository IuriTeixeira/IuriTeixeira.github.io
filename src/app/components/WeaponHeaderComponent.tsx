import React from "react";
import { Image, Button, Group } from '@mantine/core';
import { useLanguageContext } from "../language-provider";

export default function WeaponHeaderComponent({ setWeaponData, setWeaponType }) {
    const language = useLanguageContext()
    let weaponTypes: string[] = []
    switch (language.language) {
        case 'Global': weaponTypes = ["Sword", "Wired Lance", "Partisan", "Twin Daggers", "Double Saber", "Knuckle", "Katana", "Soaring Blades", "Gunblade", "Assault Rifle", "Launcher", "Twin Machine Guns", "Bow", "Rod", "Talis", "Wand", "Jet Boots", "Harmonizer"]; break;
        case 'JP': weaponTypes = ["ソード", "ワイヤードランス", "パルチザン", "ツインダガー", "ダブルセイバー", "ナックル", "カタナ", "デュアルブレード", "ガンスラッシュ", "アサルトライフル", "ランチャー", "ツインマシンガン", "バレットボウ", "ロッド", "タリス", "ウォンド", "ジェットブーツ", "タクト"]; break;
        default: weaponTypes = ["Sword", "Wired Lance", "Partizan", "Twin Daggers", "Double Saber", "Knuckle", "Katana", "Dual Blades", "Gunslash", "Assault Rifle", "Launcher", "Twin Machine Guns", "Bullet Bow", "Rod", "Talis", "Wand", "Jet Boots", "Takt"];
    }
    return (
        <>
            <Group justify="center" mt="sm">
                <Button onClick={() => { setWeaponType("Sword") }}><Image src="/icons/Sword.png" alt={weaponTypes[0]} w={16} h={16} /> {weaponTypes[0]}</Button>
                <Button onClick={() => { setWeaponType('Wired Lance') }}><Image src="/icons/WiredLance.png" alt={weaponTypes[1]} w={16} h={16} /> {weaponTypes[1]}</Button>
                <Button onClick={() => { setWeaponType('Partizan') }}><Image src="/icons/Partizan.png" alt={weaponTypes[2]} w={16} h={16} /> {weaponTypes[2]}</Button>
                <Button onClick={() => { setWeaponType("Twin Daggers") }}><Image src="/icons/TwinDagger.png" alt={weaponTypes[3]} w={16} h={16} /> {weaponTypes[3]}</Button>
                <Button onClick={() => { setWeaponType("Double Saber") }}><Image src="/icons/DoubleSaber.png" alt={weaponTypes[4]} w={16} h={16} /> {weaponTypes[4]}</Button>
                <Button onClick={() => { setWeaponType("Knuckle") }}><Image src="/icons/Knuckles.png" alt={weaponTypes[5]} w={16} h={16} /> {weaponTypes[5]}</Button>
                <Button onClick={() => { setWeaponType("Katana") }}><Image src="/icons/Katana.png" alt={weaponTypes[6]} w={16} h={16} /> {weaponTypes[6]}</Button>
                <Button onClick={() => { setWeaponType("Dual Blades") }}><Image src="/icons/DualBlade.png" alt={weaponTypes[7]} w={16} h={16} /> {weaponTypes[7]}</Button>
                <Button onClick={() => { setWeaponType("Gunslash") }}><Image src="/icons/Gunslash.png" alt={weaponTypes[8]} w={16} h={16} /> {weaponTypes[8]}</Button>
            </Group>
            <Group justify="center" mt="sm">
                <Button onClick={() => { setWeaponType("Assault Rifle") }}><Image src="/icons/AssaultRifle.png" alt={weaponTypes[9]} w={16} h={16} /> {weaponTypes[9]}</Button>
                <Button onClick={() => { setWeaponType("Launcher") }}><Image src="/icons/Launcher.png" alt={weaponTypes[10]} w={16} h={16} /> {weaponTypes[10]}</Button>
                <Button onClick={() => { setWeaponType("Twin Machine Guns") }}><Image src="/icons/TwinMachinegun.png" alt={weaponTypes[11]} w={16} h={16} /> {weaponTypes[11]}</Button>
                <Button onClick={() => { setWeaponType("Bullet Bow") }}><Image src="/icons/BulletBow.png" alt={weaponTypes[12]} w={16} h={16} /> {weaponTypes[12]}</Button>
            </Group>
            <Group justify="center" mt="sm">
                <Button onClick={() => { setWeaponType("Rod") }}><Image src="/icons/Rod.png" alt={weaponTypes[13]} w={16} h={16} /> {weaponTypes[13]}</Button>
                <Button onClick={() => { setWeaponType("Talis") }}><Image src="/icons/Talis.png" alt={weaponTypes[14]} w={16} h={16} /> {weaponTypes[14]}</Button>
                <Button onClick={() => { setWeaponType("Wand") }}><Image src="/icons/Wand.png" alt={weaponTypes[15]} w={16} h={16} /> {weaponTypes[15]}</Button>
                <Button onClick={() => { setWeaponType("Jet Boots") }}><Image src="/icons/JetBoots.png" alt={weaponTypes[16]} w={16} h={16} /> {weaponTypes[16]}</Button>
                <Button onClick={() => { setWeaponType("Takt") }}><Image src="/icons/Takt.png" alt={weaponTypes[17]} w={16} h={16} /> {weaponTypes[17]}</Button>
            </Group>
        </>
    )
}