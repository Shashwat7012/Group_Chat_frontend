import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      bgcolor="#f0f4f8" // Subtle light background color
      border="1px solid #ddd" // Soft border to separate content
      borderBottom="10px solid #3D5A80" // Adding some color with the bottom border
      sx={{
        padding: "20px",
      }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight={700}
        sx={{
          color: "#2D3E50", // Matching primary color
          marginBottom: 3,
        }}
      >
        Welcome to Our Real-Time Collaboration Platform!
      </Typography>

      <Typography
        variant="h5"
        textAlign="center"
        sx={{
          color: "#3D5A80", // Secondary color for subtitle
          marginBottom: 4,
        }}
      >
        Stay connected with your teams and engage in seamless communication with real-time chat and group management features. Create your groups, join public channels, and start collaborating today!
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        {/* Button to navigate to a relevant section */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/app/createGroup"
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#3D5A80", // Hover effect
            },
          }}
        >
          Create a Group
        </Button>

        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/public-groups"
          sx={{
            padding: "12px 24px",
            fontSize: "16px",
            textTransform: "none",
            borderColor: "white",
            "&:hover": {
              // backgroundColor: "#3D5A80",
              color: "primary",
            },
          }}
        >
          Explore Public Groups
        </Button>
      </Box>

      {/* Optional: A small description of the platform's features */}
      <Box
        mt={6}
        sx={{
          textAlign: "center",
          maxWidth: "800px",
          fontSize: "16px",
          color: "#555", // Neutral text color for the description
        }}
      >
        <Typography>
          Our platform offers a smooth, real-time experience where you can connect with colleagues, share ideas, and manage projects without the hassle. All your chat and group-related interactions happen instantly, thanks to our efficient backend APIs.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
