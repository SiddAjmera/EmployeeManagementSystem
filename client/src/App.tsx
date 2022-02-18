import Router from "./routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}

export default App;