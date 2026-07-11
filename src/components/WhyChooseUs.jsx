function WhyChooseUs() {
  const chooseus = ['Experienced Engineers', 'Tailor-Made Solutions', 'Timely Delivery', 'Affordable Pricing', 'Reliable Support'];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="font-semibold text-xl mb-4">Why Choose Us</h2>
      <ul className="grid grid-cols-2 gap-4">
        {chooseus.map((item) => (
          <li key={item} className="flex items-center gap-2 text-gray-700">
            <span className="text-green-600 font-bold">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default WhyChooseUs