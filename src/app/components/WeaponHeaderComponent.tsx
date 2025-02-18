import React from "react";
import { Image, Button, Group } from '@mantine/core';
import swords from '../geardata/weapons/weapon-data/swords.json'
import wiredlances from '../geardata/weapons/weapon-data/wiredlances.json'
import partizans from '../geardata/weapons/weapon-data/partizans.json'
import twindaggers from '../geardata/weapons/weapon-data/twindaggers.json'
import doublesabers from '../geardata/weapons/weapon-data/doublesabers.json'
import knuckles from '../geardata/weapons/weapon-data/knuckles.json'
import katanas from '../geardata/weapons/weapon-data/katanas.json'
import dualblades from '../geardata/weapons/weapon-data/dualblades.json'
import gunslashes from '../geardata/weapons/weapon-data/gunslashes.json'
import assaultrifles from '../geardata/weapons/weapon-data/assaultrifles.json'
import launchers from '../geardata/weapons/weapon-data/launchers.json'
import twinmachineguns from '../geardata/weapons/weapon-data/twinmachineguns.json'
import bulletbows from '../geardata/weapons/weapon-data/bulletbows.json'
import rods from '../geardata/weapons/weapon-data/rods.json'
import talises from '../geardata/weapons/weapon-data/talises.json'
import wands from '../geardata/weapons/weapon-data/wands.json'
import jetboots from '../geardata/weapons/weapon-data/jetboots.json'
import takts from '../geardata/weapons/weapon-data/takts.json'
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
                <Button onClick={() => { setWeaponData(swords); setWeaponType("swords") }}><Image src="/icons/Sword.png" alt={weaponTypes[0]} w={16} h={16} /> {weaponTypes[0]}</Button>
                <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt={weaponTypes[1]} w={16} h={16} /> {weaponTypes[1]}</Button>
                <Button onClick={() => { setWeaponData(partizans); setWeaponType('partizans') }}><Image src="/icons/Partizan.png" alt={weaponTypes[2]} w={16} h={16} /> {weaponTypes[2]}</Button>
                <Button onClick={() => { setWeaponData(twindaggers); setWeaponType("twindaggers") }}><Image src="/icons/TwinDagger.png" alt={weaponTypes[3]} w={16} h={16} /> {weaponTypes[3]}</Button>
                <Button onClick={() => { setWeaponData(doublesabers); setWeaponType("doublesabers") }}><Image src="/icons/DoubleSaber.png" alt={weaponTypes[4]} w={16} h={16} /> {weaponTypes[4]}</Button>
                <Button onClick={() => { setWeaponData(knuckles); setWeaponType("knuckles") }}><Image src="/icons/Knuckles.png" alt={weaponTypes[5]} w={16} h={16} /> {weaponTypes[5]}</Button>
                <Button onClick={() => { setWeaponData(katanas); setWeaponType("katanas") }}><Image src="/icons/Katana.png" alt={weaponTypes[6]} w={16} h={16} /> {weaponTypes[6]}</Button>
                <Button onClick={() => { setWeaponData(dualblades); setWeaponType("dualblades") }}><Image src="/icons/DualBlade.png" alt={weaponTypes[7]} w={16} h={16} /> {weaponTypes[7]}</Button>
                <Button onClick={() => { setWeaponData(gunslashes); setWeaponType("gunslashes") }}><Image src="/icons/Gunslash.png" alt={weaponTypes[8]} w={16} h={16} /> {weaponTypes[8]}</Button>
            </Group>
            <Group justify="center" mt="sm">
                <Button onClick={() => { setWeaponData(assaultrifles); setWeaponType("assaultrifles") }}><Image src="/icons/AssaultRifle.png" alt={weaponTypes[9]} w={16} h={16} /> {weaponTypes[9]}</Button>
                <Button onClick={() => { setWeaponData(launchers); setWeaponType("launchers") }}><Image src="/icons/Launcher.png" alt={weaponTypes[10]} w={16} h={16} /> {weaponTypes[10]}</Button>
                <Button onClick={() => { setWeaponData(twinmachineguns); setWeaponType("twinmachineguns") }}><Image src="/icons/TwinMachinegun.png" alt={weaponTypes[11]} w={16} h={16} /> {weaponTypes[11]}</Button>
                <Button onClick={() => { setWeaponData(bulletbows); setWeaponType("bulletbows") }}><Image src="/icons/BulletBow.png" alt={weaponTypes[12]} w={16} h={16} /> {weaponTypes[12]}</Button>
            </Group>
            <Group justify="center" mt="sm">
                <Button onClick={() => { setWeaponData(rods); setWeaponType("rods") }}><Image src="/icons/Rod.png" alt={weaponTypes[13]} w={16} h={16} /> {weaponTypes[13]}</Button>
                <Button onClick={() => { setWeaponData(talises); setWeaponType("talises") }}><Image src="/icons/Talis.png" alt={weaponTypes[14]} w={16} h={16} /> {weaponTypes[14]}</Button>
                <Button onClick={() => { setWeaponData(wands); setWeaponType("wands") }}><Image src="/icons/Wand.png" alt={weaponTypes[15]} w={16} h={16} /> {weaponTypes[15]}</Button>
                <Button onClick={() => { setWeaponData(jetboots); setWeaponType("jetboots") }}><Image src="/icons/JetBoots.png" alt={weaponTypes[16]} w={16} h={16} /> {weaponTypes[16]}</Button>
                <Button onClick={() => { setWeaponData(takts); setWeaponType("takts") }}><Image src="/icons/Takt.png" alt={weaponTypes[17]} w={16} h={16} /> {weaponTypes[17]}</Button>
            </Group>
        </>
    )
}