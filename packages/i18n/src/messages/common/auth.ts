export const authMessages = {
  auth: {
    logout: 'Logout',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Enter your confirm password',
    agreement: 'I agreed to the {link}',
    alreadyAccount: 'Alreay have account?',
    sendYourEmail: 'Send Your Email',
    termsAndConditions: 'terms and conditions',
    login: {
      title: 'Login', // MOVE TO themepage.${themeName}.auth...
      slogan: 'LEARN FROM THE BEST. MASTER LATEST SKILLS - Anytime, Anywhere.',
      success: 'Login success.',
      seperate: 'Or continue with',
      noAccount: "Don't have an account?",
      terms: "By logging in, you agree to our's",
      errors: {
        emailInvalid: 'Please enter a valid email address.',
        passwordLength: 'Password must be at least 8 characters long.',
      },
    },
    signup: {
      title: 'Sign Up',
      slogan: 'LEARN FROM THE BEST. MASTER LATEST SKILLS - Anytime, Anywhere.',
      success: 'Signup success.',
      seperate: 'Or signup with your email',
      displayName: 'Display Name',
      displayNamePlaceholder: 'Enter your display name',
      noAccount: 'Already have an account?',
      terms: "By signing up to create an account, you agree to our's",
      verification: 'Please check your email to verify your account.',
      successVerification: 'You have signed up successfully!',
      errors: {
        usernameLength: 'Name must be at least 6 characters',
        passwordInvalid: 'Password must be at least 8 characters long.',
        passwordMissMatch: "Passwords don't match",
        emailInvalid: 'Invalid email address.',
        agreeInvalid: 'You must agree to the terms and conditions',
      },
    },
    forgotPassword: {
      title: 'Forgot Your Password?',
      slogan: 'LEARN FROM THE BEST. MASTER LATEST SKILLS - Anytime, Anywhere.',
      success: 'Sent email to reset password. Please check your email.',
      sendEmail: 'Send Email',
    },
    social: {
      dialogTitle: 'Cannot open browser',
      dialogDescription: 'Please open this link in a web browser to continue logging in',
      copyUrlButton: 'Copy URL',
      signInWithGoogleButton: 'Login with Google',
      copyUrlSuccess: 'Copied URL to clipboard',
    },
    resendEmailButton: {
      resendEmail: 'Resend Verification Email',
      resendTimeRemaining: 'Time Remaining',
    },
    emailVerify: {
      title: 'Verify Email',
      slogan: 'LEARN FROM THE BEST. MASTER LATEST SKILLS - Anytime, Anywhere.',
      backToHome: 'Back To Home',
      congratTitle: 'Congratulations, your account has been verified.',
      congratDescription:
        "We're redirecting you to the home page in {seconds, plural, =1 {1 second} other {# seconds}}",
      successTitle: 'Congratulations, your account has been verified.',
      successDescription: 'Please click the button below to continue to the home page',
      failedTitle: 'Verification Failed',
    },
    authConfirm: {
      setPasswordTitle: 'Set your password',
      setPasswordDescription: 'Please set your password to continue.',
      setPasswordSuccess: 'Set password success.',
      setPasswordSuccessDescription:
        'Please wait {seconds, plural, =1 {1 second} other {# seconds}} to redirect to the previous page.',
      gotoLogin: 'Go to Login',
      title: 'Confirm Invitation',
      slogan: 'LEARN FROM THE BEST. MASTER LATEST SKILLS - Anytime, Anywhere.',
      setPassword: 'Set Password',
      failedTitle: 'Accept Invitation Failed',
      confirmDescription:
        'You are logging in to your account with {currentEmail}, please click the login button below to continue processing with {email}.',
      confirmDescriptionWithoutLogin: 'Confirmation success, please click the login button below to continue.',
    },
    errors: {
      passwordInvalid:
        'Password must contain at least one uppercase letter, one lowercase letter, be at least {minimum, plural, =1 {1 character} other {# characters}} long, and not be too {maximum, plural, =1 {1 character} other {# characters}} long.',
      passwordMissMatch: "Passwords don't match",
    },
    btn: {
      login: 'Login',
      signUp: 'Sign Up',
    },
  },
};
