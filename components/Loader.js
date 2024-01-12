import {View,Text,StyleSheet,StatusBar,Dimensions} from 'react-native';
import { Center, VStack, Skeleton } from "native-base";


const Loader = () => {

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

    return (
        <View style={{...styles.container,width:windowWidth, height:windowHeight}}>
            <Center w="100%">
      <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#282C35'
    }}
    );
    

export default Loader