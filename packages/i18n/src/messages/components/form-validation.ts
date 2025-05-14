export const formValidationMessages = {
  formValidation: {
    required: 'This field is required',
    invalid_date: 'Invalid date',
    invalid_string: {
      email: 'Invalid email',
      url: 'Invalid URL',
      uuid: 'Invalid UUID',
      cuid: 'Invalid CUID',
      regex: 'Does not match pattern',
      datetime: 'Invalid datetime format',
    },
    too_small: {
      array: {
        exact: '{type} - must contain exactly {minimum, plural, =1 {1 element} other {# elements}}',
        inclusive: '{type} - must contain at least {minimum, plural, =1 {1 element} other {# elements}}',
      },
      string: {
        exact: '{type} - must contain exactly {minimum, plural, =1 {1 character} other {# characters}}',
        inclusive: '{type} - must contain at least {minimum, plural, =1 {1 character} other {# characters}}',
      },
      number: {
        exact: '{type} - must be equal to {minimum}',
        inclusive: '{type} - must be greater than or equal to {minimum}',
      },
      set: {
        exact: '{type} - must contain exactly {minimum, plural, =1 {1 element} other {# elements}}',
        inclusive: '{type} - must contain at least {minimum, plural, =1 {1 element} other {# elements}}',
      },
      date: {
        exact: '{type} - must be {minimum}',
        inclusive: '{type} - must be greater than or equal to {minimum}',
      },
    },
    too_big: {
      array: {
        exact: '{type} - must contain exactly {maximum, plural, =1 {1 element} other {# elements}}',
        inclusive: '{type} - must contain at most {maximum, plural, =1 {1 element} other {# elements}}',
      },
      string: {
        exact: 'String must contain exactly {maximum, plural, =1 {1 character} other {# characters}}',
        inclusive: 'String must contain at most {maximum, plural, =1 {1 character} other {# characters}}',
      },
      number: {
        exact: '{type} - must be equal to {maximum}',
        inclusive: '{type} - must be less than or equal to {maximum}',
      },
      set: {
        exact: '{type} - must contain exactly {maximum, plural, =1 {1 element} other {# elements}}',
        inclusive: '{type} - must contain at most {maximum, plural, =1 {1 element} other {# elements}}',
      },
      date: {
        exact: '{type} - must be {maximum}',
        inclusive: '{type} - must be less than or equal to {maximum}',
      },
    },
    urlLabel: 'URL',
    singleUrlDescription: 'Enter a valid URL.',
    multipleUrlsDescription: 'URLs should be entered on separate lines, separated by commas, or spaces.',
    singleUrlError: 'Invalid URL',
    multipleUrlError: 'One of the URLs is invalid',
    arrayError: 'Please select at least one item',
    urlNote: 'You can copy paste again to get the right URL format.',
  },
};
