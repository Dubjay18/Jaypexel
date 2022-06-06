import { StateProvider } from "../stateProvider";
import reducer, { initialState } from "./../reducer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </AnimateSharedLayout>
    </StateProvider>
  );
}

export default MyApp;
