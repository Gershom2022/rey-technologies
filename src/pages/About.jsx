function About() {
  const values = [
    'Innovation',
    'Integrity',
    'Excellence',
    'Customer Success',
    'Collaboration',
    'Accountability',
    'Continuous Learning'
  ];

  return (
    <div className="py-16 px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Rey Technologies</h1>

      <p className="text-gray-600 mb-4">
        Rey Technologies Limited is a leading technology solutions company committed to helping
        organizations embrace digital transformation through innovative, reliable, and scalable
        software solutions. We partner with businesses, government institutions, NGOs, healthcare
        organizations, educational institutions, and SMEs to streamline operations, improve
        efficiency, and unlock growth using modern technology.
      </p>

      <p className="text-gray-600 mb-12">
        Our team combines technical expertise with industry experience to deliver solutions that
        solve real-world challenges while ensuring security, performance, and long-term sustainability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="font-semibold text-xl mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To empower organizations through innovative technology solutions that improve
            efficiency, drive growth, and create lasting value.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="font-semibold text-xl mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become a trusted technology partner recognized for delivering innovative digital
            solutions that transform businesses across Africa and beyond.
          </p>
        </div>
      </div>

      <h2 className="font-semibold text-xl mb-4">Our Core Values</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {values.map((value) => (
          <li key={value} className="flex items-center gap-2 text-gray-700">
            <span className="text-blue-600 font-bold">•</span>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;