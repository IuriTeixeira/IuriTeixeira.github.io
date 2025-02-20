'use client'

import React from "react";
import { Image, Button, Group, Flex} from '@mantine/core';
import { useLanguageContext } from "../language-provider";
import Link from "next/link";

export default function GlobalHeaderComponent() {
    const language = useLanguageContext()
    let homePage: string
    let weaponPage: string
    let unitPage: string
    switch (language.language) {
        case 'JP':
            homePage = 'ホーム'
            weaponPage = '武器ページ'
            unitPage = '防具ページ'
            break
        default:
            homePage = 'Home Page'
            weaponPage = 'Weapons Page'
            unitPage = 'Units Page'
    }
    return (
        <Group justify="center" mt="sm">
            <Link href="/"><Button><Flex align='center' justify='center' gap={3}><Image src="/favicon.ico" alt={homePage} w={16} h={16} /> {homePage}</Flex></Button></Link>
            <Link href="/geardata/weapons"><Button><Flex align='center' justify='center' gap={3}><Image src="/icons/Sword.png" alt={weaponPage} w={16} h={16} /> {weaponPage}</Flex></Button></Link>
            <Link href="/geardata/units"><Button><Flex align='center' justify='center' gap={3}><Image src="/icons/Rear.png" alt={unitPage} w={16} h={16} /> {unitPage}</Flex></Button></Link>
        </Group>
    )
}