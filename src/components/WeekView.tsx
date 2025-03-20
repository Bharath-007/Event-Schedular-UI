import React, { useState } from "react";
import { CalendarEvent } from "./types/types";
import {
  generateTimeSlots,
  generateDaysOfWeek,
  getEventsForDate,
} from "./utils";
import EventPopup from "./EventPopup";
import EventCard from "./EventCard";

interface WeekViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ events, currentDate }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const timeSlots = generateTimeSlots();
  const daysOfWeek = generateDaysOfWeek(currentDate);

  const getEventsForTimeSlot = (day: Date, timeSlot: string) => {
    const timeParts = timeSlot.split(" ");
    const hour = parseInt(timeParts[0]);
    const period = timeParts[1];

    let hours = hour;
    if (period === "PM" && hour !== 12) hours += 12;
    if (period === "AM" && hour === 12) hours = 0;

    const dayEvents = getEventsForDate(events, day);

    return dayEvents.filter((event) => {
      const eventStart = event.start;
      return eventStart.getHours() === hours;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto ">

      <div className="flex-none grid grid-cols-8 border-b bg-gray-200">
        <div className="p-4 border-r bg-white"></div>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`p-4 text-center bg-white ${daysOfWeek.length === index + 1 ? '' : 'mr-px'} mb-px ${day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear()
              ? "bg-blue-50"
              : ""
              }`}
          >
            <div className="text-center font-semibold">
              {day.getDate() +
                " " +
                day.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-center font-semibold">
              {day.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-grow overflow-y-clip bg-gray-200">
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot}
            className="grid grid-cols-8 border-b bg-white mb-px"
          >
            <div className="min-h-20 px-2 text-right text-sky-500 pt-16" style={{ borderRight: '1px solid #F3F3F3' }}>
              {timeSlot}
            </div>
            {daysOfWeek.map((day, dayIndex) => {
              const slotEvents = getEventsForTimeSlot(day, timeSlot);
              return (
                <div
                  key={dayIndex}
                  className={`relative min-h-20 border-r flex pt-12`}
                  style={{ borderRight: '1px solid #F3F3F3' }}
                >
                  {slotEvents.length > 0 && (
                    <div className="absolute p-0" >
                      {/* <div className="flex items-baseline"> */}
                      <EventCard events={slotEvents} />
                      {/* </div> */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventPopup
          event={selectedEvent.event}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default WeekView;
