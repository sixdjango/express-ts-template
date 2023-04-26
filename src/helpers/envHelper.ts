import { EnvKeys } from '@/constants/env'

export const getEnv = (key: string) => {
  return process.env[key]
}

export const getSecret = () => {
  return getEnv(EnvKeys.JWT_SECRET)
}

export const getPort = () => {
  return getEnv(EnvKeys.PORT)
}
