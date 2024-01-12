import * as React from 'react';
import { View, useWindowDimensions,StyleSheet, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import DiscoveScreen from '../screens/DiscoveScreen';
import NewsScreen from '../screens/NewsScreen';
import NavigationComponent from './NavigationComponent';
import { NewsContext } from '../API/Context';


const  TopNavigationBar = () => {
  const layout = useWindowDimensions();


  
  const {index,setIndex} = React.useContext(NewsContext);
  const [routes] = React.useState([
    { key: 'first', title: 'News' },
    { key: 'second', title: 'Discover' },
  ]);

  const renderScene = SceneMap({
    first: DiscoveScreen,
    second: NewsScreen,
  });
  

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.container}
      swipeEnabled={false}
      renderTabBar={()=> <NavigationComponent index={index} setIndex={setIndex}  />}
      
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default TopNavigationBar;