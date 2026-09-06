export type CVDocument = {
  id: string
  title: string
  file: string
}

export type CVDocumentsProps = {
  documents: CVDocument[]
}
