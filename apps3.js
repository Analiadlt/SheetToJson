
const output = document.querySelector('.output');
const btn = document.querySelector('button');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1EgnjzKuodX9tdwUqtW92WSdlIBZvTnrgf9cXgGGL03Y';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=Sheet6';
// const query1 =`select A,B where C>100`;
const query1 =`select A,B,C,E where E contains 'a' limit 3`;
const q4= encodeURIComponent(query1); //codifica la query1 para que sea SQL
btn.addEventListener('click',getData);
function getData(){
    let url1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;
    // output.innerHTML = url1;
    fetch(url1)
    .then(res => res.text())
    .then(data => {
        const json = JSON.parse(data.substring(47).slice(0,-2));
        // console.log(json.table);
        const headings = makeCell(output,'','heading');
        json.table.cols.forEach((col)=>{
            const el = makeCell(headings,col.id,'box');
        })
        json.table.rows.forEach((row)=>{
            //console.log(row);
            const div = makeCell(output,'','row');
            row.c.forEach((cell)=>{
                const ele1 = makeCell(div,`${cell.v}`,'box');
            })
        })
 
    })
}
 
function makeCell(parent,html,classAdd){
    const ele = document.createElement('div');
    parent.append(ele);
    ele.innerHTML = html;
    ele.classList.add(classAdd);
    return ele;


}