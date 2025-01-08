import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ROUTES_URL } from "../constants";
import HeaderTitle from "../components/HeaderTitle";
import Footer from "../components/Footer";

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

const UnAuthLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const navigate = useNavigate();

  const AppTitle = useCallback(() => {
    return <HeaderTitle onClick={() => navigate(ROUTES_URL.HOME)} />;
  }, [navigate]);

  return (
    <AppProvider theme={theme}>
      <DashboardLayout hideNavigation slots={{ appTitle: AppTitle }}>
        <div className="h-full overflow-auto">{children}</div>

        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
};

export default memo(UnAuthLayout);
