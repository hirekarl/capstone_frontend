import BaseCardButton from "./BaseCardButton"

export default function EditButton({
  handleClick,
}: {
  handleClick: (event: React.MouseEvent) => void
}) {
  return (
    <BaseCardButton
      color="warning"
      icon="pencil-square"
      text="Edit"
      handleClick={handleClick}
    />
  )
}
