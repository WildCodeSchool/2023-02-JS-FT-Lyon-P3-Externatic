import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
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
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import logo from "../assets/externatic-logo-long.png";
import { useCandidateContext } from "../Contexts/CandidateContext";
import { useCompanyContext } from "../Contexts/CompanyContext";

export default function Navbar({ toggleColorMode }) {
  const { candidate, logoutCandidate } = useCandidateContext();
  const { company, logoutCompany } = useCompanyContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNavMenu, setAnchorElNavMenu] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNavMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNavMenu(null);
  };

  const handleLinkHome = () => {
    navigate("/");
    setAnchorElNavMenu(null);
  };
  const handleLinkAdds = () => {
    navigate("/annonces");
    setAnchorElNavMenu(null);
  };
  const handleLinkBlog = () => {
    navigate("/blog");
    setAnchorElNavMenu(null);
  };
  const handleLinkLogin = () => {
    setAnchorElUser(null);
    navigate("/login");
  };
  const handleLogoutCandidate = () => {
    logoutCandidate();
    setAnchorElUser(null);
  };
  const handleLogoutCompany = () => {
    logoutCompany();
    setAnchorElUser(null);
  };

  const handleLinkUser = () => {
    navigate("/espace-candidat");
    setAnchorElUser(null);
  };

  const handleLinkCompany = () => {
    navigate("/espace-pro");
    setAnchorElUser(null);
  };

  const handleLinkAdmin = () => {
    navigate("/admin");
    setAnchorElUser(null);
    setAnchorElNavMenu(null);
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  let imagePath;
  if (candidate.id && candidate.picture) {
    imagePath = `${BACKEND_URL}/picture/${candidate.picture}`;
  } else if (company.id && company.picture) {
    imagePath = `${BACKEND_URL}/picture/${company.picture}`;
  } else {
    imagePath = null;
  }

  return (
    <AppBar position="sticky" color="secondary">
      <Container maxWidth="xxl">
        <Toolbar
          disableGutters
          sx={{
            "@media (max-width: 768px)": {
              justifyContent: "space-evenly",
            },
          }}
        >
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <img src={logo} alt="logo" width="200px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{
                mt: "45px",
              }}
              id="NavMenu"
              anchorEl={anchorElNavMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNavMenu)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={handleLinkHome}>
                <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                  Accueil
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLinkAdds}>
                <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                  Annonces
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLinkBlog}>
                <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                  Blog
                </Typography>
              </MenuItem>
              {candidate.admin === 1 ? (
                <MenuItem onClick={handleLinkAdmin}>
                  <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                    Espace Admin
                  </Typography>
                </MenuItem>
              ) : null}
            </Menu>
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
                <Typography sx={{ ml: 1 }}>Accueil</Typography>
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
                <Typography sx={{ ml: 1 }}>Annonces</Typography>
              </Box>
            </Button>
            <Button
              onClick={handleLinkBlog}
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
                <Typography sx={{ ml: 1 }}>Blog</Typography>
              </Box>
            </Button>
            {candidate.admin === 1 || company.admin === 1 ? (
              <Button
                onClick={handleLinkAdmin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex", alignItems: "center" },
                    pl: 5,
                  }}
                >
                  <BuildRoundedIcon />
                  <Typography sx={{ ml: 1 }}>Admin</Typography>
                </Box>
              </Button>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              "@media (max-width: 768px)": {
                marginRight: "1rem",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="colorMode"
              onClick={toggleColorMode}
              color="primary"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon sx={{ color: "white" }} />
              )}
            </IconButton>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Espace Utilisateur">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={imagePath}
                    alt="Avatar"
                    sx={{ maxWidth: "100%" }}
                  />
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
                {candidate.id ? (
                  <MenuItem onClick={handleLinkUser}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Espace Candidat
                    </Typography>
                  </MenuItem>
                ) : null}
                {company.id ? (
                  <MenuItem onClick={handleLinkCompany}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Espace Pro
                    </Typography>
                  </MenuItem>
                ) : null}
                {candidate.admin === 1 || company.admin === 1 ? (
                  <MenuItem onClick={handleLinkAdmin}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Espace Admin
                    </Typography>
                  </MenuItem>
                ) : null}
                {candidate.id ? (
                  <MenuItem onClick={handleLogoutCandidate}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Logout
                    </Typography>
                  </MenuItem>
                ) : null}
                {company.id ? (
                  <MenuItem onClick={handleLogoutCompany}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Logout
                    </Typography>
                  </MenuItem>
                ) : null}
                {!candidate.id && !company.id ? (
                  <MenuItem onClick={handleLinkLogin}>
                    <Typography textAlign="center" variant="h6" sx={{ p: 2 }}>
                      Login
                    </Typography>
                  </MenuItem>
                ) : null}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.propTypes = {
  toggleColorMode: PropTypes.func.isRequired,
};
