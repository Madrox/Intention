import { PlusOutlined } from "@ant-design/icons";
import { Affix, Layout, Menu } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Journal, Writing } from "src/Common/models/writing";
import { CreateJournal } from "src/Renderer/components/TopNav/createJournal";
import { TopNav } from "src/Renderer/components/TopNav/TopNav";
import { GlobalRouter } from "src/Renderer/GlobalRouter";

export const GlobalRoot: React.FC = () => {
  const [hide, setHide] = React.useState(false);
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [activeJournal, setActiveJournal] = React.useState<Journal | null>(
    null
  );
  const [writings, setWritings] = React.useState<Writing[]>([]);
  const [showCreate, setShowCreate] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    window.journals.list().then(setJournals);
  }, [showCreate]);

  React.useEffect(() => {
    if (activeJournal) {
      window.writing.list(activeJournal).then(setWritings);
    }
  }, [activeJournal]);

  console.log({ journals });

  return (
    <Layout style={{ height: "100%", minHeight: "100vh" }}>
      <Affix>
        <Layout.Header style={{ position: "relative" }}>
          <TopNav />
        </Layout.Header>
      </Affix>
      <Layout>
        <Layout.Sider collapsible collapsed={hide} onCollapse={setHide}>
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
        </Layout.Sider>
        {activeJournal && writings && (
          <Layout.Sider>
            <Menu mode="inline" style={{ borderRight: 0 }} selectable={false}>
              <Menu.Item
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
                }}
              >
                New Entry
              </Menu.Item>
            </Menu>
            <Menu mode="inline" style={{ borderRight: 0, height: "100%" }}>
              <Menu.Divider />
              {writings &&
                writings.map((entry, i) => (
                  <Menu.Item
                    key={i}
                    onClick={() => {
                      navigate(`/entry/${activeJournal.subdir}/${entry.id}`);
                    }}
                  >
                    {entry.title}
                  </Menu.Item>
                ))}
            </Menu>
          </Layout.Sider>
        )}
        <GlobalRouter />
      </Layout>
      <CreateJournal
        show={showCreate}
        onClose={() => {
          setShowCreate(false);
        }}
      />
    </Layout>
  );
};
