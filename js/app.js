/* =========================================
   LẤY CÁC THÀNH PHẦN GIAO DIỆN
========================================= */
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const forgotPage = document.getElementById("forgotPage");
const homePage = document.getElementById("homePage");
const garbageTruckPage = document.getElementById("garbageTruckPage");

const welcomeUser = document.getElementById("welcomeUser");

/* =========================================
   CHUYỂN ĐỔI GIAO DIỆN
========================================= */
function hideAllPages() {
    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    forgotPage.classList.add("hidden");
    homePage.classList.add("hidden");
    garbageTruckPage.classList.add("hidden");
}

function showLogin() {
    hideAllPages();
    loginPage.classList.remove("hidden");
}

function showRegister() {
    hideAllPages();
    registerPage.classList.remove("hidden");
}

function showForgotPassword() {
    hideAllPages();
    forgotPage.classList.remove("hidden");
}

function showHome() {
    hideAllPages();
    homePage.classList.remove("hidden");
}

function openGarbageTruck() {
    hideAllPages();
    garbageTruckPage.classList.remove("hidden");
}

/* =========================================
   XỬ LÝ ĐĂNG KÝ (SUPABASE AUTH)
========================================= */
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không trùng khớp!");
        return;
    }

    // Gửi yêu cầu đăng ký lên Supabase
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        alert("Đăng ký thất bại: " + error.message);
    } else {
        alert("Đăng ký thành công! Hãy đăng nhập ngay.");
        showLogin();
    }
});

/* =========================================
   XỬ LÝ ĐĂNG NHẬP (SUPABASE AUTH)
========================================= */
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Sử dụng ô nhập làm Email đăng nhập Supabase
    const email = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Đăng nhập thất bại: " + error.message);
    } else {
        const userName = data.user.user_metadata?.full_name || data.user.email;
        welcomeUser.textContent = "Xin chào, " + userName + "!";
        showHome();
    }
});

/* =========================================
   XỬ LÝ QUÊN MẬT KHẨU (SUPABASE AUTH)
========================================= */
document.getElementById("forgotForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("forgotEmail").value;

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

    if (error) {
        alert("Lỗi: " + error.message);
    } else {
        alert("Hệ thống đã gửi liên kết đặt lại mật khẩu vào Email của bạn.");
        showLogin();
    }
});

/* =========================================
   ĐĂNG XUẤT
========================================= */
async function logout() {
    await supabaseClient.auth.signOut();
    showLogin();
}

/* =========================================
   MẶC ĐỊNH MỞ TRANG ĐĂNG NHẬP
========================================= */
showLogin();