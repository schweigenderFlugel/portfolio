export const Icon = ({ name, className }: { name: string, className?: string }) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
    >
      <use href={`/${name}.svg#icon`}  />
    </svg>
  )
}