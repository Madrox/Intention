import * as React from "react";
import { Content } from "src/Renderer/components/Layout/Content";

interface Props {
  fullSize?: boolean;
  sidebar?: React.ReactNode;
}

export const View: React.FC<Props> = (props) => {
  return (
    <>
      <Content {...props}>{props.children}</Content>
      {props.sidebar}
    </>
  );
};
