import React from "react";
import { CalendarViewProps } from "./types/types";
import { Button, ButtonGroup, IconButton, Tab, Tabs } from "@mui/material";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

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
        return currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        });
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
    <div className="flex justify-between items-center py-2 bg-white rounded-t-lg pl-24 pr-4">
      <div className="flex">
        {/*
        <Paper
          elevation={1}
          className="font-semibold py-1 px-4 text-sky-500"
          sx={{ visibility: view === "month" ? "hidden" : "visible" }}
        >
          {view === "day"
            ? currentDate.getDate()
            : (currentDate.getDate() - currentDate.getDay()).toLocaleString()}
        </Paper> */}
        <ButtonGroup variant="outlined">
          <IconButton
            onClick={onPrevious}
            sx={{
              borderRadius: 0,
              border: "1px solid #D3D3D3",
              px: 0.5,
              py: 0.5,
            }}
          >
            <GoChevronLeft />
          </IconButton>
          <IconButton
            onClick={onNext}
            sx={{
              borderRadius: 0,
              border: "1px solid #D3D3D3",
              px: 0.5,
              py: 0.5,
            }}
          >
            <GoChevronRight />
          </IconButton>
        </ButtonGroup>
        <Button
          className="ml-4 text-base"
          onClick={onToday}
          variant="contained"
          sx={{
            bgcolor: "#2257C8",
            textTransform: "capitalize",
            borderRadius: 0,
            px: 4,
          }}
        >
          Today
        </Button>
      </div>
      <div className="flex items-center">
        <h2 className="text-base font-semibold">{getHeaderTitle()}</h2>
      </div>
      <div className="flex items-center">
        <Tabs
          value={view}
          onChange={(_, newValue) => onViewChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#3f51b5",
              height: 3,
            },
          }}
        >
          {["Day", "Week", "Month"].map((label) => (
            <Tab
              key={label}
              label={label}
              value={label.toLowerCase()}
              sx={{
                textTransform: "capitalize",
                fontWeight: 500,
                color: view === label.toLowerCase() ? "#3f51b5" : "#000",
                minWidth: 80,
                "&.MuiButtonBase-root": {
                  paddingBottom: 0,
                  paddingRight: 0,
                  paddingLeft: 0,
                },
              }}
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarHeader;
