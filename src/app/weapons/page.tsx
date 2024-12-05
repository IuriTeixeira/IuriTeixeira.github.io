import TableComponent from "./components/TableComponent"
import swords from './swords.json'
import './page.css'
import React from "react"

export default function Weapons() {
    const getHeadings = () => {
        return Object.keys(swords[0]);
    }
    return (
        <>
            <TableComponent theadData={getHeadings()} tbodyData={swords}/> 
        </>
    )
}