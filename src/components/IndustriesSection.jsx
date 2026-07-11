function IndustriesSection () {
    const industries = ['Healthcare', 'Financial Services', 'Retail', 'Education', 'Government', 'Manufacturing', 'Agriculture', 'Logistics', 'Hospitality', 'NGOs', 'SMEs'];

    return (
        <section className="py-16 px-8">
            <h2 className="font-semibold text-xl mb-4">Industries We Serve</h2>
            <div className="flex flex-wrap gap-3">
                {industries.map((item) =>(
                    <span key = {item} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                        {item}
                    </span>
                ))}
            </div>
        </section>
    )
}

export default IndustriesSection