import { View, Text,StyleSheet } from 'react-native'
import React,{useState,useContext} from 'react'
import { Button, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { NewsContext } from '../API/Context';
const ButtonComponent = () => {

    const {setQuery,searchText,searchSource,setSearchText,setSearchSource} = useContext(NewsContext);

    
    const handleOnPress = () => {
        if(searchText){
            setQuery(searchText);

            setSearchText("");
        setSearchSource("");
            

        }else if(searchText && searchSource){
            setQuery(`${searchText}&sources=${searchSource}`)
            setSearchText("");
        setSearchSource("");
            

        }else if(searchSource){
            setQuery(`sources=${searchSource}`)
            setSearchText("");
        setSearchSource("");
            
        }else{
        
            setSearchText("");
        }

        


        
        


    }

  return (
    <View style={styles.btn}>
    <Button  leftIcon={<Icon as={AntDesign} name="search1" size="sm" />}
    onPress={() => handleOnPress()}
    style={{
        
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 100,

    }}

    



    >
     Search
   </Button>
   </View>
  )
}

export default ButtonComponent;

const styles = StyleSheet.create({
    btn:{
        flexDirection: 'row',
        width :"100%",
        height: 50,
        marginVertical: 10,
        padding: 0,
        justifyContent: 'flex-end',
    }
})