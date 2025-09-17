import BaseCardButton from "./BaseCardButton"

export default function DetailButton({
  handleClick,
}: {
  handleClick: (event: React.MouseEvent) => void
}) {
  return (
    <BaseCardButton
      color="info"
      icon="info-circle"
      text="Detail"
      handleClick={handleClick}
    />
  )
}
