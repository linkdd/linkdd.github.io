const originals = import.meta.glob<string>('./assets/images/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

const thumbnails = import.meta.glob<string>('./assets/images/thumbnails/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const pictures = Object.entries(originals)
  .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
  .map(([path, src]) => {
    const name = path.split('/').pop()!

    return {
      name,
      src,
      thumbnail: thumbnails[`./assets/images/thumbnails/${name}`] ?? src,
    }
  })
