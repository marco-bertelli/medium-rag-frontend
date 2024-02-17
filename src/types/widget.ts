import { ChatRole } from 'types/index'

export type WidgetHeaderCss = {
  textColor: string
  backgroundColor: string
  enableBotAvatarBorder: number
  avatarStyle: {
    borderRadius: string
  }
}

export type WidgetTheme = {
  colors: {
    primary: string
    secondary: string
    grey: string
    green: string
    red: string
  }
}

export type WidgetProps = {
  serverApiUrl: string
  initialPayload?: string
  userId?: string | null
  userToken?: string | null
  botAvatar?: string
  logo: string
  widgetColor?: string
  textColor?: string
  userMsgBackgroundColor?: string
  botTitle?: string
  botSubTitle?: string
  botMsgBackgroundColor: string
  chatHeaderCss: WidgetHeaderCss
  chatHeaderTextColor: string
  errorMessages?: string[]
  botMsgColor?: string
  userMsgColor?: string
  buttonsCss?: any
  embedded?: boolean
  btnColor: string
  theme: WidgetTheme
  chatRole?: ChatRole | null
}
