import React, { useState } from "react";
import { CalendarEvent } from "./types/types";
import { generateTimeSlots, getEventsForDate } from "./utils";
import EventPopup from "./EventPopup";
import EventCard from "./EventCard";

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

    return dayEvents.filter((event) => {
      const eventStart = event.start;
      return eventStart.getHours() === hour;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-200">
      <div className="flex-grow overflow-y-auto">
        {timeSlots.map((timeSlot) => {
          const slotEvents = getEventsForTimeSlot(timeSlot);
          return (
            <div key={timeSlot} className="flex border-b">
              <div
                className={`min-h-32 w-60 text-center text-sky-500 border-r bg-white m-px mt-0 pt-24 `}
              >
                {timeSlot}
              </div>
              <div
                className="flex-grow p-2 bg-white mb-px mr-px"
                // style={{ border: '1px solid red' }}
              >
                {slotEvents.length > 0 ? (
                  <div className="transform translate-y-28 transition duration-300 ease-in-out">
                    <EventCard events={slotEvents} />
                  </div>
                ) : (
                  <div className="h-full w-full"></div>
                )}
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
