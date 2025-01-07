import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { PAGE_ROUTES_NAME, ROUTES_URL } from "../constants";
import { memo, useEffect, useMemo } from "react";
import enJson from "../locales/en.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { RootState } from "../store/store";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NAVIGATION: Navigation = [
  {
    segment: PAGE_ROUTES_NAME.ADMIN_HOME,
    title: enJson.dashboard,
    icon: <DashboardIcon />,
  },
  {
    segment: PAGE_ROUTES_NAME.BOOK_LIST,
    title: enJson.book,
    icon: <LibraryAddIcon />,
  },
  {
    segment: PAGE_ROUTES_NAME.ASSIGNED_BOOK_LIST,
    title: enJson.assignedBook,
    icon: <LibraryAddCheckIcon />,
  },
];

const SidebarFooter = ({ mini }: SidebarFooterProps) => {
  return (
    <Typography variant="caption" className="!m-3">
      {mini
        ? "© LMS"
        : `© ${new Date().getFullYear()} ${enJson.allRightsReserved}`}
    </Typography>
  );
};

const AdminDashboardLayout: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const router = useDemoRouter(
    window.location.pathname || ROUTES_URL.ADMIN_HOME
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    router.navigate(router.pathname);
    navigate(router.pathname);
  }, [navigate, router, router.pathname]);

  const authentication = useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        toast.success(enJson.accountLoggedOut);
        dispatch(logout());
      },
    };
  }, [dispatch]);

  return (
    <AppProvider
      session={{
        user: {
          id: user?.id,
          name: user?.fullName,
          email: user?.email,
        },
      }}
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      authentication={authentication}
      branding={{
        logo: (
          <LibraryBooksIcon
            color="primary"
            fontSize="large"
            className="!h-full"
          />
        ),
        title: enJson.libraryManagementSystem,
        homeUrl: ROUTES_URL.ADMIN_HOME,
      }}
    >
      <DashboardLayout slots={{ sidebarFooter: SidebarFooter }}>
        <div className="p-10">{children}</div>
      </DashboardLayout>
    </AppProvider>
  );
};

export default memo(AdminDashboardLayout);
