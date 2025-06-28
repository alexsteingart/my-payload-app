'use client'

import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export type Props = {
  facets: any
}

export const SearchFacets: React.FC<Props> = (props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function addFilter(facetName: string, value: string, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    const params = new URLSearchParams(searchParams)
    const filters = params.get('filters')
    if (!filters) {
      params.set('filters', `${facetName}:'${value}'`)
    } else {
      const parsedFilters = Object.fromEntries(
        filters.split(' AND ').map((filter) => filter.split(':')),
      )
      parsedFilters[facetName] = `'${value}'`
      params.set(
        'filters',
        Object.entries(parsedFilters)
          .map(([key, val]) => `${key}:${val}`)
          .join(' AND '),
      )
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const { facets } = props

  return (
    <div>
      {Object.keys(facets).map((facetName) => {
        const facetValues = facets[facetName]
        return (
          <div key={facetName} className="card card-border">
            <div className="card-body p-3">
              <h3 className="card-title">{facetName}</h3>
              <ul>
                {Object.keys(facetValues)
                  .sort((valueA, valueB) => facetValues[valueB] - facetValues[valueA])
                  .map((value) => {
                    const count = facetValues[value]
                    return (
                      <li key={value}>
                        <a href="#" onClick={(e) => addFilter(facetName, value, e)}>
                          {value} ({count})
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
