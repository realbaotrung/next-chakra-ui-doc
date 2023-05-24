import { Icon, Link, Stack, chakra } from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import { t } from 'utils/i18n'

export default function EditPageLink({ href }: { href?: string }) {
  return (
    <Link href={href} isExternal>
      <Stack>
        <Icon as={MdEdit} mr='1'/>
        <chakra.span>
          {t('component.edit-page-button.edit-this-page')}
        </chakra.span>
      </Stack>
    </Link>
  )
}
