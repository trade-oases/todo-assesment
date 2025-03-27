'use client';

import { useState, useEffect } from 'react';
import { useRouter,useParams  } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo, TodoMessage } from '@/types/todo';
import { ArrowLeft } from 'lucide-react'

export default function TodoDetailPage() {
  const params = useParams< { id: string }>()
  const todo_id= params.id
  const [todo, setTodo] = useState<Todo | null>(null);
  const [messages, setMessages] = useState<TodoMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch todo details
    const fetchTodoDetails = async () => {
        const todos: Todo[] = [
            {
              id: '1',
              title: 'Finish assessment',
              description: 'Complete the skills assestment task by 28th',
              status: 'IN_PROGRESS',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ];
      setTodo(todos[0]);

      // Mock messages
      const mockMessages: TodoMessage[] = [
        {
          id: '1',
          todoId: params.id,
          content: 'Started working on the assesment',
          senderId: 'user1',
          timestamp: new Date()
        }
      ];
      setMessages(mockMessages);
    };

    fetchTodoDetails();
  }, [params.id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: TodoMessage = {
      id: Date.now().toString(),
      todoId: params.id,
      content: newMessage,
      senderId: 'current_user', // Replace with actual user ID
      timestamp: new Date()
    };

    // Add message locally
    setMessages([...messages, message]);
    
    // Clear input
    setNewMessage('');

    // TODO: Implement actual message sending logic
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Button
        onClick={() => router.push('/')}
        variant="default"
        className="mb-6 w-fit flex items-center "
      > <ArrowLeft size={16}/> <span>Back</span></Button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {todo.title}
            <span className={`
              px-2 py-1 rounded text-xs 
              ${todo.status === 'TODO' ? 'bg-gray-200' : 
                todo.status === 'IN_PROGRESS' ? 'bg-blue-200' : 'bg-green-200'}
            `}>
              {todo.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{todo.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Todo Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto mb-4 space-y-2 ">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`
                  py-2 px-4 rounded-lg max-w-[80%]
                  ${msg.senderId === 'current_user' 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-gray-100 mr-auto'}
                `}
              >
                {msg.content}
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}