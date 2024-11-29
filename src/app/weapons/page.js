import TableComponent from "./components/TableComponent"
import swords from './swords.json'

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