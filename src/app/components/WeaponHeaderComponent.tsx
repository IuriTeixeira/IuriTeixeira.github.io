import React from "react";
import { Image, Button, Group } from '@mantine/core';
import swords from '../geardata/weapons/weapon-data/swords.json'
import wiredlances from '../geardata/weapons/weapon-data/wiredlances.json'
import partizans from '../geardata/weapons/weapon-data/partizans.json'
import { useLanguageContext } from "../language-provider";

export default function WeaponHeaderComponent({ setWeaponData, setWeaponType }) {
    const language = useLanguageContext()
    switch (language.language) {
        case 'English Patch':
        case 'Global':
            return (
                <Group justify="center" mt="sm">
                    <Button onClick={() => { setWeaponData(swords); setWeaponType("swords") }}><Image src="/icons/Sword.png" alt="Sword" w={16} h={16} /> Sword</Button>
                    <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt="Wired Lance" w={16} h={16} /> Wired Lance</Button>
                    {language.language === 'English Patch' && <Button onClick={() => { setWeaponData(partizans); setWeaponType('partizans') }}><Image src="/icons/Partizan.png" alt="Partizan" w={16} h={16} /> Partizan</Button>}
                    {language.language === 'Global' && <Button onClick={() => { setWeaponData(partizans); setWeaponType('partizans') }}><Image src="/icons/Partizan.png" alt="Partisan" w={16} h={16} /> Partisan</Button>}
                    <Button><Image src="/icons/TwinDagger.png" alt="Twin Daggers" w={16} h={16} /> Twin Daggers</Button>
                    <Button><Image src="/icons/DoubleSaber.png" alt="Double Saber" w={16} h={16} /> Double Saber</Button>
                    <Button><Image src="/icons/Knuckles.png" alt="Knuckles" w={16} h={16} /> Knuckles</Button>
                    <Button><Image src="/icons/Katana.png" alt="Katana" w={16} h={16} /> Katana</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/DualBlade.png" alt="Dual Blades" w={16} h={16} /> Dual Blades</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/DualBlade.png" alt="Soaring Blades" w={16} h={16} /> Soaring Blades</Button>}
                    {language.language === 'English Patch' && <Button><Image src="/icons/Gunslash.png" alt="Gunslash" w={16} h={16} /> Gunslash</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/Gunslash.png" alt="Gunblade" w={16} h={16} /> Gunblade</Button>}
                    <Button><Image src="/icons/AssaultRifle.png" alt="Assault Rifle" w={16} h={16} /> Assault Rifle</Button>
                    <Button><Image src="/icons/Launcher.png" alt="Launcher" w={16} h={16} /> Launcher</Button>
                    <Button><Image src="/icons/TwinMachinegun.png" alt="Twin Machineguns" w={16} h={16} /> Twin Machineguns</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/BulletBow.png" alt="Bullet Bow" w={16} h={16} /> Bullet Bow</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/BulletBow.png" alt="Bow" w={16} h={16} /> Bow</Button>}
                    <Button><Image src="/icons/Rod.png" alt="Rod" w={16} h={16} /> Rod</Button>
                    <Button><Image src="/icons/Talis.png" alt="Talis" w={16} h={16} /> Talis</Button>
                    <Button><Image src="/icons/Wand.png" alt="Wand" w={16} h={16} /> Wand</Button>
                    <Button><Image src="/icons/JetBoots.png" alt="Jet Boots" w={16} h={16} /> Jet Boots</Button>
                    {language.language === 'English Patch' && <Button><Image src="/icons/Takt.png" alt="Takt" w={16} h={16} /> Takt</Button>}
                    {language.language === 'Global' && <Button><Image src="/icons/Takt.png" alt="Harmonizer" w={16} h={16} /> Harmonizer</Button>}
                </Group>
            )
        case '日本語':
            return (
                <Group justify="center" mt="sm">
                    <Button onClick={() => { setWeaponData(swords); setWeaponType("swords") }}><Image src="/icons/Sword.png" alt="ソード" w={16} h={16} /> ソード</Button>
                    <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt="ワイヤードランス" w={16} h={16} /> ワイヤードランス</Button>
                    <Button><Image src="/icons/Partizan.png" alt="パルチザン" w={16} h={16} /> パルチザン</Button>
                    <Button><Image src="/icons/TwinDagger.png" alt="ツインダガー" w={16} h={16} /> ツインダガー</Button>
                    <Button><Image src="/icons/DoubleSaber.png" alt="ダブルセイバー" w={16} h={16} /> ダブルセイバー</Button>
                    <Button><Image src="/icons/Knuckles.png" alt="ナックル" w={16} h={16} /> ナックル</Button>
                    <Button><Image src="/icons/Katana.png" alt="カタナ" w={16} h={16} /> カタナ</Button>
                    <Button><Image src="/icons/DualBlade.png" alt="デュアルブレード" w={16} h={16} /> デュアルブレード</Button>
                    <Button><Image src="/icons/Gunslash.png" alt="ガンスラッシュ" w={16} h={16} /> ガンスラッシュ</Button>
                    <Button><Image src="/icons/AssaultRifle.png" alt="アサルトライフル" w={16} h={16} /> アサルトライフル</Button>
                    <Button><Image src="/icons/Launcher.png" alt="ランチャー" w={16} h={16} /> ランチャー</Button>
                    <Button><Image src="/icons/TwinMachinegun.png" alt="ツインマシンガン" w={16} h={16} /> ツインマシンガン</Button>
                    <Button><Image src="/icons/BulletBow.png" alt="バレットボウ" w={16} h={16} /> バレットボウ</Button>
                    <Button><Image src="/icons/Rod.png" alt="ロッド" w={16} h={16} /> ロッド</Button>
                    <Button><Image src="/icons/Talis.png" alt="タリス" w={16} h={16} /> タリス</Button>
                    <Button><Image src="/icons/Wand.png" alt="ウォンド" w={16} h={16} /> ウォンド</Button>
                    <Button><Image src="/icons/JetBoots.png" alt="ジェットブーツ" w={16} h={16} /> ジェットブーツ</Button>
                    <Button><Image src="/icons/Takt.png" alt="タクト" w={16} h={16} /> タクト</Button>
                </Group>
            )
    }
}