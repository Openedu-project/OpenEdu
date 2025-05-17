const config = {
  default: {
    override: {
      wrapper: 'aws-lambda-streaming',
      tagCache: 'dynamodb-lite',
      incrementalCache: 's3-lite',
      queue: 'sqs-lite',
    },
  },
};

export default config;
