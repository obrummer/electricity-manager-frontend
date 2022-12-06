export interface SwitchPoint {
  _id: string;
  name: string;
  isActive: boolean;
  highLimit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type DialogMode = 'create' | 'edit';
