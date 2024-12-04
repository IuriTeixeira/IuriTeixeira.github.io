import "./globals.css";
import LanguageProvider from "./language-provider";
import '@mantine/core/styles.css';
import { createTheme, ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
    title: "PSO2 Character Simulator",
    description: "",
};

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
})

export default function RootLayout({ children }) {
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
