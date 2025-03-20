import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CalendarViewProps } from "./types/types";
import { IconButton, Paper, Tab, Tabs } from "@mui/material";

interface CalendarHeaderProps
  extends Pick<CalendarViewProps, "view" | "onViewChange"> {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
}) => {
  const getHeaderTitle = () => {
    switch (view) {
      case "day":
        return currentDate
          .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
          .replace(",", "");
      case "week":
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
        })} to ${endOfWeek.toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      case "month":
        return currentDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white rounded-t-lg">
      <div className="flex gap-2">
        <IconButton
          sx={{ border: "2px solid #3b82f6", borderRadius: 1, px: 1 }}
          onClick={onPrevious}
          className="p-0 hover:bg-gray-200 transition duration-200 w-1/3 h-8"
        >
          <FaChevronLeft />
        </IconButton>
        <IconButton
          sx={{ border: "2px solid #3b82f6", borderRadius: 1, px: 1 }}
          onClick={onNext}
          className="p-0 hover:bg-gray-200 transition duration-200 w-1/3 h-8"
        >
          <FaChevronRight />
        </IconButton>
        <Paper
          elevation={1}
          className="font-semibold py-1 px-4 text-sky-500"
          sx={{ visibility: view === "month" ? "hidden" : "visible" }}
        >
          {view === "day"
            ? currentDate.getDate()
            : (currentDate.getDate() - currentDate.getDay()).toLocaleString()}
        </Paper>
      </div>
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">{getHeaderTitle()}</h2>
      </div>
      <div className="flex items-center">
        <Tabs
          value={view}
          onChange={(_, newValue) => onViewChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Day"
            value="day"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
          <Tab
            label="Week"
            value="week"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
          <Tab
            label="Month"
            value="month"
            sx={{ textTransform: "capitalize", fontWeight: 600 }}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarHeader;
