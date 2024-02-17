import styled from 'styled-components'

type ButtonProps = {
  backgroundColor: string
  borderRadius: string
  borderWidth: string
  borderColor: string
  enableHover: boolean
  hoverBackgroundColor: string
  hoverborderWidth: string
}

export const Button = styled.button<ButtonProps>`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => (props.enableHover ? props.hoverBackgroundColor : 'none')};
    color: ${(props) => (props.enableHover ? props.color : 'none')};
    border: ${(props) => (props.enableHover ? `${props.hoverborderWidth} solid ${props.borderColor}` : 'none')};
  }
`
