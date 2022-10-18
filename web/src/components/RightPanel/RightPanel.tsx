import * as Solid from "solid-js";
import "./RightPanel.scss";
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

const google = createTheme({
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
      main: "#ffffff",
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const account = createTheme({
  typography: {
    button: {
      width: "322px",
      height: "36px",
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "20px",
      fontWeight: "300",
      lineHeight: "23px",
    },
  },
  palette: {
    primary: {
      main: "#5F6C7B",
    },
  },
});
const RightPanel = () => {
  const history = useHistory();
  const navigateSignUp = () => {
    history.push("/signup");
  };
  return (
    <div class="firstDiv">
      <div>
        <span class="areaTitle">Area</span>
      </div>
      <div class="containerLogin">
        <span class="loginTitle">Log in</span>
      </div>
      <div class="secondDiv">
        <div class="accountButton">
          <ThemeProvider theme={account}>
            <Button>Don't have an account yet?</Button>
          </ThemeProvider>
        </div>
        <div class="containerCreate">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={navigateSignUp}
            >
              <span>Create an account</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
        <div>
          <div
            id="g_id_onload"
            data-client_id="722073137151-joadcq1m38ej627pbu7sc4ki8camd6n9.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:8080/auth/google"
            data-auto_select="true"
            data-itp_support="true"
          />

          <div
            class="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-width="350"
            data-locale="en-US"
            data-logo_alignment="left"
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
