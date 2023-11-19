import { Select } from '@mantine/core';

export const Selected = ({data, customOnChange}) => {

  const defaultOnChange = (selected) => {
    console.log('Seleccionado:', selected);
  };
  const onChangeHandler = customOnChange || defaultOnChange;
    return (
      <Select
        data={data}
        onChange={onChangeHandler}
      />
    );
  }