const titles = {
  'home': 'TV Charts for Shows Over All Time',
  'show': 'TV Chart for ',
  'search': 'Search results for: '
}

export default function(page, params) {
  let title = (page in titles) ? titles[page] : ''
  document.title = `${title} ${params} | TV Charts`
}