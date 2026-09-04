<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-5 my-auto">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="glass-card p-4 p-md-5">
                <div class="text-center mb-4">
                    <div class="stat-icon-wrapper bg-primary bg-opacity-20 text-primary mx-auto mb-2">
                        <i class="fa-solid fa-lock fs-4"></i>
                    </div>
                    <h3 class="fw-bold text-white">Welcome Back</h3>
                    <p class="text-secondary small">Sign in to your LuxeStay account</p>
                </div>

                <form action="${pageContext.request.contextPath}/login" method="POST">
                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-semibold">Username</label>
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fa-solid fa-user"></i></span>
                            <input type="text" id="loginUsername" name="username" class="form-control form-control-custom" placeholder="Enter your username" required>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-secondary small fw-semibold">Password</label>
                        <div class="input-group">
                            <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fa-solid fa-key"></i></span>
                            <input type="password" id="loginPassword" name="password" class="form-control form-control-custom" placeholder="Enter your password" required>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-gradient w-100 py-2 rounded-pill fw-bold mb-3">
                        <i class="fa-solid fa-right-to-bracket me-1"></i> Sign In
                    </button>
                </form>

                <!-- Quick Test Autofill Buttons -->
                <div class="border-top border-secondary border-opacity-25 pt-3 text-center">
                    <p class="text-secondary small mb-2">Quick Test Login (Demo Accounts):</p>
                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                        <button type="button" class="btn btn-outline-warning btn-sm rounded-pill" onclick="fillCreds('admin', '123')">
                            Admin (admin)
                        </button>
                        <button type="button" class="btn btn-outline-info btn-sm rounded-pill" onclick="fillCreds('staff', '123')">
                            Reception (staff)
                        </button>
                        <button type="button" class="btn btn-outline-success btn-sm rounded-pill" onclick="fillCreds('new_guest', '123')">
                            Guest (new_guest)
                        </button>
                    </div>
                </div>

                <div class="text-center mt-4">
                    <p class="text-secondary small mb-0">
                        Don't have an account? <a href="${pageContext.request.contextPath}/register" class="text-info fw-semibold text-decoration-none">Create One</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function fillCreds(u, p) {
    document.getElementById('loginUsername').value = u;
    document.getElementById('loginPassword').value = p;
}
</script>

<jsp:include page="../common/footer.jsp" />
