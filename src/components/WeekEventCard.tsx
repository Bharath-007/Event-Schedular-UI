import { Box, Popover, Typography, SxProps, Theme } from "@mui/material";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { CalendarEvent } from "./types/types";
import EventList from "./EventList";
import EventPopup from "./EventPopup";

interface IWeekEventCard {
  events: CalendarEvent[];
  type?: string;
  timeSlot: string;
  totalOverlapping: number;
  overlapIndex: number;
}

interface EventStyle {
  height: string;
  top: number;
  left: string;
  width: string;
  zIndex: number;
  position: "absolute" | "relative";
}

const WeekEventCard: FC<IWeekEventCard> = ({
  events,
  overlapIndex,
  totalOverlapping,
}) => {
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
        top: 0,
        left: "0",
        width: "100%",
        zIndex: 1,
        position: "absolute",
      };
    }

    const start = moment(events[0].start);
    const end = moment(events[0].end);
    const startMinutes = start.minutes();

    const durationMinutes = end.diff(start, "minutes");
    const heightInPixels = Math.max((durationMinutes / 60) * 80, 40);

    const topPosition = (startMinutes / 60) * 80;

    const actualOverlapping = totalOverlapping || 1;
    const width = `${100 / actualOverlapping}%`;
    const left = `${(overlapIndex * 100) / actualOverlapping}%`;

    return {
      height: `${heightInPixels}px`,
      top: topPosition,
      left,
      width,
      zIndex: durationMinutes > 60 ? 3 : 1,
      position: "absolute",
    };
  }, [events, totalOverlapping, overlapIndex]);

  const boxSx: SxProps<Theme> = {
    padding: "5px",
    borderRadius: "4px",
    maxWidth: eventStyle.width,
    width: events.length > 1 ? "95%" : "100%",
    display: "flex",
    alignItems: "start",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
    borderLeft: "8px solid #3b82f6",
    position: eventStyle.position,
    flexDirection: "column",
    bgcolor: isOpen ? "#dbeafe" : "white",
    transition: "all 0.2s ease",
    height: eventStyle.height,
    // overflow: "hidden",
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
            // lineHeight: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {events[0]?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
        </Typography>
        {parseInt(eventStyle?.height?.slice(0, 3), 10) > 50 && (
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
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            Interviwer:{" "}
            {events[0]?.event?.user_det?.handled_by?.firstName ?? "N/A"}
          </Typography>
        )}
        {parseInt(eventStyle?.height?.slice(0, 3), 10) > 150 && (
          <Box
            sx={{
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                mx: 1,
                mt:
                  parseInt(eventStyle.height.slice(0, 2)) / 7 +
                  parseInt(eventStyle.height.slice(0, 2)) / 6,
                mb: parseInt(eventStyle.height.slice(0, 1)) / 2,
                border: "1px solid rgba(48, 50, 55, 0.3)",
                // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L20 20 M20 0 L0 20' stroke='rgba(48, 50, 55, 0.3)' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0' stroke='rgba(48, 50, 55, 0.3)' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
                backgroundSize: "15px 15px",
                zIndex: 0,
                borderRadius: "4px",
                pointerEvents: "none",
              },
            }}
          ></Box>
        )}

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
