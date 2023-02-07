import type { CreateClientConfig } from '@prismicio/next'
import { createPrismicClient } from '../prismic-config'

export const metaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.META_REPOSITORY_NAME!,
    process.env.META_API_TOKEN!,
    config,
  )

export const vtorayaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.VTORAYA_REPOSITORY_NAME!,
    process.env.VTORAYA_API_TOKEN!,
    config,
  )

export const pervayaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.PERVAYA_REPOSITORY_NAME!,
    process.env.PERVAYA_API_TOKEN!,
    config,
  )

export const afishaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.AFISHA_REPOSITORY_NAME!,
    process.env.AFISHA_API_TOKEN!,
    config,
  )

export const rodinaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.RODINA_REPOSITORY_NAME!,
    process.env.RODINA_API_TOKEN!,
    config,
  )

export const veschdokClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.VESCHDOK_REPOSITORY_NAME!,
    process.env.VESCHDOK_API_TOKEN!,
    config,
  )
export const krasnoeZnamyaClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.KRASNOE_ZNAMYA_REPOSITORY_NAME!,
    process.env.KRASNOE_ZNAMYA_API_TOKEN!,
    config,
  )

export const devClient = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.DEV_REPOSITORY_NAME!,
    process.env.DEV_API_TOKEN!,
    config,
  )
