type Props = {
  status?: string
}

export default function PaymentBadge({ status }: Props) {

  const map: Record<string, string> = {
    unpaid: "bg-red-100 text-red-700",
    paid: "bg-green-100 text-green-700",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize
      ${map[status || ""] || "bg-gray-100 text-gray-600"}`}
    >
      {status || "unknown"}
    </span>
  )
}