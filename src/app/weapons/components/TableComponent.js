'use client'

import Image from "next/image";
import React, { useContext } from 'react';
import { LanguageContext } from '@/app/language-provider';

export default function TableComponent({ theadData, tbodyData }) {
    const [language, setLanguage] = useContext(LanguageContext);
    return (
        <table border="1">
            <thead>
                <tr>
                    {theadData.map(heading => {
                        if (heading != 'old_type' && heading != 'id') {
                            if (language == 'e') {
                                if (heading != null && heading != 'name_global') {
                                    switch (heading) {
                                        case 'name_en': return <th key={heading}>Name</th>;
                                        case 'S-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatSATK.png" alt="S-ATK" width={16} height={16} /></th>
                                        case 'R-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatRATK.png" alt="R-ATK" width={16} height={16} /></th>
                                        case 'T-ATK': return <th key={heading} colSpan='2'><Image src="/icons/UIStatTATK.png" alt="T-ATK" width={16} height={16} /></th>
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
                                    case 'Rarity': switch (row[key]) {
                                        case 1: return <td key={index.id}><Image src="/icons/1star.png" alt="1 Star" width={16} height={16} /></td>
                                        case 2: return <td key={index.id}><Image src="/icons/2star.png" alt="2 Stars" width={16} height={16} /></td>
                                        case 3: return <td key={index.id}><Image src="/icons/3star.png" alt="3 Stars" width={16} height={16} /></td>
                                        case 4: return <td key={index.id}><Image src="/icons/4star.png" alt="4 Stars" width={16} height={16} /></td>
                                        case 5: return <td key={index.id}><Image src="/icons/5star.png" alt="5 Stars" width={16} height={16} /></td>
                                        case 6: return <td key={index.id}><Image src="/icons/6star.png" alt="6 Stars" width={16} height={16} /></td>
                                        case 7: return <td key={index.id}><Image src="/icons/7star.png" alt="7 Stars" width={16} height={16} /></td>
                                        case 8: return <td key={index.id}><Image src="/icons/8star.png" alt="8 Stars" width={16} height={16} /></td>
                                        case 9: return <td key={index.id}><Image src="/icons/9star.png" alt="9 Stars" width={16} height={16} /></td>
                                        case 10: return <td key={index.id}><Image src="/icons/10star.png" alt="10 Stars" width={16} height={16} /></td>
                                        case 11: return <td key={index.id}><Image src="/icons/11star.png" alt="11 Stars" width={16} height={16} /></td>
                                        case 12: return <td key={index.id}><Image src="/icons/12star.png" alt="12 Stars" width={16} height={16} /></td>
                                        case 13: return <td key={index.id}><Image src="/icons/13star.png" alt="13 Stars" width={16} height={16} /></td>
                                        case 14: return <td key={index.id}><Image src="/icons/14star.png" alt="14 Stars" width={16} height={16} /></td>
                                        case 15: return <td key={index.id}><Image src="/icons/15star.png" alt="15 Stars" width={16} height={16} /></td>
                                    }
                                    case 'Requirement': return <td key={index.id}><Image src="/icons/UIStatSATK.png" alt="S-ATK" width={16} height={16} /> {row[key][1]}</td>
                                    case 'S-ATK':
                                        if (row[key]) {
                                            let maxSATK = 0;
                                            if (row['old_type']) {
                                                switch(row['Rarity']){
                                                    case 1:
                                                    case 2:
                                                    case 3: maxSATK = row[key] * 1.5; break;
                                                    case 4: 
                                                    case 5: 
                                                    case 6: maxSATK = row[key] * 1.6; break;
                                                    case 7: 
                                                    case 8: 
                                                    case 9: maxSATK = row[key] * 1.75; break;
                                                    case 10: maxSATK = row[key] * 1.9; break;
                                                    case 11: maxSATK = row[key] * 1.95; break;
                                                    case 12: maxSATK = row[key] * 2; break;
                                                    case 13: maxSATK = row[key] * 1.4; break;
                                                }
                                            } else {
                                                maxSATK = row[key] * 1.35
                                            };
                                            return <React.Fragment><td key={index.id}>{row[key]}</td><td key={index.id + 500}>{Math.trunc(maxSATK)}</td></React.Fragment>
                                        } else {
                                            return <React.Fragment><td></td><td></td></React.Fragment>
                                        }
                                    case 'R-ATK': if (row[key]) {
                                        let maxRATK = 0;
                                        if (row['old_type']) {
                                            switch(row['Rarity']){
                                                case 1:
                                                case 2:
                                                case 3: maxRATK = row[key] * 1.5; break;
                                                case 4: 
                                                case 5: 
                                                case 6: maxRATK = row[key] * 1.6; break;
                                                case 7: 
                                                case 8: 
                                                case 9: maxRATK = row[key] * 1.75; break;
                                                case 10: maxRATK = row[key] * 1.9
                                                case 11: maxRATK = row[key] * 1.95
                                                case 12: maxRATK = row[key] * 2
                                                case 13: maxRATK = row[key] * 1.4
                                            }
                                        } else {
                                            maxRATK = row[key] * 1.35
                                        };
                                        return <React.Fragment><td key={index.id}>{row[key]}</td><td key={index.id + 500}>{Math.trunc(maxRATK)}</td></React.Fragment>
                                    } else {
                                        return <React.Fragment><td></td><td></td></React.Fragment>
                                    }
                                    case 'T-ATK': if (row[key]) {
                                        let maxTATK = 0;
                                        if (row['old_type']) {
                                            switch(row['Rarity']){
                                                case 1:
                                                case 2:
                                                case 3: maxTATK = row[key] * 1.5; break;
                                                case 4: 
                                                case 5: 
                                                case 6: maxTATK = row[key] * 1.6; break
                                                case 7: 
                                                case 8: 
                                                case 9: maxTATK = row[key] * 1.75; break
                                                case 10: maxTATK = row[key] * 1.9
                                                case 11: maxTATK = row[key] * 1.95
                                                case 12: maxTATK = row[key] * 2
                                                case 13: maxTATK = row[key] * 1.4
                                            }
                                        } else {
                                            maxTATK = row[key] * 1.35
                                        };
                                        return <React.Fragment><td key={index.id}>{row[key]}</td><td key={index.id + 500}>{Math.trunc(maxTATK)}</td></React.Fragment>
                                    } else {
                                        return <React.Fragment><td></td><td></td></React.Fragment>
                                    }
                                    //case 'SSA Slots':
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