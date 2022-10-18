import { Component } from "solid-js";
import "./ChooseService.scss";

const ChooseService = () => {
  return (
    <div class="RectangleCS">
      <div class="TitleCS">
        <div>
          <span class="TitleChooseServiceCS">Choose service</span>
        </div>
        <div>
          <span class="TitleTriggerCS">This service will trigger the area</span>
        </div>
      </div>
      <div class="DivActionCS">
        <div class="WipServiceCS">
          <span>Available service</span>
        </div>
        <div class="DivLineCS">
          <div class="LineCS" />
        </div>
        <div class="LeftPanelCS">
          <div>
            <span class="TitleActionCS">Actions</span>
          </div>
          <div>
            <span class="TitlePossibleActionCS">
              Choose a service to display possible actions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseService;
