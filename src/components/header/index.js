import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../libs/constants";
import DefaultStyles from "../../libs/default-styles";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={{...DefaultStyles.titleText, ...styles.title}}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
  },
});

export default Header;
