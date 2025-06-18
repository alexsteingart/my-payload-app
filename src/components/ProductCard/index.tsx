'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

export type CardProductData = Pick<
  Product,
  | 'slug'
  | 'productType'
  | 'title'
  | 'bottleImage'
  | 'producer'
  | 'country'
  | 'region'
  | 'subregion'
  | 'reviews'
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

  const { slug, title, bottleImage, producer, country, region, subregion, reviews } = doc || {}
  //const { description, image: metaImage } = meta || {}

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
          <Media resource={bottleImage.sizes.square} imgClassName="m-auto" />
        )}
      </div>
      <div className="p-2 text-center">
        {title && (
          <div className="prose">
            <h4>
              <Link className="not-prose" href={href} ref={link.ref}>
                {title}
              </Link>
            </h4>
          </div>
        )}
        <div className="text-sm">
          {producer && <div className="mt-1">{producer.name}</div>}
          <div className="">
            {country && <span>{country.name}</span>}
            {region && <span> &gt; {region.name}</span>}
            {subregion && <span> &gt; {subregion.name}</span>}
          </div>
          <div>
            {(reviews || [])
              .sort((a, b) => {
                if (a.sourceAbbr < b.sourceAbbr) {
                  return -1
                }
                if (a.sourceAbbr > b.sourceAbbr) {
                  return 1
                }
                return 0
              })
              .map((review, index) => {
                return (
                  <span key={index}>
                    {index > 0 && ' '}[{review.sourceAbbr}|{review.score}]
                  </span>
                )
              })}
          </div>
          <div className="mt-1">
            <Button asChild size="sm" variant="outline">
              <Link
                href={`https://www.wine-searcher.com/find/${(producer && producer.name) || ''} ${title}`}
                target="_blank"
              >
                Find at Retail
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
