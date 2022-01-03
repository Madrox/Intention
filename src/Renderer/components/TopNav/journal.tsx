import { List, Typography } from "antd";
import * as React from "react";
import { Journal } from "src/Common/models/writing";
import "./index.css";

type Props = {
  updated: boolean;
};

export const Journals: React.FC<Props> = (props) => {
  const { updated } = props;
  const [journals, setJournals] = React.useState<Journal[]>([]);
  React.useEffect(() => {
    window.journals.list().then(setJournals);
  }, [updated]);

  return (
    <List
      dataSource={journals}
      renderItem={(journal) => (
        <List.Item>
          <Typography.Text strong>{journal.name}</Typography.Text>
        </List.Item>
      )}
    />
  );
};
