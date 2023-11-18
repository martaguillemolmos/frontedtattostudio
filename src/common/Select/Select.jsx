import { Select } from '@mantine/core';

export const Selected = (workers) => {
    return (
      <Select
        label=""
        placeholder= ""
        data={[
          { group: "", items: {workers} },
        ]}
      />
    );
  }