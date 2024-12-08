import type { Metadata } from "next";
//import "./globals.css";
import { LanguageProvider } from "./language-provider";
import '@mantine/core/styles.css';
import { createTheme, ColorSchemeScript, MantineProvider, MantineColorsTuple } from '@mantine/core';
import React from "react";
import { theme } from './theme';

export const metadata: Metadata = {
    title: "PSO2 Character Simulator",
    description: "",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
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