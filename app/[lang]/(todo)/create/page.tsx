'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';
import { toast } from "sonner"

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Todo } from '@/types/todo';


const URL = process.env.NEXT_PUBLIC_API_URL;
export default function CreateTodoPage() {
  const router = useRouter();
  const params = useParams< { lang:string }>()
  const lang= params.lang
  const { t } = useTranslation(lang,"create_todo")
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'TODO' as Todo['status']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(todo.title === '' || todo.description === '') {
      toast.error('Title and description are required');
      return
    }
    
    setIsLoading(true);
    try {
      
      fetch(URL+'/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data._id) {
          toast.success('Todo created successfully')
          router.push(`/${lang}`);
        } else {
          toast.error('Failed to create todo')
        }
      })
      .catch(err=>err)
      .finally(()=>setIsLoading(false))
    } catch (error) {
      toast.error(`Failed to create todo ${error}`)
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">{t("todo_title")}</label>
              <Input 
                value={todo.title}
                onChange={(e) => setTodo({...todo, title: e.target.value})}
                placeholder={t("todo_title")}
                required
              />
            </div>

            <div>
              <label className="block mb-2">{t("todo_description")}</label>
              <Textarea 
                value={todo.description}
                onChange={(e) => setTodo({...todo, description: e.target.value})}
                placeholder={t("todo_description")}
                required
              />
            </div>

            <div>
              <label className="block mb-2">{t("todo_status")}</label>
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
              <Button type="submit" disabled={isLoading} className="w-full">{t("create_todo")}</Button>
              <Button disabled={isLoading}
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => router.push(`/${lang}`)}
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}