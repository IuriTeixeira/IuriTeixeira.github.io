import TableComponent from "./components/TableComponent"
import swords from './swords.json'
import './page.css'

export default function Weapons() {
    const getHeadings = () => {
        return Object.keys(swords[0]);
    }
    return (
        <>
            <TableComponent class="table" theadData={getHeadings()} tbodyData={swords}/> 
        </>
    )
}