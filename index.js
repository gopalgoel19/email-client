init();

const emailListItem = (id, from, date, subject, desc) => 
`<li class="emailItem" id="${id}">
<div class="avatarContainer">
    <div class="avatar">${from.name[0]}</div>
</div>
<div class="emailContent">
    <div class="emailContentItem">From:<strong class="itemStrong">${from.email}</strong></div>
    <div class="emailContentItem">Subject:<strong class="itemStrong">${subject}</strong></div>
    <div class="emailContentBody">${desc}</div>
    <div class="emailContentItem">${date}</div>
</div>
</li>`;

async function init(){
    renderEmailList();
}

async function getEmailList(){
    const url = "https://flipkart-email-mock.now.sh/";
    const response = await fetch(url);
    const text = await response.text();
    const {list} = JSON.parse(text);
    return list;
}

async function renderEmailList(){
    const listOfEmails = await getEmailList();
    const emailListHtml = listOfEmails.map(({id, from, date, subject, short_description}) => {
        const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });
        const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(new Date(date));
        return emailListItem(id, from, `${da}/${mo}/${ye}`, subject, short_description)
    });
    const emailListRoot = document.getElementById("emailList");
    const temp = emailListHtml.join("");
    emailListRoot.innerHTML = temp;
}