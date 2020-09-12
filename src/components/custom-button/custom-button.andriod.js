import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { Colors } from "../../libs/constants";

const CustomButton = (props) => {
  let BtnComp = TouchableOpacity;
  if (Platform.Version >= 21) {
    BtnComp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.btnContainer}>
      <BtnComp activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </BtnComp>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  btnContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default CustomButton;
