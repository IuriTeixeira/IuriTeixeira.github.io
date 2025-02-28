import { Flex, Table, Button, Checkbox, NumberInput } from "@mantine/core"
import displayAbilities from "./displayAbilities"
import { useLanguageContext } from "../language-provider";
import abilityData from '../geardata/abilities.json'

export default function displayGearAbilities(abilities: any[], conditionals: boolean[][], setConditionals: any, stacks: number[][], setStacks: any): any {
    const language = useLanguageContext()
    let loc: string[]
    let ab: any[] = []
    let abEffectCondCount: number[] = []
    let conds: boolean[][] = []

    for (let i = 0; i < abilities.length; i++) {
        ab.push(abilityData.find(ab => ab['Name (English)'] === abilities[i]))
        if (ab[i]) {
            if (ab[i]["Effect"]) {
                if (ab[i]["Effect"][0].includes("Conditional")) {
                    if (ab[i]["Effect"][0].includes("Stacking")) {
                        if (ab[i]["Name (English)"].includes("S3:Immediate Brilliance")) {
                            abEffectCondCount.push(2)
                        } else {
                            abEffectCondCount.push(1)
                        }
                    } else {
                        abEffectCondCount.push(ab[i]["Effect"].length / 2)
                    }
                } else {
                    abEffectCondCount.push(0)
                }
            } else {
                abEffectCondCount.push(0)
            }
        }
        conds.push([false, false, false])
    }

    function handleNumberInputChange(rowIndex: number, colIndex: number, ex: boolean) {
        if (ex) {
            setStacks(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? !value : value
                    )
                )
            )
            setStacks(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex + 1 ? !value : value
                    )
                )
            )
        } else {
            setStacks(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? !value : value
                    )
                )
            )
        }
    }
    function handleCheckboxChange(rowIndex: number, colIndex: number, ex: boolean) {
        if (ex) {
            setConditionals(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? !value : value
                    )
                )
            )
            setConditionals(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex + 1 ? !value : value
                    )
                )
            )
        } else {
            setConditionals(prevArray =>
                prevArray.map((row, rIndex) =>
                    row.map((value, cIndex) =>
                        rIndex === rowIndex && cIndex === colIndex ? !value : value
                    )
                )
            )
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
            loc = ['Special Abilities', 'Ability Name', 'Active Conditions',]
    }
    return (
        <Table verticalSpacing={2} withColumnBorders>
            <Table.Thead style={{ borderBottom: '1px solid var(--mantine-color-dark-4)'}}>
                <Table.Tr>
                    <Table.Th colSpan={4}>
                        <Flex justify='center' align='center'>{loc[0]}</Flex>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th w='33%'>
                        <Flex justify='center' align='center'>{loc[1]}</Flex>
                    </Table.Th>
                    <Table.Th colSpan={2} w='66%'>
                        <Flex justify='center' align='center'>{loc[2]}</Flex>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                        {ab[0] && displayAbilities([ab[0]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td w='75%'>
                        {abEffectCondCount[0] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    !ab[0]["Effect"][0].includes("Stacking") &&
                                    ab[0]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[0][0]}
                                            onChange={() => handleCheckboxChange((0), (0), false)}
                                        />
                                        {ab[0]["Condition (English)"] && ab[0]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    !ab[0]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[0]["Effect"][2]) === 'string' &&
                                    ab[0]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[0][1]}
                                            onChange={() => handleCheckboxChange((0), (1), false)}
                                        />
                                        {ab[0]["Condition (English)"] && ab[0]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[0] &&
                                    ab[0]["Effect"] &&
                                    ab[0]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[0]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[0][0]}
                                            onChange={() => handleCheckboxChange((0), (0), true)}
                                        />}
                                        {ab[0]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[0][0]}
                                            onChange={() => handleCheckboxChange((0), (0), false)}
                                        />}
                                        {ab[0]["Condition (English)"] && ab[0]["Condition (English)"][0]}
                                        {ab[0]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[0]["Effect"][2] - 1) / (ab[0]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((0), (0), true)}
                                        />}
                                        {ab[0]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[0]["Effect"][2] - 1) / (ab[0]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((0), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[1] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    !ab[1]["Effect"][0].includes("Stacking") &&
                                    ab[1]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[1][0]}
                                            onChange={() => handleCheckboxChange((1), (0), false)}
                                        />
                                        {ab[1]["Condition (English)"] && ab[1]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    !ab[1]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[1]["Effect"][2]) === 'string' &&
                                    ab[1]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[1][1]}
                                            onChange={() => handleCheckboxChange((1), (1), false)}
                                        />
                                        {ab[1]["Condition (English)"] && ab[1]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[1] &&
                                    ab[1]["Effect"] &&
                                    ab[1]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[1]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[1][0]}
                                            onChange={() => handleCheckboxChange((1), (0), true)}
                                        />}
                                        {ab[1]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[1][0]}
                                            onChange={() => handleCheckboxChange((1), (0), false)}
                                        />}
                                        {ab[1]["Condition (English)"] && ab[1]["Condition (English)"][0]}
                                        {ab[1]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[1]["Effect"][2] - 1) / (ab[1]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((1), (0), true)}
                                        />}
                                        {ab[1]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[1]["Effect"][2] - 1) / (ab[1]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((1), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[2] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    !ab[2]["Effect"][0].includes("Stacking") &&
                                    ab[2]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[2][0]}
                                            onChange={() => handleCheckboxChange((2), (0), false)}
                                        />
                                        {ab[2]["Condition (English)"] && ab[2]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    !ab[2]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[2]["Effect"][2]) === 'string' &&
                                    ab[2]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[2][1]}
                                            onChange={() => handleCheckboxChange((2), (1), false)}
                                        />
                                        {ab[2]["Condition (English)"] && ab[2]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[2] &&
                                    ab[2]["Effect"] &&
                                    ab[2]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[2]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[2][0]}
                                            onChange={() => handleCheckboxChange((2), (0), true)}
                                        />}
                                        {ab[2]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[2][0]}
                                            onChange={() => handleCheckboxChange((2), (0), false)}
                                        />}
                                        {ab[2]["Condition (English)"] && ab[2]["Condition (English)"][0]}
                                        {ab[2]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[2]["Effect"][2] - 1) / (ab[2]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((2), (0), true)}
                                        />}
                                        {ab[2]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[2]["Effect"][2] - 1) / (ab[2]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((2), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[3] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    !ab[3]["Effect"][0].includes("Stacking") &&
                                    ab[3]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[3][0]}
                                            onChange={() => handleCheckboxChange((3), (0), false)}
                                        />
                                        {ab[3]["Condition (English)"] && ab[3]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    !ab[3]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[3]["Effect"][2]) === 'string' &&
                                    ab[3]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[3][1]}
                                            onChange={() => handleCheckboxChange((3), (1), false)}
                                        />
                                        {ab[3]["Condition (English)"] && ab[3]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[3] &&
                                    ab[3]["Effect"] &&
                                    ab[3]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[3]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[3][0]}
                                            onChange={() => handleCheckboxChange((3), (0), true)}
                                        />}
                                        {ab[3]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[3][0]}
                                            onChange={() => handleCheckboxChange((3), (0), false)}
                                        />}
                                        {ab[3]["Condition (English)"] && ab[3]["Condition (English)"][0]}
                                        {ab[3]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[3]["Effect"][2] - 1) / (ab[3]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((3), (0), true)}
                                        />}
                                        {ab[3]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[3]["Effect"][2] - 1) / (ab[3]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((3), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[4] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    !ab[4]["Effect"][0].includes("Stacking") &&
                                    ab[4]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[4][0]}
                                            onChange={() => handleCheckboxChange((4), (0), false)}
                                        />
                                        {ab[4]["Condition (English)"] && ab[4]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    !ab[4]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[4]["Effect"][2]) === 'string' &&
                                    ab[4]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[4][1]}
                                            onChange={() => handleCheckboxChange((4), (1), false)}
                                        />
                                        {ab[4]["Condition (English)"] && ab[4]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[4] &&
                                    ab[4]["Effect"] &&
                                    ab[4]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[4]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[4][0]}
                                            onChange={() => handleCheckboxChange((4), (0), true)}
                                        />}
                                        {ab[4]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[4][0]}
                                            onChange={() => handleCheckboxChange((4), (0), false)}
                                        />}
                                        {ab[4]["Condition (English)"] && ab[4]["Condition (English)"][0]}
                                        {ab[4]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[4]["Effect"][2] - 1) / (ab[4]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((4), (0), true)}
                                        />}
                                        {ab[4]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[4]["Effect"][2] - 1) / (ab[4]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((4), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[5] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    !ab[5]["Effect"][0].includes("Stacking") &&
                                    ab[5]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[5][0]}
                                            onChange={() => handleCheckboxChange((5), (0), false)}
                                        />
                                        {ab[5]["Condition (English)"] && ab[5]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    !ab[5]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[5]["Effect"][2]) === 'string' &&
                                    ab[5]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[5][1]}
                                            onChange={() => handleCheckboxChange((5), (1), false)}
                                        />
                                        {ab[5]["Condition (English)"] && ab[5]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[5] &&
                                    ab[5]["Effect"] &&
                                    ab[5]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[5]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[5][0]}
                                            onChange={() => handleCheckboxChange((5), (0), true)}
                                        />}
                                        {ab[5]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[5][0]}
                                            onChange={() => handleCheckboxChange((5), (0), false)}
                                        />}
                                        {ab[5]["Condition (English)"] && ab[5]["Condition (English)"][0]}
                                        {ab[5]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[5]["Effect"][2] - 1) / (ab[5]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((5), (0), true)}
                                        />}
                                        {ab[5]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[5]["Effect"][2] - 1) / (ab[5]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((5), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[6] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    !ab[6]["Effect"][0].includes("Stacking") &&
                                    ab[6]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[6][0]}
                                            onChange={() => handleCheckboxChange((6), (0), false)}
                                        />
                                        {ab[6]["Condition (English)"] && ab[6]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    !ab[6]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[6]["Effect"][2]) === 'string' &&
                                    ab[6]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[6][1]}
                                            onChange={() => handleCheckboxChange((6), (1), false)}
                                        />
                                        {ab[6]["Condition (English)"] && ab[6]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[6] &&
                                    ab[6]["Effect"] &&
                                    ab[6]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[6]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[6][0]}
                                            onChange={() => handleCheckboxChange((6), (0), true)}
                                        />}
                                        {ab[6]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[6][0]}
                                            onChange={() => handleCheckboxChange((6), (0), false)}
                                        />}
                                        {ab[6]["Condition (English)"] && ab[6]["Condition (English)"][0]}
                                        {ab[6]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[6]["Effect"][2] - 1) / (ab[6]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((6), (0), true)}
                                        />}
                                        {ab[6]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[6]["Effect"][2] - 1) / (ab[6]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((6), (0), false)}
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
                    <Table.Td w='75%'>
                        {abEffectCondCount[7] > 0 &&
                            <Flex justify='center' align='flex-start' direction='column'>
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    !ab[7]["Effect"][0].includes("Stacking") &&
                                    ab[7]["Effect"][0].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[7][0]}
                                            onChange={() => handleCheckboxChange((7), (0), false)}
                                        />
                                        {ab[7]["Condition (English)"] && ab[7]["Condition (English)"][0]}
                                    </Flex>
                                }
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    !ab[7]["Effect"][0].includes("Stacking") &&
                                    typeof (ab[7]["Effect"][2]) === 'string' &&
                                    ab[7]["Effect"][2].includes("Conditional") &&
                                    <Flex justify='center' align='flex-start' direction='row' gap={5}>
                                        <Checkbox
                                            checked={conditionals[7][1]}
                                            onChange={() => handleCheckboxChange((7), (1), false)}
                                        />
                                        {ab[7]["Condition (English)"] && ab[7]["Condition (English)"][1]}
                                    </Flex>
                                }
                                {
                                    ab[7] &&
                                    ab[7]["Effect"] &&
                                    ab[7]["Effect"][0].includes("Stacking") &&
                                    <Flex justify='center' align='center' direction='row' gap={5}>
                                        {ab[7]["Name (English)"] === 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[7][0]}
                                            onChange={() => handleCheckboxChange((7), (0), true)}
                                        />}
                                        {ab[7]["Name (English)"] !== 'S3:Immediate Brilliance' && <Checkbox
                                            checked={conditionals[7][0]}
                                            onChange={() => handleCheckboxChange((7), (0), false)}
                                        />}
                                        {ab[7]["Condition (English)"] && ab[7]["Condition (English)"][0]}
                                        {ab[7]["Name (English)"] === 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[7]["Effect"][2] - 1) / (ab[7]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((7), (0), true)}
                                        />}
                                        {ab[7]["Name (English)"] !== 'S3:Immediate Brilliance' && <NumberInput
                                            size='xs'
                                            w={70}
                                            startValue={0}
                                            allowDecimal={false}
                                            min={0}
                                            max={Number(((ab[7]["Effect"][2] - 1) / (ab[7]["Effect"][1] - 1)).toFixed(2))}
                                            onChange={() => handleNumberInputChange((7), (0), false)}
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