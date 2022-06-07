import { StateProvider } from "../stateProvider";
import reducer, { initialState } from "./../reducer";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import "../styles/globals.css";
import PageTransition from "../components/PageTransition";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          <PageTransition>
            <Component {...pageProps} data-theme="garden" />
          </PageTransition>
        </AnimatePresence>
      </AnimateSharedLayout>
    </StateProvider>
  );
}

export default MyApp;
