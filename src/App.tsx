import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import MyRouter from "./providers/Router.tsx";
import theme from "./styles/theme.ts";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyRouter />
      </ThemeProvider>
  );
}

export default App
