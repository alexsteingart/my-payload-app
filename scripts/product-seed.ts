import type { Payload, PayloadRequest, File } from 'payload'

export const seed = async ({
  _payload,
  _req,
}: {
  _payload: Payload
  _req: PayloadRequest
}): Promise<void> => {
  const [imageBufferChard, imageBufferPinot, imageBufferVodka, imageBufferBeer, imageBufferRTD] =
    await Promise.all([
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
      fetchFileByURL(
        'https://img.freepik.com/premium-photo/white-wine-bottle-with-blank-labels_105428-11.jpg?w=360',
      ),
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
