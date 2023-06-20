import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import logo from "../assets/externatic-logo-long.png";
import profilePic from "../assets/profilePicture.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate("/profile-candidate");
  };

  const handleLinkHome = () => {
    navigate("/");
  };
  const handleLinkAdds = () => {
    navigate("/annonces");
  };

  return (
    <AppBar position="sticky" color="secondary">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <img src={logo} alt="logo" width="200px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleLinkHome}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              pl: 5,
              flexGrow: 3,
            }}
          >
            <Button
              onClick={handleLinkHome}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    alignItems: "center",
                  },
                  pl: 5,
                }}
              >
                <HomeRoundedIcon />
                <Typography>Accueil</Typography>
              </Box>
            </Button>

            <Button
              onClick={handleLinkAdds}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", alignItems: "center" },
                  pl: 5,
                }}
              >
                <LibraryBooksRoundedIcon />
                <Typography>Annonces</Typography>
              </Box>
            </Button>
            <Button
              onClick={handleLinkAdds}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", alignItems: "center" },
                  pl: 5,
                }}
              >
                <RssFeedRoundedIcon />
                <Typography>Blog</Typography>
              </Box>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Aline Sharp" src={profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLinkHome}>
                <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                  Espace Candidat
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLinkAdds}>
                <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
