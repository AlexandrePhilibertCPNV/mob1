import React from "react";
import {
  StyleSheet,
  TextInput as _TextInput,
  TextInputProps,
} from "react-native";

export class TextInput extends React.Component<TextInputProps> {
  render() {
    return (
      <_TextInput
        {...this.props}
        style={[styles.textinput, this.props.style]}
        underlineColorAndroid="transparent"
      />
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 10,
    fontSize: 16,
    height: 64,
  },
});
