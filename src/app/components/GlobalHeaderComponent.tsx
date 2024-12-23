'use client'

import React from "react";
import { Image, Button, Group } from '@mantine/core';
import { useLanguageContext } from "../language-provider";
import Link from "next/link";

export default function GlobalHeaderComponent() {
    const language = useLanguageContext()
    switch (language.language) {
        case 'English Patch':
        case 'Global':
            return (
                <Group justify="center" mt="sm">
                    <Link href="/"><Button><Image src="/favicon.ico" alt="Home" w={16} h={16} /> Home page</Button></Link>
                    <Link href="/geardata/weapons"><Button><Image src="/icons/Sword.png" alt="Weapons" w={16} h={16} /> Weapons page</Button></Link>
                    <Link href="/geardata/units"><Button><Image src="/icons/Rear.png" alt="Units" w={16} h={16} /> Units page</Button></Link>
                </Group>
            )
        case '日本語':
            return (
                <Group justify="center" mt="sm">
                    <Link href="/"><Button><Image src="/favicon.ico" alt="Home" w={16} h={16} /> Home page</Button></Link>
                    <Link href="/geardata/weapons"><Button><Image src="/icons/Sword.png" alt="Weapons" w={16} h={16} /> Weapons page</Button></Link>
                    <Link href="/geardata/units"><Button><Image src="/icons/Rear.png" alt="Units" w={16} h={16} /> Units page</Button></Link>
                </Group>
            )
    }
}