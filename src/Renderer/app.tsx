import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { GlobalRoot } from "src/Renderer/GlobalRoot";

function render() {
  // TODO: this doesn't quite serialize right, but at least it doesn't serialize to {}
  Object.defineProperty(RegExp.prototype, "toJSON", {
    value: RegExp.prototype.toString,
  });

  const root = document.createElement("div");
  root.classList.add("root");
  document.body.appendChild(root);
  ReactDOM.render(
    <HashRouter>
      <GlobalRoot />
    </HashRouter>,
    root
  );
}

render();
