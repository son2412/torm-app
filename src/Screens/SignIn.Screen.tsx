import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import styles from './SignIn.Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const validateEmail = (text: string) => {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
};
const SignInScreen = () => {
  const [input, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true
  });
  const { colors } = useTheme();

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...input,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...input,
        email: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    if (val.trim().length >= 5) {
      setData({ ...input, password: val, isValidPassword: true });
    } else {
      setData({ ...input, password: val, isValidPassword: false });
    }
  };

  const updateSecureTextEntry = () => setData({ ...input, secureTextEntry: !input.secureTextEntry });

  const handleValidEmail = (val: string) => {
    if (validateEmail(val)) {
      setData({ ...input, isValidUser: true });
    } else {
      setData({ ...input, isValidUser: false });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Wellcome !</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animatable.View animation="fadeInUpBig" style={[styles.footer, { backgroundColor: colors.background }]}>
          <Text style={[styles.text_footer, { color: colors.text }]}>Số điện thọai</Text>
          <View style={styles.action}>
            {/* <Feather name="phone" color={colors.text} size={20} /> */}
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#666666"
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
            />
            {input.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {input.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Email invalid.</Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, { color: colors.text, marginTop: 15 }]}>Mật khẩu</Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#666666"
              secureTextEntry={input.secureTextEntry ? true : false}
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {input.secureTextEntry ? <Feather name="eye-off" color="grey" size={20} /> : <Feather name="eye" color="grey" size={20} />}
            </TouchableOpacity>
          </View>
          {input.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text style={{ color: '#009387', marginTop: 15 }}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                  backgroundColor: '#009387'
                }
              ]}>
              <Text style={[styles.textSign, { color: '#fff' }]}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
