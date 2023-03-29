import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.scss";

export default function Home() {
  const [colorInput, setcolorInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setcolorInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Name my color with AI</title>
        <link rel="icon" href="/dog.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <main className={styles.main}>
        <img src="/palette2.png" className={styles.icon} />
        <h3>Name my color</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="color"
            placeholder="Enter a color in #hex"
            value={colorInput}
            onChange={(e) => setcolorInput(e.target.value)}
          />
          <input type="submit" value="Generate SCSS variable names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <footer className={styles.footer}><p>Made with AI by <a href="https://bio.link/angelodev" target="_blank" rel="noreferrer">Angelo</a></p></footer>
    </div>
  );
}
