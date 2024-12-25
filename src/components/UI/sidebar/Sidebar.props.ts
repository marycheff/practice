import { ReactNode } from "react"

export interface ItemProps {
    title: string
    to: string
    icon: ReactNode
    selected: string
    setSelected: (title: string) => void
}
