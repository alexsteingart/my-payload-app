import type { Metadata } from 'next/types'

import { ProductArchive } from '@/components/ProductArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CardProductData } from '@/components/ProductCard'
import { algoliasearch } from 'algoliasearch'
import { SearchFacets } from '@/components/Search/Facets'
import { SearchAppliedFilters } from '@/components/Search/AppliedFilters'

type Args = {
  searchParams: Promise<{
    q: string
    filters: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const params = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const client = algoliasearch('RR39GCQO00', 'decead39de0dbf1486a3b580ca607712')
  console.log(params)
  const response = await client.searchSingleIndex({
    indexName: 'products',
    searchParams: { facets: '*', query: params.q, filters: params.filters },
  })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      bottleImage: true,
      producer: true,
      country: true,
      region: true,
      subregion: true,
      reviews: true,
    },
    where: {
      id: {
        in: response.hits.map((hit) => hit.objectID),
      },
    },
  })
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="flex flex-row">
        <div className="basis-1/8">
          <SearchAppliedFilters />
          <SearchFacets facets={response.facets} />
        </div>
        <div className="basis-7/8">
          {products.totalDocs > 0 ? (
            <ProductArchive products={products.docs as CardProductData[]} />
          ) : (
            <div className="container">No results found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `BevHub Search`,
  }
}
