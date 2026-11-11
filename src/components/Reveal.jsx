export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  style,
  ...rest
}) {
  return (
    <Tag
      className={`rv ${className}`.trim()}
      style={{ '--rv-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
