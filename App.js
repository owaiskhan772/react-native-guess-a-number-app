import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { AppLoading } from "expo";

import fetchFonts from "./src/libs/fetch-fonts";

import Header from "./src/components/header";
import StartGameScreen from "./src/components/screens/start-game-screen";
import GameScreen from "./src/components/screens/game-screen";
import GameOverScreen from "./src/components/screens/game-over-screen";

const App = () => {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  let content = (
    <StartGameScreen
      onStartGame={(selectedNumber) => {
        setUserNumber(selectedNumber);
      }}
    />
  );

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={(rounds) => setGuessRounds(rounds)}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        userNumber={userNumber}
        onRestartGame={() => {
          setGuessRounds(0);
          setUserNumber(null);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
