// === SIGN UP VALIDATION ===
document.addEventListener("DOMContentLoaded", function () {
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");
  const birthDateInput = document.getElementById("birthDate");
  const phoneInput = document.getElementById("phone");
  const termsCheckbox = document.getElementById("SK");

  const errorElements = {
    name: document.getElementById("error-name"),
    email: document.getElementById("error-email"),
    password: document.getElementById("error-password"),
    birthDate: document.getElementById("error-birthDate"),
    phone: document.getElementById("error-phone"),
    gender: document.getElementById("error-gender"),
    terms: document.getElementById("error-terms"),
  };

  function showError(inputEl, fieldName, message) {
    inputEl.classList.add("invalid");
    errorElements[fieldName].textContent = message;
  }

  function clearError(inputEl, fieldName) {
    inputEl.classList.remove("invalid");
    errorElements[fieldName].textContent = "";
  }

  function validateName() {
    const value = nameInput.value.trim();
    const regex = /^[A-Z][a-zA-Z ]*$/;
    if (!regex.test(value)) {
      showError(nameInput, "name", "Nama harus diawali huruf kapital dan hanya huruf/spasi.");
      return false;
    }
    clearError(nameInput, "name");
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!regex.test(value)) {
      showError(emailInput, "email", "Format email tidak valid.");
      return false;
    }
    clearError(emailInput, "email");
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value.trim();
    if (value.length < 6) {
      showError(passwordInput, "password", "Kata sandi minimal 6 karakter.");
      return false;
    }
    clearError(passwordInput, "password");
    return true;
  }

  function validateBirthDate() {
    const value = birthDateInput.value;
    if (!value) {
      showError(birthDateInput, "birthDate", "Tanggal lahir harus diisi.");
      return false;
    }
    const today = new Date();
    const birth = new Date(value);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      age < 17 ||
      (age === 17 && (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())))
    ) {
      showError(birthDateInput, "birthDate", "Anda harus berusia minimal 17 tahun.");
      return false;
    }
    clearError(birthDateInput, "birthDate");
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const regex = /^[0-9]{10,13}$/;
    if (!regex.test(value)) {
      showError(phoneInput, "phone", "Nomor telepon harus 10–13 digit angka.");
      return false;
    }
    clearError(phoneInput, "phone");
    return true;
  }

  function validateGender() {
      const genderInputs = document.querySelectorAll('input[name="gender"]');
      let selected = false;
      genderInputs.forEach((input) => {
        if (input.checked) selected = true;
      });
      if (!selected) {
        errorElements.gender.textContent = "Pilih jenis kelamin terlebih dahulu.";
        return false;
      }
      errorElements.gender.textContent = "";
      return true;
  }

  function validateTerms() {
    if (!termsCheckbox.checked) {
      errorElements.terms.textContent = "Anda harus menyetujui syarat dan ketentuan.";
      return false;
    }
    errorElements.terms.textContent = "";
    return true;
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  birthDateInput.addEventListener("input", validateBirthDate);
  phoneInput.addEventListener("input", validatePhone);
  // genderInputs.addEventListener("change", validateGender);
    //    genderInputs.forEach((input) => {
    //      input.addEventListener("change", validateGender);
    //  });
     


  termsCheckbox.addEventListener("change", validateTerms);

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validBirthDate = validateBirthDate();
    const validPhone = validatePhone();
    const validGender = validateGender();
    const validTerms = validateTerms();

    if (validName && validEmail && validPassword && validBirthDate && validPhone && validGender && validTerms) {
      // Simpan ke localStorage
      localStorage.setItem("userEmail", emailInput.value.trim());
      localStorage.setItem("userPassword", passwordInput.value.trim());
      localStorage.setItem("userName", nameInput.value.trim());
      localStorage.setItem("userPhone", phoneInput.value.trim());
      localStorage.setItem("userBirthDate", birthDateInput.value);

      const successPopup = document.getElementById("success-popup");
      const confirmBtn = document.getElementById("popup-confirm");

      successPopup.classList.add("active");

      confirmBtn.addEventListener("click", function () {
        successPopup.classList.remove("active");
        window.location.href = "login.html";
      });
    }
  });
}
});


// === LOGIN VALIDATION ===
document.addEventListener("DOMContentLoaded", function () {

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    const errorEmail = document.getElementById("error-loginEmail");
    const errorPassword = document.getElementById("error-loginPassword");

    let valid = true;

    // Reset error
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    // Validasi Email
    if (email.value.trim() === "") {
      errorEmail.textContent = "Email harus diisi.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      errorEmail.textContent = "Format email tidak valid.";
      valid = false;
    }

    // Validasi Password
    if (password.value.trim() === "") {
      errorPassword.textContent = "Kata sandi harus diisi.";
      valid = false;
    }

    if (!valid) return;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email.value.trim() === savedEmail && password.value.trim() === savedPassword) {
      window.location.href = "home.html";
    } else {
      // popup gagal login
      const failedPopup = document.getElementById("failed-popup");
      const closeBtn = document.getElementById("popup-close");
      failedPopup.classList.add("active");

      closeBtn.addEventListener("click", () => {
        failedPopup.classList.remove("active");
      });
    }
  });
}

});

// === FORGOT PASSWORD VALIDATION ===
document.addEventListener("DOMContentLoaded", function () {


const forgotForm = document.getElementById("forgot-form");
if (forgotForm) {
  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value.trim();
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    const resultMessage = document.getElementById("resultMessage");

    if (email === savedEmail) {
      resultMessage.style.color = "green";
      resultMessage.textContent = `Password Anda: ${savedPassword}`;
    } else {
      resultMessage.style.color = "red";
      resultMessage.textContent = "Email tidak terdaftar. Silakan buat akun baru.";
    }

    forgotForm.reset();
  });
}

});


// === PROFILE ===

document.addEventListener("DOMContentLoaded", function () {

  // profil
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const phone = localStorage.getItem("userPhone");
  const birthDate = localStorage.getItem("userBirthDate");

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const phoneEl = document.getElementById("profilePhone");
  const birthDateEl = document.getElementById("profileBirthDate");

  if (name && nameEl) nameEl.textContent = name;
  if (email && emailEl) emailEl.textContent = email;
  if (phone && phoneEl) phoneEl.textContent = phone;
  if (birthDate && birthDateEl) birthDateEl.textContent = birthDate;

  // riwayat
  const orderList = document.getElementById("orderList");
  if (orderList) {
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    if (history.length === 0) {
      orderList.innerHTML = "<p class='text-muted'>Belum ada pemesanan.</p>";
    } else {
      history.forEach((order, index) => {
        const box = document.createElement("div");
        box.className = "p-3 mb-3 border rounded shadow-sm";
        box.innerHTML = `
          <p><strong>Destinasi:</strong> ${order.destination}</p>
          <p><strong>Tanggal:</strong> ${order.date}</p>
          <p><strong>Peserta:</strong> ${order.travelers}</p>
          <p><strong>Harga:</strong> ${order.price}</p>
          <p><strong>Catatan:</strong> ${order.notes}</p>
          <p class="text-muted small">Dipesan pada: ${new Date(order.timestamp).toLocaleString("id-ID")}</p>
        `;
        orderList.appendChild(box);
      });
    }
  }
});

function logout() {
  const modal = document.getElementById("logoutModal");
  const yesBtn = document.getElementById("logoutYes");
  const noBtn = document.getElementById("logoutNo");

  modal.style.display = "flex";
  document.body.classList.add("noscroll");

  // tombol batal
  noBtn.onclick = function () {
    modal.style.display = "none";
    document.body.classList.remove("noscroll");
  };

  // tombol hapus akun
  yesBtn.onclick = function () {
    localStorage.clear();
    window.location.href = "index.html";
  };
}


// function logout() {
//   const confirmLogout = confirm("Yakin ingin hapus akun?");
//   if (confirmLogout) {
//       localStorage.clear();
//       window.location.href = "index.html";
//   }
// } 

// === PACKAGE VALIDATION ===
// document.addEventListener("DOMContentLoaded", function () {


const welcomeText = document.getElementById("welcomeText");
if (welcomeText) {
  const userName = localStorage.getItem("userName");
  if (userName) {
    welcomeText.textContent = `Hi, ${userName}`;
  }
}

// kalau langsung lihat paket
document.addEventListener('DOMContentLoaded', function () {
  const viewButtons = document.querySelectorAll(".view-button");

  viewButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      const destination = this.dataset.destination; 
      if (destination) {
        localStorage.setItem("selectedDestination", destination);
      }
    });
  });
});

// Validasi form pemesanan
document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById("searchButton");
  const destinationInput = document.getElementById("destination");
  const departureDateInput = document.getElementById("departure-date");

  if (departureDateInput) {
    // Set tanggal minimum ke hari ini
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minDate = `${year}-${month}-${day}`;
    departureDateInput.setAttribute("min", minDate);
  }

  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
        e.preventDefault();

        const destination = destinationInput.value;
        const departureDateValue = departureDateInput.value;

        document.getElementById("destinationError")?.remove();
        document.getElementById("dateError")?.remove();

        let hasError = false;

        if (!destination) {
          const error = document.createElement("div");
          error.className = "invalid-feedback d-block";
          error.id = "destinationError";
          error.textContent = "Silakan pilih destinasi.";
          destinationInput.parentNode.appendChild(error);
          hasError = true;
        }

        if (!departureDateValue) {
          const error = document.createElement("div");
          error.className = "invalid-feedback d-block";
          error.id = "dateError";
          error.textContent = "Silakan pilih tanggal keberangkatan.";
          departureDateInput.parentNode.appendChild(error);
          hasError = true;
        }

        if (departureDateValue) {
          const departureDate = new Date(departureDateValue);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          departureDate.setHours(0, 0, 0, 0);

          if (departureDate < today) {
            const error = document.createElement("div");
            error.className = "invalid-feedback d-block";
            error.id = "dateError";
            error.textContent = "Tanggal keberangkatan tidak boleh di masa lalu.";
            departureDateInput.parentNode.appendChild(error);
            hasError = true;
          }
        }

        if (hasError) {
          return; 
        }

        localStorage.setItem("selectedDestination", destination);
        // jika dapertureDateValue tidak kosong, simpan ke localStorage
        if (departureDateValue){
            localStorage.setItem("departureDate", departureDateValue);
        }
        
        const destinationPages = {
            "Bali": "bali.html",
            "Yogyakarta": "yogyakarta.html",
            "Bandung": "bandung.html",
            "Lombok": "lombok.html",
            "Belitung": "belitung.html",
            "Medan": "medan.html",
            "Raja Ampat": "rajaampat.html",
            "Malang": "malang.html",
            "Pontianak": "pontianak.html"
        };

        if (destinationPages[destination]) {
          localStorage.setItem("departureDate", departureDateValue);
          window.location.href = destinationPages[destination];
        } else {
            alert("Destinasi tidak valid.");
        }
    });
  }
});

// });


// == DESTINASI ==
document.addEventListener("DOMContentLoaded", function () {

const pesanButton = document.getElementById('pesan');
if (pesanButton) {
  pesanButton.addEventListener('click', function () {
    window.location.href = 'payment.html';
  });
}

});


// == PAYMENT REAL-TIME VALIDATION ==
// document.addEventListener("DOMContentLoaded", function () {

// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const phoneInput = document.getElementById("phone");
// const destinationInput = document.getElementById("destination");
// const departureInput = document.getElementById("departureDate");
// const travelersInput = document.getElementById("travelers");
// const totalPriceInput = document.getElementById("totalPrice");
// const paymentForm = document.getElementById("paymentForm");
// const cardNumberInput = document.getElementById("cardNumber");
// const expDateInput = document.getElementById("expDate");
// const cvvInput = document.getElementById("cvv");

// const destinationPrices = {
//   "Bali": 2750000,
//   "Yogyakarta": 3100000,
//   "Bandung": 2500000,
//   "Lombok": 3200000,
//   "Belitung": 2200000,
//   "Medan": 2200000,
//   "Malang": 2700000,
//   "Pontianak": 2200000,
//   "Raja Ampat": 5800000,
// };

// function showError(inputEl, errorId, message) {
//   inputEl.classList.add("invalid");
//   const el = document.getElementById(errorId);
//   if (el) el.textContent = message;
// }

// function clearError(inputEl, errorId) {
//   inputEl.classList.remove("invalid");
//   const el = document.getElementById(errorId);
//   if (el) el.textContent = "";
// }

// function calculateTotal() {
//   const jumlah = parseInt(travelersInput.value) || 1;
//   const selectedDestination = destinationInput.value;
//   const basePrice = destinationPrices[selectedDestination] || 0;
//   let total = basePrice * jumlah;
//   if (jumlah >= 10) total -= 200000 * jumlah;
//   totalPriceInput.value = "Rp " + total.toLocaleString("id-ID");
// }

// function validateName() {
//   const value = nameInput.value.trim();
//   const regex = /^[A-Z][a-zA-Z ]*$/;
//   if (!regex.test(value)) {
//     showError(nameInput, "error-name", "Nama harus diawali huruf kapital dan hanya huruf.");
//     return false;
//   }
//   clearError(nameInput, "error-name");
//   return true;
// }

// function validateEmail() {
//   const value = emailInput.value.trim();
//   const regex = /^[^@]+@[^@]+\.[^@]+$/;
//   if (!regex.test(value)) {
//     showError(emailInput, "error-email", "Format email tidak valid.");
//     return false;
//   }
//   clearError(emailInput, "error-email");
//   return true;
// }

// function validatePhone() {
//   const value = phoneInput.value.trim();
//   const regex = /^[0-9]{10,13}$/;
//   if (!regex.test(value)) {
//     showError(phoneInput, "error-phone", "Nomor telepon harus 10–13 digit angka.");
//     return false;
//   }
//   clearError(phoneInput, "error-phone");
//   return true;
// }

// function validateDeparture() {
//   const value = departureInput.value;
//   if (!value) {
//     showError(departureInput, "error-departure", "Tanggal keberangkatan wajib diisi.");
//     return false;
//   }
//   const selectedDate = new Date(value);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   if (selectedDate < today) {
//     showError(departureInput, "error-departure", "Tanggal keberangkatan tidak boleh di masa lalu.");
//     return false;
//   }
//   clearError(departureInput, "error-departure");
//   return true;
// }

// function validateCardNumber() {
//   const value = cardNumberInput.value.trim();
//   if (!/^\d{16}$/.test(value)) {
//     showError(cardNumberInput, "error-card", "Nomor kartu harus 16 digit angka.");
//     return false;
//   }
//   clearError(cardNumberInput, "error-card");
//   return true;
// }

// function validateExpDate() {
//   const value = expDateInput.value.trim();
//   const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//   if (!regex.test(value)) {
//     showError(expDateInput, "error-exp", "Format exp tidak valid (MM/YY).");
//     return false;
//   }
//   const [month, year] = value.split("/").map(Number);
//   const now = new Date();
//   const currentMonth = now.getMonth() + 1;
//   const currentYear = now.getFullYear() % 100;
//   if (year < currentYear || (year === currentYear && month < currentMonth)) {
//     showError(expDateInput, "error-exp", "Tanggal exp tidak boleh sebelum bulan ini.");
//     return false;
//   }
//   clearError(expDateInput, "error-exp");
//   return true;
// }

// function validateCVV() {
//   const value = cvvInput.value.trim();
//   if (!/^\d{3}$/.test(value)) {
//     showError(cvvInput, "error-cvv", "CVV harus 3 digit angka.");
//     return false;
//   }
//   clearError(cvvInput, "error-cvv");
//   return true;
// }

// // });


// // document.addEventListener("DOMContentLoaded", function () {
//   const storedName = localStorage.getItem("userName");
//   const storedEmail = localStorage.getItem("userEmail");
//   const storedPhone = localStorage.getItem("userPhone");
//   const selectedDestination = localStorage.getItem("selectedDestination");
//   const departureDate = localStorage.getItem("departureDate");

//   if (storedName) nameInput.value = storedName;
//   if (storedEmail) emailInput.value = storedEmail;
//   if (storedPhone) phoneInput.value = storedPhone;
//   if (selectedDestination) destinationInput.value = selectedDestination;
//   if (departureInput) {
//     const today = new Date().toISOString().split("T")[0];
//     departureInput.setAttribute("min", today);
//     if (departureDate) departureInput.value = departureDate;
//   }

//   travelersInput.addEventListener("input", calculateTotal);
//   calculateTotal();

//   nameInput.addEventListener("input", validateName);
//   emailInput.addEventListener("input", validateEmail);
//   phoneInput.addEventListener("input", validatePhone);
//   departureInput.addEventListener("change", validateDeparture);
//   cardNumberInput.addEventListener("input", validateCardNumber);
//   expDateInput.addEventListener("input", validateExpDate);
//   cvvInput.addEventListener("input", validateCVV);

//   paymentForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const valid = [
//       validateName(),
//       validateEmail(),
//       validatePhone(),
//       validateDeparture(),
//       validateCardNumber(),
//       validateExpDate(),
//       validateCVV()
//     ];

//     if (valid.includes(false)) return;

//     const confirmationModal = document.getElementById("confirmationModal");
//     const orderDetails = document.getElementById("orderDetails");
//     const confirmYes = document.getElementById("confirmYes");
//     const confirmNo = document.getElementById("confirmNo");

//     const name = nameInput.value.trim();
//     const email = emailInput.value.trim();
//     const phone = phoneInput.value.trim();

//     orderDetails.innerHTML = `
//       <p><strong>Nama:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>No. Telepon:</strong> ${phone}</p>
//       <p><strong>Destinasi:</strong> ${destinationInput.value}</p>
//       <p><strong>Tanggal Keberangkatan:</strong> ${departureInput.value}</p>
//       <p><strong>Jumlah Peserta:</strong> ${travelersInput.value}</p>
//       <p><strong>Catatan:</strong> ${document.getElementById("notes").value || '-'}</p>
//       <p><strong>Total Harga:</strong> ${totalPriceInput.value}</p>
//     `;

//     confirmationModal.style.display = "flex";
//     document.body.style.overflow = "hidden";

//     confirmYes.onclick = function () {
//       confirmationModal.style.display = "none";
//       document.body.style.overflow = "auto";
//       const booking = {
//         name,
//         email,
//         phone,
//         destination: destinationInput.value,
//         date: departureInput.value,
//         travelers: travelersInput.value,
//         notes: document.getElementById("notes").value || "-",
//         price: totalPriceInput.value,
//         timestamp: new Date().toISOString(),
//       };

//       const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
//       history.push(booking);
//       localStorage.setItem("bookingHistory", JSON.stringify(history));

//       // alert("Pemesanan berhasil! Kami akan menghubungi Anda segera.");
//       // window.location.href = "home.html";

//       const successPopup = document.getElementById("successPopup");
//       const successConfirm = document.getElementById("successConfirm");

//       successPopup.style.display = "flex";
//       document.body.classList.add("noscroll");

//       successConfirm.addEventListener("click", function () {
//         successPopup.style.display = "none";
//         document.body.classList.remove("noscroll");
//         window.location.href = "home.html";
//       });

//     };

//     confirmNo.onclick = function () {
//       confirmationModal.style.display = "none";
//       document.body.style.overflow = "auto";
//     };
//   });
// });
