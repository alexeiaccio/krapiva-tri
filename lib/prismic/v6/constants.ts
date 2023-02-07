import {
  afishaClient,
  devClient,
  krasnoeZnamyaClient,
  metaClient,
  pervayaClient,
  rodinaClient,
  veschdokClient,
  vtorayaClient,
} from './clients'

export const CLIENTS = {
  afisha: afishaClient(),
  dev: devClient(),
  krasnoeZnamya: krasnoeZnamyaClient(),
  pervaya: pervayaClient(),
  meta: metaClient(),
  rodina: rodinaClient(),
  veschdok: veschdokClient(),
  vtoraya: vtorayaClient(),
} as const

export type ClientKeys = keyof typeof CLIENTS

export const CLIENTS_BY_REPO = {
  'afisha-2019': afishaClient(),
  'krapiva-dev': devClient(),
  krasnoeznamya: krasnoeZnamyaClient(),
  'krapiva-meta': pervayaClient(),
  'krapiva-org': metaClient(),
  'rodina-konf': rodinaClient(),
  veschdok: veschdokClient(),
  'krapiva-2019': vtorayaClient(),
} as const

export type ClientByRepoKeys = keyof typeof CLIENTS_BY_REPO

export const TEXT_API = [
  'vtoraya',
  'krasnoeZnamya',
  'veschdok',
  'rodina',
  'pervaya',
] as const

export type TextApiKeys = typeof TEXT_API[number]
