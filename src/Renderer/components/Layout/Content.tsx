import { Layout } from "antd";
import * as React from "react";

type Props = {
  fullSize?: boolean;
};

export const Content: React.FC<Props> = (props) => {
  return (
    <Layout.Content
      style={{
        height: "100%",
        padding: props.fullSize ? "0" : "2rem 5rem 2rem 5rem",
      }}
    >
      {props.children}
    </Layout.Content>
  );
};
