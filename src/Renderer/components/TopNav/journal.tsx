import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Typography } from "antd";
import * as React from "react";
import { Journal } from "src/Common/models/writing";
import { CreateJournal } from "src/Renderer/components/TopNav/createJournal";
import "./index.css";

type Props = {
  onSelect: (journal: Journal) => void;
};

export const Journals: React.FC<Props> = (props) => {
  const { onSelect } = props;
  const [journals, setJournals] = React.useState<Journal[]>([]);
  const [showCreate, setShowCreate] = React.useState(false);
  React.useEffect(() => {
    window.journals.list().then(setJournals);
  }, [showCreate]);

  return (
    <>
      <Dropdown
        // title={
        //   <Row justify="space-between" align="middle" gutter={24}>
        //     <Col>
        //       <Typography.Title level={4} style={{ margin: 0 }}>
        //         Journals
        //       </Typography.Title>
        //     </Col>
        //     <Col>
        //       <Tooltip title="New Journal">
        //         <Button
        //           size="small"
        //           icon={<PlusOutlined />}
        //           onClick={() => {
        //             setShowPopover(false);
        //             setShowCreate(true);
        //           }}
        //         />
        //       </Tooltip>
        //     </Col>
        //   </Row>
        // }
        trigger={["click"]}
        placement="bottomLeft"
        onVisibleChange={() => {
          window.journals.list().then(setJournals);
        }}
        // visible={showPopover}
        // onVisibleChange={setShowPopover}
        overlay={
          <Menu style={{ borderRight: 0, height: "100%" }}>
            <Menu.Item
              key="create"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowCreate(true);
              }}
            >
              New Journal
            </Menu.Item>

            <Menu.Divider />
            {journals &&
              journals.map((journal, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => {
                    onSelect(journal);
                  }}
                >
                  <Typography.Text strong>{journal.name}</Typography.Text>
                </Menu.Item>
              ))}
          </Menu>
        }
      >
        <Button icon={<MenuOutlined />} />
      </Dropdown>

      <CreateJournal
        show={showCreate}
        onClose={() => {
          setShowCreate(false);
        }}
      />
    </>
  );
};
