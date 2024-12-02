import { LanguageProvider } from "./language-provider";

export default function MyApp({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <Component {...pageProps} />
        </LanguageProvider>
    )
}