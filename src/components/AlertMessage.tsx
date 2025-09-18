import type { AlertMessageType } from "../types"

export default function AlertMessage({ type, message }: AlertMessageType) {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`}>
      {message}
    </div>
  )
}
