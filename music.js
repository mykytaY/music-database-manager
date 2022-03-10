fetch('http://localhost:8888/customers')
    .then(res => res.json())
    .then(jsonArr => {
        displayCustomers(jsonArr);

        document.getElementById('newCustForm').addEventListener('submit', handleAddNewCust);
        const arrBtns = document.querySelectorAll('.delBtn');
        for(const btn of arrBtns)
        {
            btn.addEventListener('click', handleDeleteCust);
        }
    });

function handleDeleteCust(event)
{
    const custID = event.currentTarget.value;
    fetch('http://localhost:8888/customers/' + custID,
    {
        method: 'DELETE',
    })
    .then(res=>res.text())
    .then(res=>console.log(res))
}

function handleAddNewCust(event)
{
    event.preventDefault();
    const fd = new FormData(document.getElementById('newCustForm'));

    fetch('http://localhost:8888/customers',
    {
        method:'POST',
        body: fd
    });
}


function displayCustomers(jsonArr) {
    const custView = document.querySelector('#customerView');

    const domTable = document.createElement('table');
    domTable.setAttribute('border','1');

    const domHeaderRow = document.createElement('tr');

    const domHeaderColFN = document.createElement('th');
    domHeaderColFN.innerText = 'First Name';

    const domHeaderColLN = document.createElement('th');
    domHeaderColLN.innerText = 'Last Name';

    // const domHeaderColCountry = document.createElement('th');
    // domHeaderColCountry.innerText = 'Country';

    domHeaderRow.appendChild(domHeaderColFN);
    domHeaderRow.appendChild(domHeaderColLN);
    // domHeaderRow.appendChild(domHeaderColCountry);

    domTable.appendChild(domHeaderRow);


    // const alteredJsonArr = jsonArr.map(x=>x).filter(x=>x.Country == "Canada");
    // const alteredJsonArr = jsonArr.filter(x=>x.LastName.startsWith('P'));
    // const alteredJsonArr = jsonArr.filter(x=>x.LastName.match('er$'));
    for (json of jsonArr) {
        let domTR = document.createElement('tr');

        let domTDFN = document.createElement('td');
        domTDFN.innerText = json.FirstName;

        let domTDLN = document.createElement('td');
        domTDLN.innerText = json.LastName;

        // let domTDCountry = document.createElement('td');
        // domTDCountry.innerText = json.Country;
        let domTDDel = document.createElement('td');
        domTDDel.innerHTML = `<button class="delBtn" value=${json.CustomerId}><i class="fa fa-trash"></i></button>`;

        domTR.appendChild(domTDFN);
        domTR.appendChild(domTDLN);
        domTR.appendChild(domTDDel);
        // domTR.appendChild(domTDCountry);
        domTable.appendChild(domTR);
    }

    custView.appendChild(domTable);

}












// const custView = document.querySelector('#customerView');
// let strHTML = "<table border=1>";
// for (const cust of json)
// {
//     strHTML += `<tr>
//                     <td>${cust.FirstName}</td>
//                 </tr>`;
// }
// strHTML += "</table>"
// custView.innerHTML = strHTML;




{/* <i class="fa fa-trash" value=${json.CustomerId}></i> */}