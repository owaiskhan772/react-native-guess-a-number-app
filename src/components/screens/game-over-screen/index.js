import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Colors } from "../../../libs/constants";

import DefaultStyles from "../../../libs/default-styles";

import CustomButton from "../../custom-button";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={{ ...DefaultStyles.titleText, ...styles.title }}>
        Game Over!
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../../assets/images/success.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <Text style={{ ...DefaultStyles.bodyText, ...styles.resultText }}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.guessRounds}</Text> rounds to
          guess your selected number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </Text>
      </View>
      <CustomButton onPress={props.onRestartGame}>START NEW GAME</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 15,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
  },
});

export default GameOverScreen;
