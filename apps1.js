// https://docs.google.com/spreadsheets/d/1WbU9Phs0Sui3sjKkIbg_1u1ZeKWOjoL1wuNkF_VQerI/edit?usp=sharing
const output = document.querySelector('.output');
const url = 'https://docs.google.com/spreadsheets/d/';
const ssid = '1WbU9Phs0Sui3sjKkIbg_1u1ZeKWOjoL1wuNkF_VQerI';
const query1 = `/gviz/tq?`;

const endpoint1 = `${url}${ssid}${query1}`;
// output.textContent = endpoint1;

fetch(endpoint1)
.then(res => res.text())
.then(data => {
    const temp = data.substring(47).slice(0,-2);
    // console.log(temp);
    const json = JSON.parse(temp);
    // console.log(json.table.rows);
    const rows = json.table.rows;
    rows.forEach((row) => {
        // console.log(row.c);
        const div = document.createElement('div');
        const temp1= row.c;
        temp1.forEach((cell)=>{
            // console.log(cell);
            const box= document.createElement('div');
            box.textContent = cell.v;
            box.classList.add('box');
            div.append(box);
        })
        output.append(div);

    })


})