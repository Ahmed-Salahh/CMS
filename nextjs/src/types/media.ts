export interface MediaItem {
  MediaID: string;
  Title: string;
  Description: string;
  Image: string;
  Type: "news" | "events" | "gallery" | "others";
  EventStatus?: "upcoming" | "completed" | null;
  EventDate?: string | null;
  MediaType?: "image" | "video" | null;
  Facility?: string | null;
  DaysLeft?: number | null;
  HoursLeft?: number | null;
  CreatedAt?: string;
  UpdatedAt?: string;
  // Event-specific fields
  LongDescription?: string | null;
  StartDate?: string | null;
  EndDate?: string | null;
  StartTime?: string | null;
  EndTime?: string | null;
  Location?: string | null;
  LocationAddress?: string | null;
  Speaker?: string | null;
  SpeakerImage?: string | null;
  Languages?: string | null;
  Fee?: string | null;
  EventFlyer?: string | null;
  EventFlyerFileName?: string | null;
}

export interface MediaResponse {
  media: MediaItem[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface SingleMediaResponse {
  media: MediaItem;
  related_events?: MediaItem[];
}
