import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../helpers/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="app">
      <div className="app__editors">
        <Editor
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png"
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/CSS.3.svg/730px-CSS.3.svg.png"
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />

        <Editor
          image="https://i.ibb.co/jH7swyL/kisspng-javascript-logo-html-comment-blog-5ae63c23139110-5436874015250381150802.png"
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="app__output">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
