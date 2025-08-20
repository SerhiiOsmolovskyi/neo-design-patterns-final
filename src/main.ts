import { ResumePage } from "./facade/ResumePage";

document.addEventListener("DOMContentLoaded", () => {
  const page = new ResumePage();
  page.init("/resume.json").catch((e) => {
    console.error("Failed to init ResumePage:", e);
  });
});
