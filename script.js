// ============================================
// BAKERY MANAGEMENT SYSTEM
// BASIC JAVASCRIPT
// ============================================


// 1. ARRAY TO STORE CUSTOMER ORDERS

let orders = [];


// 2. FUNCTION TO CALCULATE THE BILL

function calculateBill() {
    let product = document.getElementById("product");
    let quantity = document.getElementById("quantity");

    let price = Number(product.value);
    let qty = Number(quantity.value);

    if (price <= 0 || qty <= 0 || !Number.isFinite(price) || !Number.isFinite(qty)) {
        document.getElementById("total").textContent =
            "Please select a product and enter a valid quantity.";
        return 0;
    }

    let bill = price * qty;

    document.getElementById("total").textContent =
        "Total Amount: Rs. " + bill;

    return bill;
}

// 3. CREATE ORDER HISTORY SECTION USING DOM

let orderSection = document.createElement("section");

let heading = document.createElement("h2");

heading.textContent = "Customer Order History";

let orderList = document.createElement("ul");

orderSection.appendChild(heading);

orderSection.appendChild(orderList);

document.querySelector("main").appendChild(orderSection);


// 4. FUNCTION TO DISPLAY ALL ORDERS

function displayOrders() {

    orderList.textContent = "";

    // FOR...OF LOOP

    for (let order of orders) {

        let item = document.createElement("li");

        item.textContent =
            "Customer: " + order.name +
            " | Product: " + order.product +
            " | Quantity: " + order.quantity +
            " | Total: Rs. " + order.total;

        orderList.appendChild(item);
    }
}


// 5. FUNCTION TO SHOW ORDER STATISTICS

function showStatistics() {

    let totalOrders = orders.length;

    let totalSales = 0;

    // FOR LOOP

    for (let i = 0; i < orders.length; i++) {

        totalSales = totalSales + orders[i].total;

    }

    document.getElementById("orderStatistics").textContent =
        "Total Orders: " + totalOrders +
        " | Total Sales: Rs. " + totalSales;
}


// CREATE STATISTICS ELEMENT

let statistics = document.createElement("p");

statistics.id = "orderStatistics";

orderSection.appendChild(statistics);


// 6. FUNCTION TO ADD A NEW ORDER

function addOrder() {

    let customerName =
        document.getElementById("customer").value.trim();

    let phone =
        document.getElementById("phone").value;

    let productSelect =
        document.getElementById("product");

    let productName =
        productSelect.options[productSelect.selectedIndex].text;

    let quantity =
        Number(document.getElementById("quantity").value);

    // VALIDATION

    if (customerName === "" || phone === "") {

        alert("Please enter customer name and phone number.");

        return;
    }

    if (quantity < 1 || isNaN(quantity)) {

        alert("Please enter a valid quantity.");

        return;
    }

    // CALCULATE TOTAL

    let totalAmount = calculateBill();

    // CREATE AN ORDER OBJECT

    let newOrder = {

        name: customerName,

        phone: phone,

        product: productName,

        quantity: quantity,

        total: totalAmount

    };

    // PUSH NEW ORDER INTO ARRAY

    orders.push(newOrder);

    // DISPLAY UPDATED ORDERS

    displayOrders();

    // DISPLAY STATISTICS

    showStatistics();

    // SHOW CONFIRMATION MESSAGE

    document.getElementById("message").textContent =
        "Thank you " + customerName +
        "! Your order has been received.";

    // CLEAR FORM

    document.getElementById("orderForm").reset();

    document.getElementById("total").textContent =
        "Total Amount: Rs. 0";
}


// 7. ADD EVENT LISTENER TO ORDER FORM

document.getElementById("orderForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        addOrder();

    });


// 8. DISPLAY INITIAL ORDER INFORMATION

displayOrders();

showStatistics();