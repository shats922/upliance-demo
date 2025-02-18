import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

let quill;
export function TextEditor() {
  const [savedContents, setContents] = useState(
    () => JSON.parse(localStorage.getItem("editor")) ?? ""
  );

  useEffect(() => {
    localStorage.setItem("editor", JSON.stringify(savedContents));
  }, [savedContents]);

  function setEditor(ref) {
    if (quill) {
      return;
    }
    const options = {
      modules: {
        toolbar: true,
      },
      placeholder: "Write stuff....",
      theme: "snow",
    };

    quill = new Quill("#content", options);
    quill.on("text-change", () => {
      // save in storage
      const content = quill.getContents();
      setContents(content);
    });

    if (savedContents) {
      quill.setContents(savedContents);
    }
  }

  return (
    <div className="flex-1"  id="editor" ref={(ref) => setEditor(ref)}>
      <div id="content"></div>
    </div>
  );
}
