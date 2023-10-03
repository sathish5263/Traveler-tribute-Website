import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show} // true -> render
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter // if (in)true it invoke this component to render int the dom
      unmountOnExit // if (in)false it will get the component from the dom
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
