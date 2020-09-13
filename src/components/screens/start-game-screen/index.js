import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import { Colors } from "../../../libs/constants";

import DefaultStyles from "../../../libs/default-styles";

import Card from "../../card";
import Input from "../../input";
import CustomButton from "../../custom-button";
import NumberContainer from "../../number-container";

const StartGameScreen = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [btnWidth, setBtnWidth] = useState(Dimensions.get("window").width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setBtnWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    // clean up function
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
    <ScrollView contentContainerStyle={styles.screen}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Text style={{ ...DefaultStyles.titleText, ...styles.title }}>
              Start New Game!
            </Text>
            <Card style={styles.cardContainer}>
              <Text style={DefaultStyles.bodyText}>
                Enter a number between 1 to 99
              </Text>
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
                <View style={{ width: btnWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.secondary}
                    onPress={resetInputValueHandler}
                  />
                </View>
                <View style={{ width: btnWidth }}>
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
                <Text style={DefaultStyles.bodyText}>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <CustomButton
                  onPress={() => {
                    props.onStartGame(selectedNumber);
                  }}
                >
                  START GAME
                </CustomButton>
              </Card>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 15,
  },
  cardContainer: {
    alignItems: "center",
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
  },
  buttonConainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
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
