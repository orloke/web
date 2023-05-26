import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Id {
  params: {
    id: string
  }
}

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function id({ params }: Id) {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memory: Memory = response.data

  if (memory.id === '') {
    return <EmptyMemories />
  }
  return (
    <div key={memory.id} className="space-y-4 px-8">
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>
      <Image
        src={memory.coverUrl}
        alt=""
        width={592}
        height={280}
        className="aspect-video w-full rounded-lg object-cover"
      />
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
      <Link
        href={`/`}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>
    </div>
  )
}
