import type { TaskType } from "../../types"

export default function TaskCard({
  _id,
  title,
  description,
  status,
  project,
}: TaskType) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{status}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center justify-content-start gap-1">
          <button type="button" className="btn btn-info">
            <i className="bi bi-info-circle"></i> Detail
          </button>
          <button type="button" className="btn btn-warning">
            <i className="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" className="btn btn-danger">
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  )
}
