import React from "react";
import { CalendarEvent } from "./types/types";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IoCloseCircle, IoPencil, IoTrash } from "react-icons/io5";
import moment from "moment";

interface EventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onClose: () => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  onClose,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{
      width: '100%',
      maxHeight: '100vh',
      overflowY: 'auto'
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <Typography variant={isSmallScreen ? "body2" : "body1"} fontWeight="medium">
          Meetings
        </Typography>
        <IconButton onClick={onClose} size={isSmallScreen ? "small" : "medium"}>
          <IoCloseCircle color="#3b82f6" size={isSmallScreen ? 20 : 24} />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{
        width: '100%',
        py: 1,
      }}>
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "white",
                padding: { xs: 1, sm: 1.5, md: 2 },
                // borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: 1.5,
                borderLeft: "1vh solid #3b82f6",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => onEventClick(event)}
            >
              <Typography
                fontSize={{ xs: "13px", sm: "14px", md: "15px" }}
                fontWeight="medium"
                sx={{
                  textTransform: "capitalize",
                  pr: { xs: 8, sm: 10 } 
                }}
                noWrap
              >
                {event?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
              </Typography>

              <Box sx={{ mt: 0.5 }}>
                <Typography
                  fontSize={{ xs: "11px", sm: "12px", md: "13px" }}
                  sx={{
                    textTransform: "capitalize",
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 0.5, sm: 0 }
                  }}
                >
                  <span style={{ display: 'inline-block' }}>
                    {event?.event?.summary}
                  </span>

                  <span
                    style={{
                      color: "#454545",
                      opacity: 0.4,
                      margin: '0 4px',
                      display: isMediumScreen || !isSmallScreen ? 'inline-block' : 'none'
                    }}
                  >
                    |
                  </span>

                  <span style={{ display: 'inline-block' }}>
                    Interviewer: {event?.event?.user_det?.handled_by?.firstName ?? "N/A"}
                  </span>
                </Typography>
              </Box>

              <Typography
                fontSize={{ xs: "11px", sm: "12px", md: "13px" }}
                sx={{
                  textTransform: "capitalize",
                  mt: 0.5,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 0.5, sm: 0 }
                }}
              >
                <span style={{ display: 'inline-block' }}>
                  Date: {moment(event?.start).format("DD MMM YYYY")}
                </span>

                <span
                  style={{
                    color: "#454545",
                    opacity: 0.4,
                    margin: '0 4px',
                    display: isMediumScreen || !isSmallScreen ? 'inline-block' : 'none'
                  }}
                >
                  |
                </span>

                <span style={{ display: 'inline-block' }}>
                  Time: {moment(event?.start, "HH:mm").format("h:mm A")} - {moment(event?.end, "HH:mm").format("h:mm A")}
                </span>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  position: "absolute",
                  top: { xs: 5, sm: 8 },
                  right: { xs: 5, sm: 8 },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton size={isSmallScreen ? "small" : "medium"}>
                  <IoPencil size={isSmallScreen ? 16 : 18} color="#3b82f6" />
                </IconButton>
                <IconButton size={isSmallScreen ? "small" : "medium"}>
                  <IoTrash size={isSmallScreen ? 16 : 18} color="#ef4444" />
                </IconButton>
              </Box>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default EventList;