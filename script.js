function createCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function createLinkCell(link) {
    const cell = document.createElement('td');
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.textContent = link;
    anchor.target = '_blank';
    cell.appendChild(anchor);
    return cell;
}

function displayData(data) {
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    ['Name', 'Link', 'Status', 'City', 'Actions'].forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    data.forEach(record => {
        const row = document.createElement('tr');

        ['Name', 'Link', 'Status', 'City'].forEach(key => {
            let cell;
            if (key === 'Link') {
                cell = createLinkCell(record[key] || '');
            } else {
                cell = createCell(record[key] || '');
            }
            row.appendChild(cell);
        });

        const email = 'janjackson568@gmail.com';
        const subject = `Edit request for ${record.Name || 'Unknown Community'}`;
        const body = `Hello, I would like to request an edit for the following community: ${record.Name}.\n\nHere are the changes I propose:`;
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const editLink = document.createElement('a');
        editLink.href = mailto;
        editLink.innerText = 'Request Edit';

        const actionsCell = document.createElement('td');
        actionsCell.appendChild(editLink);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
    document.body.appendChild(tableContainer);
}




async function fetchData() {
    try {
        const response = await fetch('https://thehousinglist.uw.r.appspot.com/fetchData');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
