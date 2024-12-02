'use client'

import React, { useContext } from 'react';
import { useLanguageContext } from '@/app/language-provider';

export default function TableComponent({theadData, tbodyData}) {
  const [language, setLanguage] = useLanguageContext();
  return (
    <table>
        <thead>
            <tr>
            {theadData.map(heading => {
              if(heading != 'old_type') {
                if(language == 'en'){
                  if(heading != null && heading != name_global){
                    if(heading == 'name_en'){
                      return <th key={heading}>{Name}</th>
                    }
                  }
                }else{
                  if(heading != null && heading != name_en && heading != name_jp){
                    return <th key={heading}>{heading}</th>
                  }
                }
              }
            })}
          </tr>
        </thead>
        <tbody>
            {tbodyData.map((row, index) => {
                return <tr key={index.id}>
                    {theadData.map((key, index) => {
                        if(row[key]!='old_type')
                          return <td key={row[key]}>{row[key]}</td>
                    })}
              </tr>;
            })}
            {/*console.log(language)*/}
        </tbody>
    </table>
  );
}