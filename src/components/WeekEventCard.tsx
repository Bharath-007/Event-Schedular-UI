import { Box, Popover, Typography, SxProps, Theme } from "@mui/material";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { CalendarEvent } from "./types/types";
import EventList from "./EventList";
import EventPopup from "./EventPopup";

interface IWeekEventCard {
  events: CalendarEvent[];
  type?: string;
}

interface EventStyle {
  height: string;
  marginTop: number;
  zIndex: number;
  position: "absolute" | "relative";
  width: string;
}

const WeekEventCard: FC<IWeekEventCard> = ({ events, type }) => {
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

  const eventStyle = useMemo((): EventStyle => {
    if (!events[0]?.start || !events[0]?.end) {
      return {
        height: "100%",
        marginTop: 0,
        zIndex: 1,
        position: "absolute",
        width: "calc(100% - 4px)",
      };
    }

    const start = moment(events[0].start);
    const end = moment(events[0].end);
    const durationMinutes = end.diff(start, "minutes");
    const durationHours = end.diff(start, "hours", true);
    const startMinutes = start.minutes();
    const endMinutes = end.minutes();
    const startHour = start.hour();
    const endHour = end.hour();

    let height = "100%";
    let marginTop = 0;
    let zIndex = 1;

    // Base height calculation (80px per hour)
    const baseHeight = Math.max(durationHours * 80, 40);

    if (durationMinutes <= 30) {
      height = "40px";
      if (startMinutes >= 30) {
        marginTop = 40;
      }
    } else if (durationMinutes <= 60) {
      height = "80px";
      if (startMinutes >= 30) {
        marginTop = 40;
        height = "40px";
      }
    } else {
      height = `${baseHeight}px`;
      if (startMinutes > 0) {
        marginTop = (startMinutes / 60) * 80;
      }
      zIndex = 3;
    }

    if (endHour > startHour + 1) {
      const hourSpan = endHour - startHour;
      height = `${hourSpan * 80 + (endMinutes / 60) * 80}px`;
    }

    return {
      height,
      marginTop,
      zIndex,
      position: "absolute",
      width: "calc(100% - 4px)",
    };
  }, [events]);

  const boxSx: SxProps<Theme> = {
    padding: "5px",
    borderRadius: "4px",
    width: eventStyle.width,
    display: "flex",
    alignItems: "start",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    // justifyContent: "space-between",
    borderLeft: "5px solid #3b82f6",
    position: eventStyle.position,
    flexDirection: "column",
    bgcolor: isOpen ? "#dbeafe" : "white",
    transition: "all 0.2s ease",
    height: eventStyle.height,
    marginTop: eventStyle.marginTop ? `${eventStyle.marginTop}px` : 0,
    zIndex: eventStyle.zIndex,
    cursor: "pointer",
    "&:hover": {
      bgcolor: "#dbeafe",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <>
      <Box sx={boxSx} onClick={handleOpen}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "grey.800",
            fontSize: "0.75rem",
            // lineHeight: 1.2,
            // overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {events[0]?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "grey.600",
            fontSize: "0.75rem",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            visibility:
              parseInt(eventStyle?.height?.slice(0, 3), 10) < 50
                ? "hidden"
                : "visible",
            WebkitBoxOrient: "vertical",
          }}
        >
          {/* {parseInt(eventStyle?.height?.slice(0, 3), 10)} */}
          Interviwer:{" "}
          {events[0]?.event?.user_det?.handled_by?.firstName ?? "N/A"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: "grey.600",
            fontSize: "0.75rem",
            // mt: 0.5,
          }}
        >
          {moment(events[0]?.start).format("h:mm A")} -{" "}
          {moment(events[0]?.end).format("h:mm A")}
        </Typography>
        {events.length > 1 && (
          <Box
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              fontWeight: 600,
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
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

export default WeekEventCard;
