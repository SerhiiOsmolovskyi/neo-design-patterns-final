/**
 * Блок відображення освіти в резюме
 */


import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  // Приймаємо МАСИВ записів освіти
  constructor(private d: Education[]) {}

  render(): HTMLElement {
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = "<h2>Education</h2>";

    this.d.forEach((e) => {
      const item = document.createElement("div");
      item.className = "education-item";
      item.innerHTML = `
        <div class="institution"><strong>${e.institution}</strong></div>
        <div class="degree">${e.degree}</div>
        <div class="graduation">${e.graduation}</div>
      `;
      el.appendChild(item);
    });

    return el;
  }
}
