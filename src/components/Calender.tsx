import React, { useState, useEffect } from "react";
import { CalendarViewProps, CalendarEvent } from "./types/types";
import { parseEvents } from "./utils";
import CalendarHeader from "./CalendarHeader";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const Calendar: React.FC<CalendarViewProps> = ({
  events,
  view = "month",
  onViewChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [parsedEvents, setParsedEvents] = useState<CalendarEvent[]>(
    parseEvents(events)
  );

  useEffect(() => {
    setParsedEvents(parseEvents(events));
  }, [events]);

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      switch (view) {
        case "day":
          newDate.setDate(prevDate.getDate() - 1);
          break;
        case "week":
          newDate.setDate(prevDate.getDate() - 7);
          break;
        case "month":
          newDate.setMonth(prevDate.getMonth() - 1);
          break;
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      switch (view) {
        case "day":
          newDate.setDate(prevDate.getDate() + 1);
          break;
        case "week":
          newDate.setDate(prevDate.getDate() + 7);
          break;
        case "month":
          newDate.setMonth(prevDate.getMonth() + 1);
          break;
      }
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="flex justify-between items-center w-full py-2">
        <Typography className="font-normal text-lg text-gray-700">
          My Calendar
        </Typography>
        <div className="flex flex-row items-center">
          <div className="mx-2">
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                maxWidth: "400px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <GoSearch style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              bgcolor: "#2257C8",
              borderRadius: 0,
            }}
            className="shadow"
          >
            My Calendar
            <MdKeyboardArrowDown style={{ margin: "0 4px" }} />
          </Button>
        </div>
      </div>
      <div style={{ minWidth: "1000px" }}>
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
          onViewChange={onViewChange}
        />
        <div>
          {view === "day" && (
            <DayView currentDate={currentDate} events={parsedEvents} />
          )}
          {view === "week" && (
            <WeekView currentDate={currentDate} events={parsedEvents} />
          )}
          {view === "month" && (
            <MonthView currentDate={currentDate} events={parsedEvents} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
