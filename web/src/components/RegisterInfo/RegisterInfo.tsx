import * as Solid from "solid-js";
import "./RegisterInfo.scss";
import Button from "@suid/material/Button";
import { AiOutlineGoogle } from "solid-icons/ai";
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

function RegisterInfo() {
  const history = useHistory();
  const navigateSignIn = () => {
    history.push("/signin");
  };
  return (
    <div class="firstDiv">
      <div>
        <span class="areaTitle">Area</span>
      </div>
      <div class="containerLogin">
        <span class="loginTitle">Register</span>
      </div>
      <div class="secondDiv">
        <div class="accountButton">
          <ThemeProvider theme={account}>
            <Button>Already have an account?</Button>
          </ThemeProvider>
        </div>
        <div class="containerCreate">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              class="createButton"
              onClick={navigateSignIn}
            >
              <span>Log in</span>
              <ArrowForwardIosIcon />
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default RegisterInfo;
