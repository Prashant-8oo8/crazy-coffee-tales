// src/components/RTE.jsx
import React, { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const {
    field: { onChange, value },
  } = useController({
    name: name || "content",
    control,
    defaultValue,
  });

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        onChange(html === "<p><br></p>" ? "" : html);
      });
    }

    // Initialize with defaultValue
    if (value && quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, []);

  return (
    <div className="w-full mb-4">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <div ref={editorRef} className="bg-grey-600 border rounded min-h-[200px]" />
    </div>
  );
}
