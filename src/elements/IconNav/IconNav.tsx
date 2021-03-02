import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

interface Props {
  Icon: React.ReactNode
  text: string
}

export default function IconNav({ Icon, text }: Props) {
  return (
    <ListItem button>
      <ListItemIcon>{Icon}</ListItemIcon>
      <Link href="/">
        <a>
          <ListItemText
            primary={text}
            primaryTypographyProps={{ color: 'textPrimary' }}
          />
        </a>
      </Link>
    </ListItem>
  )
}
