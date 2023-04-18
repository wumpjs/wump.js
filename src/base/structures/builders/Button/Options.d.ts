export interface ButtonObject {
  type: number;
  style: number;
  label?: string;
  emoji?: EmojiObject;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export enum ButtonStyles {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5
}

export interface EmojiObject {
  name: string;
  id?: string;
  animated?: boolean;
}