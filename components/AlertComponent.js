import { View, StyleSheet, Dimensions } from "react-native";
import { Alert, HStack, IconButton, Text, VStack } from "native-base";
import { CloseIcon } from "native-base";

const AlertComponent = ({ alert }) => {
  const { title, status } = alert;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        ...styles.alertComponent,
        width: windowWidth,
        height: windowHeight,
      }}
    >
      <Alert w="100%" status={status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {title}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </View>
  );
};
export default AlertComponent;

const styles = StyleSheet.create({
  alertComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282C35",
  },
});
