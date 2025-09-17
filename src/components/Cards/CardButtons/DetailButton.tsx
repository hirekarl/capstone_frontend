import BaseCardButton from "./BaseCardButton"

interface DetailButtonProps {
  handleClick: () => void
}

export default function DetailButton({ handleClick }: DetailButtonProps) {
  return (
    <BaseCardButton
      color="info"
      icon="info-circle"
      text="Detail"
      handleClick={handleClick}
    />
  )
}
