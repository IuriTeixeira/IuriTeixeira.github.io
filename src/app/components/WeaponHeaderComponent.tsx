import React from "react";
import Image from "next/image";
import { Button, Group } from '@mantine/core';
import swords from '../geardata/weapons/weapon-data/swords.json'
import wiredlances from '../geardata/weapons/weapon-data/wiredlances.json'
import { useLanguageContext } from "../language-provider";

export default function WeaponHeaderComponent({ setWeaponData, setWeaponType }) {
    const language = useLanguageContext()
    switch (language.language) {
        case 'Global':
        case 'English Patch':
            return (
                <Group justify="center" mt="sm">
                    <Button onClick={() => { setWeaponData(swords); setWeaponType("swords") }}><Image src="/icons/Sword.png" alt="Sword" width={16} height={16} /> Sword</Button>
                    <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt="Wired Lance" width={16} height={16} /> Wired Lance</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/Partizan.png" alt="Partizan" width={16} height={16} /> Partizan</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/Partizan.png" alt="Partisan" width={16} height={16} /> Partisan</Button>}
                    <Button><Image src="/icons/TwinDagger.png" alt="Twin Daggers" width={16} height={16} /> Twin Daggers</Button>
                    <Button><Image src="/icons/DoubleSaber.png" alt="Double Saber" width={16} height={16} /> Double Saber</Button>
                    <Button><Image src="/icons/Knuckles.png" alt="Knuckles" width={16} height={16} /> Knuckles</Button>
                    <Button><Image src="/icons/Katana.png" alt="Katana" width={16} height={16} /> Katana</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/DualBlade.png" alt="Dual Blades" width={16} height={16} /> Dual Blades</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/DualBlade.png" alt="Soaring Blades" width={16} height={16} /> Soaring Blades</Button>}
                    {language.language === 'English Patch' && <Button><Image src="/icons/Gunslash.png" alt="Gunslash" width={16} height={16} /> Gunslash</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/Gunslash.png" alt="Gunblade" width={16} height={16} /> Gunblade</Button>}
                    <Button><Image src="/icons/AssaultRifle.png" alt="Assault Rifle" width={16} height={16} /> Assault Rifle</Button>
                    <Button><Image src="/icons/Launcher.png" alt="Launcher" width={16} height={16} /> Launcher</Button>
                    <Button><Image src="/icons/TwinMachinegun.png" alt="Twin Machineguns" width={16} height={16} /> Twin Machineguns</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/BulletBow.png" alt="Bullet Bow" width={16} height={16} /> Bullet Bow</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/BulletBow.png" alt="Bow" width={16} height={16} /> Bow</Button>}
                    <Button><Image src="/icons/Rod.png" alt="Rod" width={16} height={16} /> Rod</Button>
                    <Button><Image src="/icons/Talis.png" alt="Talis" width={16} height={16} /> Talis</Button>
                    <Button><Image src="/icons/Wand.png" alt="Wand" width={16} height={16} /> Wand</Button>
                    <Button><Image src="/icons/JetBoots.png" alt="Jet Boots" width={16} height={16} /> Jet Boots</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/Takt.png" alt="Takt" width={16} height={16} /> Takt</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/Takt.png" alt="Harmonizer" width={16} height={16} /> Harmonizer</Button>}
                </Group>
            )
        case '日本語':
            return (
                <Group justify="center" mt="sm">
                    <Button onClick={() => { setWeaponData(swords); setWeaponType("swords") }}><Image src="/icons/Sword.png" alt="ソード" width={16} height={16} /> ソード</Button>
                    <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt="ワイヤードランス" width={16} height={16} /> ワイヤードランス</Button>
                    <Button><Image src="/icons/Partizan.png" alt="パルチザン" width={16} height={16} /> パルチザン</Button>
                    <Button><Image src="/icons/TwinDagger.png" alt="ツインダガー" width={16} height={16} /> ツインダガー</Button>
                    <Button><Image src="/icons/DoubleSaber.png" alt="ダブルセイバー" width={16} height={16} /> ダブルセイバー</Button>
                    <Button><Image src="/icons/Knuckles.png" alt="ナックル" width={16} height={16} /> ナックル</Button>
                    <Button><Image src="/icons/Katana.png" alt="カタナ" width={16} height={16} /> カタナ</Button>
                    <Button><Image src="/icons/DualBlade.png" alt="デュアルブレード" width={16} height={16} /> デュアルブレード</Button>
                    <Button><Image src="/icons/Gunslash.png" alt="ガンスラッシュ" width={16} height={16} /> ガンスラッシュ</Button>
                    <Button><Image src="/icons/AssaultRifle.png" alt="アサルトライフル" width={16} height={16} /> アサルトライフル</Button>
                    <Button><Image src="/icons/Launcher.png" alt="ランチャー" width={16} height={16} /> ランチャー</Button>
                    <Button><Image src="/icons/TwinMachinegun.png" alt="ツインマシンガン" width={16} height={16} /> ツインマシンガン</Button>
                    <Button><Image src="/icons/BulletBow.png" alt="バレットボウ" width={16} height={16} /> バレットボウ</Button>
                    <Button><Image src="/icons/Rod.png" alt="ロッド" width={16} height={16} /> ロッド</Button>
                    <Button><Image src="/icons/Talis.png" alt="タリス" width={16} height={16} /> タリス</Button>
                    <Button><Image src="/icons/Wand.png" alt="ウォンド" width={16} height={16} /> ウォンド</Button>
                    <Button><Image src="/icons/JetBoots.png" alt="ジェットブーツ" width={16} height={16} /> ジェットブーツ</Button>
                    <Button><Image src="/icons/Takt.png" alt="タクト" width={16} height={16} /> タクト</Button>
                </Group>
            )
    }
}