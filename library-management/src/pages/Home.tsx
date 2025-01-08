import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_URL } from "../constants";
import ButtonComponent from "../components/ButtonComponent";
import HeadingText from "../components/HeadingText";
import enJson from "../locales/en.json";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (routeUrl: ROUTES_URL) => {
      navigate(routeUrl);
    },
    [navigate]
  );

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-8 px-4 h-full">
      <HeadingText>{enJson.manageLibrary}</HeadingText>

      <p className="text-center">{enJson.getStartedExperience}</p>

      <div className="flex space-x-4">
        <ButtonComponent onClick={() => handleNavigation(ROUTES_URL.LOGIN)}>
          {enJson.login}
        </ButtonComponent>

        <ButtonComponent
          onClick={() => handleNavigation(ROUTES_URL.REGISTER)}
          variant="outlined"
        >
          {enJson.register}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default memo(Home);
