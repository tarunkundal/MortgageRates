import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import states from '../helpers/states.json';

interface State {
  name: string;
  abbreviation: string;
}

const SelectStateComponent: React.FC = () => {
  const [selectedState, setSelectedState] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedState(event.target.value);
  };

  return (
    <Select 
      value={selectedState} 
      onChange={handleChange} 
      displayEmpty
    >
      <MenuItem value="">
        <em>Select State</em>
      </MenuItem>
      {states.map((state: State) => (
        <MenuItem key={state.abbreviation} value={state.name}>
          {state.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectStateComponent;
