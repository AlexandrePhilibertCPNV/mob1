import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TextInput } from "../components/TextInput";
import fetch from "../utils/fetch";
import { UserContext } from "../contexts/userContext";
import { getToken } from "../requests/getToken";

interface SignInScreenState {
  bases: Base[];
  user: {
    initials: string;
    password: string;
    currentBaseId: number;
  };
}

export class SignInScreen extends React.Component<{}, SignInScreenState> {
  state = {
    bases: [],
    user: {
      initials: "",
      password: "",
      currentBaseId: 0,
    },
  };

  static contextType = UserContext;

  constructor(props: React.ComponentProps<"view">) {
    super(props);

    this.setInitials = this.setInitials.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCurrentBase = this.setCurrentBase.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    this.fetchBases();

    this.setState({
      user: {
        ...this.state.user,
        initials: this.context.initials,
      },
    });
  }

  async fetchBases() {
    const response = await fetch<Base[]>("/bases");
    const bases = response.data;

    this.setState({ bases });
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
    const { initials, password, currentBaseId } = this.state.user;

    const response = await getToken({ initials, password });

    formData.append("initials", initials);
    formData.append("password", password);

    const response = await fetch("/gettoken", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      const { token } = response.data;

      await Promise.all([
        SecureStore.setItemAsync("token", token),
        AsyncStorage.setItem("initials", initials),
        AsyncStorage.setItem("currentBaseId", currentBaseId.toString()),
      ]);

      this.context.setUser({
        ...this.state.user,
        token,
      });
    } else {
      // TODO: Display error message
    }
  }

  render() {
    const { user, bases } = this.state;

    return (
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
            maxLength={3}
            defaultValue={this.context?.initials}
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
          selectedValue={user.currentBaseId}
          onValueChange={this.setCurrentBase}
          mode="dialog"
        >
          {bases.map((base: Base) => (
            <Picker.Item key={base.id} label={base.name} value={base.id} />
          ))}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f1f1f1",
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
