$(function() {
  const defaultThumbnail = '/img/placeholder.png'
  const rss2json = 'https://api.rss2json.com/v1/api.json'
  const getJsonFeed = feed => `${rss2json}?rss_url=${feed}`

  const element = $('#blog')
  const config = element.data('config')

  const renderCategories = categories => categories
    .map(category => `<span class="tag is-primary mx-1">${category}</span>`)
    .join('')

  const fetchArticles = async () => {
    const responses = await Promise.all(config.feeds
      .map(feed => feed.rss)
      .map(getJsonFeed)
      .map(async url => {
        const res = await fetch(url)
        const data = await res.json()
        return data.items
      })
    )

    const articles = responses
      .flat()
      .sort((a, b) => {
        const dateA = new Date(a.pubDate)
        const dateB = new Date(b.pubDate)
        return dateB - dateA
      })
      .slice(0, 4)
      .map(article => `
        <div class="column is-one-quarter">
          <article class="card is-flex is-flex-direction-column" style="height: 100%;">
            <div class="card-image p-4">
              <figure class="image">
                <img
                  style="height: 50px; width: 100%; object-fit: scale-down;"
                  src="${article.thumbnail || defaultThumbnail}" alt="Thumbnail"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h5 class="title is-size-5">
                  <a href="${article.link}" target="_blank">
                    ${article.title}
                  </a>
                </h5>
              </div>
            </div>
            <div class="card-footer mt-auto">
              <div class="container p-3">
                <p class="has-text-centered">
                  ${renderCategories(article.categories)}
                </p>
                <p class="is-size-7 is-uppercase has-text-right mt-3">
                  ${moment(article.pubDate).format('dddd, MMMM Do, YYYY')}
                </p>
              </div>
            </div>
          </div>
        </article>
      `)


    element.append(articles)
  }

  fetchArticles().catch(console.error)
})
