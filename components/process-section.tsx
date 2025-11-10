import Image from "next/image";

export default function ProcessSection() {
  const processSteps = [
    "Discovery & Research",
    "Strategy & Planning",
    "Design & Prototyping",
    "Development & Testing",
    "Launch & Support",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-2xl border ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">
            Our Process
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
            How We Turn Ideas Into Digital Reality
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-0">
            At Synctom, every project follows a refined, client-focused process
            — from initial research to final delivery. Our workflow ensures
            clarity, quality, and innovation at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Process Steps */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0383CA 0%, #EF3A61 100%)",
                  }}
                ></div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{step}</h3>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-64 sm:h-80 md:h-96 w-full">
              <Image
                src="/portfolio-image.png"
                alt="Process Illustration - Person working at desk"
                fill
                className="object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
