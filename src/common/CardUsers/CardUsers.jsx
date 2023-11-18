import { Avatar, Badge, Table, Group, Text, Select } from '@mantine/core';

export const  UsersRolesTable = (data) => {
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={ "../../img/user.jpg" } radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}{item.surname}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.phone}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Select
          data={item.role}
          defaultValue={item.role}
          variant="unstyled"
          allowDeselect={false}
        />
      </Table.Td>
      <Table.Td>
        {item.is_active ? (
          <Badge fullWidth variant="light">
            Active
          </Badge>
        ) : (
          <Badge color="gray" fullWidth variant="light">
            Disabled
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Last active</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}