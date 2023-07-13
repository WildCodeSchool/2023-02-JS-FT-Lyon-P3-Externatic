import React from "react";
// eslint-disable-next-line import/no-unresolved
import ReactQuill from "react-quill";
// eslint-disable-next-line import/no-unresolved
import "react-quill/dist/quill.snow.css";

export default function TextEditor() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
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
  ];
  return (
    <div>
      <ReactQuill defaultValue="text" modules={modules} formats={formats} />
    </div>
  );
}
