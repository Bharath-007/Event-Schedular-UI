import React, { useState } from "react";
import { CalendarEvent } from "./types/types";
import {
  generateTimeSlots,
  generateDaysOfWeek,
  getEventsForDate,
} from "./utils";
import EventPopup from "./EventPopup";
import WeekEventCard from "./WeekEventCard";

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

  const getOverlappingGroups = (events: CalendarEvent[]) => {
    const groups: CalendarEvent[][] = [];

    events.forEach((event) => {
      const eventStart = event.start.getTime();
      const eventEnd = event.end.getTime();

      let foundGroup = false;

      for (const group of groups) {
        const overlapsWithGroup = group.some((groupEvent) => {
          const groupStart = groupEvent.start.getTime();
          const groupEnd = groupEvent.end.getTime();
          return eventStart < groupEnd && eventEnd > groupStart;
        });

        if (overlapsWithGroup) {
          group.push(event);
          foundGroup = true;
          break;
        }
      }

      if (!foundGroup) {
        groups.push([event]);
      }
    });

    return groups;
  };

  const getEventsForTimeSlot = (day: Date, timeSlot: string) => {
    const timeParts = timeSlot.split(" ");
    const hourStr = timeParts[0].trim();
    const period = timeParts[1].trim();

    let hour = parseInt(hourStr);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    const dayEvents = getEventsForDate(events, day);

    const slotEvents = dayEvents.filter((event) => {
      const eventStartHour = event.start.getHours();
      return eventStartHour === hour;
    });

    return slotEvents.sort((a, b) => {
      const startDiff = a.start.getTime() - b.start.getTime();
      if (startDiff === 0) {
        return (
          b.end.getTime() -
          b.start.getTime() -
          (a.end.getTime() - a.start.getTime())
        );
      }
      return startDiff;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="flex-none grid grid-cols-8 bg-gray-200 mr-4">
        <div className="py-4 border-r bg-white"></div>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`py-4 text-center bg-white mb-px   ${
              day.getDate() === new Date().getDate() &&
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

      <div className="flex-grow overflow-y-clip">
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="grid grid-cols-8 bg-gray-200">
            <div className="min-h-20 px-2 py-1 text-right text-sky-500 bg-white mb-px">
              {timeSlot}
            </div>

            {daysOfWeek.map((day, dayIndex) => {
              const slotEvents = getEventsForTimeSlot(day, timeSlot);
              const overlappingGroups = getOverlappingGroups(slotEvents);

              return (
                <div
                  key={dayIndex}
                  className="min-h-20 relative bg-white mr-px mb-px"
                >
                  {overlappingGroups.map((group, groupIndex) => (
                    <WeekEventCard
                      key={`${dayIndex}-${groupIndex}`}
                      timeSlot={timeSlot}
                      events={group}
                      totalOverlapping={overlappingGroups.length}
                      overlapIndex={groupIndex}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
