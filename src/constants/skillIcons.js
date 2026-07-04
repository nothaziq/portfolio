import {
  siPython,
  siCplusplus,
  siJavascript,
  siReact,
  siHtml5,
  siCss,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siScikitlearn,
  siPandas,
  siNumpy,
  siPlotly,
  siMysql,
  siGit,
  siGithub,
  siStreamlit,
} from "simple-icons";
import { Database, Code2 } from "lucide-react";

// `simple-icons` entries: { type: "path", path, title }
// A couple of tools (plain "SQL", VS Code) don't have an official
// simple-icons mark anymore, so those fall back to a generic lucide icon.
// `lucide` entries: { type: "lucide", Icon }
export const SKILL_ICONS = {
  python: { type: "path", path: siPython.path, title: siPython.title },
  cpp: { type: "path", path: siCplusplus.path, title: siCplusplus.title },
  js: { type: "path", path: siJavascript.path, title: siJavascript.title },
  sql: { type: "lucide", Icon: Database, title: "SQL" },

  react: { type: "path", path: siReact.path, title: siReact.title },
  html: { type: "path", path: siHtml5.path, title: siHtml5.title },
  css: { type: "path", path: siCss.path, title: siCss.title },
  tailwind: { type: "path", path: siTailwindcss.path, title: siTailwindcss.title },

  node: { type: "path", path: siNodedotjs.path, title: siNodedotjs.title },
  express: { type: "path", path: siExpress.path, title: siExpress.title },

  sklearn: { type: "path", path: siScikitlearn.path, title: siScikitlearn.title },
  pandas: { type: "path", path: siPandas.path, title: siPandas.title },
  numpy: { type: "path", path: siNumpy.path, title: siNumpy.title },
  plotly: { type: "path", path: siPlotly.path, title: siPlotly.title },

  mysql: { type: "path", path: siMysql.path, title: siMysql.title },

  git: { type: "path", path: siGit.path, title: siGit.title },
  github: { type: "path", path: siGithub.path, title: siGithub.title },
  vscode: { type: "lucide", Icon: Code2, title: "VS Code" },
  streamlit: { type: "path", path: siStreamlit.path, title: siStreamlit.title },
};
