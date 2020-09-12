import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
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
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    // clean up function
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    setGuesses((prevGuesses) => {
      // console.log({ prevGuesses, nextGuessss: nextGuess.toString() })
      return [nextGuess.toString(), ...prevGuesses]
    });
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

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  let gameControls = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          ...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 },
        }}
      >
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
    </React.Fragment>
  );

  if (availableDeviceHeight < 500) {
    gameControls = (
      <View style={styles.controls}>
        <CustomButton
          onPress={() => {
            onGuessHandler("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <CustomButton
          onPress={() => {
            onGuessHandler("greater");
          }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
      {gameControls}
      <View style={listContainerStyle}>
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
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
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
