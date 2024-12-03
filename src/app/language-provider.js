'use client'
 
import { createContext, useState } from 'react'
 
export const LanguageContext = createContext({});
 
export default function LanguageProvider({ children }) {
  return <LanguageContext.Provider value='e'>{children}</LanguageContext.Provider>
}