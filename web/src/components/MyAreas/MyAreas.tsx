import { Component } from "solid-js";
import "./MyAreas.scss";

const MyAreas = () => {
  return (
    <div class="SquareAreaMA">
      <div class="DivStatusAM">
        <span class="TitleAM">Status</span>
      </div>
      <div class="DivServicesAM">
        <span class="TitleAM">Services</span>
      </div>
      <div class="DivActReactAM">
        <div class="DivActionAM">
          <span class="TitleAM">Action</span>
        </div>
        <div class="LineAreaAM" />
        <div class="DivReactionAM">
          <span class="TitleAM">Reaction</span>
        </div>
      </div>
    </div>
  );
};

export default MyAreas;
