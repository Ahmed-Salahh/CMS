export interface Program {
  ProgramID: string;
  ProgramName: string;
  ProgramDescription: string;
  ProgramImage?: string;
  Duration: string;
  Language: string;
  Location: string;
  TargetAudience: string;
  Status: "open" | "upcoming" | "closed";
  DaysLeft?: number;
  HoursLeft?: number;
  StartDate?: string;
  EndDate?: string;
  Requirements?: string;
  Benefits?: string;
  Curriculum?: string;
  ApplicationDeadline?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface ProgramFilters {
  status: string;
  search: string;
  sort: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}
