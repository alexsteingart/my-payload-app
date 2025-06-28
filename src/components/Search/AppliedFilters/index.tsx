'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export const SearchAppliedFilters: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  function removeFilter(key: string, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    if (params.has(key)) {
      params.delete(key)
    }

    const rawFilters = params.get('filters')
    let displayFilters = {}
    if (rawFilters) {
      displayFilters = Object.fromEntries(
        rawFilters.split(' AND ').map((filter) => filter.split(':')),
      )
      if (displayFilters.hasOwnProperty(key)) {
        delete displayFilters[key]
      }
      params.set(
        'filters',
        Object.entries(displayFilters)
          .map(([key, value]) => `${key}:${value}`)
          .join(' AND '),
      )
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const query = params.get('q')
  const rawFilters = params.get('filters')
  let displayFilters = {}
  if (rawFilters) {
    displayFilters = Object.fromEntries(
      rawFilters.split(' AND ').map((filter) => filter.split(':')),
    )
  }

  // Your component logic here

  return (
    <div>
      {query && (
        <div>
          <a href="#" onClick={(e) => removeFilter('q', e)}>
            "{query}"
          </a>
        </div>
      )}
      {Object.entries(displayFilters).map(([key, value]) => (
        <div key={key}>
          <a href="#" onClick={(e) => removeFilter(key, e)}>
            {key}: {value}
          </a>
        </div>
      ))}
    </div>
  )
}
