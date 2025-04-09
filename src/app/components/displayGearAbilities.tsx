import { Flex, Table, Button, Checkbox, NumberInput } from "@mantine/core"
import displayAbilities from "./displayAbilities"
import abilityData from '../geardata/abilities.json'
import { useEffect } from "react";
import { useLanguageContext } from "../language-provider";

export default function displayGearAbilities(abilities: any[], conditionals: boolean[], setConditionals: any, stacks: number[], setStacks: any, weaponAbilities: string[], weaponAbilitiesConditionals: boolean[]): any {
    const language = useLanguageContext()
    let loc: string[]
    let ab: any[] = []
    let abEffectCondCount: boolean[] = [false, false, false, false, false, false, false, false]

    useEffect(() => {
        if (weaponAbilities[0] === 'S1:Red Petal Flash' ||
            weaponAbilities[0] === 'S1:Blue Ocean Flash' ||
            weaponAbilities[0] === 'S1:White Snow Flash' ||
            weaponAbilities[0] === 'S1:Yellow Moon Flash' ||
            weaponAbilities[0] === 'S1:Green Leaf Flash' ||
            weaponAbilities[0] === 'S1:Black Shadow Flash') {
            for (let i = 0; i < abilities.length; i++) {
                if (ab[i]["Condition (English)"] && ab[i]["Condition (English)"].length > 1) {
                    if (ab[i]["Condition (English)"][1].includes('Rainbow') ||
                        ab[i]["Condition (English)"][1].includes('Nature') ||
                        ab[i]["Condition (English)"][1].includes('Umbrageous')) {
                        switch (ab[i]["Condition (English)"][1]) {
                            case 'Nature':
                                if (weaponAbilities[0] === 'S1:Red Petal Flash' ||
                                    weaponAbilities[0] === 'S1:Blue Ocean Flash' ||
                                    weaponAbilities[0] === 'S1:White Snow Flash') {
                                    handleRainbowCheckboxChange(i)
                                }
                                break
                            case 'Umbrageous':
                                if (weaponAbilities[0] === 'S1:Yellow Moon Flash' ||
                                    weaponAbilities[0] === 'S1:Green Leaf Flash' ||
                                    weaponAbilities[0] === 'S1:Black Shadow Flash') {
                                    handleRainbowCheckboxChange(i)
                                }
                                break
                            case 'Rainbow':
                                handleRainbowCheckboxChange(i)
                                break
                        }
                    }
                }
            }
        }
    }, [weaponAbilities[0], weaponAbilitiesConditionals[0]]);

    for (let i = 0; i < abilities.length; i++) {
        ab.push(abilityData.find(ab => ab['Name (English)'] === abilities[i]))
        if (ab[i]) {
            if (ab[i]["Effect"]) {
                for (let j = 0; j < ab[i]["Effect"].length; j++) {
                    if (typeof (ab[i]["Effect"][j]) === 'string') {
                        if (ab[i]["Effect"][j].includes("Conditional")) {
                            abEffectCondCount[i] = true
                        }
                    }
                }
            }
        }
    }

    function handleNumberInputChange(index: number) {
        //TODO
    }

    function handleVigorousResponseInputChange(index: number){
        //TODO
    }

    function handleCheckboxChange(index: number) {
        setConditionals(prevArray =>
            prevArray.map((value, cIndex) =>
                cIndex === index ? !value : value
            )
        )
    }

    function handleRainbowCheckboxChange(index: number) {
        setConditionals(prevArray =>
            prevArray.map((value, cIndex) =>
                cIndex === index ? weaponAbilitiesConditionals[0] : value
            )
        )
    }

    let uniqueCondition: any[] = [null, null, null, null, null, null, null, null]
    let conditionText: string[] = [null, null, null, null, null, null, null, null]
    let checkRainbow: boolean = false
    for (let i = 0; i < abilities.length; i++) {
        if (ab[i]["Condition (English)"]) {
            if (ab[i]["Condition (English)"][0] === 'Unique') {
                switch (ab[i]["Condition (English)"][1]) {
                    case 'Nature':
                        switch (language.language) {
                            case 'Global':
                                conditionText[i] = 'Petalgleam, Seagleam, or Snowgleam is active.'
                                break
                            case 'JP':
                                conditionText[i] = '花ノ赤閃・海ノ青閃・雪ノ白閃が発動中'
                                break
                            default:
                                conditionText[i] = 'S1:Red Petal Flash, S1:Blue Ocean Flash, or S1:White Snow Flash is active.'
                        }
                        if (weaponAbilities[0] === 'S1:Red Petal Flash' ||
                            weaponAbilities[0] === 'S1:Blue Ocean Flash' ||
                            weaponAbilities[0] === 'S1:White Snow Flash') {
                            checkRainbow = weaponAbilitiesConditionals[0]
                        } else {
                            checkRainbow = false
                        }
                        uniqueCondition[i] =
                            <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                <Checkbox
                                    disabled
                                    checked={checkRainbow}
                                    onChange={() => handleRainbowCheckboxChange(i)}
                                />
                                {conditionText[i]}
                            </Flex>
                        break;
                    case 'Umbrageous':
                        switch (language.language) {
                            case 'Global':
                                conditionText[i] = 'Moongleam, Leafgleam, or Shadowgleam is active.'
                                break
                            case 'JP':
                                conditionText[i] = '月ノ黄閃・葉ノ緑閃・影ノ黒閃が発動中'
                                break
                            default:
                                conditionText[i] = 'S1:Yellow Moon Flash, S1:Green Leaf Flash, or S1:Black Shadow Flash is active.'
                        }
                        if (weaponAbilities[0] === 'S1:Yellow Moon Flash' ||
                            weaponAbilities[0] === 'S1:Green Leaf Flash' ||
                            weaponAbilities[0] === 'S1:Black Shadow Flash') {
                            checkRainbow = conditionals[0]
                        } else {
                            checkRainbow = false
                        }
                        uniqueCondition[i] =
                            <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                <Checkbox
                                    disabled
                                    checked={checkRainbow}
                                    onChange={() => handleRainbowCheckboxChange(i)}
                                />
                                {conditionText[i]}
                            </Flex>
                        break;
                    case 'Rainbow':
                        switch (language.language) {
                            case 'Global':
                                conditionText[i] = 'Petalgleam, Seagleam, Snowgleam, Moongleam, Leafgleam, or Shadowgleam is active.'
                                break
                            case 'JP':
                                conditionText[i] = '花・海・葉・月・雪・影のいずれかが発動中与ダ'
                                break
                            default:
                                conditionText[i] = 'S1:Red Petal Flash, S1:Blue Ocean Flash, S1:White Snow Flash, S1:Yellow Moon Flash, S1:Green Leaf Flash, or S1:Black Shadow Flash is active.'
                        }
                        if (weaponAbilities[0] === 'S1:Red Petal Flash' ||
                            weaponAbilities[0] === 'S1:Blue Ocean Flash' ||
                            weaponAbilities[0] === 'S1:White Snow Flash' ||
                            weaponAbilities[0] === 'S1:Yellow Moon Flash' ||
                            weaponAbilities[0] === 'S1:Green Leaf Flash' ||
                            weaponAbilities[0] === 'S1:Black Shadow Flash') {
                            checkRainbow = conditionals[0]
                        } else {
                            checkRainbow = false
                        }
                        uniqueCondition[i] =
                            <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                <Checkbox
                                    disabled
                                    checked={checkRainbow}
                                    onChange={() => handleRainbowCheckboxChange(i)}
                                />
                                {conditionText[i]}
                            </Flex>
                        break;
                }
            }
        }
    }

    switch (language.language) {
        case 'Global':
            loc = ['Augments', 'Augment Name', 'Active Conditions']
            break
        case 'JP':
            loc = ['特殊能力追加', 'Ability Name', 'Active Conditions']
            break
        default:
            loc = ['Special Abilities', 'Ability Name', 'Active Conditions']
    }
    return (
        <Table verticalSpacing={2} withColumnBorders>
            <Table.Thead style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                <Table.Tr>
                    <Table.Th colSpan={2}>
                        <Flex justify='center' align='center'>{loc[0]}</Flex>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w='30%'>
                        <Flex justify='center' align='center'>{loc[1]}</Flex>
                    </Table.Th>
                    <Table.Th w='70%'>
                        <Flex justify='center' align='center'>{loc[2]}</Flex>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                        {ab[0] && displayAbilities([ab[0]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[0] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    ab[0]["Effect"][0].includes("Conditional") &&
                                    ab[0]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[0]}
                                            onChange={() => handleCheckboxChange(0)}
                                        />
                                        {ab[0]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    ab[0]["Effect"][0].includes("Conditional") &&
                                    ab[0]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[0]
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    typeof (ab[0]["Effect"][2]) === 'string' &&
                                    ab[0]["Effect"][2].includes("Conditional") &&
                                    ab[0]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[0]}
                                            onChange={() => handleCheckboxChange(0)}
                                        />
                                        {ab[0]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    ab[0]["Effect"][0].includes("Unique") &&
                                    ab[0]["Effect"][1].includes("Vigorous Response") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {<Checkbox
                                            checked={conditionals[0]}
                                            onChange={() => handleCheckboxChange(0)}
                                        />}
                                        {ab[0]["Condition (English)"][0] !== 'Unique' && ab[0]["Condition (English)"]}
                                        {<NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={1}
                                            allowDecimal={false}
                                            min={1}
                                            max={100}
                                            onChange={() => handleVigorousResponseInputChange(0)}
                                        />}
                                    </Flex>
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    ab[0]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {<Checkbox
                                            checked={conditionals[0]}
                                            onChange={() => handleCheckboxChange(0)}
                                        />}
                                        {ab[0]["Condition (English)"][0] !== 'Unique' && ab[0]["Condition (English)"]}
                                        {<NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[0]["Effect"][2] - 1) / (ab[0]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(0)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[1] && displayAbilities([ab[1]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[1] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    ab[1]["Effect"][0].includes("Conditional") &&
                                    ab[1]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[1]}
                                            onChange={() => handleCheckboxChange(1)}
                                        />
                                        {ab[1]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    ab[1]["Effect"][0].includes("Conditional") &&
                                    ab[1]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[1]
                                }
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    typeof (ab[1]["Effect"][2]) === 'string' &&
                                    ab[1]["Effect"][2].includes("Conditional") &&
                                    ab[1]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[1]}
                                            onChange={() => handleCheckboxChange(1)}
                                        />
                                        {ab[1]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    ab[1]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {<Checkbox
                                            checked={conditionals[1]}
                                            onChange={() => handleCheckboxChange(1)}
                                        />}
                                        {ab[1]["Condition (English)"][0] !== 'Unique' && ab[1]["Condition (English)"]}
                                        {ab[1]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[1]["Effect"][2] - 1) / (ab[1]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(1)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[2] && displayAbilities([ab[2]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[2] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    ab[2]["Effect"][0].includes("Conditional") &&
                                    ab[2]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[2]}
                                            onChange={() => handleCheckboxChange(2)}
                                        />
                                        {ab[2]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    ab[2]["Effect"][0].includes("Conditional") &&
                                    ab[2]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[2]
                                }
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    typeof (ab[2]["Effect"][2]) === 'string' &&
                                    ab[2]["Effect"][2].includes("Conditional") &&
                                    ab[2]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[2]}
                                            onChange={() => handleCheckboxChange(2)}
                                        />
                                        {ab[2]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    ab[2]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {<Checkbox
                                            checked={conditionals[2]}
                                            onChange={() => handleCheckboxChange(2)}
                                        />}
                                        {ab[2]["Condition (English)"][0] !== 'Unique' && ab[2]["Condition (English)"]}
                                        {<NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[2]["Effect"][2] - 1) / (ab[2]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(2)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[3] && displayAbilities([ab[3]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[3] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    ab[3]["Effect"][0].includes("Conditional") &&
                                    ab[3]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[3]}
                                            onChange={() => handleCheckboxChange(3)}
                                        />
                                        {ab[3]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    ab[3]["Effect"][0].includes("Conditional") &&
                                    ab[3]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[3]
                                }
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    typeof (ab[3]["Effect"][2]) === 'string' &&
                                    ab[3]["Effect"][2].includes("Conditional") &&
                                    ab[3]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[3]}
                                            onChange={() => handleCheckboxChange(3)}
                                        />
                                        {ab[3]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    ab[3]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[3]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[3]}
                                            onChange={() => handleCheckboxChange(3)}
                                        />}
                                        {ab[3]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[3]}
                                            onChange={() => handleCheckboxChange(3)}
                                        />}
                                        {ab[3]["Condition (English)"][0] !== 'Unique' && ab[3]["Condition (English)"]}
                                        {ab[3]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[3]["Effect"][2] - 1) / (ab[3]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(3)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[4] && displayAbilities([ab[4]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[4] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    ab[4]["Effect"][0].includes("Conditional") &&
                                    ab[4]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[4]}
                                            onChange={() => handleCheckboxChange(4)}
                                        />
                                        {ab[4]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    ab[4]["Effect"][0].includes("Conditional") &&
                                    ab[4]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[4]
                                }
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    typeof (ab[4]["Effect"][2]) === 'string' &&
                                    ab[4]["Effect"][2].includes("Conditional") &&
                                    ab[4]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[4]}
                                            onChange={() => handleCheckboxChange(4)}
                                        />
                                        {ab[4]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    ab[4]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[4]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[4]}
                                            onChange={() => handleCheckboxChange(4)}
                                        />}
                                        {ab[4]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[4]}
                                            onChange={() => handleCheckboxChange(4)}
                                        />}
                                        {ab[4]["Condition (English)"][0] !== 'Unique' && ab[4]["Condition (English)"]}
                                        {ab[4]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[4]["Effect"][2] - 1) / (ab[4]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(4)}
                                        />}
                                    </Flex>
                                }

                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[5] && displayAbilities([ab[5]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[5] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    ab[5]["Effect"][0].includes("Conditional") &&
                                    ab[5]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[5]}
                                            onChange={() => handleCheckboxChange(5)}
                                        />
                                        {ab[5]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    ab[5]["Effect"][0].includes("Conditional") &&
                                    ab[5]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[5]
                                }
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    typeof (ab[5]["Effect"][2]) === 'string' &&
                                    ab[5]["Effect"][2].includes("Conditional") &&
                                    ab[5]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[5]}
                                            onChange={() => handleCheckboxChange(5)}
                                        />
                                        {ab[5]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    ab[5]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[5]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[5]}
                                            onChange={() => handleCheckboxChange(5)}
                                        />}
                                        {ab[5]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[5]}
                                            onChange={() => handleCheckboxChange(5)}
                                        />}
                                        {ab[5]["Condition (English)"][0] !== 'Unique' && ab[5]["Condition (English)"]}
                                        {ab[5]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[5]["Effect"][2] - 1) / (ab[5]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(5)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[6] && displayAbilities([ab[6]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[6] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    ab[6]["Effect"][0].includes("Conditional") &&
                                    ab[6]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[6]}
                                            onChange={() => handleCheckboxChange(6)}
                                        />
                                        {ab[6]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    ab[6]["Effect"][0].includes("Conditional") &&
                                    ab[6]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[6]
                                }
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    typeof (ab[6]["Effect"][2]) === 'string' &&
                                    ab[6]["Effect"][2].includes("Conditional") &&
                                    ab[6]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[6]}
                                            onChange={() => handleCheckboxChange(6)}
                                        />
                                        {ab[6]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    ab[6]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[6]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[6]}
                                            onChange={() => handleCheckboxChange(6)}
                                        />}
                                        {ab[6]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[6]}
                                            onChange={() => handleCheckboxChange(6)}
                                        />}
                                        {ab[6]["Condition (English)"][0] !== 'Unique' && ab[6]["Condition (English)"]}
                                        {ab[6]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[6]["Effect"][2] - 1) / (ab[6]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(6)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[7] && displayAbilities([ab[7]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='70%'>
                        {abEffectCondCount[7] &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    ab[7]["Effect"][0].includes("Conditional") &&
                                    ab[7]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[7]}
                                            onChange={() => handleCheckboxChange(7)}
                                        />
                                        {ab[7]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    ab[7]["Effect"][0].includes("Conditional") &&
                                    ab[7]["Condition (English)"][0] === 'Unique' &&
                                    uniqueCondition[7]
                                }
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    typeof (ab[7]["Effect"][2]) === 'string' &&
                                    ab[7]["Effect"][2].includes("Conditional") &&
                                    ab[7]["Condition (English)"][0] !== 'Unique' &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[7]}
                                            onChange={() => handleCheckboxChange(7)}
                                        />
                                        {ab[7]["Condition (English)"]}
                                    </Flex>
                                }
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    ab[7]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[7]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[7]}
                                            onChange={() => handleCheckboxChange(7)}
                                        />}
                                        {ab[7]["Condition (English)"][0] !== 'Unique' && ab[7]["Condition (English)"]}
                                        {ab[7]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[7]["Effect"][2] - 1) / (ab[7]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange(7)}
                                        />}
                                    </Flex>
                                }
                            </Flex>}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}