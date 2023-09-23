export enum Creator {
  Me = 0,
  Bot = 1,
}

export interface MesssageProps {
  text: string;
  from: Creator;
  key: number;
}
