"use client";
import React from "react";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/line_height.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/word_counter.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/languages/vi";

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

export default function FloaraEditorCustom() {
  const [inZenMode, setInZenMode] = useState(false);
  const [model, setModel] = useState(() => {
    return localStorage.getItem("savedHtml") || "";
  });

  // Custom video upload handling
  const handleVideoUpload = (editor: any, video: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const videoBlobURL = URL.createObjectURL(video);
        // Insert the video blob URL into the editor
        editor.video.insert(videoBlobURL, true);
        // Giải phóng bộ nhớ sau khi sử dụng
        URL.revokeObjectURL(videoBlobURL);
      }
    };
    reader.readAsDataURL(video);
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center p-24 ${
        inZenMode ? "bg-zinc-700" : "bg-zinc-200"
      }`}
    >
      <h1 className="text-5xl font-semibold">Bật chế độ tập trung nào</h1>
      <p className="mt-2 mb-5 text-xl">
        Hãy tận hưởng việc chỉnh text bằng Froala
      </p>
      <button
        onClick={() => setInZenMode(!inZenMode)}
        className="bg-blue-500 p-3 rounded-lg text-white mb-3"
      >
        Vào chế độ tập trung
      </button>
      <FroalaEditor
        model={model}
        onModelChange={(e: string) => setModel(e)}
        config={{
          placeholderText: "Gõ nội dung vào đi",
          key: "INSERT-YOUR-FROALA-KEY-HERE",
          htmlAllowedTags: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "span",
            "div",
            "br",
          ],
          // htmlAllowedAttrs: ["style", "class", "id"],
          saveInterval: 2000, //save sau 2s
          events: {
            "save.before": function (html: string) {
              console.log("Saving HTML:", html);
              localStorage.setItem("savedHtml", html);
            },
            "video.beforeUpload": function (this: any, video: File[]) {
              console.log("Video before upload:", video);
              if (video.length) {
                // Prevent the default upload
                this.popups.hideAll();
                handleVideoUpload(this, video[0]);
                return false;
              }
            },
          },
          // imageDefaultWidth: 500,
          // imageResize: false,
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "fontFamily",
                "fontSize",
                "textColor",
                "clearFormatting",
              ],
              buttonsVisible: 3,
              align: "left",
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "paragraphFormat",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
              ],
              buttonsVisible: 3,
              align: "left",
            },
            moreRich: {
              buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "specialCharacters",
                "insertHR",
              ],
              buttonsVisible: 2,
              align: "left",
            },
            moreMisc: {
              buttons: [
                "undo",
                "redo",
                "fullscreen",
                "print",
                "getPDF",
                "selectAll",
                "html",
                "help",
              ],
              buttonsVisible: 2,
              align: "right",
            },
            showMoreButtons: true,
          },
          language: "vi",
        }}
        tag="textarea"
      />
      <FroalaEditorView model={model} />
    </main>
  );
}
