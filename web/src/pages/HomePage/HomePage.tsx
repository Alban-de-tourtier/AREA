import type { Component } from "solid-js";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import MyAreas from "../../components/MyAreas/MyAreas";
import AddArea from "../../components/AddArea/AddArea";
import "./HomePage.scss";
import { useHistory } from "@gh0st-work/solid-js-router";

const theme = createTheme({
  typography: {
    button: {
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "28px",
      fontWeight: "400px",
    },
  },
  palette: {
    primary: {
      main: "#EF4565",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const HomePage = () => {
  document.body.style.backgroundColor = "#ffffff";
  const history = useHistory();
  const navigateLink = (): void => {
    history.push("/link");
  };
  return (
    <div class="DivHomeHM">
      <div class="DivAddHM">
        <AddArea />
      </div>
      <div class="DivAddHM">
        <MyAreas />
      </div>
      <div class="SecondDivH">
        <div>
          <span class="AreaTitleH">AREA</span>
        </div>
        <div>
          <span class="AllTitleH">All AREAs</span>
        </div>
        <div class="ButtonLinkH">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="LinkButtonH"
              onClick={() => navigateLink()}
            >
              <span>Link your accounts</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary" class="CreateButtonH">
              <span>Sign out</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
