function scale(id) {
  var el = document.getElementById(id)
  if(el) {
    let sw = el.scrollWidth;
    let ow = el.offsetWidth;
    let scale = (sw > ow) ? (ow/sw) : 1;
    return scale;
  } else {
    return 1;
  }
}

function debounce(func) {
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,200,event);
  };
}

export default {scale, debounce}