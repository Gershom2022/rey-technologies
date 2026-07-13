function ServiceCard({ title, description, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border-2 border-primary rounded-lg p-6 bg-white hover:bg-light transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 group"
    >
      {Icon && (
        <div className="mb-4 p-3 bg-light rounded-lg inline-block group-hover:bg-accent group-hover:bg-opacity-10 transition-all duration-300">
          <Icon />
        </div>
      )}
      <h3 className="font-semibold text-xl mb-3 text-dark group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      
      <div className="mt-4 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export default ServiceCard