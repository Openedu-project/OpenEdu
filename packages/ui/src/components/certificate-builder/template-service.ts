import type { CertificateTemplate } from './types';

export class TemplateService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async saveTemplate(template: CertificateTemplate): Promise<CertificateTemplate> {
    const response = await fetch(`${this.baseUrl}/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template),
    });
    return response.json();
  }

  async loadTemplate(id: string): Promise<CertificateTemplate> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`);
    return response.json();
  }

  async listTemplates(): Promise<CertificateTemplate[]> {
    const response = await fetch(`${this.baseUrl}/templates`);
    return response.json();
  }

  async deleteTemplate(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/templates/${id}`, {
      method: 'DELETE',
    });
  }
}
