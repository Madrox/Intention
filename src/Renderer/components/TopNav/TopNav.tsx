import { Col, Row } from "antd";
import * as React from "react";
import { CreateJournal } from "src/Renderer/components/TopNav/createJournal";
import "./index.css";

export const TopNav: React.FC = () => {
  // const [show, setShow] = React.useState(false);
  const [showCreate, setShowCreate] = React.useState(false);

  return (
    <>
      <div
        className={"drag"}
        style={{
          height: "100%",
          left: 0,

          position: "absolute",

          top: 0,

          width: "100%",
          zIndex: -1,
        }}
      ></div>
      <div
        className={"no-drag"}
        style={{
          cursor: "pointer",
          display: "flex",
          height: 20,
          placeItems: "center",
          position: "absolute",
          right: 0,
          textAlign: "center",
          top: 0,
          width: 20,
        }}
        onClick={() => {
          window.top.close();
          return false;
        }}
      >
        <span>&#10006;</span>
      </div>
      <Row
        wrap={false}
        justify="space-between"
        align="middle"
        gutter={24}
        style={{
          height: "100%",
          position: "relative",
        }}
      >
        <Col
          className={"no-drag"}
          style={{
            display: "flex",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* <Popover
            title={
              <Row justify="space-between" align="middle" gutter={24}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Journals
                  </Typography.Title>
                </Col>
                <Col>
                  <Tooltip title="New Journal">
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setShow(false);
                        setShowCreate(true);
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            }
            trigger="click"
            placement="bottomLeft"
            visible={show}
            onVisibleChange={setShow}
            content={<Journals updated={showCreate} />}
          >
            <Button icon={<MenuOutlined />} />
          </Popover> */}
        </Col>
        <Col
          className={"no-drag"}
          style={{
            alignItems: "center",
            columnGap: "2rem",
            display: "flex",
            position: "relative",
            zIndex: 1,
          }}
        ></Col>
      </Row>
      <CreateJournal
        show={showCreate}
        onClose={() => {
          setShowCreate(false);
        }}
      />
    </>
  );
};
