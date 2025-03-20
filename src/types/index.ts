export interface Candidate {
  id: number;
  candidate_firstName: string;
  candidate_lastName: string;
  candidateGender: string;
  candidateComment: string;
  candidate_email: string;
}

export interface HandledBy {
  id: number;
  last_login: string | null;
  userEmail: string;
  username: string;
  firstName: string;
  lastName: string;
  userRole: string;
}

export interface JobDetails {
  id: number;
  jobRequest_Title: string;
  jobRequest_Role: string;
  jobRequest_KeySkills: string;
  jobRequest_Description: string;
}

export interface UserDetails {
  id: number;
  question_score: number | null;
  status: string | null;
  candidate: Candidate;
  handled_by: HandledBy;
  job_id: JobDetails;
}

export interface Score {
  [key: string]: number;
}

export interface Interview {
  id: number;
  summary: string;
  desc: string;
  start: string; // ISO Date string
  end: string; // ISO Date string
  attendees: string | null;
  status: string | null;
  comment: string | null;
  score: Score;
  link: string;
  user_det: UserDetails;
  job_id: JobDetails;
}

export type CalendarViewMode = "month" | "week" | "day";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  meetingLink?: string;
}

export interface DayEvents {
  date: Date;
  events: CalendarEvent[];
}

// export type CalendarViewMode = "day" | "week" | "month" | "year";

// export interface CalendarEvent {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   description?: string;
//   interviewer: string;
//   round?: string;
//   position: string;
//   meetingLink?: string;
//   meetingPlatform?: string;
//   documents?: {
//     resume?: string;
//     aadhar?: string;
//   };
// }

// export interface DayEvents {
//   date: Date;
//   events: CalendarEvent[];
// }
