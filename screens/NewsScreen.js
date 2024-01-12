import React, { useContext, useState, useEffect } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { NewsContext } from "../API/Context";
import SingleNews from "../components/SingleNews";
import Loader from "../components/Loader";
import AlertComponent from "../components/AlertComponent";
import * as Network from "expo-network";
const NewsScreen = () => {
  const { news, darkTheme, isLoading, errorMessage } = useContext(NewsContext);

  const [activeIndex, setActiveIndex] = useState();

  const windowHeight = Dimensions.get("window").height;

  const [isConnected, setIsConnected] = useState(false);
  const [isNetworkChecked, setNetworkChecked] = useState(false);

  useEffect(() => {
    const getNetworkState = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
      setNetworkChecked(true);
    };
    getNetworkState();
  }, []);

  const renderContent = () => {
    if (isNetworkChecked && !isConnected) {
      return (
        <AlertComponent
          alert={{ title: "No Internet Connection", status: "warning" }}
        />
      );
    }

    if (isLoading) {
      return <Loader />;
    }

    if (news !== undefined && news.length > 0) {
      return (
        <Carousel
          windowSize={10}
          data={news}
          height={windowHeight}
          vertical={true}
          loop={true}
          renderItem={({ item, index }) => (
            <SingleNews item={item} index={index} darkTheme={darkTheme} />
          )}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      );
    }

    if (errorMessage !== "") {
      return (
        <AlertComponent
          alert={{
            title: errorMessage,
            status: "warning",
          }}
        />
      );
    }

    return (
      <AlertComponent
        alert={{
          title: "No News Found",
          status: "warning",
        }}
      />
    );
  };

  return <View style={styles.carousel}>{renderContent()}</View>;
};
export default NewsScreen;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: "black",
  },
});
