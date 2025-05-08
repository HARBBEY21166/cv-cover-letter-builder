export type ApiKeyStatus = "configured" | "not-configured";

export interface FormData {
  cvContent: string;
  companyName: string;
  positionTitle: string;
  jobRequirements: string;
  jobDescription: string;
  [key: string]: string;
}

export interface OutputData {
  text: string;
  title?: string;
  date?: string;
}

export interface OutputType {
  loading: boolean;
  error: string | null;
  data: OutputData | null;
}
