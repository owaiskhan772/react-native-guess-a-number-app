import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./src/components/header";
import StartGameScreen from "./src/components/screens/start-game-screen";
import GameScreen from "./src/components/screens/game-screen";
import GameOverScreen from "./src/components/screens/game-over-screen";

const App = () => {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);

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
    <View style={styles.mainContainer}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
