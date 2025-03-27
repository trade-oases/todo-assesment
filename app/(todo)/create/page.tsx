'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Todo } from '@/types/todo';

export default function CreateTodoPage() {
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'TODO' as Todo['status']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Implement actual API call to create todo
      console.log('Creating todo:', todo);
      
      // Redirect to todo list or todo detail page
      router.push('/');
    } catch (error) {
      console.error('Failed to create todo', error);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-6">Create New Todo</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <Input 
                value={todo.title}
                onChange={(e) => setTodo({...todo, title: e.target.value})}
                placeholder="Enter todo title"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <Textarea 
                value={todo.description}
                onChange={(e) => setTodo({...todo, description: e.target.value})}
                placeholder="Enter todo description"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Status</label>
              <Select 
                value={todo.status}
                onValueChange={(value: Todo['status']) => setTodo({...todo, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">Create Todo</Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}