// set widget parameter to 1, 2, or 4 for small, wide or large widget

const { img: imgUrl } = "https://maas.filiptronicek.now.sh/r/kittens";

const imgReq = await new Request(imgUrl)
const img = await imgReq.loadImage()

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget(img)
  Script.setWidget(widget)
  Script.complete()
} else {
  Safari.open(imgUrl)
}

function createWidget(img) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color("#ffffff")
  widget.centerAlignContent()
  widget.url = imgUrl
  let image = widget.addImage(img)
  image.centerAlignImage()
  const [width, height] = getDimensions()
  image.imageSize = new Size(width, height)
  return widget
}

function getDimensions() {
  const size = args.widgetParameter || 1
  switch (Number(size)) {
    case 1:
      return [150, 150]
    case 2:
      return [300, 150]
    case 4:
      return [300, 300]
    default:
      return [150, 150]
  }
}