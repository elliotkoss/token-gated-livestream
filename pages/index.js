import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

class MetaButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: false };
  }

  connectMeta = async () => {
    // window.ethereum
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    this.setState({
      account: accounts[0],
    });
  };

  render() {
    if (this.state.account) {
      return <div>Your account number is : {this.state.account}</div>;
    } else {
      return <button onClick={this.connectMeta}>Connect Meta</button>;
    }
  }
}

export default function Home() {
  function setupUnlock() {
    window.unlockSetup();
  }
  const [locked, setLockedKey] = useState("pending");
  const unlockHandler = (e) => {
    setLockedKey(e.detail);
  };
  async function checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  }
  useEffect(() => {
    setupUnlock();
    window.addEventListener("unlockProtocol", unlockHandler);
  });
  return (
    <div className="container">
      <Head>
        <title>NFT Video Access Demo</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/js/hello.js"></script>
      </Head>

      <main>
        <h1 className="title">NFT Video Access Demo</h1>

        <p className="description">
          <MetaButton />
        </p>

        <p className="script-demo">
          {locked === "locked" && (
            <div onClick={checkout} style={{ cursor: "pointer" }}>
              Grab a ticket for the Livestream here! (Click me!)
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          )}
          {locked === "unlocked" && (
            <div>
              Enjoy the Livestream!
              <span aria-label="unlocked" role="img">
                🗝
              </span>
            </div>
          )}
        </p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by [@TODO]
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}