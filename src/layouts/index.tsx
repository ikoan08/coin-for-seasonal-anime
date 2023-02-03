import Link from 'next/link'
import { ReactElement } from 'react'

import { AppShell, Footer, Header, Text } from '@mantine/core'

import { ActionToggle } from '@/components/ColorSchemeButton'
import { CurrentStatus, NextStatus } from '@/components/StatusBar'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const LayoutHeader = () => {
  return (
    <Header height={{ base: 40, md: 50 }} className='flex justify-between items-center px-4'>
      <Link href='/' className='text-inherit no-underline'>
        <Text className='text-2xl text-red-300'>サイトタイトル</Text>
      </Link>
      <ActionToggle />
    </Header>
  )
}

export const LayoutCurrentSeasonFooter = () => {
  return (
    <Footer height={50} p='md' className='flex px-4 justify-center'>
      <CurrentStatus />
    </Footer>
  )
}

export const LayoutNextSeasonFooter = () => {
  return (
    <Footer height={50} p='md' className='flex px-4 justify-center'>
      <NextStatus />
    </Footer>
  )
}

export function Layout({ children }: LayoutProps) {
  return <AppShell header={<LayoutHeader />}>{children}</AppShell>
}
