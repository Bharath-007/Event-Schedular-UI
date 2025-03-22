// MonthView.tsx
import React from "react";
import { CalendarEvent } from "./types/types";
import {
  generateDaysInMonth,
  getEventsForDate,
  groupEventsByDay,
  groupEventsByTime,
} from "./utils";
import EventCard from "./EventCard";
interface MonthViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ events, currentDate }) => {
  const daysInMonth = generateDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const weekdays = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thuday",
    "Friday",
    "Saturday",
  ];

  const handleDateClick = (date: Date) => {
    const dateEvents = getEventsForDate(events, date);
    if (dateEvents.length > 0) {
      // to add new event on clicking the date
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 bg-white-100 border-b">
        {weekdays.map((day) => (
          <div key={day} className="p-2 text-center text-gray-700 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {daysInMonth.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear();

          const dayEvents = getEventsForDate(events, day);
          const hasEvents = dayEvents.length > 0;
          const groupedEvents = groupEventsByDay(dayEvents);

          return (
            <div
              key={index}
              className={`min-h-32 p-1 ${
                isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
              } ${isToday ? "border-2 border-blue-500" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex justify-center">
                <span
                  className={`font-semibold p-1 items-center ${
                    isToday ? "text-blue-500" : ""
                  }`}
                >
                  {day.getDate()}
                </span>
              </div>

              {hasEvents && (
                <div className="mt-1 space-y-1">
                  {Object.entries(groupedEvents).map(
                    ([timeKey, timeEvents]) => (
                      <div key={timeKey} className="flex justify-between p-2">
                        <EventCard events={timeEvents} />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
