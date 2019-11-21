import { User } from "./user";

export interface Event {
  eventDate: number;
  title: string;
  description: string;
  courtID: number;
  sportID: number;
  creator: User;
}
