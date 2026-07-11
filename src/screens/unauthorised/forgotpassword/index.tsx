import React from 'react';
import { Image, Pressable, SafeAreaView, View } from 'react-native';

import { AppButton, AppInput, AppText, KeyboardAvoider } from '@components';
import { images } from '@assets/images';
import useForgotPassword from './useForgotPassword';

export const ForgotPassword = () => {
  const { styles, states, handlers, loader } = useForgotPassword();
  const title = states.isSuccessScreen
    ? 'Check Your Email'
    : 'Forgot Password?';
  const successMessage =
    "We've sent a password reset link to your registered email address.\n\nPlease check your inbox (and Spam/Junk folder if needed) and follow the link to create a new password.";

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoider contentContainerStyle={styles.content}>
        <View style={styles.logoSection}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={images.EBNTAGLINE}
          />
        </View>

        <View style={styles.titleSection}>
          <AppText medium centered label={title} style={styles.title} />
          <View style={styles.divider} />
        </View>

        {states.isSuccessScreen ? (
          <View style={styles.successContent}>
            <View style={styles.mailIcon}>
              <View style={styles.envelope}>
                <View style={styles.envelopeLineLeft} />
                <View style={styles.envelopeLineRight} />
                <View style={styles.envelopeLineBottomLeft} />
                <View style={styles.envelopeLineBottomRight} />
              </View>
              <View style={styles.checkBadge}>
                <View style={styles.checkMark} />
              </View>
            </View>

            <AppText
              centered
              numberOfLines={10}
              label={successMessage}
              style={styles.successMessage}
            />
          </View>
        ) : (
          <View style={styles.form}>
            <AppInput
              editable={!loader}
              gradientBorder
              placeholder="Email"
              value={states.email}
              returnKeyType="done"
              autoComplete="email"
              style={styles.input}
              error={states.emailError}
              keyboardType="email-address"
              inputStyle={styles.inputText}
              textContentType="emailAddress"
              onChangeText={states.setEmail}
              setError={states.setEmailError}
              onSubmitEditing={handlers.handleSubmit}
              placeholderTextColor={styles.placeholder.color}
            />

            {states.apiError ? (
              <AppText
                centered
                label={states.apiError}
                style={styles.errorText}
              />
            ) : null}

            <AppButton
              loader={loader}
              disabled={loader}
              topMargin={2.6}
              style={styles.button}
              title="Send Reset Link"
              onPress={handlers.handleSubmit}
              labelStyle={styles.buttonLabel}
            />
          </View>
        )}

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
