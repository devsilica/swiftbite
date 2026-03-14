type Props = {
  status: string
}

const steps = [
  { key: "pending", label: "Pending" },
  { key: "preparing", label: "Preparing" },
  { key: "ready", label: "Ready" },
  { key: "on_the_way", label: "On the way" },
  { key: "delivered", label: "Delivered" },
]

export default function OrderProgress({ status }: Props) {

  const currentIndex = steps.findIndex((s) => s.key === status)

  return (

    <div className="w-full mt-10">

      <div className="flex items-center justify-between relative">

        {/* Background line */}

        <div className="absolute top-4 left-0 right-0 h-[3px] bg-gray-200"></div>

        {/* Active line */}

        <div
          className="absolute top-4 left-0 h-[3px] bg-orange-600 transition-all"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {

          const active = index <= currentIndex

          return (

            <div
              key={step.key}
              className="flex flex-col items-center z-10"
            >

              {/* Circle */}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shadow
                ${
                  active
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>

              {/* Label */}

              <span
                className={`text-xs mt-2
                ${active ? "text-orange-600 font-medium" : "text-gray-400"}
                `}
              >
                {step.label}
              </span>

            </div>

          )
        })}

      </div>

    </div>

  )

}