export interface AIProvider {
  id: string
  name: string
  description?: string
}

export const AI_PROVIDERS: AIProvider[] = [
  //   {
  //     id: 'anthropic',
  //     name: 'Claude',
  //     description: 'Anthropic Claude AI助手'
  //   },
  {
    id: 'tencent',
    name: 'Tencent-Deepseek',
    description: '腾讯Deepseek AI助手',
  },
]

export const getProviderIds = () => AI_PROVIDERS.map((provider) => provider.id)

export const getProviderById = (id: string) => AI_PROVIDERS.find((provider) => provider.id === id)

export const DEFAULT_PROVIDER = 'tencent'
