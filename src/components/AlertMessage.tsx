import Alert from "react-bootstrap/Alert"

import { type AlertMessageType } from "../types"

export default function AlertMessage({ type, message }: AlertMessageType) {
  return (
    <Alert variant={type} dismissible>
      {message}
    </Alert>
  )
}
