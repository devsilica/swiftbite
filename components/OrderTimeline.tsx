type Props = {
  timeline: {
    label: string
    time: string
  }[]
}

export default function OrderTimeline({ timeline }: Props) {

  return (

    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">

      <h3 className="font-semibold mb-6">
        Order Timeline
      </h3>

      <div className="space-y-6">

        {timeline.map((item, index) => (

          <div key={index} className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>

              <span className="text-sm">
                {item.label}
              </span>

            </div>

            <span className="text-xs text-gray-400">
              {item.time}
            </span>

          </div>

        ))}

      </div>

    </div>

  )

}