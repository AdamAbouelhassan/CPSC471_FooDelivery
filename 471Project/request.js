function loginUser() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("emailtext").value,
        password: document.getElementById("passwordtext").value,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.login == "user") {
        localStorage.setItem("currentUserID", data.id);
        localStorage.setItem("currentUserAddress", data.address);
        welcomePage();
      } else if (data.login == "driver") {
        localStorage.setItem("currentUserID", data.id);
        driverMenu();
      } else if (data.login == "manager") {
        localStorage.setItem("currentUserID", data.id);
        localStorage.setItem("storeID", data.storeID);
        storeManagerPage();
      } else {
        window.alert(data.login);
      }
    })
    .catch((error) => console.log(error));
}

function signUp() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/users/sign-up",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("emailtext").value,
        password: document.getElementById("passwordtext").value,
        first_name: document.getElementById("fnametext").value,
        last_name: document.getElementById("lnametext").value,
        age: document.getElementById("agetext").value,
        address: document.getElementById("addresstext").value,
        phone: document.getElementById("pnumbertext").value,
        driver: document.getElementById("driverCheck").checked,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.signup != "successful sign-up") {
        window.alert(data.signup);
      } else {
        window.alert("Successful Sign-Up! Go back to Login Page to login");
      }
    })
    .catch((error) => console.log(error));
}

function welcomePage() {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: [], total_price: 0.0, delivery_fee: 3.0 })
      );
      localStorage.setItem("pickup_location", JSON.stringify({ stores: [] }));
      localStorage.setItem("allStores", JSON.stringify(data));
      window.location = "welcome.html";
    })
    .catch((error) => {
      console.log(error);
      window.alert(error);
    });
}

function driverMenu() {
  window.location = "drivermenu.html";
}

function allAvailableOrdersPage() {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("allAvailableOrders", JSON.stringify(data));
      window.location = "allorderstable.html";
    })
    .catch((error) => console.log(error));
}

function myOrdersPage() {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/drivers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driverID: localStorage.getItem("currentUserID"),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("myOrders", JSON.stringify(data));
      window.location = "myorderstable.html";
    })
    .catch((error) => console.log(error));
}

// assign driver
function assignDriver(orderID, order_status) {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/orders", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: orderID,
      order_status: order_status,
      driverID: localStorage.getItem("currentUserID"),
      pickup_time: "",
      arrival_time: "",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.updated == true) {
        window.alert("This order has been assigned to you");
      } else {
        window.alert("An error has occured. please try again later");
      }
    })
    .catch((error) => console.log(error));
}

// update order status
function updateOrder(
  driverID,
  orderID,
  order_status,
  pickup_time,
  arrival_time,
  rating,
  alert
) {
  console.log(order_status);
  console.log(pickup_time);
  console.log(arrival_time);
  console.log(orderID);
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/orders", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: orderID,
      order_status: order_status,
      driverID: driverID,
      pickup_time: pickup_time,
      arrival_time: arrival_time,
      rating: rating,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.updated == true) {
        window.alert(alert);
      } else {
        window.alert("An error has occured. please try again later");
      }
    })
    .catch((error) => console.log(error));
}

function departmentsPage(storeID, storeName) {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores/departments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeID: storeID,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("storeName", storeName);
      localStorage.setItem("storeID", storeID);
      localStorage.setItem("departments", JSON.stringify(data));
      window.location = "departments.html";
    })
    .catch((error) => console.log(error));
}

function itemsPage(departmentID, departmentName) {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores/departments/items",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentID: departmentID,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("departmentName", departmentName);
      localStorage.setItem("items", JSON.stringify(data));
      window.location = "items.html";
    })
    .catch((error) => console.log(error));
}

function loadDepartmentItems(departmentName) {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores/departments/items",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentID: localStorage.getItem("departmentID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("items", JSON.stringify(data));
      window.location = "manageitems.html";
    })
    .catch((error) => console.log(error));
}

function selectItem(itemID, name, description, image, stockAmount, itemPrice) {
  localStorage.setItem("itemID", itemID);
  localStorage.setItem("itemName", name);
  localStorage.setItem("itemDescription", description);
  localStorage.setItem("itemImage", image);
  localStorage.setItem("itemStockAmount", stockAmount);
  localStorage.setItem("itemPrice", itemPrice);
  window.location = "item.html";
}

function addItemToCart(itemID, itemName, itemPrice, amount) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let pickup_location = JSON.parse(localStorage.getItem("pickup_location"));
  cart.items.push({
    itemID: itemID,
    itemName: itemName,
    itemPrice: itemPrice,
    amount: amount,
    store: localStorage.getItem("storeName"),
  });
  cart.total_price += itemPrice * amount;
  if (!pickup_location.stores.includes(localStorage.getItem("storeName")))
    pickup_location.stores.push(localStorage.getItem("storeName"));
  console.log(pickup_location);
  localStorage.setItem("pickup_location", JSON.stringify(pickup_location));
  localStorage.setItem("cart", JSON.stringify(cart));
  window.alert("Item added to cart");
}

function createOrder(address, date) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let pickup_location = JSON.parse(localStorage.getItem("pickup_location"));
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      delivery_location: address,
      pickup_location: JSON.stringify(pickup_location),
      date: date,
      order_status: "open",
      pickup_time: "",
      arrival_time: "",
      cart: JSON.stringify(cart),
      customerID: localStorage.getItem("currentUserID"),
      storeID: localStorage.getItem("storeID"),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      window.alert("Your order has been placed");
      pickup_location.stores.length = 0;
      cart.items.length = 0;
      cart.total_price = 0.0;
      cart.delivery_fee = 3.0;
      localStorage.setItem("pickup_location", JSON.stringify(pickup_location));
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location = "welcome.html";
    })
    .catch((error) => console.log(error));
}

function storeManagerPage() {
  window.location = "storemanager.html";
}

function manageDepartmentsPage() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores/departments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeID: localStorage.getItem("storeID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("departments", JSON.stringify(data));
      window.location = "managedepartments.html";
    })
    .catch((error) => console.log(error));
}

function addEditItems(departmentID, departmentName) {
  localStorage.setItem("departmentID", departmentID);
  localStorage.setItem("departmentName", departmentName);
  window.location = "addedititems.html";
}

function addItem(itemName, itemPrice, itemAmount, itemDescription, itemImage) {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      departmentID: localStorage.getItem("departmentID"),
      name: itemName,
      price: itemPrice,
      item_description: itemDescription,
      stock_amount: itemAmount,
      image: itemImage,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.added == true) window.alert("Item added to Database");
    })
    .catch((error) => console.log(error));
}

function selectEditItem(
  itemID,
  name,
  description,
  image,
  stockAmount,
  itemPrice
) {
  localStorage.setItem("itemID", itemID);
  localStorage.setItem("itemName", name);
  localStorage.setItem("itemDescription", description);
  localStorage.setItem("itemImage", image);
  localStorage.setItem("itemStockAmount", stockAmount);
  localStorage.setItem("itemPrice", itemPrice);
  window.location = "edititems.html";
}

function editItem(
  itemID,
  itemName,
  itemPrice,
  itemAmount,
  itemDescription,
  itemImage
) {
  fetch("https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/stores", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: itemID,
      departmentID: localStorage.getItem("departmentID"),
      name: itemName,
      price: itemPrice,
      item_description: itemDescription,
      stock_amount: itemAmount,
      image: itemImage,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.updated == true) window.alert("Item updated");
    })
    .catch((error) => console.log(error));
}

function pastOrders() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/users/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerID: localStorage.getItem("currentUserID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("myOrders", JSON.stringify(data));
      window.location = "pastorders.html";
    })
    .catch((error) => console.log(error));
}

function driverRating() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/drivers/ratings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driverID: localStorage.getItem("currentUserID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("rating", data.rating);
      window.location = "ratings.html";
    })
    .catch((error) => console.log(error));
}

function signOut() {
  localStorage.clear();
  window.location = "login.html";
}

function viewStoreOrders() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/storemanager",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeID: localStorage.getItem("storeID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("storeOrders", JSON.stringify(data));
      window.location = "viewstoreorders.html";
    })
    .catch((error) => console.log(error));
}

function createPromo(start, end, deal) {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/promotions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeID: localStorage.getItem("storeID"),
        start: start,
        end: end,
        deal: deal,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.added == true) window.alert("Promo created");
      else window.alert(data.added);
    })
    .catch((error) => console.log(error));
}

function getPromos() {
  fetch(
    "https://u1epsre091.execute-api.us-east-2.amazonaws.com/dev/promotions",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeID: localStorage.getItem("storeID"),
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("promos", JSON.stringify(data));
      window.location = "promotions.html";
    })
    .catch((error) => console.log(error));
}
