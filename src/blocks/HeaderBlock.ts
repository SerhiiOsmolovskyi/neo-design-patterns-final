/**
 * Блок відображення заголовка резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const fullName = this.d.fullName ?? "";
    const title = this.d.title ?? "";
    const { email, phone, location } = this.d.contacts ?? ({} as any);
    
    header.innerHTML = `
      <h1>${fullName}</h1>
      <p class="title">${title}</p>
      <p class="contacts">${email ?? ""} · ${phone ?? ""} · ${location ?? ""}</p>
    `;
    return header;
  }
}
