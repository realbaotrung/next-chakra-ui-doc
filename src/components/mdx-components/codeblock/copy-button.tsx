import { Button, ButtonProps, useClipboard } from '@chakra-ui/react'
import { t } from 'utils/i18n'

interface CopyButtonProps extends ButtonProps {
  code: string
}

export default function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code)

  return (
    <Button
      size='sm'
      position='absolute'
      textTransform='uppercase'
      colorScheme='teal'
      fontSize='xs'
      height='24px'
      zIndex='1'
      right='1.25em'
      onClick={() => onCopy()}
      {...props}
    >
      {hasCopied
        ? t('component.mdx-components.copy-button.copied')
        : t('component.mdx-components.copy-button.copy')}
    </Button>
  )
}
