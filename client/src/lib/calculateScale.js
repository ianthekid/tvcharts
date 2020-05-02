export default (scaleRef) => {
  const { current: wrap } = scaleRef;
  var el = wrap;
  let sw = el.scrollWidth;
  let ow = el.offsetWidth;
  let scale = (sw > ow) ? (ow/sw) : 1;
  return scale;
};