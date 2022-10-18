import { Component } from "solid-js";
import "./ActionPage.scss";
import ChooseService from "../../components/ChooseService/ChooseService";

const ActionPage = () => {
  return (
    <div class="MainDivAP">
      <div class="RectangleAP">
        <ChooseService />
      </div>
      <div class="RightSideAP">
        <div>
          <span class="AreaTitleAP">AREA</span>
        </div>
        <div>
          <span class="AllTitleAP">Action service</span>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
