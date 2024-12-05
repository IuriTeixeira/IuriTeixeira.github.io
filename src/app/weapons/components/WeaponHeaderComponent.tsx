import React from "react";
import Image from "next/image";
import { Button, Group } from '@mantine/core';
import swords from '../weapon-data/swords.json'
import wiredlances from '../weapon-data/wiredlances.json'
import { useState } from "react";

export default function WeaponHeaderComponent({weaponData:any, setWeaponData}) {
    return (
        <Group justify="center" mt="sm">
            <Button onClick={()=>{setWeaponData(swords)}}><Image src="/icons/SwordSmall.png" alt="Sword" width={16} height={16} /> Sword</Button>
            <Button onClick={()=>{setWeaponData(wiredlances)}}><Image src="/icons/WiredLanceSmall.png" alt="Wired Lances" width={16} height={16} /> Wired Lance</Button>
            <Button><Image src="/icons/PartizanSmall.png" alt="Partizan" width={16} height={16} /> Partizan</Button>
            <Button><Image src="/icons/DoubleSaberSmall.png" alt="Double Saber" width={16} height={16} /> Double Saber</Button>
            <Button><Image src="/icons/TwinDaggerSmall.png" alt="Twin Daggers" width={16} height={16} /> Twin Daggers</Button>
            <Button><Image src="/icons/KnucklesSmall.png" alt="Knuckles" width={16} height={16} /> Knuckles</Button>
            <Button><Image src="/icons/KatanaSmall.png" alt="Katana" width={16} height={16} /> Katana</Button>
            <Button><Image src="/icons/DualBladeSmall.png" alt="Dual Blades" width={16} height={16} /> Dual Blades</Button>
            <Button><Image src="/icons/GunslashSmall.png" alt="Gunslash" width={16} height={16} /> Gunslash</Button>
            <Button><Image src="/icons/AssaultRifleSmall.png" alt="Assault Rifle" width={16} height={16} /> Assault Rifle</Button>
            <Button><Image src="/icons/LauncherSmall.png" alt="Launcher" width={16} height={16} /> Launcher</Button>
            <Button><Image src="/icons/TwinMachinegunSmall.png" alt="Twin Machineguns" width={16} height={16} /> Twin Machineguns</Button>
            <Button><Image src="/icons/BulletBowSmall.png" alt="Bullet Bow" width={16} height={16} /> Bullet Bow</Button>
            <Button><Image src="/icons/RodSmall.png" alt="Rod" width={16} height={16} /> Rod</Button>
            <Button><Image src="/icons/TalisSmall.png" alt="Talis" width={16} height={16} /> Talis</Button>
            <Button><Image src="/icons/WandSmall.png" alt="Wand" width={16} height={16} /> Wand</Button>
            <Button><Image src="/icons/JetBootsSmall.png" alt="Jet Boots" width={16} height={16} /> Jet Boots</Button>
            <Button><Image src="/icons/TaktSmall.png" alt="Takt" width={16} height={16} /> Takt</Button>
        </Group>
    )
}