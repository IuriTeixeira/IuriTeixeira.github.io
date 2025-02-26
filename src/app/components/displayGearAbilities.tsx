import { Flex, Table, Button, Checkbox, NumberInput } from "@mantine/core"
import displayAbilities from "./displayAbilities"
import { useLanguageContext } from "../language-provider";
import abilityData from '../geardata/abilities.json'

export default function displayGearAbilities(abilities: any[], conditionals: boolean[][], setConditionals: any, stacks: number[][], setStacks: any): any {
    const language = useLanguageContext()
    let loc: string[]
    let ab: any[] = []
    let conds: boolean[][] = []

    for (let i = 0; i < abilities.length; i++) {
        ab.push(abilityData.find(ab => ab['Name (English)'] === abilities[i]))
        conds.push([false, false, false])
    }

    function handleCheckboxChange(rowIndex, colIndex) {
        setConditionals(prevArray =>
            prevArray.map((row, rIndex) =>
                row.map((value, cIndex) =>
                    rIndex === rowIndex && cIndex === colIndex ? !value : value
                )
            )
        )
    }

    switch (language.language) {
        case 'Global':
            loc = ['Augments', 'Name', 'Active Conditions']
            break
        case 'JP':
            loc = ['特殊能力追加', 'Name', 'Active Conditions']
            break
        default:
            loc = ['Special Abilities', 'Name', 'Active Conditions']
    }
    return (
        <Table verticalSpacing={2}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={4}>
                        <Flex justify='center' align='center'>{loc[0]}</Flex>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Flex justify='center' align='center'>{loc[1]}</Flex>
                    </Table.Th>
                    <Table.Th colSpan={3}>
                        <Flex justify='center' align='center'>{loc[2]}</Flex>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                        {ab[0] && displayAbilities([ab[0]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[0] &&
                            ab[0]["Effect"] &&
                            !ab[0]["Effect"][0].includes("Stacking") &&
                            ab[0]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[0][0]}
                                onChange={() => handleCheckboxChange(0, 0)}
                            />
                        }
                        {
                            ab[0] &&
                            ab[0]["Effect"] &&
                            ab[0]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[0][0]}
                                    onChange={() => handleCheckboxChange(0, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    value={stacks[0][0]}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[0]["Effect"][2] - 1) / (ab[0]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[0] &&
                            ab[0]["Effect"] &&
                            !ab[0]["Effect"][0].includes("Stacking") &&
                            typeof (ab[0]["Effect"][2]) === 'string' &&
                            ab[0]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[0][1]}
                                onChange={() => handleCheckboxChange(0, 1)}
                            />
                        }
                        {
                            ab[0] &&
                            ab[0]["Effect"] &&
                            ab[0]["Effect"][0].includes("Stacking") &&
                            typeof (ab[0]["Effect"][3]) === 'string' &&
                            ab[0]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[0][1]}
                                    onChange={() => handleCheckboxChange(0, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[0]["Effect"][5] - 1) / (ab[0]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[0] &&
                            ab[0]["Effect"] &&
                            typeof (ab[0]["Effect"][4]) === 'string' &&
                            ab[0]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[0][2]}
                                onChange={() => handleCheckboxChange(0, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[1] && displayAbilities([ab[1]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[1] &&
                            ab[1]["Effect"] &&
                            !ab[1]["Effect"][0].includes("Stacking") &&
                            ab[1]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[1][0]}
                                onChange={() => handleCheckboxChange(1, 0)}
                            />
                        }
                        {
                            ab[1] &&
                            ab[1]["Effect"] &&
                            ab[1]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[1][0]}
                                    onChange={() => handleCheckboxChange(1, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[1]["Effect"][2] - 1) / (ab[1]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[1] &&
                            ab[1]["Effect"] &&
                            !ab[1]["Effect"][0].includes("Stacking") &&
                            typeof (ab[1]["Effect"][2]) === 'string' &&
                            ab[1]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[1][1]}
                                onChange={() => handleCheckboxChange(1, 1)}
                            />
                        }
                        {
                            ab[1] &&
                            ab[1]["Effect"] &&
                            ab[1]["Effect"][0].includes("Stacking") &&
                            typeof (ab[1]["Effect"][3]) === 'string' &&
                            ab[1]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[1][1]}
                                    onChange={() => handleCheckboxChange(1, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[1]["Effect"][5] - 1) / (ab[1]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[1] &&
                            ab[1]["Effect"] &&
                            typeof (ab[1]["Effect"][4]) === 'string' &&
                            ab[1]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[1][2]}
                                onChange={() => handleCheckboxChange(1, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[2] && displayAbilities([ab[2]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[2] &&
                            ab[2]["Effect"] &&
                            !ab[2]["Effect"][0].includes("Stacking") &&
                            ab[2]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[2][0]}
                                onChange={() => handleCheckboxChange(2, 0)}
                            />
                        }
                        {
                            ab[2] &&
                            ab[2]["Effect"] &&
                            ab[2]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[2][0]}
                                    onChange={() => handleCheckboxChange(2, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[2]["Effect"][2] - 1) / (ab[2]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[2] &&
                            ab[2]["Effect"] &&
                            !ab[2]["Effect"][0].includes("Stacking") &&
                            typeof (ab[2]["Effect"][2]) === 'string' &&
                            ab[2]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[2][1]}
                                onChange={() => handleCheckboxChange(2, 1)}
                            />
                        }
                        {
                            ab[2] &&
                            ab[2]["Effect"] &&
                            ab[2]["Effect"][0].includes("Stacking") &&
                            typeof (ab[2]["Effect"][3]) === 'string' &&
                            ab[2]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[2][1]}
                                    onChange={() => handleCheckboxChange(2, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[2]["Effect"][5] - 1) / (ab[2]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[2] &&
                            ab[2]["Effect"] &&
                            typeof (ab[2]["Effect"][4]) === 'string' &&
                            ab[2]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[2][2]}
                                onChange={() => handleCheckboxChange(2, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[3] && displayAbilities([ab[3]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[3] &&
                            ab[3]["Effect"] &&
                            !ab[3]["Effect"][0].includes("Stacking") &&
                            ab[3]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[3][0]}
                                onChange={() => handleCheckboxChange(3, 0)}
                            />
                        }
                        {
                            ab[3] &&
                            ab[3]["Effect"] &&
                            ab[3]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[3][0]}
                                    onChange={() => handleCheckboxChange(3, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[3]["Effect"][2] - 1) / (ab[3]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[3] &&
                            ab[3]["Effect"] &&
                            !ab[3]["Effect"][0].includes("Stacking") &&
                            typeof (ab[3]["Effect"][2]) === 'string' &&
                            ab[3]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[3][1]}
                                onChange={() => handleCheckboxChange(3, 1)}
                            />
                        }
                        {
                            ab[3] &&
                            ab[3]["Effect"] &&
                            ab[3]["Effect"][0].includes("Stacking") &&
                            typeof (ab[3]["Effect"][3]) === 'string' &&
                            ab[3]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[3][1]}
                                    onChange={() => handleCheckboxChange(3, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[3]["Effect"][5] - 1) / (ab[3]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[3] &&
                            ab[3]["Effect"] &&
                            typeof (ab[3]["Effect"][4]) === 'string' &&
                            ab[3]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[3][2]}
                                onChange={() => handleCheckboxChange(3, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[4] && displayAbilities([ab[4]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[4] &&
                            ab[4]["Effect"] &&
                            !ab[4]["Effect"][0].includes("Stacking") &&
                            ab[4]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[4][0]}
                                onChange={() => handleCheckboxChange(4, 0)}
                            />
                        }
                        {
                            ab[4] &&
                            ab[4]["Effect"] &&
                            ab[4]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[4][0]}
                                    onChange={() => handleCheckboxChange(4, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[4]["Effect"][2] - 1) / (ab[4]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[4] &&
                            ab[4]["Effect"] &&
                            !ab[4]["Effect"][0].includes("Stacking") &&
                            typeof (ab[4]["Effect"][2]) === 'string' &&
                            ab[4]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[4][1]}
                                onChange={() => handleCheckboxChange(4, 1)}
                            />
                        }
                        {
                            ab[4] &&
                            ab[4]["Effect"] &&
                            ab[4]["Effect"][0].includes("Stacking") &&
                            typeof (ab[4]["Effect"][3]) === 'string' &&
                            ab[4]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[4][1]}
                                    onChange={() => handleCheckboxChange(4, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[4]["Effect"][5] - 1) / (ab[4]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[4] &&
                            ab[4]["Effect"] &&
                            typeof (ab[4]["Effect"][4]) === 'string' &&
                            ab[4]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[4][2]}
                                onChange={() => handleCheckboxChange(4, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[5] && displayAbilities([ab[5]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[5] &&
                            ab[5]["Effect"] &&
                            !ab[5]["Effect"][0].includes("Stacking") &&
                            ab[5]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[5][0]}
                                onChange={() => handleCheckboxChange(5, 0)}
                            />
                        }
                        {
                            ab[5] &&
                            ab[5]["Effect"] &&
                            ab[5]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[5][0]}
                                    onChange={() => handleCheckboxChange(5, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[5]["Effect"][2] - 1) / (ab[5]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[5] &&
                            ab[5]["Effect"] &&
                            !ab[5]["Effect"][0].includes("Stacking") &&
                            typeof (ab[5]["Effect"][2]) === 'string' &&
                            ab[5]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[5][1]}
                                onChange={() => handleCheckboxChange(5, 1)}
                            />
                        }
                        {
                            ab[5] &&
                            ab[5]["Effect"] &&
                            ab[5]["Effect"][0].includes("Stacking") &&
                            typeof (ab[5]["Effect"][3]) === 'string' &&
                            ab[5]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[5][1]}
                                    onChange={() => handleCheckboxChange(5, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[5]["Effect"][5] - 1) / (ab[5]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[5] &&
                            ab[5]["Effect"] &&
                            typeof (ab[5]["Effect"][4]) === 'string' &&
                            ab[5]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[5][2]}
                                onChange={() => handleCheckboxChange(5, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[6] && displayAbilities([ab[6]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[6] &&
                            ab[6]["Effect"] &&
                            !ab[6]["Effect"][0].includes("Stacking") &&
                            ab[6]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[6][0]}
                                onChange={() => handleCheckboxChange(6, 0)}
                            />
                        }
                        {
                            ab[6] &&
                            ab[6]["Effect"] &&
                            ab[6]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[6][0]}
                                    onChange={() => handleCheckboxChange(6, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[6]["Effect"][2] - 1) / (ab[6]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[6] &&
                            ab[6]["Effect"] &&
                            !ab[6]["Effect"][0].includes("Stacking") &&
                            typeof (ab[6]["Effect"][2]) === 'string' &&
                            ab[6]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[6][1]}
                                onChange={() => handleCheckboxChange(6, 1)}
                            />
                        }
                        {
                            ab[6] &&
                            ab[6]["Effect"] &&
                            ab[6]["Effect"][0].includes("Stacking") &&
                            typeof (ab[6]["Effect"][3]) === 'string' &&
                            ab[6]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[6][1]}
                                    onChange={() => handleCheckboxChange(6, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[6]["Effect"][5] - 1) / (ab[6]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[6] &&
                            ab[6]["Effect"] &&
                            typeof (ab[6]["Effect"][4]) === 'string' &&
                            ab[6]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[6][2]}
                                onChange={() => handleCheckboxChange(6, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {ab[7] && displayAbilities([ab[7]["Name (English)"]])}
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[7] &&
                            ab[7]["Effect"] &&
                            !ab[7]["Effect"][0].includes("Stacking") &&
                            ab[7]["Effect"][0].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[7][0]}
                                onChange={() => handleCheckboxChange(7, 0)}
                            />
                        }
                        {
                            ab[7] &&
                            ab[7]["Effect"] &&
                            ab[7]["Effect"][0].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[7][0]}
                                    onChange={() => handleCheckboxChange(7, 0)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[7]["Effect"][2] - 1) / (ab[7]["Effect"][1] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[7] &&
                            ab[7]["Effect"] &&
                            !ab[7]["Effect"][0].includes("Stacking") &&
                            typeof (ab[7]["Effect"][2]) === 'string' &&
                            ab[7]["Effect"][2].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[7][1]}
                                onChange={() => handleCheckboxChange(7, 1)}
                            />
                        }
                        {
                            ab[7] &&
                            ab[7]["Effect"] &&
                            ab[7]["Effect"][0].includes("Stacking") &&
                            typeof (ab[7]["Effect"][3]) === 'string' &&
                            ab[7]["Effect"][3].includes("Stacking") &&
                            <>
                                <Checkbox
                                    checked={conditionals[7][1]}
                                    onChange={() => handleCheckboxChange(7, 1)}
                                />
                                <NumberInput
                                    label="Stack count"
                                    startValue={0}
                                    allowDecimal={false}
                                    min={0}
                                    max={Number(((ab[7]["Effect"][5] - 1) / (ab[7]["Effect"][4] - 1)).toFixed(2))}
                                />
                            </>
                        }
                    </Table.Td>
                    <Table.Td>
                        {
                            ab[7] &&
                            ab[7]["Effect"] &&
                            typeof (ab[7]["Effect"][4]) === 'string' &&
                            ab[7]["Effect"][4].includes("Conditional") &&
                            <Checkbox
                                checked={conditionals[7][2]}
                                onChange={() => handleCheckboxChange(7, 2)}
                            />
                        }
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}