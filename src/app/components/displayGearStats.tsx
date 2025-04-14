import { Flex, SimpleGrid } from "@mantine/core";
import weapons from '../geardata/weapons/weapons.json'
import units from '../geardata/units/units.json'
import DisplayRarity from "./DisplayRarity";
import DisplayStat from "./DisplayStat";
import DisplayResistance from "./DisplayResistance";
import DisplayPotentials from "./DisplayPotentials";
import DisplayPA from "./DisplayPA";
import DisplaySSA from "./DisplaySSA";
import DisplaySet from "./DisplaySet";
import { useLanguageContext } from "../language-provider";

interface DisplayGearStatsProps{
    gear: string;
    id?: number
}

export default function DisplayGearStats({gear, id}: DisplayGearStatsProps) {
    const language = useLanguageContext()
    let gearData: any = units.find(unit => unit["Name (English)"] === gear)
    if (!gearData) gearData = weapons.find(unit => unit["Name (English)"] === gear)
    return (
        <Flex justify='center' align='center' direction='column' >
            <Flex justify='center' align='center' gap='xs'>
                {<DisplayRarity rarity={gearData["Rarity"]} />}
                <strong>
                    {gearData[`Name (${language.language})`]}
                </strong>
            </Flex>
            {gearData["SSA Slots"] && <DisplaySSA listSSA={gearData["SSA Slots"]} />}
            <SimpleGrid cols={3} verticalSpacing='0' spacing='xs'>
                {gearData["S-ATK"] && <DisplayStat stat={'S-ATK'} value={gearData["S-ATK"]} />}
                {gearData["R-ATK"] && <DisplayStat stat={'R-ATK'} value={gearData["R-ATK"]} />}
                {gearData["T-ATK"] && <DisplayStat stat={'T-ATK'} value={gearData["T-ATK"]} />}
                {gearData["DEX"] && <DisplayStat stat={'DEX'} value={gearData["DEX"]} />}
                {gearData["S-DEF"] && <DisplayStat stat={'S-DEF'} value={gearData["S-DEF"]} />}
                {gearData["R-DEF"] && <DisplayStat stat={'R-DEF'} value={gearData["R-DEF"]} />}
                {gearData["T-DEF"] && <DisplayStat stat={'T-DEF'} value={gearData["T-DEF"]} />}
                {gearData["Strike Resistance"] && <DisplayResistance resist='Strike Resistance' value={gearData["Strike Resistance"]} />}
                {gearData["Ranged Resistance"] && <DisplayResistance resist='Ranged Resistance' value={gearData["Ranged Resistance"]} />}
                {gearData["Tech Resistance"] && <DisplayResistance resist='Tech Resistance' value={gearData["Tech Resistance"]} />}
                {gearData["Fire Resistance"] && <DisplayResistance resist='Fire Resistance' value={gearData["Fire Resistance"]} />}
                {gearData["Ice Resistance"] && <DisplayResistance resist='Ice Resistance' value={gearData["Ice Resistance"]} />}
                {gearData["Lightning Resistance"] && <DisplayResistance resist='Lightning Resistance' value={gearData["Lightning Resistance"]} />}
                {gearData["Wind Resistance"] && <DisplayResistance resist='Wind Resistance' value={gearData["Wind Resistance"]} />}
                {gearData["Light Resistance"] && <DisplayResistance resist='Light Resistance' value={gearData["Light Resistance"]} />}
                {gearData["Dark Resistance"] && <DisplayResistance resist='Dark Resistance' value={gearData["Dark Resistance"]} />}
            </SimpleGrid>
            {gearData["PA_enabled"] && <DisplayPA namePA={gearData["PA_enabled"]} />}
            {gearData["Potential"] && <DisplayPotentials potentialList={gearData["Potential"]} />}
            {gearData["Set"] && <DisplaySet setName={gearData["Set"]} name={gearData["Name (English)"]} />}
        </Flex>
    )
}