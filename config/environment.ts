import * as dotenv from 'dotenv';

dotenv.config();

export type TestEnvironment = 'qa' | 'stg' | 'uat' | 'prod';

const environment = (
  process.env.TEST_ENV ?? 'qa'
).toLowerCase() as TestEnvironment;

const baseUrls: Record<TestEnvironment, string | undefined> = {
  qa: process.env.QA_BASE_URL,
  stg: process.env.STG_BASE_URL,
  uat: process.env.UAT_BASE_URL,
  prod: process.env.PROD_BASE_URL
};

export function getEnvironment(): TestEnvironment {
  if (!baseUrls[environment]) {
    throw new Error(`BASE_URL is not configured for ${environment}`);
  }

  return environment;
}

export function getBaseUrl(): string {
  const baseUrl = baseUrls[environment];

  if (!baseUrl) {
    throw new Error(`BASE_URL is not configured for ${environment}`);
  }

  return baseUrl;
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === '') {
    throw new Error(
      `Required environment variable "${name}" is missing or empty`
    );
  }

  return value;
}