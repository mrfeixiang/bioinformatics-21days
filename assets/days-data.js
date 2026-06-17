/* 21-day Bioinformatics curriculum (R + Python).
   Themed around infectious-pathogen diagnostics (Gachon U / KRIBB / 중겸 R&D context).
   URLs intentionally use stable destinations: official docs, topic pages, subreddits,
   and YouTube search queries (which always resolve to fresh, real results). */

const DAYS = [
/* ───────── Week 1: Foundations (Days 1–7) ───────── */
{
  day: 1, weekNum: 1, week: "Week 1 · Foundations",
  title: "Welcome + Environment Setup",
  summary: "What bioinformatics actually is, and getting R + Python running on your machine.",
  intro: "You will install R, RStudio, Python (Miniconda), and a code editor (VS Code). By the end you will run a one-liner in each language that reads a real FASTA sequence from NCBI.",
  tags: [{label:"Intro", cls:"bio"},{label:"R", cls:"r"},{label:"Python", cls:"py"}],
  objectives: [
    "Define what bioinformatics is and the kinds of problems it solves",
    "Install R + RStudio + Bioconductor",
    "Install Miniconda and create a Python environment with Biopython",
    "Run your first FASTA-loading script in both R and Python",
    "Create a GitHub account and an empty study repo to log your progress"
  ],
  videos: [
    {title: "What is Bioinformatics? (intro talks)", url:"https://www.youtube.com/results?search_query=what+is+bioinformatics+introduction", note:"Watch any two intro talks (~10 min each)"},
    {title: "Install R and RStudio (walkthrough)", url:"https://www.youtube.com/results?search_query=install+R+and+RStudio+windows+mac", note:"Pick the video matching your OS"},
    {title: "Install Miniconda + create env", url:"https://www.youtube.com/results?search_query=install+miniconda+create+environment+bioinformatics", note:"Conda is the standard package manager in bioinformatics"}
  ],
  reading: [
    {url:"https://www.bioconductor.org/install/", title:"Bioconductor — Install", note:"R's biology package ecosystem"},
    {url:"https://biopython.org/wiki/Download", title:"Biopython — Download", note:"Python's biology toolkit"},
    {url:"https://docs.conda.io/projects/miniconda/en/latest/", title:"Miniconda docs", note:"Lightweight conda installer"}
  ],
  tasks: [
    "Install R (≥4.3), RStudio, and Bioconductor with `BiocManager::install()`",
    "Install Miniconda; create env: `conda create -n bi21 python=3.11 biopython pandas jupyter`",
    "Create a GitHub repo called `bioinformatics-21days-log` and commit a README",
    "In R: `library(Biostrings); readDNAStringSet(url('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=NC_045512&rettype=fasta&retmode=text'))`",
    "In Python: use Biopython's `Entrez.efetch` to fetch the same SARS-CoV-2 reference (NC_045512) and print its length"
  ],
  quiz: [
    {q:"Which language ecosystem hosts DESeq2 and Bioconductor?", options:["Python","R","Julia","Perl"], answer:1, explain:"Bioconductor is the canonical R repository for biology packages, including DESeq2."},
    {q:"What is a FASTA file?", options:["Compressed alignment format","Plain-text sequence file with header lines starting with `>`","Binary read archive","Variant call table"], answer:1, explain:"FASTA = header line beginning with `>` followed by sequence lines."},
    {q:"Which is NOT a bioinformatics task?", options:["Aligning DNA reads to a reference","Predicting protein structure","Brewing kombucha","Calling variants from sequencing data"], answer:2, explain:"The other three are core bioinformatics workflows."},
    {q:"NCBI Entrez is best described as…", options:["A protein-structure database","A federated search and retrieval interface for NCBI resources","A read aligner","A workflow manager"], answer:1, explain:"Entrez lets you query nucleotide, protein, taxonomy, PubMed, etc."},
    {q:"Why use conda environments?", options:["They make code faster","They isolate package versions per project","They auto-write your unit tests","They replace git"], answer:1, explain:"Isolation prevents version conflicts across projects."}
  ],
  github: [
    {url:"https://github.com/topics/bioinformatics", title:"GitHub: #bioinformatics topic", note:"Explore trending repos"},
    {url:"https://github.com/Bioconductor", title:"Bioconductor org", note:"All Bioconductor source"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/", title:"r/bioinformatics", note:"The main community subreddit — subscribe today"},
    {url:"https://www.reddit.com/r/learnbioinformatics/", title:"r/learnbioinformatics", note:"Beginner-friendly Q&A"}
  ],
  caseStudy: {
    level: 0,
    title: "Hello, SARS-CoV-2",
    body: "Diagnostic developers (like the IVD project for infectious pathogens) routinely pull the reference genome of a target pathogen. Below: the absolute simplest example — fetch NC_045512 in both R and Python.",
    code:
`# R — Biostrings
library(Biostrings)
url <- "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=NC_045512&rettype=fasta&retmode=text"
genome <- readDNAStringSet(url(url))
print(width(genome))   # expect ~29903

# Python — Biopython
from Bio import Entrez, SeqIO
Entrez.email = "you@example.com"
h = Entrez.efetch(db="nuccore", id="NC_045512", rettype="fasta", retmode="text")
rec = SeqIO.read(h, "fasta"); h.close()
print(len(rec.seq))    # expect 29903`
  }
},

{
  day: 2, weekNum: 1, week: "Week 1 · Foundations",
  title: "Molecular Biology in 1 Hour",
  summary: "Just enough biology — DNA, RNA, protein, central dogma — to read papers without panic.",
  intro: "You don't need a biology degree to do bioinformatics, but you do need a working model. Today gives you exactly that.",
  tags: [{label:"Biology", cls:"bio"}],
  objectives: [
    "Explain the central dogma (DNA → RNA → protein)",
    "Define gene, exon, intron, CDS, ORF, codon, amino acid",
    "Distinguish DNA vs RNA chemistry (deoxyribose vs ribose, T vs U)",
    "Describe what 'transcription' and 'translation' produce",
    "Name three classes of pathogens that diagnostics target (DNA virus, RNA virus, bacterium)"
  ],
  videos: [
    {title:"Central Dogma of Molecular Biology", url:"https://www.youtube.com/results?search_query=central+dogma+of+molecular+biology+explained", note:"Pick any 8–15 min talk"},
    {title:"DNA replication, transcription, translation", url:"https://www.youtube.com/results?search_query=transcription+translation+animation", note:"Animations make this stick"},
    {title:"Viral genome structure overview", url:"https://www.youtube.com/results?search_query=viral+genome+structure+RNA+DNA+virus", note:"Diagnostic targets are often viruses"}
  ],
  reading: [
    {url:"https://www.ncbi.nlm.nih.gov/books/NBK21054/", title:"Molecular Biology of the Cell (Bookshelf)", note:"Free NCBI bookshelf — read Ch.1"},
    {url:"https://www.ebi.ac.uk/training/online/courses/genome-essentials/", title:"EBI — Genome essentials course", note:"Free, ~30 minutes"}
  ],
  tasks: [
    "Write a 1-paragraph plain-English summary of the central dogma",
    "Translate the codon table from memory: AUG → ?, UAA → ?",
    "List 5 pathogens relevant to infectious-disease diagnostics and label each as DNA virus / RNA virus / bacterium / parasite",
    "Sketch the lifecycle of any one pathogen (your choice) on paper",
    "Commit your notes as `day02-biology.md` in your study repo"
  ],
  quiz: [
    {q:"The codon AUG codes for…", options:["Stop","Methionine (start)","Tryptophan","Alanine"], answer:1, explain:"AUG is the start codon — it codes for Methionine."},
    {q:"Which is found in RNA but not DNA?", options:["Adenine","Thymine","Uracil","Cytosine"], answer:2, explain:"RNA uses Uracil; DNA uses Thymine."},
    {q:"An intron is…", options:["A protein domain","A non-coding region spliced out of pre-mRNA","A type of ribosome","A bacterial plasmid"], answer:1, explain:"Introns are intervening sequences removed during splicing."},
    {q:"SARS-CoV-2 is a…", options:["DNA virus","Single-stranded RNA virus","Bacterium","Prion"], answer:1, explain:"It's a +ssRNA virus in the Coronaviridae family."},
    {q:"Translation happens at the…", options:["Nucleus","Mitochondrion only","Ribosome","Centrosome"], answer:2, explain:"Ribosomes are the translation machinery."}
  ],
  github: [
    {url:"https://github.com/CSSEGISandData/COVID-19", title:"JHU CSSE COVID-19 data", note:"Real-world epidemiology dataset"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/biology/", title:"r/biology", note:"Cross-pollinate with the biology community"}
  ],
  caseStudy: {
    level: 0,
    title: "Why a diagnostic 'looks for RNA' in COVID samples",
    body: "SARS-CoV-2 carries its genome as +ssRNA. RT-qPCR diagnostics include a reverse-transcription step to convert that RNA to cDNA before amplification. Understanding the genome type tells you exactly which assay chemistry is needed — and which primers a bioinformatician will design downstream."
  }
},

{
  day: 3, weekNum: 1, week: "Week 1 · Foundations",
  title: "Sequence File Formats",
  summary: "FASTA, FASTQ, GenBank, SAM/BAM, BED, VCF, GFF — what each is for.",
  intro: "Every pipeline is a chain of file-format conversions. Learn what each one stores and you can read any tutorial.",
  tags: [{label:"Formats", cls:"bio"}],
  objectives: [
    "Identify FASTA vs FASTQ at a glance",
    "Explain what SAM/BAM stores after read alignment",
    "Read a VCF header and a single variant line",
    "Describe BED, GFF/GTF coordinate systems (0- vs 1-based)",
    "Use `head`, `grep`, `samtools view` on a real file"
  ],
  videos: [
    {title:"FASTA vs FASTQ", url:"https://www.youtube.com/results?search_query=FASTA+vs+FASTQ+explained", note:""},
    {title:"SAM/BAM format walkthrough", url:"https://www.youtube.com/results?search_query=SAM+BAM+file+format+explained+samtools", note:""},
    {title:"VCF format", url:"https://www.youtube.com/results?search_query=VCF+variant+call+format+tutorial", note:""}
  ],
  reading: [
    {url:"https://samtools.github.io/hts-specs/SAMv1.pdf", title:"SAM format specification (PDF)", note:"Skim sections 1–3"},
    {url:"https://samtools.github.io/hts-specs/VCFv4.4.pdf", title:"VCF v4.4 specification", note:""},
    {url:"https://genome.ucsc.edu/FAQ/FAQformat.html", title:"UCSC: format FAQ", note:"BED, GFF, WIG, all in one page"}
  ],
  tasks: [
    "Download a small FASTQ from SRA (e.g., 10k reads) and inspect 4-line records",
    "Convert FASTA → FASTA with line-wrapped sequences using a one-liner",
    "Read the first 20 lines of a VCF and identify FILTER, INFO, FORMAT",
    "Explain in writing why BAM is preferred over SAM for storage",
    "Add a `formats-cheatsheet.md` to your repo with one example record per format"
  ],
  quiz: [
    {q:"Which format includes per-base quality scores?", options:["FASTA","FASTQ","BED","GFF"], answer:1, explain:"FASTQ has 4 lines per record: @id, sequence, +, quality string."},
    {q:"A BAM file is…", options:["The plain-text version of SAM","A binary, compressed, indexable SAM","A variant call file","A read-pair manifest"], answer:1, explain:"BAM = Binary Alignment Map; same content, smaller, indexable with .bai."},
    {q:"BED is by convention…", options:["1-based inclusive","0-based half-open","2-based","Unitless"], answer:1, explain:"BED uses 0-based half-open intervals."},
    {q:"In VCF, the FORMAT column specifies…", options:["The genome build","The per-sample field order (e.g., GT:DP:GQ)","The file size","The filter result"], answer:1, explain:"FORMAT names the fields that follow per-sample."},
    {q:"GFF/GTF stores…", options:["Per-read alignments","Genome feature annotations (genes, exons…)","Phylogenetic trees","Protein structures"], answer:1, explain:"GFF/GTF describes features along a reference."}
  ],
  github: [
    {url:"https://github.com/samtools/samtools", title:"samtools/samtools", note:"The canonical CLI for SAM/BAM/CRAM"},
    {url:"https://github.com/samtools/bcftools", title:"samtools/bcftools", note:"VCF/BCF manipulation"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=fastq+format&restrict_sr=1", title:"r/bioinformatics — FASTQ discussions", note:"Search archived threads for gotchas"}
  ],
  caseStudy: {
    level: 1,
    title: "From a swab to a VCF",
    body: "A clinical-grade pathogen sequencing pipeline produces FASTQ from the sequencer, BAM after aligning to the pathogen reference, and a VCF of variants vs. that reference. Knowing the role of each file is how you debug pipelines in production."
  }
},

{
  day: 4, weekNum: 1, week: "Week 1 · Foundations",
  title: "Command Line for Biology",
  summary: "bash, grep, awk, sed — the boring tools that quietly run every lab.",
  intro: "Before you reach for Python or R, learn to live in the shell. Most data wrangling is faster as a one-liner.",
  tags: [{label:"CLI", cls:"bio"}],
  objectives: [
    "Navigate filesystems and pipe commands",
    "Use grep, awk, sed on FASTA/FASTQ",
    "Compute GC content with a one-liner",
    "Use `samtools` and `bcftools` for basic queries",
    "Write a tiny bash script that loops over samples"
  ],
  videos: [
    {title:"Bash basics for bioinformatics", url:"https://www.youtube.com/results?search_query=bash+for+bioinformatics+tutorial", note:""},
    {title:"awk tutorial for FASTQ/FASTA", url:"https://www.youtube.com/results?search_query=awk+tutorial+fastq+bioinformatics", note:""},
    {title:"samtools quickstart", url:"https://www.youtube.com/results?search_query=samtools+tutorial+quickstart", note:""}
  ],
  reading: [
    {url:"https://datacarpentry.org/shell-genomics/", title:"Data Carpentry: Shell Genomics", note:"Free, hands-on"},
    {url:"http://www.htslib.org/doc/samtools.html", title:"samtools manual", note:"Official"}
  ],
  tasks: [
    "Count the number of reads in a FASTQ: `echo $(( $(wc -l < file.fq) / 4 ))`",
    "Print only sequence lines from a FASTA: `grep -v '^>' file.fa`",
    "Compute total GC count: `grep -v '^>' file.fa | tr -d '\\n' | tr -cd 'GCgc' | wc -c`",
    "Loop: for s in S1 S2 S3; do echo \"processing $s\"; done",
    "Convert a SAM to a sorted indexed BAM via samtools and verify with `samtools view -c`"
  ],
  quiz: [
    {q:"Which counts reads in a FASTQ correctly?", options:["wc -l", "wc -l / 4", "wc -c", "grep '^@'"], answer:1, explain:"Each read is 4 lines; divide line count by 4."},
    {q:"`grep -v '^>' file.fa` prints…", options:["Headers only","Sequence lines only","Nothing","Reverse complement"], answer:1, explain:"-v inverts the match, so it excludes header lines."},
    {q:"Which tool is for BAM manipulation?", options:["bcftools","samtools","bedtools","gffread"], answer:1, explain:"samtools handles SAM/BAM/CRAM."},
    {q:"Why pipe with `|`?", options:["Faster GPU access","Pass stdout of one command into stdin of the next","Encrypts output","Logs steps"], answer:1, explain:"Piping streams data without intermediate files."},
    {q:"`samtools view -c file.bam` returns…", options:["File size","Read count","Reference length","Mapping quality histogram"], answer:1, explain:"-c counts records."}
  ],
  github: [
    {url:"https://github.com/lh3/bioawk", title:"lh3/bioawk", note:"awk with built-in FASTA/FASTQ parsing"},
    {url:"https://github.com/arq5x/bedtools2", title:"arq5x/bedtools2", note:"Genome arithmetic"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/", title:"r/bioinformatics", note:"Search 'oneliner' for community gems"}
  ],
  caseStudy: {
    level: 1,
    title: "Triaging a sequencer dump in 60 seconds",
    body: "When a sequencing run finishes, the first thing a bioinformatician does is sanity-check: how many reads, what's the read length, are adapters obvious? All of that is a shell one-liner before any real pipeline runs."
  }
},

{
  day: 5, weekNum: 1, week: "Week 1 · Foundations",
  title: "Public Databases",
  summary: "NCBI, Ensembl, UniProt, PDB, EBI, KEGG — where data actually lives.",
  intro: "Knowing where to look is half the job. Today: a tour of the canonical repositories, plus their APIs.",
  tags: [{label:"Databases", cls:"bio"}],
  objectives: [
    "Search NCBI Entrez for a pathogen reference genome",
    "Pull a protein record from UniProt",
    "Look up a structure on the RCSB PDB",
    "Use Ensembl REST to fetch gene coordinates",
    "Programmatically download with R (Biostrings) and Python (Biopython)"
  ],
  videos: [
    {title:"NCBI Entrez tour", url:"https://www.youtube.com/results?search_query=NCBI+entrez+tutorial", note:""},
    {title:"UniProt walkthrough", url:"https://www.youtube.com/results?search_query=UniProt+tutorial+protein+lookup", note:""},
    {title:"RCSB PDB intro", url:"https://www.youtube.com/results?search_query=RCSB+PDB+tutorial+protein+structure", note:""}
  ],
  reading: [
    {url:"https://www.ncbi.nlm.nih.gov/", title:"NCBI", note:""},
    {url:"https://www.ensembl.org/info/data/index.html", title:"Ensembl: data access", note:""},
    {url:"https://www.uniprot.org/help/programmatic_access", title:"UniProt programmatic access", note:""},
    {url:"https://www.rcsb.org/", title:"RCSB PDB", note:""}
  ],
  tasks: [
    "Find the reference assembly for Mycobacterium tuberculosis on NCBI Assembly",
    "Pull the human BRCA1 protein record from UniProt and note the accession",
    "Download PDB 6VSB (SARS-CoV-2 spike trimer) and view it in Mol* viewer",
    "In Python: `from Bio import Entrez` and fetch the genome of any RNA virus",
    "Save accession IDs to `databases-cheatsheet.md` for future reference"
  ],
  quiz: [
    {q:"Which is the de-facto protein sequence database?", options:["NCBI Nuccore","UniProt","Ensembl","Rfam"], answer:1, explain:"UniProt (Swiss-Prot + TrEMBL) is the canonical protein DB."},
    {q:"PDB stores…", options:["Genome assemblies","Macromolecular 3D structures","Variant calls","RNA expression matrices"], answer:1, explain:"PDB = Protein Data Bank, 3D structures."},
    {q:"Entrez `db='nuccore'` queries…", options:["Proteins","Nucleotide records","PubMed","Compounds"], answer:1, explain:"nuccore = nucleotide core database."},
    {q:"Ensembl is hosted by…", options:["NIH","EMBL-EBI","DDBJ","WHO"], answer:1, explain:"Ensembl is an EMBL-EBI project."},
    {q:"Which API style does UniProt expose?", options:["GraphQL only","REST + downloads","SOAP only","FTP only"], answer:1, explain:"UniProt has REST APIs (plus FTP for bulk)."}
  ],
  github: [
    {url:"https://github.com/biopython/biopython", title:"biopython/biopython", note:"Includes Entrez, SeqIO, PDB modules"},
    {url:"https://github.com/Ensembl/ensembl-rest", title:"Ensembl/ensembl-rest", note:"REST API server source"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/genomics/", title:"r/genomics", note:""}
  ],
  caseStudy: {
    level: 1,
    title: "Pulling the right reference for an assay",
    body: "Designing primers for an HPV genotyping assay? You start at NCBI Assembly and choose the right reference per genotype. Pulling the wrong assembly (e.g., draft vs. RefSeq) silently breaks downstream coordinates."
  }
},

{
  day: 6, weekNum: 1, week: "Week 1 · Foundations",
  title: "Sequence Alignment & BLAST",
  summary: "Pairwise alignment math, then real-world BLAST against NCBI.",
  intro: "Alignment is the core operation in sequence analysis. Today: dot plots, scoring matrices, Needleman–Wunsch / Smith–Waterman, and BLAST.",
  tags: [{label:"Alignment", cls:"bio"}],
  objectives: [
    "Distinguish global vs local alignment",
    "Explain scoring (matches, mismatches, gap penalties, BLOSUM/PAM)",
    "Run a NCBI web BLAST",
    "Use Biopython's pairwise2/Align module",
    "Interpret E-value and bit score"
  ],
  videos: [
    {title:"Needleman–Wunsch animation", url:"https://www.youtube.com/results?search_query=Needleman+Wunsch+algorithm+animation", note:""},
    {title:"Smith–Waterman local alignment", url:"https://www.youtube.com/results?search_query=Smith+Waterman+algorithm+explained", note:""},
    {title:"BLAST tutorial", url:"https://www.youtube.com/results?search_query=NCBI+BLAST+tutorial", note:""}
  ],
  reading: [
    {url:"https://blast.ncbi.nlm.nih.gov/Blast.cgi", title:"NCBI BLAST web", note:""},
    {url:"https://biopython.org/docs/latest/Tutorial/chapter_pairwise2.html", title:"Biopython pairwise alignment tutorial", note:""}
  ],
  tasks: [
    "BLAST a 500-bp unknown sequence (any from NCBI) against nr/nt",
    "Compute a Smith-Waterman alignment by hand on a 6-bp pair",
    "In R: `Biostrings::pairwiseAlignment(...)` two protein fragments",
    "Find the E-value cutoff above which you would NOT trust a hit",
    "Add 3 BLAST screenshots to your repo with brief notes"
  ],
  quiz: [
    {q:"Global alignment uses…", options:["Smith–Waterman","Needleman–Wunsch","BLAST seeds","Bowtie2"], answer:1, explain:"NW is global; SW is local."},
    {q:"A lower BLAST E-value means…", options:["More likely chance match","More statistically significant hit","Bigger alignment","Higher gap cost"], answer:1, explain:"Lower E = fewer expected random hits = more significant."},
    {q:"BLOSUM62 is used for…", options:["Nucleotide scoring","Protein substitution scoring","Read mapping","Variant filtering"], answer:1, explain:"BLOSUM matrices score amino-acid substitutions."},
    {q:"What's a 'seed' in BLAST?", options:["A reference allele","A short exact match used to anchor alignments","A protein domain","A read quality score"], answer:1, explain:"BLAST finds short word matches (seeds) then extends them."},
    {q:"For aligning paired-end NGS reads, you'd use…", options:["BLAST","bwa or bowtie2","muscle","HMMER"], answer:1, explain:"BLAST is for similarity search, not high-throughput mapping."}
  ],
  github: [
    {url:"https://github.com/bwa-mem2/bwa-mem2", title:"bwa-mem2/bwa-mem2", note:"Modern bwa successor"},
    {url:"https://github.com/lh3/minimap2", title:"lh3/minimap2", note:"Long-read aligner"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=BLAST&restrict_sr=1", title:"r/bioinformatics: BLAST threads", note:""}
  ],
  caseStudy: {
    level: 1,
    title: "Confirming a primer is pathogen-specific",
    body: "Before validating a diagnostic primer in the lab, BLAST it against nr/nt. If your 'specific' primer hits a human or other-microbe sequence with high identity, the assay will produce false positives in the field."
  }
},

{
  day: 7, weekNum: 1, week: "Week 1 · Foundations",
  title: "MSA + Phylogenetics",
  summary: "From many sequences to a tree — strain typing in practice.",
  intro: "Public-health bioinformatics depends on phylogenies. You'll align multiple sequences (MAFFT / MUSCLE) and build a tree (IQ-TREE / RAxML / FastTree).",
  tags: [{label:"Phylogenetics", cls:"bio"}],
  objectives: [
    "Build a multiple sequence alignment from FASTA inputs",
    "Choose a substitution model (intuition only)",
    "Build a maximum-likelihood tree",
    "Visualize the tree (FigTree / iTOL / ggtree)",
    "Interpret bootstrap support"
  ],
  videos: [
    {title:"MAFFT/MUSCLE intro", url:"https://www.youtube.com/results?search_query=MAFFT+multiple+sequence+alignment+tutorial", note:""},
    {title:"Phylogenetic trees explained", url:"https://www.youtube.com/results?search_query=phylogenetic+tree+explained+bioinformatics", note:""},
    {title:"IQ-TREE walkthrough", url:"https://www.youtube.com/results?search_query=IQ-TREE+tutorial+phylogenetics", note:""}
  ],
  reading: [
    {url:"https://mafft.cbrc.jp/alignment/software/", title:"MAFFT homepage", note:""},
    {url:"http://www.iqtree.org/", title:"IQ-TREE", note:""},
    {url:"https://itol.embl.de/", title:"iTOL tree viewer", note:""}
  ],
  tasks: [
    "Collect 10 SARS-CoV-2 spike protein FASTAs from NCBI",
    "Run MAFFT to align them",
    "Run IQ-TREE to build a tree",
    "Visualize the tree in iTOL or ggtree (R)",
    "Write 3 sentences interpreting clade structure"
  ],
  quiz: [
    {q:"Bootstrap value of 95 means…", options:["95% sequence identity","95% of replicate trees recovered the same clade","95 sequences","p=0.05"], answer:1, explain:"Bootstrap = support from resampled alignments."},
    {q:"Maximum likelihood phylogenetics requires…", options:["A substitution model","A reference genome","SNP calls only","Paired-end reads"], answer:0, explain:"ML evaluates the likelihood under a sequence-evolution model."},
    {q:"Which is an MSA program?", options:["bowtie2","MAFFT","samtools","DESeq2"], answer:1, explain:"MAFFT (and MUSCLE, T-Coffee) build MSAs."},
    {q:"ggtree lives in…", options:["Python","R / Bioconductor","Julia","Rust"], answer:1, explain:"ggtree is an R/Bioconductor package."},
    {q:"For viral lineage assignment, a common tool is…", options:["DESeq2","Pangolin","STAR","Salmon"], answer:1, explain:"Pangolin assigns SARS-CoV-2 lineages."}
  ],
  github: [
    {url:"https://github.com/cov-lineages/pangolin", title:"cov-lineages/pangolin", note:"SARS-CoV-2 lineage assignment"},
    {url:"https://github.com/nextstrain/nextstrain.org", title:"nextstrain/nextstrain.org", note:"Open-source pathogen genomics"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=phylogenetics&restrict_sr=1", title:"r/bioinformatics: phylogenetics", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "Tracking an outbreak strain",
    body: "When a new variant arrives, public-health labs sequence patient isolates, build a tree, and look at which clade they fall into. Real diagnostic teams (the IVD R&D scenario in the project plan) cross-check this output to decide whether existing primers still cover circulating strains."
  }
},

/* ───────── Week 2: R for Bioinformatics (Days 8–14) ───────── */
{
  day: 8, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "R Basics + RStudio + Bioconductor",
  summary: "The R language, the IDE, and Bioconductor's universe.",
  intro: "Today: vectors, lists, data frames, the pipe (|> and %>%), and installing your first Bioconductor packages.",
  tags: [{label:"R", cls:"r"}],
  objectives: [
    "Use vectors, lists, data frames",
    "Use the native pipe `|>` and magrittr `%>%`",
    "Install packages from CRAN and Bioconductor",
    "Load tidyverse and Biostrings together without conflict",
    "Write your first .R script and run it from RStudio"
  ],
  videos: [
    {title:"R in 1 hour", url:"https://www.youtube.com/results?search_query=R+programming+for+beginners+full+course", note:""},
    {title:"tidyverse intro", url:"https://www.youtube.com/results?search_query=tidyverse+tutorial+dplyr+ggplot2", note:""},
    {title:"Bioconductor crash course", url:"https://www.youtube.com/results?search_query=Bioconductor+tutorial+intro", note:""}
  ],
  reading: [
    {url:"https://r4ds.hadley.nz/", title:"R for Data Science (2e) — free online", note:""},
    {url:"https://www.bioconductor.org/packages/release/BiocViews.html", title:"Bioconductor BiocViews", note:"Browse by biology task"}
  ],
  tasks: [
    "Install: tidyverse, Biostrings, GenomicRanges, rtracklayer",
    "Create a 10-row data frame describing 10 samples",
    "Filter and mutate it with dplyr; pipe the result into ggplot",
    "Load a small FASTA with Biostrings and compute GC%",
    "Push a `day08.R` script to your study repo"
  ],
  quiz: [
    {q:"Which is the native R pipe?", options:["%>%","|>","->","=>"], answer:1, explain:"|> was added in R 4.1+."},
    {q:"Bioconductor installs via…", options:["install.packages","BiocManager::install","devtools::install_github only","pip install"], answer:1, explain:"BiocManager is the official installer for Bioconductor."},
    {q:"A data frame is…", options:["A matrix of one type","A list of equal-length vectors","A 3D array","A graph"], answer:1, explain:"Each column is a vector; all are the same length."},
    {q:"Which loads packages?", options:["import()","library()","require_all()","load()"], answer:1, explain:"library(pkg) attaches the package."},
    {q:"GenomicRanges represents…", options:["Variant calls","Genomic intervals with seqnames + strand","Phylogenetic trees","Protein structures"], answer:1, explain:"GRanges = the canonical interval container in Bioc."}
  ],
  github: [
    {url:"https://github.com/Bioconductor/Biostrings", title:"Bioconductor/Biostrings", note:""},
    {url:"https://github.com/tidyverse/tidyverse", title:"tidyverse/tidyverse", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/rstats/", title:"r/rstats", note:"General R community"}
  ],
  caseStudy: {
    level: 1,
    title: "Why bio teams pick R for stats and Python for pipelines",
    body: "Bioconductor's 2,000+ packages cover stats-heavy genomics workflows (limma, DESeq2, edgeR) that have no exact Python equivalent. Most teams use R for analysis, Python for pipeline glue."
  }
},

{
  day: 9, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "Data Wrangling — dplyr + data.table",
  summary: "Tidy and fast: two approaches to the same problem.",
  intro: "Genomic data is usually wide tables. Today you learn dplyr's grammar and data.table's speed.",
  tags: [{label:"R", cls:"r"}],
  objectives: [
    "Use select, filter, mutate, group_by, summarize",
    "Pivot wide ↔ long with tidyr",
    "Use data.table syntax: DT[i, j, by]",
    "Join two tables on a key (e.g., sample metadata to counts)",
    "Benchmark dplyr vs data.table on a 1M-row table"
  ],
  videos: [
    {title:"dplyr deep dive", url:"https://www.youtube.com/results?search_query=dplyr+tutorial+R", note:""},
    {title:"data.table tutorial", url:"https://www.youtube.com/results?search_query=data.table+R+tutorial", note:""},
    {title:"tidyr pivot_longer/pivot_wider", url:"https://www.youtube.com/results?search_query=tidyr+pivot_longer+pivot_wider", note:""}
  ],
  reading: [
    {url:"https://dplyr.tidyverse.org/", title:"dplyr docs", note:""},
    {url:"https://rdatatable.gitlab.io/data.table/", title:"data.table docs", note:""}
  ],
  tasks: [
    "Read a CSV of 1k genes with expression in 5 samples",
    "Pivot to long, compute mean per gene, pivot back wide",
    "Same task in data.table; time both with microbenchmark",
    "Join metadata (sample → condition) to expression",
    "Save a tidy `expression_long.csv`"
  ],
  quiz: [
    {q:"`summarize(mean = mean(x))` after `group_by(g)` produces…", options:["A vector","One row per group with the mean","A list of frames","NA"], answer:1, explain:"group_by + summarize collapses each group to one row."},
    {q:"In data.table, `DT[, .N, by=group]` returns…", options:["First N rows","Row counts per group","Numeric mean","Column names"], answer:1, explain:".N is the row-count helper."},
    {q:"Wide-to-long is done with…", options:["pivot_longer","reshape2::cast","unite","pull"], answer:0, explain:"tidyr::pivot_longer is the modern function."},
    {q:"Default join in dplyr without `by=` argument is…", options:["Cartesian","By columns sharing names","Random","Skipped"], answer:1, explain:"It joins by common column names (and warns)."},
    {q:"Which is fastest on 100M rows?", options:["base R apply","dplyr","data.table","sqldf"], answer:2, explain:"data.table is typically fastest for big tables in-memory."}
  ],
  github: [
    {url:"https://github.com/Rdatatable/data.table", title:"Rdatatable/data.table", note:""},
    {url:"https://github.com/tidyverse/dplyr", title:"tidyverse/dplyr", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/rstats/search/?q=dplyr+vs+data.table&restrict_sr=1", title:"r/rstats: dplyr vs data.table", note:""}
  ],
  caseStudy: {
    level: 1,
    title: "Tidying a clinical sample sheet",
    body: "Real lab sample sheets are messy: mixed dates, hand-typed group names, missing IDs. The first hour of any analysis is cleaning that table — and dplyr/data.table are the muscle."
  }
},

{
  day: 10, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "ggplot2 for Biological Plots",
  summary: "Volcano plots, heatmaps, boxplots — the visual vocabulary of genomics.",
  intro: "Mastery of ggplot2 pays back forever. Today: layers, scales, themes, and three classic biology plots.",
  tags: [{label:"R", cls:"r"}],
  objectives: [
    "Build plots layer by layer (geom_point, geom_line, geom_bar)",
    "Customize scales and themes",
    "Make a volcano plot from a results table",
    "Make a heatmap with ComplexHeatmap or pheatmap",
    "Export publication-ready figures"
  ],
  videos: [
    {title:"ggplot2 crash course", url:"https://www.youtube.com/results?search_query=ggplot2+tutorial+crash+course", note:""},
    {title:"Volcano plot in R", url:"https://www.youtube.com/results?search_query=volcano+plot+ggplot2+RNA-seq", note:""},
    {title:"Heatmaps with ComplexHeatmap", url:"https://www.youtube.com/results?search_query=ComplexHeatmap+tutorial+R", note:""}
  ],
  reading: [
    {url:"https://ggplot2.tidyverse.org/", title:"ggplot2 docs", note:""},
    {url:"https://jokergoo.github.io/ComplexHeatmap-reference/book/", title:"ComplexHeatmap reference book", note:"Free online book"}
  ],
  tasks: [
    "Make a scatter of log2FC vs -log10(p) (volcano plot) and label top 10 genes",
    "Make a heatmap of top 50 variable genes across samples",
    "Make a boxplot of expression for one gene across conditions",
    "Apply a consistent theme(); export both PNG and PDF",
    "Add an alt-text + caption to each figure"
  ],
  quiz: [
    {q:"A 'volcano plot' shows…", options:["Time vs intensity","log2 fold-change vs -log10 p-value","PCA1 vs PCA2","UMAP1 vs UMAP2"], answer:1, explain:"X = effect, Y = significance — looks like a volcano."},
    {q:"In ggplot2, layers are added with…", options:["+", "|>", ":=", "&"], answer:0, explain:"`+` adds layers in ggplot grammar."},
    {q:"Which geom is for stacked bars?", options:["geom_col(position='fill')","geom_line","geom_smooth","geom_histogram"], answer:0, explain:"position='fill' stacks to 100%."},
    {q:"ComplexHeatmap is in…", options:["CRAN","Bioconductor","PyPI","GitHub only"], answer:1, explain:"It's a Bioconductor package."},
    {q:"To free the y-axis across facets, use…", options:["scales='free_y'","theme_classic()","coord_cartesian()","facet_grid(. ~ x)"], answer:0, explain:"`scales='free_y'` in facet_wrap/facet_grid."}
  ],
  github: [
    {url:"https://github.com/jokergoo/ComplexHeatmap", title:"jokergoo/ComplexHeatmap", note:""},
    {url:"https://github.com/tidyverse/ggplot2", title:"tidyverse/ggplot2", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/datavisualization/", title:"r/datavisualization", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "A volcano plot that lies",
    body: "Without multiple-testing correction, a volcano plot will show 'significant' genes that are noise. Always plot the adjusted p-value (FDR), and label top genes by effect size *and* significance — not one of the two."
  }
},

{
  day: 11, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "Biostrings + GenomicRanges",
  summary: "Sequences and intervals as first-class R objects.",
  intro: "Two foundational Bioconductor packages: Biostrings (sequence containers + alignment) and GenomicRanges (intervals on genomes).",
  tags: [{label:"R", cls:"r"}],
  objectives: [
    "Read FASTA into a DNAStringSet",
    "Find pattern matches with vmatchPattern",
    "Build a GRanges object and do interval arithmetic",
    "Use rtracklayer to read a BED file",
    "Connect: GRanges → Biostrings extraction from a genome"
  ],
  videos: [
    {title:"Biostrings tutorial", url:"https://www.youtube.com/results?search_query=R+Biostrings+tutorial", note:""},
    {title:"GenomicRanges tutorial", url:"https://www.youtube.com/results?search_query=GenomicRanges+R+tutorial", note:""}
  ],
  reading: [
    {url:"https://bioconductor.org/packages/release/bioc/html/Biostrings.html", title:"Biostrings", note:""},
    {url:"https://bioconductor.org/packages/release/bioc/html/GenomicRanges.html", title:"GenomicRanges", note:""}
  ],
  tasks: [
    "Load a genome FASTA; report widths and GC of each sequence",
    "Find all positions of motif 'TATAA' (and complement) in the genome",
    "Build a GRanges with 5 intervals; compute `reduce()` and `gaps()`",
    "Read a BED file with rtracklayer; intersect with the GRanges above",
    "Extract sequences under those intervals back to a DNAStringSet"
  ],
  quiz: [
    {q:"DNAStringSet stores…", options:["A single sequence","A set of DNA sequences","Variants","Reads with quality"], answer:1, explain:"It's a vector-of-sequences container."},
    {q:"`vmatchPattern('GATC', dna)` returns…", options:["A logical","A list of match positions per sequence","A data frame","A SAM"], answer:1, explain:"A MIndex (list-like) of matches."},
    {q:"GRanges metadata columns are accessed by…", options:["$","mcols()","values()","attr()"], answer:1, explain:"mcols(gr) returns the metadata DataFrame."},
    {q:"rtracklayer is mostly for…", options:["Reading/writing BED, GFF, BigWig","Variant calling","Read trimming","Heatmaps"], answer:0, explain:"It's the I/O package for track formats."},
    {q:"`reduce(gr)` does…", options:["Sorts ranges","Merges overlapping ranges","Reverse-complements","Filters by score"], answer:1, explain:"Merges overlaps into minimal disjoint ranges."}
  ],
  github: [
    {url:"https://github.com/Bioconductor/GenomicRanges", title:"Bioconductor/GenomicRanges", note:""},
    {url:"https://github.com/lawremi/rtracklayer", title:"lawremi/rtracklayer", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=GenomicRanges&restrict_sr=1", title:"r/bioinformatics: GenomicRanges", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "Designing a primer panel programmatically",
    body: "Given a pathogen genome (DNAStringSet) and a BED of conserved regions (GRanges), you can extract candidate primer windows, screen them for Tm and uniqueness, and emit a list — all in R."
  }
},

{
  day: 12, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "Bulk RNA-seq with DESeq2",
  summary: "From a count matrix to differential expression in 40 lines of R.",
  intro: "DESeq2 is the most-cited tool for differential expression. Today: import counts, set up the design, run the analysis, interpret results.",
  tags: [{label:"R", cls:"r"},{label:"RNA-seq", cls:"bio"}],
  objectives: [
    "Build a DESeqDataSet from counts + metadata",
    "Run DESeq() and extract results",
    "Apply LFC shrinkage with apeglm/ashr",
    "Make MA plot + volcano plot",
    "Save a results CSV"
  ],
  videos: [
    {title:"DESeq2 walkthrough", url:"https://www.youtube.com/results?search_query=DESeq2+tutorial+RNA-seq", note:""},
    {title:"StatQuest: RNA-seq normalization", url:"https://www.youtube.com/results?search_query=StatQuest+RNA-seq+DESeq2", note:""}
  ],
  reading: [
    {url:"https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html", title:"DESeq2 vignette", note:"The official walkthrough"},
    {url:"https://bioconductor.org/packages/release/data/experiment/html/airway.html", title:"airway dataset", note:"Classic teaching dataset"}
  ],
  tasks: [
    "Load the airway dataset",
    "Set `design = ~ cell + dex`, run DESeq()",
    "Apply lfcShrink(type='apeglm')",
    "Plot MA and volcano; export the top-20 table",
    "Push `day12-deseq2.R` to your repo"
  ],
  quiz: [
    {q:"DESeq2 input counts should be…", options:["TPM","Raw integer counts","FPKM","CPM"], answer:1, explain:"DESeq2 models raw counts (negative binomial)."},
    {q:"Why shrink log2FC?", options:["To remove batch effects","To stabilize estimates for low-count genes","To increase p-values","Because of multiple testing"], answer:1, explain:"Shrinkage pulls noisy LFCs toward 0."},
    {q:"`results()` returns…", options:["Normalized counts","A DataFrame of LFC, p, padj","Raw matrix","Heatmap"], answer:1, explain:"results() = the per-gene stats."},
    {q:"Which is the adjusted p?", options:["pvalue","padj","stat","baseMean"], answer:1, explain:"padj is Benjamini–Hochberg FDR by default."},
    {q:"DESeq2 normalization uses…", options:["TPM","Median of ratios","Quantile","Z-score"], answer:1, explain:"Median-of-ratios size factors."}
  ],
  github: [
    {url:"https://github.com/thelovelab/DESeq2", title:"thelovelab/DESeq2", note:"Source repo"},
    {url:"https://github.com/nf-core/rnaseq", title:"nf-core/rnaseq", note:"Production pipeline that produces DESeq2 input"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=DESeq2&restrict_sr=1", title:"r/bioinformatics: DESeq2", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "Host-response signatures distinguishing viral vs bacterial infection",
    body: "Host transcriptomic signatures can complement pathogen detection — a research direction relevant to the project's diagnostic R&D. DESeq2 is typically the first analysis tried on such cohorts."
  }
},

{
  day: 13, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "Single-cell with Seurat",
  summary: "scRNA-seq from raw matrix to clustered UMAP.",
  intro: "Seurat is the most-used scRNA-seq toolkit. You'll process the standard 10X PBMC 3k dataset end-to-end.",
  tags: [{label:"R", cls:"r"},{label:"scRNA-seq", cls:"bio"}],
  objectives: [
    "Load a 10X Cell Ranger output",
    "QC: % mitochondrial, gene/UMI per cell",
    "Normalize, find variable features, scale, PCA",
    "Cluster + UMAP",
    "Find marker genes per cluster"
  ],
  videos: [
    {title:"Seurat PBMC 3k walkthrough", url:"https://www.youtube.com/results?search_query=Seurat+PBMC+3k+tutorial", note:""},
    {title:"scRNA-seq concepts", url:"https://www.youtube.com/results?search_query=single+cell+RNA-seq+explained", note:""}
  ],
  reading: [
    {url:"https://satijalab.org/seurat/articles/pbmc3k_tutorial.html", title:"Seurat PBMC 3k tutorial", note:"The canonical walkthrough"},
    {url:"https://www.10xgenomics.com/datasets", title:"10X Genomics public datasets", note:""}
  ],
  tasks: [
    "Download PBMC 3k filtered matrices",
    "Run the full Seurat pipeline up to UMAP",
    "Identify markers for at least 3 clusters",
    "Annotate cell types (manually or with SingleR)",
    "Export a UMAP figure"
  ],
  quiz: [
    {q:"In scRNA-seq, high % mitochondrial often indicates…", options:["Doublets","Dying/dying cells","Empty droplets","Hemoglobin contamination"], answer:1, explain:"Dying cells leak cytoplasmic mRNA; mtRNA proportion rises."},
    {q:"UMAP is best described as…", options:["A clustering algorithm","A nonlinear dimensionality reduction for visualization","A normalization method","A differential test"], answer:1, explain:"UMAP preserves local structure for 2D visualization."},
    {q:"Seurat's `FindClusters()` uses…", options:["k-means","Louvain/Leiden on a shared-NN graph","DBSCAN","Hierarchical"], answer:1, explain:"Graph-based community detection on the SNN graph."},
    {q:"To remove batch effects across samples, you might use…", options:["Harmony or Seurat integration","DESeq2","ggplot2","BLAST"], answer:0, explain:"Harmony / Seurat integration / scVI handle batch."},
    {q:"`FindMarkers()` returns…", options:["DEGs vs another cluster or all others","Cluster IDs","UMAP coords","Cell-cycle scores"], answer:0, explain:"Differential expression per cluster."}
  ],
  github: [
    {url:"https://github.com/satijalab/seurat", title:"satijalab/seurat", note:""},
    {url:"https://github.com/immunogenomics/harmony", title:"immunogenomics/harmony", note:"Batch integration"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=seurat&restrict_sr=1", title:"r/bioinformatics: Seurat", note:""}
  ],
  caseStudy: {
    level: 3,
    title: "Mapping the immune response single-cell",
    body: "Single-cell atlases of host immune cells in response to viral infection (e.g., COVID-19) reveal cell types and states that bulk RNA-seq can't resolve — and inform biomarker discovery for next-gen diagnostics."
  }
},

{
  day: 14, weekNum: 2, week: "Week 2 · R for Bioinformatics",
  title: "Variants + GWAS in R",
  summary: "Annotation, filtering, association — the R side.",
  intro: "You'll work with VCFs in R via VariantAnnotation and explore association testing concepts.",
  tags: [{label:"R", cls:"r"},{label:"Variants", cls:"bio"}],
  objectives: [
    "Read a VCF with VariantAnnotation",
    "Annotate variants with VEP/snpEff concepts (consequences, gene context)",
    "Filter by FILTER, QUAL, depth",
    "Build a Manhattan plot with qqman",
    "Distinguish germline vs somatic vs viral context"
  ],
  videos: [
    {title:"GWAS intro", url:"https://www.youtube.com/results?search_query=GWAS+tutorial+explained", note:""},
    {title:"snpEff / VEP annotation", url:"https://www.youtube.com/results?search_query=snpEff+VEP+annotation+tutorial", note:""}
  ],
  reading: [
    {url:"https://bioconductor.org/packages/release/bioc/html/VariantAnnotation.html", title:"VariantAnnotation", note:""},
    {url:"http://genome.sph.umich.edu/wiki/Manhattan_Plot", title:"Manhattan plots", note:""}
  ],
  tasks: [
    "Read a VCF (e.g., a 1000 Genomes sample) into R",
    "Filter to PASS variants on chr22",
    "Annotate against a transcript DB (TxDb) for nearest gene",
    "Build a Manhattan-style summary plot",
    "Document the filter cascade in a report"
  ],
  quiz: [
    {q:"GWAS tests for…", options:["Association of variants with a phenotype","Read alignment","Splice junctions","Methylation"], answer:0, explain:"Genome-wide association."},
    {q:"VCF QUAL is…", options:["Genotype quality","Phred-scaled prob variant is wrong","Per-base quality","Read depth"], answer:1, explain:"Variant-level QUAL = -10 log10 P(no variant)."},
    {q:"`readVcf()` returns…", options:["A VCF S4 object","A data.table","A GRanges only","A list of strings"], answer:0, explain:"A VCF object with rowRanges + assays."},
    {q:"Manhattan plot Y axis is…", options:["log2 fold-change","-log10(p-value)","Allele frequency","Depth"], answer:1, explain:"Significance per SNP."},
    {q:"For SARS-CoV-2 lineage-defining mutations, you'd usually look at…", options:["Germline VCF","Per-sample consensus + lineage tools","Single-cell","Methylation"], answer:1, explain:"Build a consensus, then assign lineage."}
  ],
  github: [
    {url:"https://github.com/samtools/bcftools", title:"samtools/bcftools", note:""},
    {url:"https://github.com/Ensembl/ensembl-vep", title:"Ensembl/ensembl-vep", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/genomics/search/?q=GWAS&restrict_sr=1", title:"r/genomics: GWAS", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "Tracking primer-binding-site mutations",
    body: "A mutation under a diagnostic primer can cause false negatives. Routine surveillance VCFs help labs detect such mutations before they affect assay performance — a workflow directly relevant to IVD R&D."
  }
},

/* ───────── Week 3: Python + Professional (Days 15–21) ───────── */
{
  day: 15, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Python Basics + Biopython",
  summary: "Python control flow + Biopython for sequences, Entrez, alignments.",
  intro: "If you already know R, Python feels like 80% the same. Today: get fluent with Biopython's most-used modules.",
  tags: [{label:"Python", cls:"py"}],
  objectives: [
    "Read/write FASTA + FASTQ with SeqIO",
    "Use Entrez to fetch records",
    "Pairwise alignment with Bio.Align",
    "Translate / reverse-complement a sequence",
    "Loop over records efficiently"
  ],
  videos: [
    {title:"Biopython tutorial", url:"https://www.youtube.com/results?search_query=Biopython+tutorial+SeqIO", note:""},
    {title:"Python for biologists", url:"https://www.youtube.com/results?search_query=Python+for+biologists+beginner", note:""}
  ],
  reading: [
    {url:"https://biopython.org/docs/latest/Tutorial/index.html", title:"Biopython Tutorial & Cookbook", note:""},
    {url:"https://docs.python.org/3/tutorial/", title:"Official Python tutorial", note:""}
  ],
  tasks: [
    "Read 1k FASTA records, compute mean length, write GC-filtered subset",
    "Fetch any 5 protein accessions from UniProt and save FASTA",
    "Implement reverse-complement without Biopython, then with it",
    "Translate the SARS-CoV-2 ORF1ab CDS and find stop codons",
    "Push `day15.py` to your repo"
  ],
  quiz: [
    {q:"Biopython's main IO module is…", options:["SeqRead","SeqIO","BioIO","Records"], answer:1, explain:"Bio.SeqIO handles many formats."},
    {q:"`Seq('ATG').translate()` returns…", options:["'M'","'Met'","'ATG'","Empty"], answer:0, explain:"Single-letter amino acid code."},
    {q:"To iterate large FASTA without loading all into memory…", options:["SeqIO.parse","SeqIO.read","SeqIO.to_dict","json.load"], answer:0, explain:"parse() yields records lazily."},
    {q:"Reverse complement of 'ACGT' is…", options:["'TGCA'","'ACGT'","'GCAT'","'TACG'"], answer:0, explain:"Reverse, then complement each base."},
    {q:"Biopython for Entrez requires…", options:["A paid API key","An email set on `Entrez.email`","sudo","R"], answer:1, explain:"NCBI requires you to identify yourself."}
  ],
  github: [
    {url:"https://github.com/biopython/biopython", title:"biopython/biopython", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/learnpython/", title:"r/learnpython", note:"General Python help"}
  ],
  caseStudy: {
    level: 1,
    title: "Automating primer extraction",
    body: "Given a CSV of target genes and a genome FASTA, a 30-line Biopython script can output candidate primer windows — the kind of helper utility that lives in every diagnostic team's internal toolbox."
  }
},

{
  day: 16, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Pandas for Genomic Tables",
  summary: "Counts matrices, sample sheets, annotation joins — the Python tidyverse.",
  intro: "Pandas + Biopython is the standard Python stack. Today you replicate Day 9 (R wrangling) in Python.",
  tags: [{label:"Python", cls:"py"}],
  objectives: [
    "Read CSV/TSV with pandas",
    "Filter/group/agg",
    "Pivot wide ↔ long with melt / pivot",
    "Merge tables on keys",
    "Use numpy for fast numerics"
  ],
  videos: [
    {title:"Pandas crash course", url:"https://www.youtube.com/results?search_query=pandas+tutorial+crash+course", note:""},
    {title:"Pandas for bioinformatics", url:"https://www.youtube.com/results?search_query=pandas+bioinformatics+tutorial", note:""}
  ],
  reading: [
    {url:"https://pandas.pydata.org/docs/user_guide/index.html", title:"Pandas user guide", note:""},
    {url:"https://numpy.org/doc/stable/user/quickstart.html", title:"NumPy quickstart", note:""}
  ],
  tasks: [
    "Read a 10k-gene × 12-sample expression CSV",
    "Compute per-sample library size; normalize to CPM",
    "Merge in a sample metadata sheet",
    "Pivot to long for plotting with seaborn",
    "Save processed tables to Parquet"
  ],
  quiz: [
    {q:"`df.groupby('g').mean()` returns…", options:["A new column","One row per group with means","An error","A list"], answer:1, explain:"Aggregation collapses each group."},
    {q:"`pd.melt` is equivalent to R's…", options:["pivot_longer","pivot_wider","rbind","spread"], answer:0, explain:"melt = wide-to-long."},
    {q:"Fastest way to read a 5GB CSV…", options:["pd.read_csv chunksize / Parquet","Excel","JSON","XML"], answer:0, explain:"Chunked CSV or switch to Parquet."},
    {q:"NumPy arrays vs Python lists give…", options:["Same speed","Vectorized ops + lower memory","Slower","Less precision"], answer:1, explain:"Contiguous typed arrays = big speedups."},
    {q:"Avoid SettingWithCopyWarning by…", options:["Ignoring it","Using .loc explicit indexing","Renaming columns","Resetting index"], answer:1, explain:".loc assignment is unambiguous."}
  ],
  github: [
    {url:"https://github.com/pandas-dev/pandas", title:"pandas-dev/pandas", note:""},
    {url:"https://github.com/pola-rs/polars", title:"pola-rs/polars", note:"Modern alternative — worth knowing"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/learnpython/search/?q=pandas&restrict_sr=1", title:"r/learnpython: pandas", note:""}
  ],
  caseStudy: {
    level: 1,
    title: "Joining counts to sample metadata",
    body: "The single most common bug in RNA-seq analyses is a misaligned sample order between the counts matrix and metadata. Always join on an explicit sample-ID key — never trust column order."
  }
},

{
  day: 17, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Reproducible Pipelines — Snakemake / Nextflow",
  summary: "Turn a notebook into a production workflow.",
  intro: "Production bioinformatics runs through workflow managers. Today: a tiny Snakefile that takes FASTQ → BAM → variant calls.",
  tags: [{label:"Pipelines", cls:"bio"}],
  objectives: [
    "Define rules with inputs/outputs/shell",
    "Use wildcards to generalize across samples",
    "Manage conda environments per rule",
    "Run on multiple cores (`--cores`)",
    "Compare Snakemake vs Nextflow at a glance"
  ],
  videos: [
    {title:"Snakemake tutorial", url:"https://www.youtube.com/results?search_query=Snakemake+tutorial", note:""},
    {title:"Nextflow tutorial", url:"https://www.youtube.com/results?search_query=Nextflow+tutorial+nf-core", note:""}
  ],
  reading: [
    {url:"https://snakemake.readthedocs.io/", title:"Snakemake docs", note:""},
    {url:"https://nf-co.re/", title:"nf-core: production Nextflow pipelines", note:""}
  ],
  tasks: [
    "Install Snakemake in your conda env",
    "Write a Snakefile with rules: trim → align → call",
    "Add a samples.tsv config and wildcard-expand it",
    "Run with `--cores 4 --use-conda`",
    "Try one nf-core pipeline (e.g., `nf-core/rnaseq -profile test`)"
  ],
  quiz: [
    {q:"Snakemake rule has at minimum…", options:["input + output","shell only","resources","threads"], answer:0, explain:"input/output define the DAG; shell/script run."},
    {q:"Wildcards in Snakemake are written…", options:["{sample}","${sample}","%sample%","[sample]"], answer:0, explain:"Curly braces for wildcards."},
    {q:"nf-core pipelines run on…", options:["Snakemake","Nextflow","Galaxy","CWL only"], answer:1, explain:"nf-core is Nextflow-based."},
    {q:"`--use-conda` does…", options:["Installs conda","Activates per-rule conda envs","Switches to docker","Disables parallelism"], answer:1, explain:"Per-rule isolation for reproducibility."},
    {q:"DAG = …", options:["Directed acyclic graph of jobs","Database access gateway","Dynamic alignment graph","Default annotation grouping"], answer:0, explain:"Workflows are DAGs of dependent jobs."}
  ],
  github: [
    {url:"https://github.com/snakemake/snakemake", title:"snakemake/snakemake", note:""},
    {url:"https://github.com/nextflow-io/nextflow", title:"nextflow-io/nextflow", note:""},
    {url:"https://github.com/nf-core", title:"nf-core organization", note:"100+ community pipelines"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=snakemake&restrict_sr=1", title:"r/bioinformatics: Snakemake", note:""}
  ],
  caseStudy: {
    level: 2,
    title: "Why diagnostic labs adopt pipelines",
    body: "Regulated environments (clinical, IVD) demand reproducibility: same input → same output, with audit trails. Workflow managers + container pinning are how teams pass that audit."
  }
},

{
  day: 18, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Machine Learning for Biology (scikit-learn)",
  summary: "Classification, regression, cross-validation — applied to omics.",
  intro: "Today you train a classifier on a public expression dataset and learn how *not* to fool yourself with data leakage.",
  tags: [{label:"Python", cls:"py"},{label:"ML", cls:"bio"}],
  objectives: [
    "Train/test split + k-fold CV",
    "Train logistic regression / random forest",
    "Evaluate with ROC-AUC, PR-AUC, accuracy",
    "Recognize and prevent data leakage",
    "Plot feature importance"
  ],
  videos: [
    {title:"scikit-learn intro", url:"https://www.youtube.com/results?search_query=scikit-learn+tutorial+classification", note:""},
    {title:"ML pitfalls in bio", url:"https://www.youtube.com/results?search_query=machine+learning+bioinformatics+pitfalls", note:""}
  ],
  reading: [
    {url:"https://scikit-learn.org/stable/user_guide.html", title:"scikit-learn user guide", note:""},
    {url:"https://scikit-learn.org/stable/modules/cross_validation.html", title:"Cross-validation guide", note:""}
  ],
  tasks: [
    "Use a published expression dataset (e.g., from GEO) with binary labels",
    "Set up a StratifiedKFold CV; train a logistic regression",
    "Compute ROC-AUC and PR-AUC; plot curves",
    "Intentionally leak (normalize before split) and observe AUC inflation",
    "Try a RandomForest; compare feature importances"
  ],
  quiz: [
    {q:"Leakage means…", options:["Test info influenced training","Memory leak","Disk overflow","Failed import"], answer:0, explain:"Anything that lets test data peek into training inflates scores."},
    {q:"ROC-AUC of 0.5 means…", options:["Perfect","Random","Inverted","Useless data"], answer:1, explain:"0.5 = random; 1.0 = perfect."},
    {q:"Best for class imbalance metric…", options:["Accuracy","PR-AUC","R²","BLEU"], answer:1, explain:"PR-AUC focuses on the positive class."},
    {q:"`StratifiedKFold` preserves…", options:["Sample order","Class proportions per fold","Feature scales","File paths"], answer:1, explain:"Stratification balances the target across folds."},
    {q:"To avoid scaling leakage, fit the scaler on…", options:["All data","Train fold only, then transform test","Test only","A random subset"], answer:1, explain:"Fit on train, transform test — wrapped in a Pipeline."}
  ],
  github: [
    {url:"https://github.com/scikit-learn/scikit-learn", title:"scikit-learn/scikit-learn", note:""},
    {url:"https://github.com/topics/bioinformatics-machine-learning", title:"GitHub: bioinformatics-ml", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/MachineLearning/", title:"r/MachineLearning", note:""}
  ],
  caseStudy: {
    level: 3,
    title: "Host-response classifiers for triage",
    body: "Studies have built blood-transcriptome classifiers that separate viral from bacterial infection with ROC-AUC >0.9. Such signatures could augment pathogen-detection IVDs — a likely next-generation product direction."
  }
},

{
  day: 19, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Deep Learning for Proteins (AlphaFold / ESM)",
  summary: "Predict structure, embed sequences — the modern toolkit.",
  intro: "You won't train AlphaFold today, but you'll use ESM embeddings and read about AlphaFold/RoseTTAFold to understand the landscape.",
  tags: [{label:"Python", cls:"py"},{label:"Deep Learning", cls:"bio"}],
  objectives: [
    "Run protein sequence embeddings with a pre-trained model",
    "Predict simple properties from embeddings (e.g., subcellular location proxy)",
    "Submit a query to AlphaFold DB or ColabFold",
    "Visualize a predicted structure (PyMOL / Mol*)",
    "Understand confidence (pLDDT) and what it means"
  ],
  videos: [
    {title:"AlphaFold explained", url:"https://www.youtube.com/results?search_query=AlphaFold+explained", note:""},
    {title:"Protein language models", url:"https://www.youtube.com/results?search_query=ESM+protein+language+model", note:""}
  ],
  reading: [
    {url:"https://alphafold.ebi.ac.uk/", title:"AlphaFold Protein Structure DB", note:""},
    {url:"https://github.com/facebookresearch/esm", title:"ESM GitHub repo", note:""},
    {url:"https://github.com/sokrypton/ColabFold", title:"ColabFold (run AlphaFold in Colab)", note:""}
  ],
  tasks: [
    "Look up any protein in the AlphaFold DB; inspect the pLDDT colors",
    "Run an ESM-2 embedding for 5 sequences (CPU is fine for small model)",
    "Cluster the embeddings with k-means; comment on structure",
    "Submit one short sequence to ColabFold; download the PDB",
    "Open it in Mol* viewer and screenshot"
  ],
  quiz: [
    {q:"AlphaFold's confidence per residue is called…", options:["pLDDT","RMSD","E-value","p-value"], answer:0, explain:"pLDDT is a per-residue confidence (0–100)."},
    {q:"ESM is a…", options:["Genome assembler","Protein language model","Variant caller","Aligner"], answer:1, explain:"ESM = Evolutionary Scale Modeling, a protein LM family."},
    {q:"AlphaFold2 took as input…", options:["Just sequence","Sequence + MSA + templates","DNA reads","SAM files"], answer:1, explain:"MSAs are central to AF2 accuracy."},
    {q:"For comparing two structures, you'd use…", options:["RMSD or TM-score","ROC-AUC","BLEU","BLAST E-value"], answer:0, explain:"RMSD/TM-score quantify structural similarity."},
    {q:"ColabFold makes AlphaFold accessible by…", options:["Running locally only","Using cloud GPUs (Colab) + MMseqs2 MSAs","Charging per call","Skipping the MSA"], answer:1, explain:"It replaces JackHMMER with MMseqs2 + Colab GPUs."}
  ],
  github: [
    {url:"https://github.com/google-deepmind/alphafold", title:"google-deepmind/alphafold", note:""},
    {url:"https://github.com/facebookresearch/esm", title:"facebookresearch/esm", note:""},
    {url:"https://github.com/sokrypton/ColabFold", title:"sokrypton/ColabFold", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=alphafold&restrict_sr=1", title:"r/bioinformatics: AlphaFold", note:""}
  ],
  caseStudy: {
    level: 3,
    title: "Structure-aware antibody / aptamer design",
    body: "Predicted structures of pathogen surface proteins (e.g., SARS-CoV-2 spike RBD) guide the design of recognition reagents used in immunoassays — a workflow at the intersection of structural biology and IVD product development."
  }
},

{
  day: 20, weekNum: 3, week: "Week 3 · Python + Pro",
  title: "Reproducibility — Docker, conda, Git",
  summary: "Make your work shareable, runnable, and auditable.",
  intro: "A study is only as valuable as its reproducibility. Today: lock dependencies, containerize, and version-control properly.",
  tags: [{label:"Reproducibility", cls:"bio"}],
  objectives: [
    "Write an environment.yml and a Dockerfile",
    "Use `mamba` for faster solves",
    "Tag releases on GitHub",
    "Use `renv` (R) or `pip-tools` (Py) to pin",
    "Run an analysis inside a container"
  ],
  videos: [
    {title:"Docker for scientists", url:"https://www.youtube.com/results?search_query=docker+for+bioinformatics", note:""},
    {title:"conda + mamba", url:"https://www.youtube.com/results?search_query=conda+vs+mamba+bioinformatics", note:""}
  ],
  reading: [
    {url:"https://docs.docker.com/get-started/", title:"Docker getting started", note:""},
    {url:"https://mamba.readthedocs.io/", title:"Mamba docs", note:""},
    {url:"https://rstudio.github.io/renv/", title:"renv (R)", note:""}
  ],
  tasks: [
    "Write a Dockerfile that installs R + Bioconductor + your analysis",
    "Build the image; run a smoke test analysis inside it",
    "Pin all Python deps with `pip-tools` or uv",
    "Tag `v0.1.0` on your study repo",
    "Add a `Reproduce.md` with a 5-step recipe to rerun the project"
  ],
  quiz: [
    {q:"`pip freeze` produces…", options:["A snapshot of installed package versions","A virtualenv","A Docker image","A binary"], answer:0, explain:"Captures current versions for reproducibility."},
    {q:"A Docker `FROM` line specifies…", options:["The build user","The base image","The command","The maintainer"], answer:1, explain:"Base image to start from."},
    {q:"mamba vs conda…", options:["Same speed","mamba is a faster reimplementation of conda's solver","mamba is for Python only","mamba is paid"], answer:1, explain:"mamba uses libsolv; much faster."},
    {q:"`renv::snapshot()` in R…", options:["Backs up data","Records package versions for the project","Builds docs","Deletes packages"], answer:1, explain:"Renv pins per-project R dependencies."},
    {q:"Git tags are useful for…", options:["Hiding files","Marking release versions","Encrypting code","Compressing repos"], answer:1, explain:"Tags label specific commits as releases."}
  ],
  github: [
    {url:"https://github.com/mamba-org/mamba", title:"mamba-org/mamba", note:""},
    {url:"https://github.com/astral-sh/uv", title:"astral-sh/uv", note:"Fast Python package manager"}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=reproducibility&restrict_sr=1", title:"r/bioinformatics: reproducibility", note:""}
  ],
  caseStudy: {
    level: 3,
    title: "Audit-ready pipelines",
    body: "For IVD products, regulators ask: 'given a sample today, can you reproduce the exact bioinformatics result two years from now?' The honest answer requires containers + version-pinned deps + tagged source — period."
  }
},

{
  day: 21, weekNum: 3, week: "Week 3 · Capstone",
  title: "Capstone — End-to-End Pathogen Detection Pipeline",
  summary: "Build, document, publish. Your portfolio piece for jobs and grad school.",
  intro: "Today everything comes together. You'll build (and publish) a small, real pipeline that takes raw FASTQ and outputs a pathogen-detection report. This is your portfolio.",
  tags: [{label:"Capstone", cls:"bio"},{label:"R", cls:"r"},{label:"Python", cls:"py"}],
  objectives: [
    "Design the pipeline DAG on paper first",
    "Implement it with Snakemake or a Python+R hybrid",
    "Write a clear README with run instructions",
    "Add example data + expected output",
    "Publish the repo + a GitHub Pages site (this very kind of site!) describing it"
  ],
  videos: [
    {title:"Building a bioinformatics portfolio", url:"https://www.youtube.com/results?search_query=bioinformatics+portfolio+github+projects", note:""},
    {title:"GitHub Pages tutorial", url:"https://www.youtube.com/results?search_query=GitHub+Pages+tutorial", note:""}
  ],
  reading: [
    {url:"https://pages.github.com/", title:"GitHub Pages", note:""},
    {url:"https://www.gov.uk/government/publications/the-bioinformatics-skills-curriculum", title:"Bioinformatics career references (general)", note:""}
  ],
  tasks: [
    "Sketch the DAG: QC → trim → align (host removal) → align (pathogen) → consensus → variant call → report",
    "Implement at least 3 rules in Snakemake with a test dataset",
    "Write an R Markdown / Quarto report rendered automatically",
    "Tag `v1.0.0` and write a CHANGELOG",
    "Publish a GitHub Pages site (use the site you just built as a template!)"
  ],
  quiz: [
    {q:"A good portfolio repo has…", options:["Only code","Code + README + example data + license","Just notebooks","Slack messages"], answer:1, explain:"Reproducibility + clarity = signal you can ship."},
    {q:"GitHub Pages can serve…", options:["Static HTML/CSS/JS","Server-side Python","Docker containers","Binary executables"], answer:0, explain:"Static sites only — perfect for portfolios."},
    {q:"A consensus sequence is built from…", options:["A single read","Aligned reads at each reference position","The reference unchanged","Random sampling"], answer:1, explain:"Per-position majority (or threshold) base from aligned reads."},
    {q:"Host-read removal is done…", options:["After variant calling","Before pathogen alignment, by mapping to host genome and keeping unmapped","Manually only","In the wet lab only"], answer:1, explain:"Align to host first; carry forward unmapped reads."},
    {q:"Quarto and R Markdown both let you…", options:["Run code and render reports","Compile C","Replace git","Train neural networks"], answer:0, explain:"Reproducible literate-programming reports."}
  ],
  github: [
    {url:"https://github.com/topics/pathogen-detection", title:"GitHub: pathogen-detection topic", note:""},
    {url:"https://github.com/nf-core/viralrecon", title:"nf-core/viralrecon", note:"A real production pathogen pipeline"},
    {url:"https://github.com/CDCgov/SC2-Spike-Tracker", title:"CDC SC2-Spike-Tracker (example)", note:""}
  ],
  reddit: [
    {url:"https://www.reddit.com/r/bioinformatics/search/?q=portfolio&restrict_sr=1", title:"r/bioinformatics: portfolios", note:"See what others have shipped"}
  ],
  caseStudy: {
    level: 3,
    title: "From study project to product-grade pipeline",
    body: "A toy capstone for one pathogen can grow into a multi-pathogen detection system. The same DAG — QC, host removal, target alignment, consensus, lineage — backs production IVD bioinformatics today. Congratulations: you can read, build, and defend that pipeline."
  }
}
];
