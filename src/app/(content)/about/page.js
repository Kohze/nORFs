import React from 'react'

export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About nORFs.org</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            nORFs.org is created and maintained by the Prabakaran Group, Department of Genetics, University of Cambridge.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mission is to provide a comprehensive database of non-canonical Open Reading Frames (nORFs) to support research in genetics and molecular biology.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            For any inquiries or support, please contact our maintainer:
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            Robin Gounder
          </p>
          <p className="text-lg text-gray-600">
            Email: <a href="mailto:rk581@cam.ac.uk" className="text-indigo-600 hover:text-indigo-500">rk581@cam.ac.uk</a>
          </p>
        </div>
      </div>
    </div>
  )
}
