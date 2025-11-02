import Link from "next/link"
import Image from "next/image"
import { truncateMyanmarText } from "@/lib/myanmar-utils"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverUrl?: string
  price?: number
  rating?: number
  description?: string
  isPurchased?: boolean
}

export default function BookCard({
  id,
  title,
  author,
  coverUrl,
  price,
  rating,
  description,
  isPurchased = false
}: BookCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={`/books/${id}`}>
        <div className="relative aspect-[3/4] bg-gray-200 dark:bg-gray-700">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">📚</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 myanmar-text">
                  {truncateMyanmarText(title, 30)}
                </p>
              </div>
            </div>
          )}
          
          {isPurchased && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ✓ ဝယ်ယူပြီး
            </div>
          )}
          
          {rating && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              {rating.toFixed(1)}
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/books/${id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 myanmar-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {truncateMyanmarText(title, 50)}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 myanmar-text">
          {truncateMyanmarText(author, 30)}
        </p>
        
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 myanmar-text">
            {truncateMyanmarText(description, 80)}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          {price !== undefined ? (
            <div className="flex items-center">
              {price === 0 ? (
                <span className="text-green-600 font-medium myanmar-text">အခမဲ့</span>
              ) : (
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {price.toLocaleString()} ကျပ်
                </span>
              )}
            </div>
          ) : (
            <div></div>
          )}
          
          <Link
            href={`/books/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors myanmar-text"
          >
            ကြည့်ရှုရန်
          </Link>
        </div>
      </div>
    </div>
  )
}