'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const FeatureViewer = dynamic(() => import('feature-viewer'), { ssr: false })
const DallianceViewer = dynamic(() => import('./dalliance-viewer.js'), { ssr: false })
const PDBViewer = dynamic(() => import('./PDBViewer.js'), { ssr: false })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Function to get color class for amino acids
const getAminoAcidColor = (aa) => {
  const colorMap = {
    'A': 'bg-blue-200', 'R': 'bg-red-200', 'N': 'bg-green-200', 'D': 'bg-yellow-200',
    'C': 'bg-purple-200', 'Q': 'bg-pink-200', 'E': 'bg-indigo-200', 'G': 'bg-gray-200',
    'H': 'bg-orange-200', 'I': 'bg-teal-200', 'L': 'bg-cyan-200', 'K': 'bg-lime-200',
    'M': 'bg-amber-200', 'F': 'bg-emerald-200', 'P': 'bg-sky-200', 'S': 'bg-violet-200',
    'T': 'bg-fuchsia-200', 'W': 'bg-rose-200', 'Y': 'bg-slate-200', 'V': 'bg-stone-200'
  };
  return colorMap[aa.toUpperCase()] || 'bg-gray-100';
};

export default function NorfDetail({ params }) {
  const [norfData, setNorfData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sequence, setSequence] = useState('')
  const [phyloPScores, setPhyloPScores] = useState([])
  const [phastConsScores, setPhastConsScores] = useState([])

  useEffect(() => {
    const fetchNorfDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('norfs')
          .select('*')
          .eq('gene_id', params.id)
          .single()

        if (error) throw error
        if (!data) notFound()

        setNorfData({
          ...data,
          pdb_url: `https://norfs.s3.eu-west-2.amazonaws.com/pdb/${data.gene_id}.pdb`
        })
        setSequence(data.AA_seq || '')

        // Simulated conservation scores (replace with actual data fetching when available)
        setPhyloPScores(Array(100).fill(0).map(() => Math.random()))
        setPhastConsScores(Array(100).fill(0).map(() => Math.random()))
      } catch (err) {
        console.error('Error fetching nORF details:', err)
        setError('Failed to fetch nORF details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchNorfDetails()
  }, [params.id])

  useEffect(() => {
    if (sequence && norfData && typeof FeatureViewer === 'function') {
      const ft = new FeatureViewer(sequence,
        '#featureViewer',
        {
          showAxis: true,
          showSequence: true,
          brushActive: true,
          toolbar: true,
          bubbleHelp: true,
          zoomMax: 10
        })

      // Add features here if needed
      // Example:
      
      // ft.addFeature({
      //   data: [{x: 10, y: 20, description: 'Feature 1'}],
      //   name: "Feature 1",
      //   className: "feature1",
      //   color: "#FF0000",
      //   type: "rect"
      // });
    }
  }, [sequence, norfData])

  if (loading) return <div className="text-center py-24">Loading...</div>
  if (error) return <div className="text-center py-24 text-red-500">{error}</div>
  if (!norfData) return notFound()

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">nORF Id: {norfData.gene_id}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">General Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {Object.entries(norfData)
                  .filter(([key]) => key !== 'AA_seq' && key !== 'pdb_url' && key !== 'id' && key !== 'gene_id')
                  .map(([key, value]) => (
                    <React.Fragment key={key}>
                      <dt className="text-sm font-medium text-gray-500">
                        {key === 'seqname' ? 'chr' : key}
                      </dt>
                      <dd className="text-sm text-gray-900">{value !== null ? value : 'N/A'}</dd>
                    </React.Fragment>
                  ))}
              </dl>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">3D Structure</h3>
              <div className="bg-gray-100 p-4 rounded-lg h-64 flex items-center justify-center">
                {norfData.pdb_url ? (
                  <PDBViewer pdbUrl={norfData.pdb_url} />
                ) : (
                  <p className="text-gray-600">Not available</p>
                )}
              </div>
            </div>
          </div>

        

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Sequence Information</h3>
            <div id="featureViewer"></div>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
              <div className="text-sm whitespace-pre-wrap">
                {norfData.AA_seq.split('').reduce((acc, aa, index) => {
                  const colorClass = getAminoAcidColor(aa);
                  acc.push(
                    <span key={`aa-${index}`} className={`inline-block ${colorClass} w-6 h-6 text-center`}>
                      {aa}
                    </span>
                  );
                  if ((index + 1) % 50 === 0) {
                    acc.push(<br key={`br-${index}`} />);
                  }
                  return acc;
                }, [])}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Genome Browser</h3>
            <DallianceViewer norfData={norfData} />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Conservation Scores</h3>
            <div>
              <Chart
                options={{
                  chart: {
                    zoom: { enabled: false },
                    toolbar: { show: false }
                  },
                  xaxis: {
                    title: { text: 'Position' },
                    labels: {
                      formatter: function(value) {
                        return value % 5 === 0 ? value : '';
                      }
                    }
                  },
                  yaxis: { 
                    title: { text: 'Score' },
                    min: 0,
                    max: 1,
                    labels: {
                      formatter: function (val) {
                        return val.toFixed(1);
                      }
                    }
                  },
                  legend: {
                    position: 'top'
                  },
                  stroke: {
                    width: 2 // Make the lines thinner
                  }
                }}
                series={[
                  { name: "PhyloP score", data: phyloPScores },
                  { name: "PhastCons score", data: phastConsScores }
                ]}
                type="line"
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
