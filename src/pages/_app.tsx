import { type AppType } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />;
      <ToastContainer />
    </>
  );
};

export default trpc.withTRPC(MyApp);
