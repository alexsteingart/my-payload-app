import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Product } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { ProductCardReviews } from '@/components/ProductCard/reviews'
import { ProductCard } from '@/components/ProductCard'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug
  const product = await queryProductBySlug({ slug })

  if (!product) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="flex flex-row gap-4">
        <div className="basis-1/3">
          <Media resource={product.bottleImage} size="33vw" />
        </div>
        <div className="basis-2/3">
          <h3>{product.producer?.name}</h3>
          <h1>{product.title}</h1>
          <p>{product.productType?.title}</p>
          <p>
            {product.country?.name}
            {product.region ? ` > ${product.region.name}` : ''}
            {product.subregion ? ` > ${product.subregion.name}` : ''}
          </p>
          <p>
            <ProductCardReviews reviews={product.reviews} />
          </p>
          {product.description}
        </div>
      </div>
      <div>
        Other {product.productType.title} from this Producer
        {product.producer?.products?.map((product) => (
          <ProductCard
            key={product.id}
            className="h-full"
            doc={product}
            relationTo="products"
            showCategories
          />
        ))}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
