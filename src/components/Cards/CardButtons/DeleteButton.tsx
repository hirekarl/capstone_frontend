import BaseCardButton from "./BaseCardButton"

export default function DeleteButton({
  handleClick,
}: {
  handleClick: (event: React.MouseEvent) => void
}) {
  return (
    <BaseCardButton
      color="danger"
      icon="trash"
      text="Delete"
      handleClick={handleClick}
    />
  )
}
