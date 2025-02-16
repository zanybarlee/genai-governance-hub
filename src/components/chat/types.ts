
export interface Message {
  content: string;
  sender: 'user' | 'bot';
}

export interface ChatDimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}
