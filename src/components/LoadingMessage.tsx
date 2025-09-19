interface LoadingMessageProps {
  component: "dashboard" | "projects" | "tasks"
}

export default function LoadingMessage({ component }: LoadingMessageProps) {
  return (
    <div className="container-fluid mt-3">
      <p className="text-center">
        Loading {component}&hellip; Please be patient!
      </p>
    </div>
  )
}
