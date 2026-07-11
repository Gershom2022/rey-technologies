function ServiceCard({ title, description, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {Icon && <Icon className="text-blue-600 mb-3" size={28} />}
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default ServiceCard