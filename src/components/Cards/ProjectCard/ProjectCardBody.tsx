import type { ReactNode } from "react"

export interface ProjectCardBodyProps {
  heading: string
  text: string
  children?: ReactNode
}

export default function ProjectCardBody({ heading, text, children }: ProjectCardBodyProps) {
  return (
    <div className="card-body">
      <h3 className="card-title fs-5">{heading}</h3>
      <p className="card-text">{text}</p>
      {children}
    </div>
  )
}
