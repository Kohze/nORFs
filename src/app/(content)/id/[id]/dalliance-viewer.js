'use client'

import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      const setAttributeFromEvent = (event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute("data-status"));
    }

    const setStateFromEvent = (event) => {
      setStatus(event.type === "load" ? "ready" : "error");
    };

    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src]);

  return status;
}

export default function DallianceViewer({ norfData }) {
  const status = useScript(
    "https://www.biodalliance.org/release-0.13/dalliance-compiled.js"
  );

  const scriptStr = `
    <script language="javascript">
      new Browser({
        chr: '${norfData.seqname}',
        viewStart: ${norfData.start - 2000},
        viewEnd: ${norfData.end + 2000},
        coordSystem: {
          speciesName: 'Human',
          taxon: 9606,
          auth: 'GRCh',
          version: '38',
          ucscName: 'hg38'
        },
        sources: [{
          name: 'Genome',
          twoBitURI: '//www.biodalliance.org/datasets/hg38.2bit',
          tier_type: 'sequence'
        },
        {
          name: 'Genes',
          desc: 'Gene structures from GENCODE',
          bwgURI: '//www.biodalliance.org/datasets/gencode.bb',
          stylesheet_uri: '//www.biodalliance.org/stylesheets/gencode.xml',
          collapseSuperGroups: true,
          trixURI: '//www.biodalliance.org/datasets/geneIndex.ix'
        },
        {
          name: 'Repeats',
          desc: 'Repeat annotation from Ensembl',
          bwgURI: '//www.biodalliance.org/datasets/repeats.bb',
          stylesheet_uri: '//www.biodalliance.org/stylesheets/bb-repeats.xml'
        },
        {
          name: 'DNase I',
          desc: 'GM12878 DNaseI signals from UW', 
          bwgURI: '//www.biodalliance.org/datasets/encode/wgEncodeUwDnaseGm12878Aln_2Reps.norm5.rawsignal.bw', 
          style: [{type: 'default', style: {glyph: 'HISTOGRAM', BGCOLOR: 'rgb(8,104,172)', HEIGHT: 30, id: 'style1'}}], 
          noDownsample: true
        },
        {
          name: 'Conservation',
          desc: 'Conservation', 
          bwgURI: '//www.biodalliance.org/datasets/phastCons46way.bw',
          noDownsample: true
        },
        {
          name: 'H3K4me1',
          desc: 'GM12878 H3K4me1 signal from Broad',
          bwgURI: '//www.biodalliance.org/datasets/encode/wgEncodeBroadHistoneGm12878H3k4me1StdAln_2Reps.norm5.rawsignal.bw',
          style: [{type: 'default', style: {glyph: 'HISTOGRAM', BGCOLOR: 'rgb(166,71,71)', HEIGHT: 30, id: 'style1'}}], 
          noDownsample: true
        }, 
        {
          name: 'H3K4me3',
          desc: 'GM12878 H3K4me3 signal from UW', 
          bwgURI: '//www.biodalliance.org/datasets/encode/wgEncodeUwHistoneGm12878H3k4me3StdAln_2Reps.norm5.rawsignal.bw',
          style: [{type: 'default', style: {glyph: 'HISTOGRAM', BGCOLOR: 'rgb(166,71,71)', HEIGHT: 30, id: 'style1'}}], 
          noDownsample: true
        },
        {
          name: 'GM12878 ChromHMM',
          desc: 'GM12878 ChromHMM Genome Segmentation', 
          bwgURI: '//www.biodalliance.org/datasets/encode/gm12878.ChromHMM.bb',
          style: [{type: 'bigbed', style: {glyph: 'BOX', FGCOLOR: 'black', BGCOLOR: 'blue', HEIGHT: 8, BUMP: false, LABEL: false, ZINDEX: 20, BGITEM: true, id: 'style1'}}]
        }]
      });
    </script>
    <div id="svgHolder"></div>
  `

  return (
    <>
      {status === "ready" && (
        <div>
          <InnerHTML html={scriptStr} />
        </div>
      )}
    </>
  );
}