export interface ITask {
  id?: string;
  name: string;
  app: string;
  app_link: string;
  robot: string;
  created_at: number;
  created_by: string;
  progress: number;
  status: number;
}

export interface IDoc {
  id?: string;
  name: string;
  desc: string;
  created_at: number;
}
