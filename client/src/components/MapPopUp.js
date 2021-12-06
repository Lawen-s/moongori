import React, { useEffect } from "react";
import ReactDom from "react-dom";

export default function MapPopUp({ children }) {
  const el = document.getElementById("popupDom");
  return ReactDom.createPortal(children, el);
}
