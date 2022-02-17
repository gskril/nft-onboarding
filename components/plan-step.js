import Link from 'next/link'

export default function Step({num, title, href}) {
  return (
    <Link href={href}>
      <a>
        <span>
          {title}
        </span>
        <span>
          {num}
        </span>
      </a>
    </Link>
  )
}