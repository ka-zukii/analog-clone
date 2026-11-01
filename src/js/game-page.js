import { renderGameDetail } from "./components/game-detail.js";

const id = new URLSearchParams(window.location.search).get("id");
renderGameDetail(document.getElementById("app"), id);
