/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { store, } from '../types'


export const useStore = create<store>()((set) => ({
  userInfo: {
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  },
  setUserInfo: (userInfo: any) => set(() => {
    const { firstName, lastName, email, _id } = userInfo

    return ({ userInfo: { firstName, lastName, email, id: _id } })
  }),
}))
