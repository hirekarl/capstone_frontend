import NewProjectForm from "../forms/NewProjectForm"

export default function ProjectsPage() {
  return (
    <>
      <div className="container-fluid mt-3">
        <h1>Projects</h1>
        <div className="row">
          <div className="col-xs-12 col-lg-6 mb-3 mb-lg-0">
            <NewProjectForm />
          </div>
          <div className="col-xs-12 col-lg-6">
            <div>Hello</div>
          </div>
        </div>
      </div>
    </>
  )
}
