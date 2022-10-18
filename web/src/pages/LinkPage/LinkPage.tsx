import { Component } from "solid-js";
import "./LinkPage.scss";
import LinkServices from "../../components/LinkServices/LinkServices";
import Button from "@suid/material/Button";
import ArrowForwardIosIcon from "@suid/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@suid/material/styles";
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

const LinkPage = () => {
  const history = useHistory();
  const navigateHome = () => {
    history.push("/home");
  };
  return (
    <div class="MainDivAP">
      <div class="RectangleAP">
        <LinkServices />
      </div>
      <div class="RightSideAP">
        <div>
          <span class="AreaTitleAP">AREA</span>
        </div>
        <div>
          <span class="AllTitleAP">Link your account</span>
        </div>
        <div class="containerCreateLP">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={() => navigateHome()}
            >
              <span>Add AREA</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
