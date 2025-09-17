import BaseCardButton from "./BaseCardButton"

interface EditButtonProps {
  handleClick: () => void
}

export default function EditButton({ handleClick }: EditButtonProps) {
  return (
    <BaseCardButton
      color="warning"
      icon="pencil-square"
      text="Edit"
      handleClick={handleClick}
    />
  )
}
