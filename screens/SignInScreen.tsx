import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { TextInput } from "../components/TextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInScreenState {
  user: {
    initials: string;
    password: string;
    currentBaseId: number;
  };
}

export class SignInScreen extends React.Component<{}, SignInScreenState> {
  state = {
    user: {
      initials: "",
      password: "",
      currentBaseId: 0,
    },
  };

  constructor(props: React.ComponentProps<"view">) {
    super(props);

    this.setInitials = this.setInitials.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCurrentBase = this.setCurrentBase.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  setInitials(initials: string) {
    this.setState({
      user: {
        ...this.state.user,
        initials,
      },
    });
  }

  setPassword(password: string) {
    this.setState({
      user: {
        ...this.state.user,
        password,
      },
    });
  }

  setCurrentBase(currentBaseId: number) {
    this.setState({
      user: {
        ...this.state.user,
        currentBaseId,
      },
    });
  }

  async handleSignIn() {
    const { initials, currentBaseId } = this.state.user;

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        currentBaseId,
        initials,
      })
    );
  }

  render() {
    return (
      <UserContext.Consumer>
        {(userContext) => (
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")}
            />
            <View style={styles.form}>
              <TextInput
                style={styles.textinput}
                placeholder="Initiales"
                autoCorrect={false}
                autoFocus={true}
                onChangeText={this.setInitials}
              />
              <TextInput
                style={styles.textinput}
                placeholder="Mot de passe"
                autoCorrect={false}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={this.setPassword}
              />
            </View>
            <Picker
              style={styles.basePicker}
              selectedValue={this.state.user.currentBaseId}
              onValueChange={this.setCurrentBase}
              mode="dialog"
            >
              <Picker.Item label="La Vallée-de-Joux" value={0} />
              <Picker.Item label="Payerne" value={1} />
              <Picker.Item label="Saint-Loup" value={2} />
              <Picker.Item label="Ste-Croix" value={3} />
              <Picker.Item label="Yverdon" value={4} />
            </Picker>
            <TouchableOpacity
              style={styles.loginButton}
              accessibilityLabel="Se connecter"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={this.handleSignIn}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        )}
      </UserContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    marginVertical: 12,
  },
  form: {
    width: "100%",
  },
  textinput: {
    width: "100%",
    marginBottom: 12,
  },
  basePicker: {
    width: "100%",
  },
  loginButton: {
    borderRadius: 50,
    backgroundColor: "#065e92",
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 12,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
