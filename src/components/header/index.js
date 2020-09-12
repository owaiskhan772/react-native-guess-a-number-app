import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import { Colors } from "../../libs/constants";
import DefaultStyles from "../../libs/default-styles";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({ android: styles.headerAndroid, ios: styles.headerIOS }),
      }}
    >
      <Text style={{ ...DefaultStyles.titleText, ...styles.title }}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  title: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
    fontSize: 24,
  },
});

export default Header;
