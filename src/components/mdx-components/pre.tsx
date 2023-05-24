import { HTMLChakraProps, chakra } from "@chakra-ui/react";

export const Pre = (props: HTMLChakraProps<'pre'>) => (
  <chakra.div my='2em' borderRadius='sm' {...props} />
)
