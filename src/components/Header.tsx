import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useGetGroupAnalyticsQuery } from "../services/api";
import { motion } from "framer-motion"; // Subtle animations

const Header = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Fetch Group Analytics Data
  const { data, isLoading } = useGetGroupAnalyticsQuery(
    { id: id ?? "" },
    { skip: !id }
  );

  if (isLoading) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  // Extract Group Analytics Data
  const groupName = data?.data?.group?.name || "Unknown Group";
  const adminName = data?.data?.group?.admin?.name || "Unknown Admin";
  const members = data?.data?.group?.members || [];
  const type = data?.data?.group?.type || "unknown";

  return (
    <>
      {/* Header */}
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <AppBar
          position="static"
          sx={{
            borderRadius: "15px",
            background: "linear-gradient(135deg, #5f6e8e, #2c3e50)", // Gradient for added depth
            padding: "12px 24px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
            zIndex: 1200,
          }}
        >
          <Toolbar
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Avatar with Hover Effect */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
            >
              <Avatar
                sx={{
                  mr: 2,
                  cursor: "pointer",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                  border: "2px solid #fff",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.15) rotate(10deg)", // Smooth rotation
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)", // Elevated shadow
                  },
                }}
                alt={name}
                src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
              />
            </motion.div>

            {/* Group Name (Center-aligned) */}
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: "#fff",
                textAlign: "center",
                letterSpacing: "2px", // Modern letter spacing
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Enhanced text shadow
              }}
            >
              {name}
            </Typography>

            {/* Close Button */}
            <Box
              padding={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              bgcolor="white"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ecf0f1",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                },
              }}
              onClick={() => navigate("/app")}
            >
              <CloseIcon sx={{ color: "#34495e" }} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Group Analytics Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        sx={{
          backgroundColor: "transparent",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: "-20px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#34495e",
              color: "#fff",
              padding: "16px 24px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Group Analytics
          </DialogTitle>

          <DialogContent
            sx={{
              padding: "24px",
              backgroundColor: "#ecf0f1",
              borderRadius: "8px", // Round corners for smooth feel
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Group Name: <span style={{ fontWeight: 600 }}>{groupName}</span>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Admin: <span style={{ fontWeight: 600 }}>{adminName}</span>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Type: <span style={{ fontWeight: 600 }}>{type}</span>
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Members:
            </Typography>
            <Box sx={{ marginLeft: 2 }}>
              {members.length > 0 ? (
                members.map((member) => (
                  <Typography key={member._id} variant="body2">
                    • {member.name}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No members available</Typography>
              )}
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              padding: "12px 24px",
              backgroundColor: "#ecf0f1",
              borderRadius: "0 0 12px 12px",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              color="primary"
              sx={{
                color: "#34495e",
                fontWeight: "600",
                textTransform: "uppercase",
                borderRadius: "20px",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "#d5d8dc",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </>
  );
};

export default Header;
