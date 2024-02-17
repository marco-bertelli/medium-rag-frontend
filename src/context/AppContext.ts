//@flow
import { createContext } from 'react'
import type { WidgetProps } from 'types/widget'

const AppContext = createContext<WidgetProps>({
  serverApiUrl: '',
  initialPayload: '',
  botAvatar: '',
  widgetColor: '',
  botTitle: '',
  botSubTitle: '',
  logo: '',
  textColor: '',
  userMsgBackgroundColor: '',
  botMsgBackgroundColor: '',
  botMsgColor: '',
  userMsgColor: '',
  buttonsCss: {},
  chatHeaderCss: {
    textColor: '',
    backgroundColor: '',
    enableBotAvatarBorder: 0,
    avatarStyle: {
      borderRadius: '',
    },
  },
  theme: {
    colors: {
      primary: '',
      secondary: '',
      grey: '',
      green: '',
      red: '',
    },
  },
  btnColor: 'black',
  chatHeaderTextColor: '',
  errorMessages: [],
  embedded: false,
  userToken: undefined,
  userId: undefined,
  chatRole: undefined,
})

export default AppContext
