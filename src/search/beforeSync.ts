import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, title, description, productType } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    title,
    description,
    productType,
  }

  if (productType && productType.title) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      modifiedDoc.productType = productType.title
    } catch (_err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
