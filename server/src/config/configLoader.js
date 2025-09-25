import { GetParametersByPathCommand, SSMClient } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({
  region: 'ap-south-1', //Mumbai region
});

export const loadConfig = async () => {
  try {
    console.log('Loading configuration from AWS Parameter Store...');
    const command = new GetParametersByPathCommand({
      Path: '/url-shortener/dev', // The path for app's secrets
      WithDecryption: true, // Necessary for SecureString types
    });
    const response = await ssmClient.send(command);
    if (!response.Parameters || response.Parameters.length === 0) {
      throw new Error('No Parameters found in SSM');
    }
    // Transform the array of parameters into process.env variables
    response.Parameters.forEach((p) => {
      const key = p.Name.split('/').pop().toUpperCase();
      process.env[key] = p.Value;
    });
    console.log('Successfully loaded configuration from SSM Parameter Store');
  } catch (error) {
    console.error('Fatal: Failed to load configuration from SSM: ', error);
    process.exit(1);
  }
};
