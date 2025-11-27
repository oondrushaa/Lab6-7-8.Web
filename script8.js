// БАЗОВИЙ КЛАС
class Field {
    constructor(name, r, k) {
        this.name = name;
        this.r = r; 
        this.k = k;
    }

    yieldPerSquare() {
        return this.k * this.r;
    }
}

// КЛАС-НАЩАДОК
class PotatoField extends Field {
    constructor(name, r, k, S) {
        super(name, r, k);
        this.S = S; 
    }

    totalYield() {
        return this.yieldPerSquare() * this.S;
    }
}

function calculate() {
    const name = document.getElementById("nameField").value.trim();
    const r = parseFloat(document.getElementById("rField").value);
    const k = parseFloat(document.getElementById("kField").value);
    const S = parseFloat(document.getElementById("sField").value);

    if (!name || isNaN(r) || isNaN(k) || isNaN(S)) {
        document.getElementById("output").innerHTML =
            "<p style='color: red'>Будь ласка, заповніть всі поля!</p>";
        return;
    }

    const potato = new PotatoField(name, r, k, S);

    const perSquare = potato.yieldPerSquare().toFixed(2);
    const total = potato.totalYield().toFixed(2);

    document.getElementById("output").innerHTML = `
        <p><strong>Поле:</strong> ${name}</p>
        <p><strong>Урожай з 1 м²:</strong> ${perSquare} кг</p>
        <p><strong>Повний урожай з поля:</strong> ${total} кг</p>
    `;
}
