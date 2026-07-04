import { useEffect } from "react";

const ASCII = `%c
 _   _         _
| | | | __ _ ___(_) __ _
| |_| |/ _\` |_  / |/ _\` |
|  _  | (_| |/ /| | (_| |
|_| |_|\\__,_/___|_|\\__, |
                     |___/
`;

export default function DevConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      ASCII,
      "color: #7C3AED; font-family: monospace; font-weight: bold;"
    );
    console.log(
      "%cLooking around, huh? Type haziq() and see what happens.",
      "color: #38BDF8; font-family: monospace; font-size: 13px;"
    );

    window.haziq = () => {
      console.log(
        "%c✨ Hey, you found it. I like curious people — let's build something together: hello@haziq.dev",
        "color: #06B6D4; font-family: monospace; font-size: 13px;"
      );
      return "🚀 mission accepted";
    };

    return () => {
      delete window.haziq;
    };
  }, []);

  return null;
}
