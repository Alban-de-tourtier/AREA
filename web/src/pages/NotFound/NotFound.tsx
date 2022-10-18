import { Component } from "solid-js";
import "./NotFound.scss";

const NotFound = () => {
  document.body.style.backgroundColor = "#D8EEFE";
  return (
    <div class="MainNF">
      <div class="MidTitleNF">
        <span class="AreaTitleNF">AREA</span>
      </div>
      <div class="MidTitleNF">
        <span class="NotFoundTitleNF">404</span>
        <div class="LineSeparationNF" />
        <span class="NotFoundTitleNF">Not Found</span>
      </div>
    </div>
  );
};

export default NotFound;
