import type { AlertMessageType } from "../types"

export default function AlertMessage({ type, message }: AlertMessageType) {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`}>
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
