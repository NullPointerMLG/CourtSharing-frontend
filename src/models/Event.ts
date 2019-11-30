import { User } from "./User";

export interface Event {
  id: string;
  creationDate: number;
  eventDate: number;
  title: string;
  description?: string;
  courtID: string;
  creator: User;
  participants: User[];
  comments: Comment[];
}

export interface EventUpdateParams {
  participantUUID: string;
}

export interface Comment {
  message: string;
  user: User;
}
