import { Flex, SimpleGrid } from "@mantine/core";
import weapons from '../geardata/weapons/weapons.json'
import units from '../geardata/units/units.json'
import DisplayRarity from "./DisplayRarity";
import DisplayStat from "./DisplayStat";
import displayResistance from "./displayResistance";
import displayPotentials from "./displayPotentials";
import DisplayPA from "./DisplayPA";
import displaySSA from "./displaySSA";
import displaySet from "./displaySet";
import { useLanguageContext } from "../language-provider";

export default function displayGearStats(gear: any): any {
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
            {gearData["SSA Slots"] && displaySSA(gearData["SSA Slots"])}
            <SimpleGrid cols={3} verticalSpacing='0' spacing='xs'>
                {gearData["S-ATK"] && <DisplayStat stat={'S-ATK'} value={gearData["S-ATK"]} />}
                {gearData["R-ATK"] && <DisplayStat stat={'R-ATK'} value={gearData["R-ATK"]} />}
                {gearData["T-ATK"] && <DisplayStat stat={'T-ATK'} value={gearData["T-ATK"]} />}
                {gearData["DEX"] && <DisplayStat stat={'DEX'} value={gearData["DEX"]} />}
                {gearData["S-DEF"] && <DisplayStat stat={'S-DEF'} value={gearData["S-DEF"]} />}
                {gearData["R-DEF"] && <DisplayStat stat={'R-DEF'} value={gearData["R-DEF"]} />}
                {gearData["T-DEF"] && <DisplayStat stat={'T-DEF'} value={gearData["T-DEF"]} />}
                {gearData["Strike Resistance"] && displayResistance('Strike Resistance', gearData["Strike Resistance"])}
                {gearData["Ranged Resistance"] && displayResistance('Ranged Resistance', gearData["Ranged Resistance"])}
                {gearData["Tech Resistance"] && displayResistance('Tech Resistance', gearData["Tech Resistance"])}
                {gearData["Fire Resistance"] && displayResistance('Fire Resistance', gearData["Fire Resistance"])}
                {gearData["Ice Resistance"] && displayResistance('Ice Resistance', gearData["Ice Resistance"])}
                {gearData["Lightning Resistance"] && displayResistance('Lightning Resistance', gearData["Lightning Resistance"])}
                {gearData["Wind Resistance"] && displayResistance('Wind Resistance', gearData["Wind Resistance"])}
                {gearData["Light Resistance"] && displayResistance('Light Resistance', gearData["Light Resistance"])}
                {gearData["Dark Resistance"] && displayResistance('Dark Resistance', gearData["Dark Resistance"])}
            </SimpleGrid>
            {gearData["PA_enabled"] && <DisplayPA namePA={gearData["PA_enabled"]} />}
            {gearData["Potential"] && displayPotentials(gearData["Potential"])}
            {gearData["Set"] && displaySet(gearData["Set"], gearData["Name (English)"])}
        </Flex>
    )
}