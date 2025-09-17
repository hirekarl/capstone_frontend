import BaseCardButton from "./BaseCardButton"

interface DeleteButtonProps {
  handleClick: () => void
}

export default function DeleteButton({ handleClick }: DeleteButtonProps) {
  return (
    <BaseCardButton
      color="danger"
      icon="trash"
      text="Delete"
      handleClick={handleClick}
    />
  )
}
