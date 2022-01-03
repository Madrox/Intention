import { Layout } from "antd";
import { SiderProps } from "antd/lib/layout";
import * as React from "react";

type Props = Pick<
  SiderProps,
  "collapsible" | "reverseArrow" | "style" | "width"
>;

export const Sidebar: React.FC<Props> = (props) => {
  return (
    <Layout.Sider
      {...props}
      style={{
        marginTop: 64,
        padding: "1rem",
        ...props.style,
      }}
    >
      {props.children}
    </Layout.Sider>
  );
};
