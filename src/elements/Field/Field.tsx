import React, { createElement } from 'react'
import { over, lensIndex, toUpper, join, compose, split } from 'ramda'
import { Box, Grid, IconButton, TextField } from '@material-ui/core'
import {
  AccountBox,
  Category,
  Email,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'

const L = {
  headLends: lensIndex(0),
}

export const toUpperHead = (x: string): string =>
  compose(join(''), over(L.headLends, toUpper), split(''))(x)

const icons = {
  username: AccountBox,
  email: Email,
  password: VisibilityOff,
  text: Visibility,
  noteCategory: Category,
}

type GridItemProps = {
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'auto' | 10 | 11 | 12 | boolean
}

type InputProps = {
  endAdornment: React.ReactNode
}

interface Props {
  GridItemProps?: GridItemProps
  error: boolean
  helperText?: string
  label?: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
  type?: string
  value: string
  InputProps?: InputProps
  id: string
}

const Field: React.FC<Props> = ({
  GridItemProps = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  error,
  helperText = undefined,
  label,
  name,
  onChange,
  type = 'text',
  value,
  InputProps = {
    //@ts-ignore
    endAdornment: <Box mr={1.5}>{createElement(icons[name])}</Box>,
  },
  id,
}) => {
  return (
    <Grid item {...GridItemProps}>
      <TextField
        id={id}
        error={error}
        helperText={helperText}
        label={label || toUpperHead(name)}
        name={name}
        onChange={onChange}
        value={value}
        InputProps={InputProps}
        type={type}
        variant="outlined"
        fullWidth
      />
    </Grid>
  )
}

const withPassword = (Component: React.FC<Props>) => (props: Props) => {
  const [type, setType] = React.useState('password')
  const toggleType = () =>
    setType(cur => (cur === 'password' ? 'text' : 'password'))

  return (
    <Component
      {...props}
      type={type}
      InputProps={{
        endAdornment: (
          <IconButton onClick={toggleType}>
            {type === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  )
}
// @ts-ignore
Field.Password = withPassword(Field)

export default Field
