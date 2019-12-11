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
  photos: string[];
}

export interface EventUpdateParams {
  participantUUID: string | null;  
  eventDate: number | null;
  title: string | null;
  description?: string | null;
}

export interface ImagesUpdateParams {
  eventID: string;
  photoURL: string;
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
