import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Affix,
  Col,
  Layout,
  Menu,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Journal, Writing } from "src/Common/models/writing";
import { Journals } from "src/Renderer/components/TopNav/journal";
import { GlobalRouter } from "src/Renderer/GlobalRouter";

export const GlobalRoot: React.FC = () => {
  const [hide, setHide] = React.useState(false);
  const [activeJournal, setActiveJournal] = React.useState<Journal | null>(
    null
  );
  const [writings, setWritings] = React.useState<Writing[]>([]);
  // const [showPopover, setShowPopover] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeJournal) {
      setHide(false);
      window.writing.list(activeJournal).then(setWritings);
    }
  }, [activeJournal]);

  console.log({ writings });

  return (
    <Layout style={{ height: "100%", minHeight: "100vh" }}>
      <Affix>
        <Layout.Header style={{ position: "relative" }}>
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
              <Space direction="horizontal" size="large">
                <Journals
                  onSelect={(j) => {
                    setActiveJournal(j);
                  }}
                />
                <Typography.Title level={2} style={{ margin: 0 }}>
                  Intention
                </Typography.Title>
              </Space>
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
        </Layout.Header>
      </Affix>
      <Layout>
        {/* <Layout.Sider collapsible collapsed={hide} onCollapse={setHide}>
          <Menu mode="inline" style={{ borderRight: 0 }} selectable={false}>
            <Menu.Item
              icon={<PlusOutlined />}
              onClick={() => {
                setShowCreate(true);
              }}
            >
              New Journal
            </Menu.Item>
          </Menu>
          <Menu mode="inline" style={{ borderRight: 0, height: "100%" }}>
            <Menu.Divider />
            {journals &&
              journals.map((journal, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => {
                    setActiveJournal(journal);
                  }}
                >
                  {journal.name}
                </Menu.Item>
              ))}
          </Menu>
        </Layout.Sider> */}
        {activeJournal && writings && (
          <Layout.Sider collapsible collapsed={hide} onCollapse={setHide}>
            <Menu mode="inline" style={{ borderRight: 0 }} selectable={false}>
              <Menu.Item
                key="new entry"
                icon={<PlusOutlined />}
                onClick={() => {
                  const entry = {
                    addDate: new Date(),
                    id: new Date().getTime().toString(),
                    text: "",
                    title: "New Entry",
                    updateDate: new Date(),
                  } as Writing;
                  window.writing.save(activeJournal, entry);
                  window.writing.list(activeJournal).then(setWritings);
                  navigate(`/entry/${activeJournal.subdir}/${entry.id}`);
                  setActiveJournal(null);
                }}
              >
                New Entry
              </Menu.Item>
            </Menu>
            <Menu mode="inline" style={{ borderRight: 0, height: "100%" }}>
              <Menu.Divider />
              {writings &&
                writings
                  .sort(
                    (a, b) =>
                      new Date(a.addDate).getTime() -
                      new Date(b.addDate).getTime()
                  )
                  .map((entry, i) => (
                    <Menu.Item
                      key={i}
                      onClick={() => {
                        navigate(`/entry/${activeJournal.subdir}/${entry.id}`);
                        setHide(true);
                      }}
                    >
                      {entry.title && entry.title.length > 0 ? (
                        entry.title
                      ) : (
                        <i>No title</i>
                      )}
                    </Menu.Item>
                  ))}
              <Menu.Divider />
              <Menu.Item key="del-menu" danger icon={<DeleteOutlined />}>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    window.journals.delete(activeJournal);
                    navigate("/");
                    setActiveJournal(null);
                  }}
                >
                  Delete
                </Popconfirm>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
        )}
        <GlobalRouter />
      </Layout>
    </Layout>
  );
};
