import { Box, Popover, Typography } from "@mui/material";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { CalendarEvent } from "./types/types";
import EventList from "./EventList";
import EventPopup from "./EventPopup";

interface IEventCard {
  events: CalendarEvent[];
  type?: string;
}

const EventCard: FC<IEventCard> = ({ events, type }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (events.length > 1) {
      setAnchorEl(event.currentTarget);
    } else {
      handleEventClick(events[0]);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  const timeRange = useMemo(() => {
    if (!events[0]?.start || !events[0]?.end) return "unknown";

    const startMinutes = moment(events[0].start).minutes();
    const endMinutes = moment(events[0].end).minutes();

    if (startMinutes === 0 && endMinutes === 0) {
      return "middle";
    }

    // if (endMinutes >= 30) {
    //   return "bottom";
    // }

    if (startMinutes >= 30) {
      return "bottom";
    }
    if (startMinutes < 30 && endMinutes <= 30) {
      return "top";
    }

    return "middle";
  }, [events]);

  const getMarginTop = () => {
    if (!type || type === "month") return 0;

    if (type === "week") {
      switch (timeRange) {
        case "top":
          return 0;
        case "middle":
          return 2;
        case "bottom":
          return 4;
        default:
          return 0;
      }
    }

    if (type === "day") {
      switch (timeRange) {
        case "top":
          return 0;
        case "middle":
          return 0.5;
        case "bottom":
          return 3;
        default:
          return 0.5;
      }
    }

    return 0;
  };

  return (
    <>
      <Box
        maxWidth={"md"}
        sx={{
          padding: "5px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: 200,
          display: "flex",
          alignItems: "start",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          justifyContent: "space-between",
          borderLeft: "1vh solid #2257C8",
          position: "relative",
          flexDirection: "column",
          bgcolor: isOpen ? "#dbeafe" : "white",
          transition: "background-color 0.3s ease",
          mt: getMarginTop(),
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#dbeafe",
          },
        }}
        onClick={handleOpen}
      >
        {/* {getMarginTop() + "-" + timeRange} */}
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          {events[0]?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          Interviewer:{" "}
          {events[0]?.event?.user_det?.handled_by?.firstName ?? "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          {moment(events[0]?.start).format(
            moment(events[0]?.start).minutes() === 0 ? "h A" : "h:mm A"
          )}{" "}
          -{" "}
          {moment(events[0]?.end).format(
            moment(events[0]?.end).minutes() === 0 ? "h A" : "h:mm A"
          )}
        </Typography>
        {events.length > 1 && (
          <Box
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              fontWeight: 600,
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(50%, -50%)",
            }}
          >
            {events.length}
          </Box>
        )}
      </Box>
      {events.length > 1 && (
        <Popover
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          // anchorOrigin={{
          //   vertical: "top",
          //   horizontal: "right",
          // }}
          anchorOrigin={{
            vertical: "top",
            horizontal:
              anchorEl?.getBoundingClientRect().left &&
              anchorEl?.getBoundingClientRect().left > window.innerWidth / 2
                ? "left"
                : "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal:
              anchorEl?.getBoundingClientRect().left &&
              anchorEl?.getBoundingClientRect().left > window.innerWidth / 2
                ? "right"
                : "left",
          }}
          sx={{ m: 1 }}
        >
          <EventList
            events={events}
            onEventClick={handleEventClick}
            onClose={handleClose}
          />
        </Popover>
      )}
      {selectedEvent && (
        <EventPopup
          event={selectedEvent.event}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
};

export default EventCard;
