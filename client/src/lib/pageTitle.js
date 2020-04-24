const titles = {
  'home': 'Charts of TV Show Ratings for Entire Series',
  'about': 'Ian Ray - Developer for Hire',
  'show': 'TV Chart for ',
  'search': 'Search results for: '
}

export default function(page, params) {
  let title = (page in titles) ? titles[page] : ''
  document.title = `${title} ${params} | TV Charts`
}