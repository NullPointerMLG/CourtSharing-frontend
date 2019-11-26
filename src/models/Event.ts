import { User } from "./User";

export interface Event {
    creation_date: Date
    event_date: number
    title: string
    description?: string
    court_id: string
    creator: User
}