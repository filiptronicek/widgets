// set widget parameter to 1, 2, or 4 for small, wide or large widget

const imgUrl = "https://maas.filiptronicek.now.sh/r/kittens";

const imgReq = await new Request(imgUrl);
const img = await imgReq.loadImage();

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget(img);
  Script.setWidget(widget);
  Script.complete();
} else {
  Safari.open(imgUrl);
}

function createWidget(img) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color("#ffffff");
  widget.url = imgUrl;
  let image = widget.addImage(img);
  image.centerAlignImage();
  const [width, height] = getDimensions();
  image.imageSize = new Size(width, height);
  return widget;
}

function getDimensions() {
  const size = args.widgetParameter || 1;
  switch (Number(size)) {
    case 1:
      return [250, 250];
    case 2:
      return [330, 180];
    case 4:
      return [330, 330];
    default:
      return [170, 170];
  }
}
