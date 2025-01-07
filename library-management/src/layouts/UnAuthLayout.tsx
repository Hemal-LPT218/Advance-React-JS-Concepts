import { createTheme } from "@mui/material/styles";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ROUTES_URL } from "../constants";
import { memo } from "react";
import enJson from "../locales/en.json";
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
  return (
    <AppProvider
      theme={theme}
      branding={{
        logo: (
          <LibraryBooksIcon
            color="primary"
            fontSize="large"
            className="!h-full"
          />
        ),
        title: enJson.libraryManagementSystem,
        homeUrl: ROUTES_URL.HOME,
      }}
    >
      <DashboardLayout hideNavigation>
        <div className="h-full overflow-auto">{children}</div>
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
};

export default memo(UnAuthLayout);