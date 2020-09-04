import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { Colors } from "../../../libs/constants";

import Card from "../../card";
import Input from "../../input";
import NumberContainer from "../../number-container";

const StartGameScreen = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const inputValueHandler = (inputText) => {
    setInputValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputValueHandler = () => {
    setInputValue("");
    setConfirmed(false);
  };

  const confirmInputValueHandler = () => {
    const chosenNum = parseInt(inputValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid Number!", "Please enter a number between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputValueHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNum);
    setInputValue("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start New Game!</Text>
        <Card style={styles.container}>
          <Text>Enter a number between 1 to 99</Text>
          <Input
            style={styles.input}
            blurOnSubmit={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            value={inputValue}
            onChangeText={inputValueHandler}
          />
          <View style={styles.buttonConainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.secondary}
                onPress={resetInputValueHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Colors.primary}
                onPress={confirmInputValueHandler}
              />
            </View>
          </View>
        </Card>
        {confirmed ? (
          <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button
              title="START GAME"
              onPress={() => {
                props.onStartGame(selectedNumber);
              }}
            />
          </Card>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
  },
  container: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%",
  },
  buttonConainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
