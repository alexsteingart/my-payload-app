'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardProductData = Pick<
  Product,
  'slug' | 'productType' | 'title' | 'description' | 'bottleImage'
>

export const ProductCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProductData
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo } = props

  const { slug, title, description, bottleImage } = doc || {}
  //const { description, image: metaImage } = meta || {}

  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!bottleImage && <div className="">No image</div>}
        {bottleImage && typeof bottleImage !== 'string' && (
          <Media resource={bottleImage} imgClassName="m-auto" />
        )}
      </div>
      <div className="p-4 text-center">
        {title && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {title}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
