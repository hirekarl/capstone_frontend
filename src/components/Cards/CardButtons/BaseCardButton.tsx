export interface BaseCardButtonProps {
  color: "info" | "warning" | "danger"
  icon: "info-circle" | "pencil-square" | "trash"
  text: "Detail" | "Edit" | "Delete"
  handleClick: (event: React.MouseEvent) => void
}

export default function BaseCardButton({
  color,
  icon,
  text,
  handleClick,
}: BaseCardButtonProps) {
  return (
    <button type="button" className={`btn btn-${color}`} onClick={handleClick}>
      <i className={`bi bi-${icon}`}></i>&nbsp;{text}
    </button>
  )
}
