interface ProjectCardBodyProps {
  heading: string
  text: string
}

export default function ProjectCardBody({
  heading,
  text,
}: ProjectCardBodyProps) {
  return (
    <div className="card-body">
      <h3 className="card-title fs-5">{heading}</h3>
      <p className="card-text">{text}</p>
    </div>
  )
}
