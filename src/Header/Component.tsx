import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, ProductType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const payload = await getPayload({ config: configPromise })
  const productTypes: [ProductType] = await payload.find({
    collection: 'productTypes',
    depth: 1,
    limit: 20,
    select: {
      title: true,
      slug: true,
    },
  })

  return <HeaderClient data={headerData} productTypes={productTypes} />
}
