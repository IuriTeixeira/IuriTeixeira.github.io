'use client'
 
import { createContext } from 'react'
 
export const LanguageContext = createContext({})
 
export default function LanguageProvider({ children }) {
  return <LanguageContext.Provider value="dark">{children}</LanguageContext.Provider>
}