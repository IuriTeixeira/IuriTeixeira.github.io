import { Flex, SimpleGrid } from "@mantine/core";
import { useLanguageContext } from "../language-provider";
import dualblades from '../geardata/weapons/weapon-data/dualblades.json'
import units from '../geardata/units/unit-data/units.json'
import displayRarity from "./displayRarity";
import displayStat from "./displayStat";
import displayResistance from "./displayResistance";
import displayPotentials from "./displayPotentials";
import displayElement from "./displayElement";
import displayPA from "./displayPA";
import displaySSA from "./displaySSA";
import displaySet from "./displaySet";


export default function displayGearStats(gear: any): any {
    const language = useLanguageContext()
    let gearData: any = units.find(unit => unit["Name (English)"] === gear)
    if (!gearData) gearData = dualblades.find(unit => unit["Name (English)"] === gear)
    return (
        <Flex justify='center' align='center' direction='column' >
            <Flex justify='center' align='center' gap='xs'>
                {displayRarity(gearData["Rarity"])}
                <strong>
                    {gearData[`Name (${language.language})`]}
                </strong>
            </Flex>
            {gearData["SSA Slots"] && displaySSA(gearData["SSA Slots"])}
            <SimpleGrid cols={3} verticalSpacing='0' spacing='xs'>
                {gearData["S-ATK"] && displayStat('S-ATK', gearData["S-ATK"])}
                {gearData["R-ATK"] && displayStat('R-ATK', gearData["R-ATK"])}
                {gearData["T-ATK"] && displayStat('T-ATK', gearData["T-ATK"])}
                {gearData["DEX"] && displayStat('DEX', gearData["DEX"])}
                {gearData["S-DEF"] && displayStat('S-DEF', gearData["S-DEF"])}
                {gearData["R-DEF"] && displayStat('R-DEF', gearData["R-DEF"])}
                {gearData["T-DEF"] && displayStat('T-DEF', gearData["T-DEF"])}
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
            {gearData["PA_enabled"] && displayPA(gearData["PA_enabled"])}
            {gearData["Potential"] && displayPotentials(gearData["Potential"])}
            {gearData["Set"] && displaySet(gearData["Set"], gearData["Name (English)"])}
        </Flex>
    )
}