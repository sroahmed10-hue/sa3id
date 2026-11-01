document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const contactForm = document.getElementById("contactForm");
    const logoutButton = document.getElementById("logoutButton");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            if (username === "" || password === "") {
                alert("يرجى إدخال اسم المستخدم وكلمة المرور");
                return;
            }
            localStorage.setItem("logged", "yes");
            window.location.href = "about.html";
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "جاري الإرسال...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("contact.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    contactForm.reset();
                }
            })
            .catch(() => {
                alert("✅ تم استلام رسالتك بنجاح! (وضع تجريبي - فعّل الـ PHP على الاستضافة للإرسال الحقيقي)");
                contactForm.reset();
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("logged");
            window.location.href = "index.html";
        });
    }
});
