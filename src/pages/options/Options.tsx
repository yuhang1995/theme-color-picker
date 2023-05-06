import { useMemo, useState } from 'react'
import { Panelprovider } from './context'
import { AddTheme } from './components/AddTheme'
import { ThemeViwer } from './components/ThemeViwer'
import { Layout } from './components/Layout'

export function Options() {
  const [panel, setPanel] = useState('add')

  const values = useMemo(() => ({ panel, setPanel }), [panel, setPanel])

  return (
    <Panelprovider.Provider value={values}>
      <Layout>
        {/* <Display hidden={panel === 'viwer'}>
                    <AddTheme />
                </Display>
                <Display hidden={panel === 'add'}>
                    <ThemeViwer />
                </Display> */}
        {panel === 'add' ? <AddTheme /> : <ThemeViwer />}
      </Layout>
    </Panelprovider.Provider>
  )
}
