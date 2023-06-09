import { Button, Icon } from '@chakra-ui/react'
import { useSandpack } from '@codesandbox/sandpack-react'
import InlineCode from 'components/mdx-components/inline-code'
import {
  RiFileAddLine,
  RiFileEditLine,
  RiFileReduceLine,
  RiFileTransferLine,
} from 'react-icons/ri'
import { formatFilePath } from './utils'

type TutorialFileActionProps = {
  type: 'open' | 'add' | 'delete' | 'update'
  path: string
  label?: string
  code?: string
}

export default function TutorialFileAction({
  type,
  path,
  label,
  code = '',
}: TutorialFileActionProps) {
  const { sandpack } = useSandpack()

  const icons = {
    open: RiFileTransferLine,
    add: RiFileAddLine,
    delete: RiFileReduceLine,
    update: RiFileEditLine,
  }

  return (
    <Button
      as={InlineCode}
      leftIcon={<Icon as={icons[type]} />}
      size='xs'
      fontSize='sm'
      cursor='pointer'
      onClick={() => {
        switch (type) {
          case 'open':
            sandpack.openFile(path)
            break
          case 'add':
          case 'update':
            sandpack.updateFile(path, code)
            sandpack.openFile(path)
            break
          case 'delete':
            sandpack.closeFile(path)
            sandpack.deleteFile(path)
            break
          default:
            console.log('Please select a valid type')
            break
        }
      }}
    >
      {label || formatFilePath(path)}
    </Button>
  )
}
