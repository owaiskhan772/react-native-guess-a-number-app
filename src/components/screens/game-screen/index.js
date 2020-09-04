import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import randomNumberGenerator from "../../../libs/random-number-generator";

import Card from "../../card";
import NumberContainer from "../../number-container";

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    randomNumberGenerator(1, 100, props.userChoice)
  );
  const [guessRounds, setGuessRounds] = useState(0);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessRounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const onGuessHandler = (guess) => {
    if (
      (guess === "lower" && currentGuess < props.userChoice) ||
      (guess === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Wrong Guess!",
        "You can do it. Try again with a new guess!",
        [{ text: "Sorry!", style: "cancel" }]
      );
      return;
    }

    if (guess === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextGuess = randomNumberGenerator(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setGuessRounds((currentGuessRounds) => currentGuessRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonConainer}>
        <Button
          title="LOWER"
          onPress={() => {
            onGuessHandler("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            onGuessHandler("greater");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonConainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
