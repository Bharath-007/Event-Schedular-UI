import React, { useState } from "react";
import { Event } from "./components/types/types";
import Calendar from "./components/Calender";

const events: Event[] = [
  {
    "id": 1,
    "summary": "1st Round",
    "desc": "1st Round",
    "start": "2025-03-29T18:00:00+05:30",
    "end": "2025-03-29T18:40:00+05:30",
    "attendees": null,
    "status": null,
    "comment": null,
    "score": {
      "P": 8
    },
    "link": "http://www.hhh.com",
    "user_det": {
      "id": 1,
      "question_score": null,
      "status": null,
      "candidate": {
        "id": 1,
        "candidate_firstName": "mohan",
        "candidate_lastName": "raj",
        "candidateGender": "male",
        "candidateComment": "",
        "candidate_email": "mohanrajk@dataterrain.com"
      },
      "handled_by": {
        "id": 3,
        "last_login": null,
        "userEmail": "vinodhini_hr@dataterrain.com",
        "username": "vinodhini_hr",
        "firstName": "Vinodhini",
        "lastName": "HR",
        "userRole": "hr_employee"
      },
      "job_id": {
        "id": 11,
        "jobRequest_Title": "django developer",
        "jobRequest_Role": "software engineer",
        "jobRequest_KeySkills": "django",
        "jobRequest_Description": "asfffasf"
      }
    },
    "job_id": {
      "id": 11,
      "jobRequest_Title": "django developer",
      "jobRequest_Role": "software engineer",
      "jobRequest_KeySkills": "django",
      "jobRequest_Description": "asfffasf"
    }
  },
  {
    "id": 2,
    "summary": "Test",
    "desc": "Test",
    "start": "2025-03-29T18:00:00+05:30",
    "end": "2025-03-29T18:40:00+05:30",
    "attendees": null,
    "status": null,
    "comment": null,
    "score": {
      "p": 7
    },
    "link": "http://www.hhh.com",
    "user_det": {
      "id": 1,
      "question_score": null,
      "status": null,
      "candidate": {
        "id": 1,
        "candidate_firstName": "mohan",
        "candidate_lastName": "raj",
        "candidateGender": "male",
        "candidateComment": "",
        "candidate_email": "mohanrajk@dataterrain.com"
      },
      "handled_by": {
        "id": 3,
        "last_login": null,
        "userEmail": "vinodhini_hr@dataterrain.com",
        "username": "vinodhini_hr",
        "firstName": "Vinodhini",
        "lastName": "HR",
        "userRole": "hr_employee"
      },
      "job_id": {
        "id": 11,
        "jobRequest_Title": "django developer",
        "jobRequest_Role": "software engineer",
        "jobRequest_KeySkills": "django",
        "jobRequest_Description": "asfffasf"
      }
    },
    "job_id": {
      "id": 11,
      "jobRequest_Title": "django developer",
      "jobRequest_Role": "software engineer",
      "jobRequest_KeySkills": "django",
      "jobRequest_Description": "asfffasf"
    }
  },
  {
    "id": 3,
    "summary": "2nd Round",
    "desc": "2nd Round",
    "start": "2025-03-20T20:00:00+05:30",
    "end": "2025-03-20T21:00:00+05:30",
    "attendees": null,
    "status": null,
    "comment": null,
    "score": {
      "o": 6
    },
    "link": "http://www.hhh.com",
    "user_det": {
      "id": 1,
      "question_score": null,
      "status": null,
      "candidate": {
        "id": 1,
        "candidate_firstName": "mohan",
        "candidate_lastName": "raj",
        "candidateGender": "male",
        "candidateComment": "",
        "candidate_email": "mohanrajk@dataterrain.com"
      },
      "handled_by": {
        "id": 3,
        "last_login": null,
        "userEmail": "vinodhini_hr@dataterrain.com",
        "username": "vinodhini_hr",
        "firstName": "Vinodhini",
        "lastName": "HR",
        "userRole": "hr_employee"
      },
      "job_id": {
        "id": 11,
        "jobRequest_Title": "django developer",
        "jobRequest_Role": "software engineer",
        "jobRequest_KeySkills": "django",
        "jobRequest_Description": "asfffasf"
      }
    },
    "job_id": {
      "id": 11,
      "jobRequest_Title": "django developer",
      "jobRequest_Role": "software engineer",
      "jobRequest_KeySkills": "django",
      "jobRequest_Description": "asfffasf"
    }
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  return (
    <div >
      <Calendar
        events={events}
        view={view}
        onViewChange={setView}
      />
    </div>
  );
};

export default App;