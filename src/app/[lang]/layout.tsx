import DictionaryProvider from "@/components/dictionary/Dictionary"
import { getDictionary } from "@/lib/i18n/dictionary"
import { i18n, Locale } from "@/lib/i18n/i18n.config"


export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }))
  }
  
  export default async function RootLayout({
    children,
    params
  }: Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
  }>) {
    const dictionary = await getDictionary(params.lang)
    return (
        <html
          lang={params.lang}
        >
          <body>
            <DictionaryProvider dictionary={dictionary}>
                {children}
            </DictionaryProvider>
          </body>
        </html>
      )
    }
  