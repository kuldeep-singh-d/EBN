import React from 'react';
import { Image, Pressable, SafeAreaView, View } from 'react-native';

import { AppButton, AppInput, AppText, KeyboardAvoider } from '@components';
import { images } from '@assets/images';
import useForgotPassword from './useForgotPassword';

export const ForgotPassword = () => {
  const { styles, states, handlers } = useForgotPassword();

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoider contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image
            resizeMode="contain"
            source={images.ebnLogo}
            style={styles.logo}
          />
        </View>

        <View style={styles.titleSection}>
          <AppText
            medium
            centered
            label="Forgot Password?"
            style={styles.title}
          />
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          <AppInput
            value={states.email}
            error={states.emailError}
            placeholder="Email"
            returnKeyType="done"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            setError={states.setEmailError}
            onChangeText={states.setEmail}
            onSubmitEditing={handlers.handleSubmit}
            style={styles.input}
            inputStyle={styles.inputText}
            placeholderTextColor={styles.placeholder.color}
          />

          {states.successMessage ? (
            <AppText
              centered
              label={states.successMessage}
              style={styles.successText}
            />
          ) : null}

          <AppButton
            gradient={false}
            title="Submit"
            onPress={handlers.handleSubmit}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          />
        </View>

        <Pressable
          hitSlop={12}
          onPress={handlers.handleBackToLogin}
          style={styles.footerLink}
        >
          <AppText
            medium
            centered
            label="Back to Login"
            style={styles.footerLinkText}
          />
        </Pressable>
      </KeyboardAvoider>
    </SafeAreaView>
  );
};
