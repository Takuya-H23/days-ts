import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

interface Props {
  Icon: React.ReactNode
  href: string
  label: string
}

export default function IconNav({ Icon, label, href }: Props) {
  return (
    <ListItem button>
      <ListItemIcon>{Icon}</ListItemIcon>
      <Link href={href}>
        <a>
          <ListItemText
            primary={label}
            primaryTypographyProps={{ color: 'textPrimary' }}
          />
        </a>
      </Link>
    </ListItem>
  )
}
