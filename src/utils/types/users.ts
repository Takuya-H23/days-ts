type token = string

export interface User {
  user_id: string
  username: string
  created_at: string
  last_login?: string | null
}

export interface Payload {
  user: User
  token: token
}
