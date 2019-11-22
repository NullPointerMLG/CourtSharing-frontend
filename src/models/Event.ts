import { User } from "./User";

export interface Event {
    creationDate: Date
    eventDate: number
    title: string
    description?: string
    courtID: string
    creator: User
}