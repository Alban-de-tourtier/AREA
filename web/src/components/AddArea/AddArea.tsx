import { Component } from "solid-js";
import "./AddArea.scss";
import ControlPointIcon from "@suid/icons-material/ControlPoint";
import { useHistory } from "@gh0st-work/solid-js-router";

const AddArea = () => {
  const history = useHistory();
  const navigateAction = () => {
    history.push("/action");
  };
  return (
    <div class="SquareAddAD" onClick={navigateAction}>
      <div class="DivIconAD">
        <ControlPointIcon class="IconAD" sx={{ fontSize: "128px" }} />
      </div>
      <div class="DivTitleAD">
        <span class="TitleNewAD">Add a new AREA</span>
      </div>
    </div>
  );
};

export default AddArea;
