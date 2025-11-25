// Масив об'єктів виставок
var exhibitions = [
    {
        topic: "Сучасне мистецтво",
        place: "Київський художній центр",
        organizer: "ArtSpace",
        start: "2025-11-23"
    },
    {
        topic: "Інновації та технології",
        place: "Конференц-хол №3",
        organizer: "",
        start: "2025-11-25"
    },
    {
        topic: "Історична виставка",
        place: "Музей історії",
        organizer: "HeritageUA",
        start: "2025-11-10"
    }
];

// Функція для розрахунку різниці у днях
function diffDays(start) {
    var ONE_WEEK = 7; // Тривалість виставки
    var now = new Date();
    var startDate = new Date(start);

    var daysDiff = Math.floor((startDate - now) / (1000 * 60 * 60 * 24));

    if (daysDiff > 0) {
        return {
            status: "before",
            daysBefore: daysDiff
        };
    } else if (daysDiff <= 0 && daysDiff > -ONE_WEEK) {
        return {
            status: "running",
            daysRunning: -daysDiff,
            daysToEnd: ONE_WEEK + daysDiff
        };
    } else {
        return {
            status: "ended",
            daysAfterEnd: -(daysDiff + ONE_WEEK)
        };
    }
}

// Функція для створення HTML однієї виставки
function createItem(ex) {
    var d = diffDays(ex.start);
    var cssClass = "ex-item";
    var message = "";

    if (d.status === "before") {
        message = "До початку виставки залишилось " + d.daysBefore + " дн.";
    } else if (d.status === "running") {
        cssClass += "today";
        message = "Виставка триває. До завершення " + d.daysToEnd + " дн.";
    } else {
        cssClass += "expired";
        message = "Виставка вже завершилась.";
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
        "<p><span class='field-name'>Дата початку:</span> " + ex.start + "</p>" +
        "<p><span class='field-name'>Статус:</span> " + message + "</p>" +
        "</div>";
}

// Головна функція для відображення виставок
function showExhibitions() {
    var html = "";

    exhibitions.forEach(function(exhibition) {
        html += createItem(exhibition);
    });

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = html;
}
