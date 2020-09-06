import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import randomNumberGenerator from "../../../libs/random-number-generator";
import DefaultStyles from "../../../libs/default-styles";

import Card from "../../card";
import CustomButton from "../../custom-button";
import NumberContainer from "../../number-container";

const GameScreen = (props) => {
  const initialGuess = randomNumberGenerator(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState([initialGuess.toString()]);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guesses.length);
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
      currentLow.current = currentGuess + 1;
    }

    const nextGuess = randomNumberGenerator(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setGuesses((prevGuesses) => [nextGuess.toString(), ...prevGuesses]);
  };

  const renderListItem = (listLength, itemData) => {
    return (
      <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>
          #{listLength - itemData.index}
        </Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonConainer}>
        <CustomButton
          onPress={() => {
            onGuessHandler("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton
          onPress={() => {
            onGuessHandler("greater");
          }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {guesses.map((guess, index) =>
            renderListItem(guess, guesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={guesses}
          renderItem={renderListItem.bind(this, guesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GameScreen;
