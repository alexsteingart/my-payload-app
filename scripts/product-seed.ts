import type { File } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  const payload = await getPayload({ config })

  const [imageBufferChard, imageBufferPinot, imageBufferVodka, imageBufferBeer, imageBufferRTD] =
    await Promise.all([
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
      fetchFileByURL(
        'https://as1.ftcdn.net/jpg/00/65/63/98/1000_F_65639891_b8JNtXnfdybuw8ewQe9FIaGWzhTy75jY.jpg',
      ),
      fetchFileByURL(
        'https://media.istockphoto.com/id/1293620943/photo/vodka-bottle.jpg?s=612x612&w=0&k=20&c=qnnSpAIyyhU-MuuxLMgct-xDK-5cTBIepyn_u9ygsYk=',
      ),
      fetchFileByURL(
        'https://as2.ftcdn.net/jpg/02/15/91/35/1000_F_215913585_afPBlatzhC3rGPCXO7uu6MjCTfTyhRc7.jpg',
      ),
      fetchFileByURL(
        'https://www.shutterstock.com/image-photo/250ml-clean-aluminum-beverage-drink-600nw-2455605523.jpg',
      ),
    ])

  const [
    ptDocWine,
    ptDocSpirits,
    ptDocBeer,
    ptDocRTD,
    imageDocChard,
    imageDocPinot,
    imageDocVodka,
    imageDocBeer,
    imageDocRTD,
  ] = await Promise.all([
    payload.create({
      collection: 'productTypes',
      data: {
        title: 'Wine',
      },
    }),
    payload.create({
      collection: 'productTypes',
      data: {
        title: 'Spirits',
      },
    }),
    payload.create({
      collection: 'productTypes',
      data: {
        title: 'Beer',
      },
    }),
    payload.create({
      collection: 'productTypes',
      data: {
        title: 'Ready to Drink (RTD)',
      },
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'chardonnay wine bottle' },
      file: imageBufferChard,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'pinot noir bottle' },
      file: imageBufferPinot,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'vodka bottle' },
      file: imageBufferVodka,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'beer bottle' },
      file: imageBufferBeer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'rtd bottle' },
      file: imageBufferRTD,
    }),
  ])

  await Promise.all([
    payload.create({
      collection: 'products',
      data: {
        title: 'California Chardonnay',
        description: 'Oaky, buttery',
        productType: ptDocWine,
        bottleImage: imageDocChard,
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Oregon Pinot Noir',
        description: 'Dark fruits, well structured',
        productType: ptDocWine,
        bottleImage: imageDocPinot,
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Ukranian Vodka',
        description: 'Tasteless',
        productType: ptDocSpirits,
        bottleImage: imageDocVodka,
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Local Beer',
        description: 'Palate busting hoppiness',
        productType: ptDocBeer,
        bottleImage: imageDocBeer,
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'products',
      data: {
        title: 'Spiked Seltzer',
        description: 'Sweet and artificial',
        productType: ptDocRTD,
        bottleImage: imageDocRTD,
        _status: 'published',
      },
    }),
  ])
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

await seed()
