import React from "react";
import { Event } from "./types/types";
import { formatTime, formatDate } from "./utils";
import {
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import GoogleMeetIcon from "../assets/googleMeet.svg";

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  const handleJoin = () => {
    window.open(event.link, "_blank");
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 1,
          width: "100%",
          maxWidth: 600,
          m: 0,
          p: 2,
          overflowY: "visible",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: -10, right: -10, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            bgcolor: "#3b82f6",
            color: "white",
            "&:hover": { bgcolor: "#3b82f6" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "row",
          border: "1px solid #cecece",
          borderRadius: 2,
        }}
      >
        <Box sx={{ width: "50%", p: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#000"
            mb={2}
            sx={{ textTransform: "capitalize" }}
          >
            Interview With:{" "}
            {event.user_det?.candidate?.candidate_firstName || "mohan"}
          </Typography>

          <Typography variant="body2" color="#000" mb={2}>
            Position: {event.job_id?.jobRequest_Title || "django developer"}
          </Typography>

          <Typography
            variant="body2"
            color="#000"
            mb={2}
            sx={{ textTransform: "capitalize" }}
          >
            Created By: {event.user_det?.handled_by?.firstName || "-"}
          </Typography>

          <Typography variant="body2" color="#000" mb={2}>
            Interview Date: {formatDate(event.start) || "29 Aug 2024"}
          </Typography>

          <Typography variant="body2" color="#000" mb={2}>
            Interview Time:{" "}
            {`${formatTime(event.start)} - ${formatTime(event.end)}` ||
              "05 - 06:45 PM"}
          </Typography>

          <Typography variant="body2" color="#000" mb={3}>
            Interview Via: Google Meet
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              endIcon={<DownloadIcon />}
              sx={{
                borderRadius: 1,
                mb: 1,
                textTransform: "none",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                width: "100%",
                color: "primary.main",
                borderColor: "primary.main",
              }}
            >
              Resume.docx
            </Button>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              endIcon={<DownloadIcon />}
              sx={{
                borderRadius: 1,
                textTransform: "none",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                width: "100%",
                color: "primary.main",
                borderColor: "primary.main",
              }}
            >
              Aadharcard
            </Button>
          </Box>
        </Box>
        <Box
          sx={{ border: "0.5px solid #cecece", borderRight: "none", my: 2 }}
        ></Box>
        <Box
          sx={{
            width: "50%",
            p: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={GoogleMeetIcon}
            alt="Google Meet"
            sx={{
              border: "1px solid #cecece",
              borderRadius: 2,
              width: 100,
              height: 100,
              mb: 3,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoin}
            sx={{
              borderRadius: 1,
              px: 4,
              py: 1,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            JOIN
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
