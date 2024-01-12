import React from 'react'
import { HStack, Spinner, Heading } from 'native-base'


const SpinnerLoader = () => {
  return (

         <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="warning.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
    
  )
}

export default SpinnerLoader