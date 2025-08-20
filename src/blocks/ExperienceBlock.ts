/**
 * Патерн Composite (Компоновщик)
 *
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */


import { Experience, Project } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  // Приймаємо МАСИВ досвідів
  constructor(private d: Experience[]) {}

  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    this.d.forEach((exp) => {
      const item = document.createElement("div");
      item.className = "experience-item";

      item.innerHTML = `
        <div class="meta">
          <span class="position">${exp.position}</span>
          <span class="company">@ ${exp.company}</span>
          <span class="period">${exp.start} – ${exp.end}</span>
        </div>
      `;

      // Проєкти як листові вузли (ProjectBlock), з опціональним декоратором
      exp.projects.forEach((p: Project) => {
        const node = new ProjectBlock(p);
        const decorated = p.isRecent ? new HighlightDecorator(node) : node;
        item.appendChild(decorated.render());
      });

      container.appendChild(item);
    });

    return container;
  }
}
