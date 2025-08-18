import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import type { Post } from '../types/types'

interface UserProfilePostProps{
    userName:string
    post:Post;
}

const UserProfilePost = ({post,userName}:UserProfilePostProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <span className="font-bold text-gray-800">
                 {userName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  hace 5 minutos
                </span>
              </div>
            </div>
            <p className="text-gray-700">
              {post.text}
            </p>
            {post.image && <img src={post.image}/>}
            <div className="flex items-center space-x-6 mt-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
                <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
                <span>{post.comments?.length}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
                <HeartIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
                <span>{post.likes?.length}</span>
              </button>
            </div>
          </div>
  )
}

export default UserProfilePost