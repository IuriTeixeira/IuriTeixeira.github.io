'use client'

import Image from "next/image";
import React, { useContext } from 'react';
import { LanguageContext } from '@/app/language-provider';

export default function TableComponent({ theadData, tbodyData }) {
    const [language, setLanguage] = useContext(LanguageContext);

    const calculateMaxAtk = (baseATK, rarity, old_type) => {
        if (old_type) {
            switch (rarity) {
                case 1:
                case 2:
                case 3: return baseATK * 1.5;
                case 4:
                case 5:
                case 6: return baseATK * 1.6;
                case 7:
                case 8:
                case 9: return baseATK * 1.75;
                case 10: return baseATK * 1.9;
                case 11: return baseATK * 1.95;
                case 12: return baseATK * 2;
                case 13: return baseATK * 1.4;
            }
        } else {
            return baseATK * 1.35
        }
    }

    const displaySSA = (array) => {
        let buffer = []
        for(let i=0; i<array.length; i++){
            buffer.push(<Image src={`/icons/UIItemSClassAbility${array[i]}.png`} alt={`SSA slot ${i} enabled`} width={16} height={16}/>)
        }
        return buffer;
    }

    return (
        <table border="1">
            <thead>
                <tr>
                    {theadData.map(heading => {
                        if (heading != 'old_type') {
                            if (language == 'e') {
                                if (heading != 'name_global') {
                                    switch (heading) {
                                        case 'name_en': return <th key={heading}>Name</th>;
                                        case 'S-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatS-ATK.png" alt="S-ATK" width={16} height={16} /></th>
                                        case 'R-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatR-ATK.png" alt="R-ATK" width={16} height={16} /></th>
                                        case 'T-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatT-ATK.png" alt="T-ATK" width={16} height={16} /></th>
                                        case 'SAF': return <th key={heading}><Image src="/icons/SpecialAbilityIcon.png" alt="Special Ability Factor" width={16} height={16} /></th>
                                        case 'Abilities': return <th key={heading}><Image src="/icons/Ability.png" alt="Default Abilities" width={16} height={16} /></th>
                                        case 'Potential': return <th key={heading}><Image src="/icons/Potential.png" alt="Potential" width={16} height={16} /></th>
                                        case 'SSA Slots': return <th key={heading}><Image src="/icons/SClassAbilityIcon.png" alt="SSA Slots" width={16} height={16} /></th>
                                        default: return <th key={heading}>{heading}</th>
                                    }
                                }
                            }/*else{
                            if(heading != null && heading != 'name_en' && heading != 'name_jp'){
                                switch(heading){
                                    case 'name_global': return <th key={heading}>Name</th>;
                                    case 'S-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatSATK.png" alt="MEL" width={16} height={16} /></th>
                                    case 'R-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatRATK.png" alt="RNG" width={16} height={16} /></th>
                                    case 'T-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatTATK.png" alt="TEC" width={16} height={16} /></th>
                                    default: return <th key={heading}>{heading}</th>
                                }
                            }
                        }*/
                        }
                    })}
                </tr>
            </thead>
            {<tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index.id}>
                        {theadData.map((key, index) => {
                            if (row['Name (JP)'] != null && key != 'name_global' && key != 'old_type') {
                                switch (key) {
                                    case 'Rarity':
                                        return <td key={index.id}><Image src={`/icons/${row[key]}star.png`} alt={`${row[key]} Star`} width={16} height={16} /></td>
                                    case 'Requirement': return <td key={index.id}><Image src={`/icons/UIStat${row[key][0]}.png`} alt="S-ATK" width={16} height={16} /> {row[key][1]}</td>
                                    case 'S-ATK':
                                    case 'R-ATK':
                                    case 'T-ATK':
                                        if (row[key]) {
                                            return <React.Fragment><td key={index.id}>{row[key]}</td><td key={index.id + 500}>{Math.trunc(calculateMaxAtk(row[key], row['Rarity'], row['old_type']))}</td></React.Fragment>
                                        } else {
                                            return <React.Fragment><td></td><td></td></React.Fragment>
                                        }
                                    case 'SSA Slots':
                                        if(row[key]){
                                            return <td key={index.id}>{displaySSA(row[key])}</td>
                                        }
                                    default: return <td key={index.id}>{row[key]}</td>
                                }
                            }
                            //return <td key={index.id}>{row[key]}</td>
                        })}
                    </tr>;
                })}
            </tbody>}
        </table>
    );
}