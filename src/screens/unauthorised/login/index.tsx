import React from 'react';
import useLogin from './useLogin';
import { images } from '@assets/images';
import { Image, Pressable, SafeAreaView, View } from 'react-native';
import { AppButton, AppInput, AppText, KeyboardAvoider } from '@components';

export const Login = () => {
  const { styles, states, handlers, loader } = useLogin();

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoider contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={images.EBNTAGLINE}
          />
        </View>

        <View style={styles.form}>
          <AppInput
            value={states.email}
            gradientBorder
            returnKeyType="next"
            autoComplete="email"
            style={styles.input}
            placeholder="Username"
            error={states.emailError}
            textContentType="username"
            keyboardType="email-address"
            inputStyle={styles.inputText}
            onChangeText={states.setEmail}
            setError={states.setEmailError}
            placeholderTextColor={styles.placeholder.color}
          />

          <AppInput
            isPassword
            gradientBorder
            returnKeyType="done"
            style={styles.input}
            placeholder="Password"
            value={states.password}
            autoComplete="password"
            textContentType="password"
            showPasswordToggle={false}
            error={states.passwordError}
            inputStyle={styles.inputText}
            onChangeText={states.setPassword}
            setError={states.setPasswordError}
            onSubmitEditing={handlers.handleLogin}
            placeholderTextColor={styles.placeholder.color}
          />

          <AppButton
            title="Sign In"
            loader={loader}
            topMargin={2.4}
            style={styles.button}
            onPress={handlers.handleLogin}
            labelStyle={styles.buttonLabel}
          />
        </View>

        <Pressable
          hitSlop={12}
          style={styles.footerLink}
          onPress={handlers.handleForgotPassword}
        >
          <AppText
            medium
            centered
            label="Forgot Password?"
            style={styles.footerLinkText}
          />
        </Pressable>
      </KeyboardAvoider>
    </SafeAreaView>
  );
};
