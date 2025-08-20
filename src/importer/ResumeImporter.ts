/**
 * Конкретна реалізація імпортера резюме
 * Наслідується від AbstractImporter і реалізує абстрактні методи
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory, BlockType } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    if (!this.raw || typeof this.raw !== "object") {
      throw new Error("Неприпустимий формат JSON: очікується об'єкт");
    }
    const r = this.raw as Partial<ResumeModel>;

    const missing: string[] = [];
    if (!r.header) missing.push("header");
    if (!r.summary) missing.push("summary");
    if (!Array.isArray(r.experience)) missing.push("experience");
    if (!Array.isArray(r.education)) missing.push("education");
    if (!r.skills || typeof r.skills !== "object") missing.push("skills");

    if (missing.length) {
      throw new Error(
        `Неприпустимий формат JSON: відсутні обов'язкові блоки: ${missing.join(", ")}`
      );
    }
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");
    if (!root) throw new Error("Не знайдено контейнер #resume-content");

    const factory = new BlockFactory();

    // Порядок секцій
    const order: BlockType[] = ["header", "summary", "experience", "education", "skills"];

    order.forEach((t) => {
      const block = factory.createBlock(t, model);
      root.appendChild(block.render());
    });
  }
}
