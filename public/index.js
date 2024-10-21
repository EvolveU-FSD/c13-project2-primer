console.log('Loading index.js into browser')

//
// API Handling
//
async function loadEntries() {
    const response = await fetch('/api/servers')
    if (response.status !== 200) {
        console.log('Oops... fetch for /api/servers failed')
        return
    }
    const entries = await response.json()
    return entries
}

async function postNewEntry(newEntry) {
    const response = await fetch('/api/server', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry)
    })

    if (response.status !== 200) {
        console.log('Oops... fetch for /api/servers failed')
        return
    }
    const entries = await response.json()
    return entries
}

// 
// Page Handling
//
async function updateEntriesOnPage() {
    showLoading()
    let entries = await loadEntries()
    clearLoading()
    entries.forEach((entry) => {
        createEntryOnPage(entry)
    })
}

function showLoading() {
    document.getElementById('servers').replaceChildren("Loading...")
}

function clearLoading() {
    document.getElementById('servers').replaceChildren()
}

function createEntryOnPage(entry) {
    const row = document.createElement('div')

    const name = document.createElement('span')
    name.classList.add('name-field')
    name.append(entry.name)

    const ip = document.createElement('span')
    ip.append(entry.ip)

    row.append(name, ip)
    document.getElementById('servers').append(row)
}

async function addClicked() {
    const name = document.getElementById('name').value
    const ip = document.getElementById('ip').value
    if (name.length !== 0 && ip.length !== 0 ) {
        const newEntry = { name, ip }
        await postNewEntry(newEntry)
        await updateEntriesOnPage()
    }
}
