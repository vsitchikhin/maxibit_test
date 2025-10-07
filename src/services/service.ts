export class Service {
  apiUrl: string;

  public constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }
}
