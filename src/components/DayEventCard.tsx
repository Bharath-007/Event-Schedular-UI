import { Box, Popover, Typography, SxProps, Theme } from "@mui/material";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { CalendarEvent } from "./types/types";
import EventList from "./EventList";
import EventPopup from "./EventPopup";

interface IDayEventCard {
  events: CalendarEvent[];
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

const DayEventCard: FC<IDayEventCard> = ({
  events,
  totalOverlapping,
  overlapIndex,
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

    const width = `${100 / totalOverlapping}%`;
    const left = `${(overlapIndex * 100) / totalOverlapping}%`;

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
    borderRadius: "2px",
    width: "65%",
    // maxWidth: eventStyle.width,
    // marginLeft: 2,
    // left: eventStyle.left,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    mx: "auto",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
    position: eventStyle.position,
    flexDirection: "column",
    bgcolor: isOpen ? "#dbeafe" : "white",
    transition: "all 0.2s ease",
    height: eventStyle.height,
    top: `${eventStyle.top}px`,
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
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#2257C8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 5px",
            height: "38%",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1.75vh",
              textTransform: "capitalize",
              width: "100%",
              color: "white",
              textAlign: "center",
            }}
          >
            {events[0]?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "62%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 5px",
            height: "60%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "grey.600",
              fontSize: "0.85rem",
              lineHeight: 1.2,
            }}
          >
            Interviewer:
            <span className="font-semibold">
              {events[0]?.event?.user_det?.handled_by?.firstName ?? "N/A"}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              color: "grey.600",
              fontSize: "0.85rem",
            }}
          >
            Time:{""}
            <span className="font-semibold">
              {" "}
              {moment(events[0]?.start).format("h:mm A")} -{" "}
              {moment(events[0]?.end).format("h:mm A")}
            </span>
          </Typography>
        </Box>
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

export default DayEventCard;
