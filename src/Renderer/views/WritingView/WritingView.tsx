import { Col, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { Journal, Writing } from "src/Common/models/writing";
import { getRelativeDate } from "src/Common/use-i18n";
import { View } from "src/Renderer/components/Layout/View";
import "./index.css";

export const WritingView: React.FC = () => {
  const { id, subdir } = useParams<{ id: string; subdir: string }>();

  const [journal, setJournal] = useState<Journal | null>(null);

  const [entry, setEntry] = useState<Writing | null>(null);

  useEffect(() => {
    window.journals.list().then((journals) => {
      const j = journals.filter((j) => j.subdir === subdir)[0];
      setJournal(j);
      window.writing.get(j, id).then(setEntry);
    });
  }, [subdir]);

  useEffect(() => {
    const handle = setInterval(() => {
      setEntry({ ...entry, updateDate: new Date() });
      window.writing.save(journal, entry);
    }, 5000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  return (
    <View fullSize>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "50px 1fr",
          height: "100%",
        }}
      >
        <Row
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          justify="space-between"
          align="middle"
        >
          <Col>
            <Space size="large">
              <Typography.Title level={3} type="secondary">
                {journal?.name}
              </Typography.Title>

              <Typography.Title editable level={3}>
                {entry?.title}
              </Typography.Title>
            </Space>
          </Col>
          <Col>
            Last saved{" "}
            {entry?.updateDate && getRelativeDate(new Date(entry.updateDate))}
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            height: "100%",
            overflowY: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          <ReactQuill
            style={{ height: "100%", width: "100%" }}
            theme="snow"
            placeholder="Let's begin..."
            value={entry?.text || ""}
            bounds={".app"}
            onChange={(html) => {
              setEntry({
                ...entry,
                text: html,
              });
            }}
            modules={{
              clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
              },
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
            ]}
          />
        </div>
      </div>
    </View>
  );
};
