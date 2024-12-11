import React from "react";
import Image from "next/image";
import { Button, Group } from '@mantine/core';
import swords from '../weapon-data/swords.json'
import wiredlances from '../weapon-data/wiredlances.json'

export default function WeaponHeaderComponent({ setWeaponData, setWeaponType }) {
    return (
        <Group justify="center" mt="sm">
            <Button onClick={() => { setWeaponData(swords); setWeaponType("swords")}}><Image src="/icons/Sword.png" alt="Sword" width={16} height={16} /> Sword</Button>
            <Button onClick={() => { setWeaponData(wiredlances); setWeaponType('wiredlances') }}><Image src="/icons/WiredLance.png" alt="Wired Lances" width={16} height={16} /> Wired Lance</Button>
            <Button><Image src="/icons/Partizan.png" alt="Partizan" width={16} height={16} /> Partizan</Button>
            <Button><Image src="/icons/TwinDagger.png" alt="Twin Daggers" width={16} height={16} /> Twin Daggers</Button>
            <Button><Image src="/icons/DoubleSaber.png" alt="Double Saber" width={16} height={16} /> Double Saber</Button>
            <Button><Image src="/icons/Knuckles.png" alt="Knuckles" width={16} height={16} /> Knuckles</Button>
            <Button><Image src="/icons/Katana.png" alt="Katana" width={16} height={16} /> Katana</Button>
            <Button><Image src="/icons/DualBlade.png" alt="Dual Blades" width={16} height={16} /> Dual Blades</Button>
            <Button><Image src="/icons/Gunslash.png" alt="Gunslash" width={16} height={16} /> Gunslash</Button>
            <Button><Image src="/icons/AssaultRifle.png" alt="Assault Rifle" width={16} height={16} /> Assault Rifle</Button>
            <Button><Image src="/icons/Launcher.png" alt="Launcher" width={16} height={16} /> Launcher</Button>
            <Button><Image src="/icons/TwinMachinegun.png" alt="Twin Machineguns" width={16} height={16} /> Twin Machineguns</Button>
            <Button><Image src="/icons/BulletBow.png" alt="Bullet Bow" width={16} height={16} /> Bullet Bow</Button>
            <Button><Image src="/icons/Rod.png" alt="Rod" width={16} height={16} /> Rod</Button>
            <Button><Image src="/icons/Talis.png" alt="Talis" width={16} height={16} /> Talis</Button>
            <Button><Image src="/icons/Wand.png" alt="Wand" width={16} height={16} /> Wand</Button>
            <Button><Image src="/icons/JetBoots.png" alt="Jet Boots" width={16} height={16} /> Jet Boots</Button>
            <Button><Image src="/icons/Takt.png" alt="Takt" width={16} height={16} /> Takt</Button>
        </Group>
    )
}