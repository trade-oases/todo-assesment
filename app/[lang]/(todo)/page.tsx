'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Todo } from '@/types/todo';
import { useTranslation } from '@/app/i18n/client';
import {getTranslationKey} from '@/lib/utils'

const URL = process.env.NEXT_PUBLIC_API_URL;
export default function TodoListPage() {
  const params = useParams< { lang:string }>()
  const lang= params.lang
  const { t } = useTranslation(lang,"translation")  
  const [todos, setTodos] = useState<null|Todo[]>(null);

  useEffect(() => {
    // Fetch todos from API
    async function fetchTodos() {
      const data = await fetch(URL+'/api/todos')
      .then(res=>res.json())
      .catch(err=>err)
      setTodos(data)
    }
    fetchTodos()
  }, []);

  if (!todos) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Link href={`/${lang}/create`}>
          <Button>{t("create_new_todo")}</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {todos.map(todo => (
          <Card key={todo._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {todo.title}
                <span className={`
                  px-2 py-1 rounded text-xs 
                  ${todo.status === 'TODO' ? 'bg-gray-200' : 
                    todo.status === 'IN_PROGRESS' ? 'bg-blue-200' : 'bg-green-200'}
                `}>
                  {t(getTranslationKey(todo.status))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{todo.description}</p>
              <div className="mt-4">
                <Link href={`/${lang}/${todo._id}`}>
                  <Button variant="outline">{t("view_details")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}