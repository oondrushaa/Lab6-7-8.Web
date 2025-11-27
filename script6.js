var exhibitions = [
    {
        topic: "Сучасне мистецтво",
        place: "Київський художній центр",
        organizer: "ArtSpace",
        start: "2025-11-30"
    },
    {
        topic: "Інновації та технології",
        place: "Конференц-хол №3",
        organizer: "",
        start: "2025-11-26"
    },
    {
        topic: "Історична виставка",
        place: "Музей історії",
        organizer: "HeritageUA",
        start: ""
    }
];

function diffDays(start) {
    var ONE_WEEK = 7;
    var now = new Date();
    if (!start) {
        return { status: "no date" };
    }
    var startDate = new Date(start + "T00:00:00");
    var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var msPerDay = 1000 * 60 * 60 * 24;
    var daysDiff = Math.floor((startDate - nowDate) / msPerDay);

    if (daysDiff > 0) {
        return { status: "before", daysBefore: daysDiff };
    } else if (daysDiff <= 0 && daysDiff > -ONE_WEEK) {
        // running: days since start = -daysDiff (0...6), days to end = (ONE_WEEK + daysDiff)
        return { status: "running", daysRunning: -daysDiff, daysToEnd: ONE_WEEK + daysDiff };
    } else {
        return { status: "ended", daysAfterEnd: -(daysDiff + ONE_WEEK) };
    }
}

function createItem(ex) {
    var d = diffDays(ex.start);
    var cssClass = "ex-item";
    var message = "";

    if (d.status === "before") {
        message = "До початку виставки залишилось " + d.daysBefore + " дн.";
    } else if (d.status === "running") {
        cssClass += " today";
        message = "Виставка триває. До завершення " + d.daysToEnd + " дн.";
    } else if  (d.status === "ended"){
        cssClass += " expired";
        message = "Виставка вже завершилась.";
    } else{
        cssClass += " no-date";
        message = "Дата початку не вказана.";
    }

    var organizerMsg = "";
    if (!ex.organizer) {
        organizerMsg = "<p class='no-org'>* Організатор не вказаний</p>";
    }

    return "<div class='" + cssClass + "'>" +
        "<h3>" + ex.topic + "</h3>" +
        "<p><span class='field-name'>Місце:</span> " + ex.place + "</p>" +
        "<p><span class='field-name'>Організатор:</span> " + (ex.organizer || "—") + "</p>" +
        organizerMsg +
        "<p><span class='field-name'>Дата початку:</span> " + (ex.start || "—") + "</p>" +
        "<p><span class='field-name'>Статус:</span> " + message + "</p>" +
        "</div>";
}

function showExhibitions() {
    var html = "";
    exhibitions.forEach(function(exhibition) {
        html += createItem(exhibition);
    });
    var out = document.getElementById("output");
    if (out) out.innerHTML = html;
}
