import { User } from "./User";
import { Sport } from "./Sport";

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
  sport: Sport;
}

export interface EventUpdateParams {
  participantUUID: string;
}

export interface Comment {
  id: string;
  message: string;
  user: User;
}

export interface CommentAddParams {
  userUUID: string;
  message: string;
  eventID: string;
}
