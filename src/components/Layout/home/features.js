import { Database, Search, Code, FileText } from 'lucide-react'

const features = [
  {
    name: 'Comprehensive nORF Database',
    description:
      'Access a vast collection of non-canonical Open Reading Frames (nORFs) data, including gene IDs, sequences, and genomic locations. Our database is regularly updated to provide the most current information.',
    icon: Database,
  },
  {
    name: 'Advanced Search Functionality',
    description:
      'Utilize our powerful search tool to quickly find specific nORFs based on various criteria such as gene ID, start and end positions, or sequence features. Efficiently navigate through the extensive dataset.',
    icon: Search,
  },
  {
    name: 'API Access',
    description:
      'Integrate nORFs.org data directly into your research workflow with our comprehensive API. Programmatically access and analyze nORF information to enhance your bioinformatics projects.',
    icon: Code,
  },
  {
    name: 'Detailed Methods Documentation',
    description:
      'Understand the methodologies behind our nORF identification and classification processes. Access in-depth documentation on our data curation, analysis techniques, and quality control measures.',
    icon: FileText,
  },
]

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Features
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                      color="white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
