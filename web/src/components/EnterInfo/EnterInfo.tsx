import { Component, createSignal } from "solid-js";
import "./EnterInfo.scss";
import Button from "@suid/material/Button";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import TextField from "@suid/material/TextField";
import axios from "axios";
import { useHistory } from "@gh0st-work/solid-js-router";

const themeSignin = createTheme({
  typography: {
    button: {
      width: "465.52px",
      height: "78.63px",
      fontFamily: "Orbitron",
      textTransform: "none",
      fontSize: "28px",
      fontWeight: "400px",
    },
  },
  palette: {
    primary: {
      main: "#3DA9FC",
      contrastText: "#ffffff", //button text white instead of black
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const themePassword = createTheme({
  typography: {
    button: {
      width: "280px",
      height: "34.52px",
      fontFamily: "Work sans",
      textTransform: "none",
      fontSize: "24px",
      fontWeight: "300",
      lineHeight: "28px",
      borderBottom: "1px solid #5F6C7B",
    },
  },
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: {
      main: "#5F6C7B",
    },
  },
});

async function LogInRoute(
  valueEmail: string,
  valuePassword: string,
  navigateHome: Function
) {
  const body = { email: valueEmail, password: valuePassword };
  axios.defaults.withCredentials = true;
  const response = await axios.post(`http://localhost:8080/auth/login`, body, {
    withCredentials: true,
  });
  if (response.status == 200) navigateHome();
}

const EnterInfo = () => {
  const history = useHistory();
  const navigateHome = () => {
    history.push("/home");
  };
  const [valuePassword, setPassword] = createSignal<string>("");
  const [valueEmail, setEmail] = createSignal<string>("");
  return (
    <div class="RectangleEnterInfo">
      <div class="ContainerWelcome">
        <span class="WelcomeTitle">Welcome back</span>
      </div>
      <div>
        <TextField
          id="emailLogin"
          label="Enter your e-mail"
          variant="standard"
          class="ToolsTextField"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="PasswordLogin"
          label="Password"
          variant="standard"
          class="ToolsTextField"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class="ContainerLogin">
        <ThemeProvider theme={themeSignin}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              LogInRoute(valueEmail(), valuePassword(), navigateHome)
            }
          >
            <span>Sign in</span>
          </Button>
        </ThemeProvider>
      </div>
      <div>
        <ThemeProvider theme={themePassword}>
          <Button>I forgot my password</Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default EnterInfo;
