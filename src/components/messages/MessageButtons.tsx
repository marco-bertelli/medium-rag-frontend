import { Button } from 'components/ui/Button'
import { useAppContext } from 'hooks/useAppContext'
import clsx from 'clsx'

export type ButtonItem = {
  label: string
  action: () => Promise<void>
  isResponse?: boolean
}

export type MessageButtonsProps = {
  items?: ButtonItem[]
  buttons?: JSX.Element[]
  enabled?: boolean
}

export const MessageButtons = ({ items, enabled, buttons }: MessageButtonsProps) => {
  const { buttonsCss } = useAppContext()
  return (
    <div className="tw-flex tw-flex-col tw-ml-[22px] tw-mb-[10px]">
      <div
        className={`tw-mt-2 tw-flex tw-flex-wrap tw-gap-2 tw-self-start tw-whitespace-pre-line tw-break-words tw-text-sm tw-text-white`}
      >
        {buttons?.map((button, index) => <div key={index}>{button}</div>)}
        {items?.map((item, index) => (
          <Button
            type="button"
            key={index}
            className={clsx('tw-px-4 tw-py-1 tw-text-center tw-text-sm tw-font-medium', {
              'tw-cursor-not-allowed': !enabled,
            })}
            
            backgroundColor={buttonsCss.backgroundColor}
            color={buttonsCss.color}
            borderRadius={buttonsCss.borderRadius}
            borderWidth={buttonsCss.borderWidth}
            hoverborderWidth={buttonsCss.hoverborderWidth}
            borderColor={buttonsCss.borderColor}
            enableHover={buttonsCss.enableHover}
            hoverBackgroundColor={enabled ? buttonsCss.hoverBackgroundColor : buttonsCss.backgroundColor}
            onClick={() => enabled && item?.action?.()}
            disabled={!enabled}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
