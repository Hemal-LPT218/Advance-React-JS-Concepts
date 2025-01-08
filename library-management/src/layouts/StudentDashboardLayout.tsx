import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import HeaderTitle from "../components/HeaderTitle";
import Footer from "../components/Footer";
import { logout } from "../store/userSlice";
import { RootState } from "../store/store";
import enJson from "../locales/en.json";

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

  const AppTitle = useCallback(() => {
    return <HeaderTitle />;
  }, []);

  return (
    <AppProvider
      session={{
        user: {
          id: user?.id,
          name: user?.fullName,
          email: user?.email,
          image: "/profileIcon.png",
        },
      }}
      theme={theme}
      authentication={authentication}
    >
      <DashboardLayout hideNavigation slots={{ appTitle: AppTitle }}>
        <div className="h-full overflow-auto">{children}</div>

        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
};

export default memo(StudentDashboardLayout);
