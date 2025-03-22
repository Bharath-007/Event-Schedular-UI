import React, { useMemo, useState } from "react";
import { CalendarEvent } from "./types/types";
import { generateTimeSlots, getEventsForDate } from "./utils";
import EventPopup from "./EventPopup";
import DayEventCard from "./DayEventCard";

interface DayViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ events, currentDate }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const timeSlots = generateTimeSlots();
  const dayEvents = getEventsForDate(events, currentDate);

  const dayName = useMemo(
    () => currentDate.toLocaleDateString("en-US", { weekday: "long" }),
    []
  );
  const dayNumber = useMemo(() => currentDate.getDate(), []);

  const getEventsForTimeSlot = (timeSlot: string) => {
    const timeParts = timeSlot.split(" ");
    const hourStr = timeParts[0].trim();
    const period = timeParts[1].trim();

    let hour = parseInt(hourStr);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

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

  // Filter empty slots from the top until a slot with events is found
  const filteredTimeSlots = timeSlots.reduce<string[]>((acc, timeSlot) => {
    const hasEvents = getEventsForTimeSlot(timeSlot).length > 0;
    if (acc.length > 0 || hasEvents) {
      acc.push(timeSlot);
    }
    return acc;
  }, []);

  const displayTimeSlots = filteredTimeSlots
    .concat(timeSlots.slice(filteredTimeSlots.length))
    .slice(0, filteredTimeSlots.length);

  const slotToDisplay =
    displayTimeSlots.length === 0 ? timeSlots : displayTimeSlots;

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-200 t-2">
      <div className="flex border-b relative">
        <div
          className={`min-h-[80px] w-32 text-right text-gray-500 border-r bg-white transform mr-px`}
          style={{
            padding: "0 62px",
          }}
        ></div>
        <div className="min-h-[80px] w-full bg-white flex flex-col justify-center items-center mt-px mr-px pr-20">
          <p style={{ marginBottom: 1 }}>{dayNumber}</p>
          <p style={{ marginTop: 1 }}>{dayName}</p>
        </div>
      </div>
      <div className="flex-grow overflow-y-clip">
        {slotToDisplay.map((timeSlot, index) => {
          const slotEvents = getEventsForTimeSlot(timeSlot);
          const overlappingGroups = getOverlappingGroups(slotEvents);

          return (
            <div key={timeSlot} className="flex border-b relative">
              <div
                className={`min-h-[80px] w-32 text-right text-gray-500 border-r bg-white pr-3 mr-px transform -translate-y-0`}
              >
                {timeSlot}
              </div>
              <div
                className={`flex-grow min-h-[80px] bg-white mb-px mr-px relative flex justify-center items-center ${
                  index === 0 ? "mt-px" : ""
                }`}
              >
                {overlappingGroups.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <DayEventCard
                      key={`${groupIndex}`}
                      events={group}
                      totalOverlapping={group.length}
                      overlapIndex={groupIndex}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
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

export default DayView;
