import { createTheme } from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ROUTES_URL } from "../constants";
import { memo, useMemo } from "react";
import enJson from "../locales/en.json";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { RootState } from "../store/store";
import Footer from "../components/Footer";
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

const StudentDashboardLayout: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

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
        homeUrl: ROUTES_URL.STUDENT_HOME,
      }}
    >
      <DashboardLayout hideNavigation>
        <div className="h-full">{children}</div>
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
};

export default memo(StudentDashboardLayout);
