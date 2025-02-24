'use server'

import { ID, Query } from 'node-appwrite'
import { users } from '../appwrite.config'
import { CreateUserParams } from '@/types'
import { parseStringify } from '../utils'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    )

    return parseStringify(newUser)
  } catch (error: any) {
    console.log(error)
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal('email', user.email)])

      return documents?.users[0]
    }
  }
}
