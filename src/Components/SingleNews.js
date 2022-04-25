import React,{useEffect} from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal
} from "react-native";
import { useSelector } from "react-redux";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleNews = ({ item, darkTheme }) => {
  const { isLoading } = useSelector((state) => state.NewsReducer);
  return (
    <>
    {
    !isLoading?
      <View
      style={{
        height: windowHeight,
        width: windowWidth,
        transform: [{ scaleY: -1}],
      }}
      // key={index}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: "40%", resizeMode: "cover", width: windowWidth}}
      />
      <View
        style={{
          ...styles.description,
          backgroundColor: darkTheme ? "#282C35" : "white",
        }}
      >
        <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
          {item.title}
        </Text>
        <Text
          style={{ ...styles.content, color: darkTheme ? "white" : "black" }}
        >
          {item.description}
        </Text>
        <Text style={{ color: darkTheme ? "white" : "black" }}>
          Short by
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {item.author ?? "unknown"}
          </Text>
        </Text>
      </View>
      <ImageBackground
        blurRadius={30}
        style={styles.footer}
        source={{ uri: item.urlToImage }}
      >
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text style={{ fontSize: 15, color: "white" }}>
            '{item?.content?.slice(0, 45)}...'
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
            Read More
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>:
    <Modal>
      <ActivityIndicator size={"large"} color="red"/>
    </Modal>
  }
  </>
  );
};

export default SingleNews;

const styles = StyleSheet.create({
  description: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  content: { fontSize: 18, paddingBottom: 10 },
  footer: {
    height: 80,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
