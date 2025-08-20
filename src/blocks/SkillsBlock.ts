/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    const wrap = document.createElement("div");

    Object.entries(this.d).forEach(([category, items]: [string, string[]]) => {
      const cat = document.createElement("div");
      cat.className = "category";

      const title = document.createElement("div");
      title.className = "name";
      title.textContent = category;

      const ul = document.createElement("ul");
      items.forEach((skill: string) => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });

      cat.appendChild(title);
      cat.appendChild(ul);
      wrap.appendChild(cat);
    });

    sec.appendChild(wrap);
    return sec;
  }
}

