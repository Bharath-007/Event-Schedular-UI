import React, { useState } from "react";
import { Event } from "./components/types/types";
import Calendar from "./components/Calender";

const events: Event[] = [
  {
    id: 1,
    summary: "1st Round",
    desc: "1st Round",
    start: "2025-03-29T18:00:00+05:30",
    end: "2025-03-29T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      P: 8,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "django developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "django",
      jobRequest_Description: "asfffasf",
    },
  },
  {
    id: 2,
    summary: "Test",
    desc: "Test",
    start: "2025-03-29T18:00:00+05:30",
    end: "2025-03-29T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      p: 7,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "django developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "django",
      jobRequest_Description: "asfffasf",
    },
  },
  {
    id: 3,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-03-24T20:00:00+05:30",
    end: "2025-03-24T21:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "django developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "django",
      jobRequest_Description: "asfffasf",
    },
  },
  {
    id: 4,
    summary: "1st Round",
    desc: "Initial screening for software engineer",
    start: "2025-03-23T10:00:00+05:30",
    end: "2025-03-23T10:30:00+05:30",
    attendees: null,
    status: "Scheduled",
    comment: "Candidate has good experience",
    score: { P: 8 },
    link: "http://example.com/meeting1",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "Rahul",
        candidateComment: "",
        candidate_lastName: "Kumar",
        candidateGender: "male",
        candidate_email: "rahul.kumar@example.com",
      },
      handled_by: {
        id: 3,
        userEmail: "neha.hr@example.com",
        username: "neha_hr",
        last_login: null,
        firstName: "Neha",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "Software Engineer",
        jobRequest_Role: "software_engineer",
        jobRequest_KeySkills: "Java, Spring Boot",
        jobRequest_Description: "Develop and maintain applications.",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "Software Engineer",
      jobRequest_Role: "software_engineer",
      jobRequest_KeySkills: "Java, Spring Boot",
      jobRequest_Description: "Develop and maintain applications.",
    },
  },
  {
    id: 5,
    summary: "Technical Interview",
    desc: "Technical assessment for UI/UX Designer",
    start: "2025-03-22T11:00:00+05:30",
    end: "2025-03-22T12:00:00+05:30",
    attendees: null,
    status: "Scheduled",
    comment: "Portfolio review scheduled",
    score: { P: 7 },
    link: "http://example.com/meeting2",
    user_det: {
      id: 2,
      question_score: null,
      status: null,
      candidate: {
        id: 2,
        candidateComment: "",
        candidate_firstName: "Anjali",
        candidate_lastName: "Sharma",
        candidateGender: "female",
        candidate_email: "anjali.sharma@example.com",
      },
      handled_by: {
        id: 4,
        userEmail: "amit.hr@example.com",
        username: "amit_hr",
        firstName: "Amit",
        lastName: "HR",
        last_login: null,
        userRole: "hr_employee",
      },
      job_id: {
        id: 12,
        jobRequest_Title: "UI/UX Designer",
        jobRequest_Role: "ui_ux_designer",
        jobRequest_KeySkills: "Figma, Adobe XD",
        jobRequest_Description: "Create design mockups and prototypes.",
      },
    },
    job_id: {
      id: 12,
      jobRequest_Title: "UI/UX Designer",
      jobRequest_Role: "ui_ux_designer",
      jobRequest_KeySkills: "Figma, Adobe XD",
      jobRequest_Description: "Create design mockups and prototypes.",
    },
  },
  {
    id: 7,
    summary: "Final Interview",
    desc: "Final discussion with management for product manager role",
    start: "2025-03-22T14:00:00+05:30",
    end: "2025-03-22T15:00:00+05:30",
    attendees: "ceo@example.com",
    status: "Scheduled",
    comment: "Candidate to present product roadmap",
    score: { P: 9 },
    link: "http://example.com/meeting3",
    user_det: {
      id: 3,
      question_score: null,
      status: null,
      candidate: {
        id: 3,
        candidateComment: "",
        candidate_firstName: "Reshma",
        candidate_lastName: "Nair",
        candidateGender: "female",
        candidate_email: "Reshma.nair@example.com",
      },
      handled_by: {
        id: 5,
        userEmail: "raj.hr@example.com",
        username: "raj_hr",
        firstName: "Raj",
        lastName: "HR",
        userRole: "hr_manager",
        last_login: null,
      },
      job_id: {
        id: 13,
        jobRequest_Title: "Product Manager",
        jobRequest_Role: "product_manager",
        jobRequest_KeySkills: "Agile, Scrum, Product Management",
        jobRequest_Description:
          "Lead cross-functional teams to deliver products.",
      },
    },
    job_id: {
      id: 13,
      jobRequest_Title: "Product Manager",
      jobRequest_Role: "product_manager",
      jobRequest_KeySkills: "Agile, Scrum, Product Management",
      jobRequest_Description:
        "Lead cross-functional teams to deliver products.",
    },
  },
  {
    id: 8,
    summary: "Coding Round",
    desc: "Data structure and Alogirthm",
    start: "2025-03-25T15:00:00+05:30",
    end: "2025-03-25T18:00:00+05:30",
    attendees: "monitoring_team@example.com",
    status: "Scheduled",
    comment: "Candidate to present Machine Coding roadmap",
    score: { P: 9 },
    link: "http://example.com/meeting3",
    user_det: {
      id: 3,
      question_score: null,
      status: null,
      candidate: {
        id: 3,
        candidateComment: "",
        candidate_firstName: "Reshma",
        candidate_lastName: "Nair",
        candidateGender: "female",
        candidate_email: "Reshma.nair@example.com",
      },
      handled_by: {
        id: 5,
        userEmail: "raj.hr@example.com",
        username: "raj_hr",
        firstName: "Raj",
        lastName: "HR",
        userRole: "hr_manager",
        last_login: null,
      },
      job_id: {
        id: 13,
        jobRequest_Title: "Machine Monitoring",
        jobRequest_Role: "machine_coding",
        jobRequest_KeySkills: "DSA, Alogoithm, Any Programming language",
        jobRequest_Description:
          "Lead cross-functional teams to deliver products.",
      },
    },
    job_id: {
      id: 13,
      jobRequest_Title: "Machine Monitoring",
      jobRequest_Role: "machine_coding",
      jobRequest_KeySkills: "DSA, Alogoithm, Any Programming language",
      jobRequest_Description: "Efficient coding practices.",
    },
  },
];

const App: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  return (
    <div>
      <Calendar events={events} view={view} onViewChange={setView} />
    </div>
  );
};

export default App;
