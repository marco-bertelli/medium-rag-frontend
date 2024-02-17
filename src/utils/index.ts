import { WidgetProps } from 'types/widget'

export const withUserToken = (userToken?: WidgetProps['userToken']) => ({
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
})

export const replaceLinksWithTags = (message: string) => {
  const regex = /https:\/\/\S+/g
  return message.replace(regex, '<a href="$&" style="text-decoration: underline" target="_blank">$&</a>')
}
