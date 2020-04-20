const titles = {
  'home': 'TV Ratings Charts for Series Over All Time',
  'show': 'TV Ratings for ',
  'search': 'Search results for: '
}

export default function(page, params) {
  let title = (page in titles) ? titles[page] : ''
  document.title = `${title} ${params} | TV Ratings Chart`
}