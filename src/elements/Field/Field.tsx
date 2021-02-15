import React, { createElement } from 'react'
import { Grid, TextField } from '@material-ui/core'
import {
  AccountBox,
  Email,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'

const icons = {
  username: AccountBox,
  email: Email,
  password: VisibilityOff,
  text: Visibility,
}

type GridItemProps = {
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
}

interface Props {
  GridItemProps?: GridItemProps
  label?: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  value: string
}

const Field: React.FC<Props> = ({
  GridItemProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  label,
  name,
  onChange,
  type = 'text',
  value,
}) => {
  return (
    <Grid item {...GridItemProps}>
      <TextField
        label={label || name}
        name={name}
        onChange={onChange}
        value={value}
        InputProps={{
          //@ts-ignore
          endAdornment: createElement(icons[name]),
        }}
        type={type}
        variant="outlined"
        fullWidth
      />
    </Grid>
  )
}

export default Field
