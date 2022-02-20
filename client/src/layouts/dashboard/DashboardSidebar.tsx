import { Box, Link, Drawer, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";

import { MHidden, Width } from "../../components/@material-extend";
import { selectEmployee } from "../../store/slices/auth";
import { useAppSelector } from "../../store/hooks";
import Logo from "../../components/Logo";
import NavSection from "../../components/NavSection";
import sidebarConfig from "./SidebarConfig";
import UserAvatar from "../../components/UserAvatar";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }: { [key: string]: any }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

interface DashboardSidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: (
    event?: {},
    reason?: "backdropClick" | "escapeKeyDown"
  ) => void;
}

export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const employee = useAppSelector(selectEmployee);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <UserAvatar name={employee?.name} surname={employee?.surname} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {employee?.name} {employee?.surname}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {employee?.title}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </>
  );

  return (
    <RootStyle>
      <MHidden width={Width.lgUp}>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width={Width.lgDown}>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
