'use client';

import { useState, useEffect } from 'react';
import { useRouter,useParams  } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo, TodoMessage } from '@/types/todo';
import { useTranslation } from '@/app/i18n/client';
import { ArrowLeft,ArrowRight } from 'lucide-react'
import {getTranslationKey} from '@/lib/utils'
import { toast } from "sonner"


const URL = process.env.NEXT_PUBLIC_API_URL;
export default function TodoDetailPage() {
  const params = useParams< { id: string,lang:string }>()
  const todo_id= params.id
  const lang= params.lang
  const { t } = useTranslation(lang,"details")
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [messages, setMessages] = useState<TodoMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch todo details
    const fetchTodoDetails = async () => {
        setIsLoading(true)
        await fetch(URL+'/api/todos/'+todo_id)
        .then(res=>res.json())
        .then(data=>setTodo(data))
        .catch(err=>{
          toast.error(`Failed to fetch todo details, ${err}`)
        })
        .finally(()=>setIsLoading(false))

      // Mock messages
      const mockMessages: TodoMessage[] = [
        {
          _id: '1',
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


  const updateTodo = async (status:Todo['status']) => {
    setIsLoading(true)
    await fetch(URL+'/api/todos/'+todo_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data._id) {
        setTodo(data)
        toast.success('Todo updated successfully')
      } else {
        toast.error('Failed to update todo')
      }
    })
    .finally(()=>setIsLoading(false))
  }

  const deleteTodo = async (todoId:string) => {
    // Delete todo
    if(!todoId) return
    setIsLoading(true)
    const data= await fetch(`${URL}/api/todos/${todoId}`, {
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(data=>data)
    .catch(err=>err)
    .finally(()=>setIsLoading(false))

    if(data) {
      
      toast.success('Todo deleted successfully')
      // Redirect to home
      router.push(`/${lang}`);
    }else{
      toast.error('Failed to delete todo')
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: TodoMessage = {
      _id: Date.now().toString(),
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

  if (!todo) return <div>{t("loading")}</div>;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Button
        onClick={() => router.push(`/${lang}`)}
        variant="default"
        className="mb-6 w-fit flex items-center "
      > {lang=="ar"? <ArrowRight  size={16}/>:<ArrowLeft size={16}/> }
       <span>{t("back")}</span></Button>
      <Card className="mb-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("conversation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto mb-4 space-y-2 ">
            {messages.map((msg) => (
              <div 
                key={msg._id} 
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
              placeholder={t("type_a_message")}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>{t("send")}</Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col justify-evenly space-y-1 w-full mt-4 mb-16">
      {todo.status!="DONE" ? <Button className='w-full' disabled={isLoading} onClick={()=>{updateTodo("DONE")}} variant="default">{t("mark_as_done")}</Button> : ''}
        <Button className='w-full' disabled={isLoading} onClick={()=>{deleteTodo(todo._id as string)}} variant="destructive">{t("delete")}</Button>
      </div>
    </div>
  );
}