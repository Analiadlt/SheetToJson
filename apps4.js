
const output = document.querySelector('.output');
const btn = document.querySelector('button');
const myQuery = document.querySelector('.myQuery');
const mySheet = document.querySelector('.mySheet');
const sheets = document.querySelector('.sheets');
const sheetArr = ['test1', 'Sheet2', 'Sheet6', 'people'];
sheetArr.forEach((sheet) => {
    const tempEle = makeCell(sheets, sheet, 'ele', 'option');
    tempEle.value = sheet;
})
const url = 'https://docs.google.com/spreadsheets/d/';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';

// const query1 =`select A,B where C>100`;
// const query1 = `select A,B,C,E where E contains 'a' limit 3`;
// const query1 = `select A,B`;
// const q4 = encodeURIComponent(query1); //codifica la query1 para que sea SQL
btn.addEventListener('click', getData);
function getData() {
    const ssid = mySheet.value;
    const q3 = `sheet=${sheets.value}`;
    let url1 = `${url}${ssid}${q1}&${q2}&${q3}`;
    if (myQuery.value.length > 0) {
        const updateCode = encodeURIComponent((myQuery.value).toUpperCase());
        url1 += `&tq=${updateCode}`;
    }
    output.innerHTML = url1;
    fetch(url1)
        .then(res => res.text())
        .then(data => {
            const json = JSON.parse(data.substring(47).slice(0, -2));
            // console.log(json.table);
            const headings = makeCell(output, '', 'heading');
            let wid = 100 / json.table.cols.length; //hace dinámica la cantidad de columnas
            json.table.cols.forEach((col) => {
                const val = col.label || col.id;
                const el = makeCell(headings, val, 'box');
                el.style.width = wid + '%';
            })
            json.table.rows.forEach((row) => {
                //console.log(row);
                const div = makeCell(output, '', 'row');
                row.c.forEach((cell) => {
                    const ele1 = makeCell(div, `${cell.v}`, 'box');
                    ele1.style.width = wid + '%'; //establece el valor del width de cada column.
                })
            })

        })
}

function makeCell(parent, html, classAdd, eleType = 'div') {
    const ele = document.createElement(eleType);
    parent.append(ele);
    ele.innerHTML = html;
    ele.classList.add(classAdd);
    return ele;
}