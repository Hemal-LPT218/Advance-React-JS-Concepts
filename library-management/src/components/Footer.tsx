import { memo } from "react";
import enJson from "../locales/en.json";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} {enJson.allRightsReserved}
      </p>
    </footer>
  );
};

export default memo(Footer);
