import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { categories, sources, country } from "../API/util";
import { NewsContext } from "../API/Context";
import Search from "../components/Search";
import SelectComponent from "../components/SelectComponent";
import ButtonComponent from "../components/ButtonComponent";

const DiscoverScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const {
    setCategory,
    setSource,
    darkTheme,
    setCountry,
    fecthNewsByCountry,
    category,
  } = useContext(NewsContext);

  return (
    <View
      style={{
        ...styles.discover,
        backgroundColor: darkTheme ? "#282C35" : "white",
        height: windowHeight,
      }}
    >
      <Search />
      <SelectComponent />
      <ButtonComponent />
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Categories
      </Text>
      <Carousel
        style={{
          height: 100,
          width: windowWidth,
        }}
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => setCategory(item.name)}
              style={styles.category}
            >
              <Image source={{ uri: item.pic }} style={styles.categoryImage} />
              <Text
                style={{ ...styles.name, color: darkTheme ? "white" : "black" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        width={SLIDE_WIDTH}
      />

      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Nations
      </Text>
      <Carousel
        style={{
          height: 100,
          width: windowWidth,
        }}
        data={country}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setCountry(item.code);
              }}
              style={styles.country}
            >
              <Image source={{ uri: item.flag }} style={styles.categoryImage} />
              <Text
                style={{ ...styles.name, color: darkTheme ? "white" : "black" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        width={SLIDE_WIDTH}
      />

      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Sources
      </Text>
      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s.id)}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  category: {
    height: 50,
    width: "100%",
    marginTop: 10,
    paddingBottom: 5,
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  categoryImage: {
    height: "80%",
    width: "100%",
    resizeMode: "contain",
  },

  country: {
    height: 60,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 5,
    marginBottom: Platform.OS === "ios" ? 75 : 50,
  },
  sourceContainer: {
    height: Platform.OS === "ios" ? 130 : 110,
    width: "40%",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#cc313d",
  },
  sourceImage: {
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
});
