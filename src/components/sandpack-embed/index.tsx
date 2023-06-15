import { Box, BoxProps } from '@chakra-ui/react'
import {
  CodeEditorProps,
  PreviewProps,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackLayoutProps,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'

export type SandpackEmbedProps = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  layoutOptions?: SandpackLayoutProps
  editorOptions?: CodeEditorProps
  previewOptions?: PreviewProps & BoxProps
  files: Record<string, string>
  isHorizontal?: boolean
}

export default function SandpackEmbed({
  dependencies,
  devDependencies,
  layoutOptions,
  editorOptions,
  previewOptions,
  files,
  isHorizontal = false,
}: SandpackEmbedProps) {
  return (
    <SandpackProvider
      files={files}
      theme={nightOwl}
      template='react-ts'
      customSetup={{
        dependencies: {
          'react-icons': '^4.8.0',
          '@chakra-ui/react': 'latest',
          '@chakra-ui/icons': 'latest',
          '@emotion/react': '^11.11.0',
          '@emotion/styled': '^11.11.0',
          'framer-motion': '^10.12.9',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          'react-scripts': '^4.0.0',
          ...dependencies,
        },
        devDependencies: {
          '@types/react': '^18.2.6',
          '@types/react-dom': '^18.2.4',
          typescript: '^4.7.2',
          ...devDependencies,
        },
      }}
    >
      <Box
        as={SandpackLayout}
        sx={{
          '--sp-layout-height': 'auto',
        }}
        style={{
          flexDirection: isHorizontal ? 'row' : 'column-reverse',
        }}
        {...layoutOptions}
      >
        <SandpackCodeEditor
          showLineNumbers
          style={{
            maxHeight: isHorizontal ? '600px' : '500px',
            minWidth: '400px',
          }}
          {...editorOptions}
        />
        <Box
          as={SandpackPreview}
          minHeight='350px'
          sx={{ '& iframe': { flex: 'initial', flexGrow: 1 } }}
          {...previewOptions}
        />
      </Box>
    </SandpackProvider>
  )
}
