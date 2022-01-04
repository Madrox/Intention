import { Col, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { Journal, Writing } from "src/Common/models/writing";
import { View } from "src/Renderer/components/Layout/View";
import "./index.css";

export const WritingView: React.FC = () => {
  const { id, subdir } = useParams<{ id: string; subdir: string }>();

  const [journal, setJournal] = useState<Journal | null>(null);

  const [entry, setEntry] = useState<Writing | null>(null);

  const [saved, setSaved] = useState(true);

  const save = () => {
    if (entry && journal && !saved) {
      console.log("saving...");
      setEntry({
        addDate: entry.addDate || new Date(),
        id: entry.id,
        text: entry.text ?? "",
        title: entry.title ?? "",
        updateDate: new Date(),
      });
      window.writing.save(journal, entry);
      setSaved(true);
    }
  };

  useEffect(() => {
    window.journals.list().then((journals) => {
      const j = journals.filter((j) => j.subdir === subdir)[0];
      setJournal(j);
      window.writing.get(j, id).then(setEntry);
    });
    return () => {
      setEntry({ ...entry, updateDate: new Date() });
      window.writing.save(journal, entry);
    };
  }, [subdir, id]);

  useEffect(() => {
    const handle = setInterval(() => {
      save();
    }, 10000);

    const manualSave = (ev: KeyboardEvent) => {
      if (ev.ctrlKey && ev.key === "s" && !saved) {
        save();
      }
    };

    window.addEventListener("keydown", manualSave);

    return () => {
      clearInterval(handle);
      window.removeEventListener("keydown", manualSave);
    };
  }, [journal, entry, saved]);

  return (
    <View fullSize key={entry?.id ?? "loading"}>
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

              {entry && (
                <Typography.Title
                  editable={{
                    onChange: (title) => {
                      setEntry({ ...entry, title });
                      setSaved(false);
                    },
                  }}
                  level={3}
                  key={entry.title}
                >
                  {entry.title}
                </Typography.Title>
              )}
            </Space>
          </Col>
          <Col>{saved && "Saved"}</Col>
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
              setSaved(false);
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
