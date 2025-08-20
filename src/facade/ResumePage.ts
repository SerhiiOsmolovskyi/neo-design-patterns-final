import { ResumeImporter } from "../importer/ResumeImporter";

/**
 * Фасад: єдина точка входу.
 * Приховує завантаження JSON, мапінг та рендер.
 */
export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    const data = await this.fetchData(jsonPath);
    new ResumeImporter(data).import();
  }

  private async fetchData(path: string): Promise<unknown> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load JSON: ${res.status} ${res.statusText}`);
    return await res.json();
  }
}
