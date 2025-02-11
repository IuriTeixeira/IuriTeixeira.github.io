import { Flex, Table, Button } from "@mantine/core"
import displayAbilities from "./displayAbilities"

export default function displayGearAbilities(abilities: any[]): any {
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th colSpan={2}>
                        <Flex justify='center' align='center'>Special Abilities</Flex>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Td>
                        {abilities[0] && displayAbilities([abilities[0]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[1] && displayAbilities([abilities[1]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[2] && displayAbilities([abilities[2]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[3] && displayAbilities([abilities[3]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[4] && displayAbilities([abilities[4]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[5] && displayAbilities([abilities[5]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[6] && displayAbilities([abilities[6]])}
                    </Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Td>
                        {abilities[7] && displayAbilities([abilities[7]])}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    )
}