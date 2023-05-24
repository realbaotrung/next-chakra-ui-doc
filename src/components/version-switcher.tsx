import { Select, SelectProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import packageJson from 'package.json'

function VersionSwitcher(props: SelectProps) {
  const router = useRouter()

  const currentVersion = `v${packageJson.dependencies['@chakra-ui/react']}`

  const versions = [
    {
      label: currentVersion,
      url: 'https://chakra-ui.com'
    },
    { label: 'v1.8.8', url: 'https://v1.chakra-ui.com'},
    { label: 'v0.8.x', url: 'https://v0.chakra-ui.com'},
  ]

  const currentVersionUrl = versions[0].url

  return (
    <Select
      marginEnd='0'
      variant='unstyled'
      fontWeight='semibold'
      color='gray.600'
      _dark={{ color: 'whiteAlpha.600' }}
      background='chakra-body-bg'
      sx={{ "--select-bg": "colors.chakra-body-bg" }}
      value={currentVersionUrl}
      aria-label={`Select the Chakra UI Docs version. You are currently viewing the version ${currentVersion}`}
      onChange={e => {
        const version = e.target.value;
        // go to specific page version
        router.push(version)
      }}
      {...props}
    >
      {versions.map(({label, url}) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default VersionSwitcher
