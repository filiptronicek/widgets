// Original script from
// https://gist.github.com/rudotriton/9d11ce1101ff1269f56844871b3fd536

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;
// change "country" to a value from
// https://coronavirus-19-api.herokuapp.com/countries/
const country = "Czechia";

const endpoint = `https://coronavirus-19-api.herokuapp.com`;
const url = `${endpoint}/countries/${country}`;
const req = new Request(url);
const res = await req.loadJSON();

const worldURLRequest = new Request(`${endpoint}/countries/world`);
const world = await worldURLRequest.loadJSON();

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget(
    "COVID-19 Stats",
    `${
      res.todayCases !== 0
        ? `${res.todayCases.toLocaleString()} today`
        : `${(world.cases / 1000000).toFixed(2)}M world`
    } `,
    `${res.cases.toLocaleString()} ${res.todayCases !== 0 ? `total` : `in ${country}`}`,
    "#53d769"
  );
  Script.setWidget(widget);
  Script.complete();
} else {
  // make table
  let table = new UITable();

  // add header
  let row = new UITableRow();
  row.isHeader = true;
  row.addText(`Coronavirus Stats in ${country}`);
  table.addRow(row);

  // fill data
  table.addRow(createRow("Cases", res.cases));
  table.addRow(createRow("Active", res.active));
  table.addRow(createRow("Today", res.todayCases));
  table.addRow(createRow("Deaths", res.deaths));
  table.addRow(createRow("Recovered", res.recovered));
  table.addRow(createRow("Critical", res.critical));

  if (config.runsWithSiri)
    Speech.speak(
      `There are ${res.cases} cases in ${country}, and ${res.todayCases} cases today.`
    );

  // present table
  table.present();
}

function createRow(title, number) {
  let row = new UITableRow();
  row.addText(title);
  row.addText(number.toString()).rightAligned();
  return row;
}

function createWidget(pretitle, title, subtitle, color) {
  let w = new ListWidget();
  w.backgroundColor = new Color(color);
  let preTxt = w.addText(pretitle);
  preTxt.textColor = Color.white();
  preTxt.textOpacity = 0.8;
  preTxt.font = Font.systemFont(16);
  w.addSpacer(5);
  let titleTxt = w.addText(title);
  titleTxt.textColor = Color.white();
  titleTxt.font = Font.systemFont(20);
  w.addSpacer(5);
  let subTxt = w.addText(subtitle);
  subTxt.textColor = Color.white();
  subTxt.textOpacity = 0.8;
  subTxt.font = Font.systemFont(18);
  return w;
}
