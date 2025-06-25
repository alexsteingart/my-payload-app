'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, ProductType } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Search } from '@/search/Component'

interface HeaderClientProps {
  data: Header
  productTypes: [ProductType]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, productTypes }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-4 flex gap-x-4">
        <div className="flex-none">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
        </div>
        <div className="grow">
          <div className="flex gap-x-4">
            <div className="grow pr-8">
              <Search />
            </div>
            <div className="flex-none">
              <HeaderNav data={data} />
            </div>
          </div>
          <div className="flex mt-6">
            [{' '}
            {productTypes.docs.map((productType, index) => {
              return `${index > 0 ? ' | ' : ''}${productType.title}`
            })}{' '}
            ]
          </div>
        </div>
      </div>
    </header>
  )
}
