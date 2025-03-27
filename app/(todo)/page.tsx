'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Todo } from '@/types/todo';

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Fetch todos from API
    const fetchTodos = async () => {
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
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <Link href="/create">
          <Button>Create New Todo</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {todos.map(todo => (
          <Card key={todo.id}>
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
              <div className="mt-4">
                <Link href={`/${todo.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}