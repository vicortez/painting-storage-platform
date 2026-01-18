import { Loader2 } from 'lucide-react'

type Props = {
  className?: string
  size?: number
}

const Loading = ({ className, size = 24 }: Props) => {
  return <Loader2 className={`${className} animate-spin`} size={size} />
}

export default Loading
