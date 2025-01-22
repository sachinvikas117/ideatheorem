import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderComponent = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#252f3d" }}>
      <Container>
      <Toolbar >
        
      <Box
            component="img"
            src="https://s3-alpha-sig.figma.com/img/462b/2779/970a10c11c4ba0c490943cbe7af03240?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kfoIRacTCE0kXrDWM5HMKsJgpNthUNu3X7odSA3PujL9vW8M8ElsIKrvy70thuQXhc7NPrVRz8GmUaKs4J4NWTLSLZBxgyqVZXWTad3LcoMCpxPvczEcod1i2u9ncfFnQO6-jprfjabbIVHBTGIjMAiJBnOofdsuk~MmwkElHbBsxKKCKmX4oo8aEb2Ik2c2abrGtgZDSsNWxe~nzQFykiXJgDWl7R9LuDSkfQp1xzzIrL1XVjIe-e1df0snSw2ojWgpr0QykrH3xGI4yQjiXQyvSFMu4FF0SMhWLqQaly6Tu7A7n8v-WWPQgDhjg0CYmyQmjND5IAg-ewp2SW428A__" // Replace with your image path
            alt="Header Illustration"
            sx={{
              width: { xs: "100%", sm: "70%" }, // Full width on mobile, smaller on larger screens
              maxWidth: "250px", // Limit maximum size
              height: "auto", // Maintain aspect ratio
            }}
          />
      </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderComponent;
