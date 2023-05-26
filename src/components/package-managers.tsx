import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FaYarn } from 'react-icons/fa'
import { ImNpm } from 'react-icons/im'
import { SiPnpm } from 'react-icons/si'
import CodeBlock from './mdx-components/codeblock/codeblock'

type PackageManagerName = 'npm' | 'yarn' | 'pnpm'

type PackageManager = {
  icon: ReactElement
  color: string
  name: PackageManagerName
}

const packageManagers: PackageManager[] = [
  {
    name: 'npm',
    icon: <Icon as={ImNpm} color='red.500' />,
    color: 'red.500',
  },
  {
    name: 'yarn',
    icon: <Icon as={FaYarn} fontSize='lg' color='blue.500' />,
    color: 'blue.500',
  },
  {
    name: 'pnpm',
    icon: <Icon as={SiPnpm} fontSize='lg' color='orange.500' />,
    color: 'orange.500',
  },
]

export default function PackageManagers(props: {
  command: Partial<Record<PackageManagerName, string>>
}) {
  const { command } = props
  return (
    <Tabs mt='6' mb='10'>
      <TabList>
        {packageManagers.map(({ name, icon, color }) => {
          if (!command[name]) return null
          return (
            <Tab
              key={name}
              gap='2'
              _selected={{
                color,
                borderBottomWidth: '2px',
                borderBottomColor: color,
              }}
            >
              {icon}
              {name}
            </Tab>
          )
        })}
      </TabList>
      <TabPanels>
        {packageManagers.map(({ name }) => {
          if (!command[name]) return null
          return (
            <TabPanel key={name} p='0' mt='-4'>
              <CodeBlock>
                <Box className='language-bash' >{command[name]}</Box>
              </CodeBlock>
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
