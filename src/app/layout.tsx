import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./language-provider";
import '@mantine/core/styles.css';
import { createTheme, ColorSchemeScript, MantineProvider, MantineColorsTuple } from '@mantine/core';
import React from "react";

export const metadata: Metadata = {
    title: "PSO2 Character Simulator",
    description: "",
};

const myColor: MantineColorsTuple = [
    '#ecefff',
    '#d5dafb',
    '#a9b1f1',
    '#7a87e9',
    '#5362e1',
    '#3a4bdd',
    '#2c40dc',
    '#1f32c4',
    '#182cb0',
    '#0a259c'
];

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
