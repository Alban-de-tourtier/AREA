import { Component, createSignal, createMemo } from "solid-js";
import "./LinkServices.scss";
import Button from "@suid/material/Button";
import axios from "axios";
import { useHistory } from "@gh0st-work/solid-js-router";

const [valueLink, setLink] = createSignal<string>("");

async function autoYoutube(navigateYt: void): Promise<void> {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`http://localhost:8080/authorize/youtube`, {
    withCredentials: true,
  });
  if (response.status == 200) setLink(response.data.authorizationURL);
  navigateYt;
}

const LinkServices = () => {
  const history = useHistory();
  const navigateYt = createMemo((): void => {
    history.push(valueLink());
  });
  return (
    <div class="RectangleCS">
      <div class="TitleCS">
        <div>
          <span class="TitleChooseServiceCS">Our services</span>
        </div>
        <div>
          <span class="TitleTriggerCS">
            Link your different account to have a global access
          </span>
        </div>
      </div>
      <div class="DivActionCS">
        <div class="WipServiceCS">
          <Button
            variant="contained"
            color="primary"
            onClick={() => autoYoutube(navigateYt())}
          >
            <span>Youtube</span>
          </Button>
          {/* <span>Available service</span> */}
        </div>
      </div>
    </div>
  );
};

export default LinkServices;
