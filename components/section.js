import styles from '../styles/section.module.css'

export default function Section({alignment, title, description, media}) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
      <div className="section-media">
        {media}
      </div>
    </div>
  )
}