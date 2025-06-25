import { getPayload } from 'payload'
import config from '@payload-config'
import { algoliasearch } from 'algoliasearch'

const reindex = async () => {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    limit: 1000,
    depth: 0,
    sort: 'createdAt',
  })

  if (products && products.totalDocs > 0) {
    const client = algoliasearch('RR39GCQO00', 'decead39de0dbf1486a3b580ca607712')

    await client.saveObjects({
      indexName: 'products',
      objects: products.docs.map((product) => ({
        objectID: product.id,
        ...product,
      })),
    })
  }
}

await reindex()
