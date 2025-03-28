export interface Todo {
  _id?: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoMessage {
  _id?: string;
  todoId: string;
  content: string;
  senderId: string;
  timestamp: Date;
}