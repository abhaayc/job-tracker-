function StatsCard({ title, value }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6">
      <p className="text-zinc-400">
        {title}
      </p>

      <h3 className="text-4xl mt-2 font-bold">
        {value}
      </h3>
    </div>
  )
}

export default StatsCard