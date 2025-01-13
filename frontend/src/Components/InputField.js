import React from 'react';
import { TextField } from '@mui/material';

const CustomInput = ({ label, value, onChange, required = false, type = 'text', ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      fullWidth
      variant="outlined"
      sx={{
        marginBottom: '16px',
        ...props.sx,
      }}
      {...props} // Spread any additional props like styles
    />
  );
};

export default CustomInput;
