<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container py-5 my-auto">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
            <div class="glass-card p-4 p-md-5">
                <div class="text-center mb-4">
                    <div class="stat-icon-wrapper bg-info bg-opacity-20 text-info mx-auto mb-2">
                        <i class="fa-solid fa-user-plus fs-4"></i>
                    </div>
                    <h3 class="fw-bold text-white">Create an Account</h3>
                    <p class="text-secondary small">Join LuxeStay to book rooms and access premium services</p>
                </div>

                <form action="${pageContext.request.contextPath}/register" method="POST">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Full Name</label>
                            <input type="text" name="name" class="form-control form-control-custom" placeholder="John Doe" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Username</label>
                            <input type="text" name="username" class="form-control form-control-custom" placeholder="johndoe" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Email Address</label>
                            <input type="email" name="email" class="form-control form-control-custom" placeholder="john@example.com" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Phone Number</label>
                            <input type="text" name="phone" class="form-control form-control-custom" placeholder="+1 555-0199">
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Password</label>
                            <input type="password" name="password" class="form-control form-control-custom" placeholder="Create a strong password" required>
                        </div>
                        <div class="col-12 mt-4">
                            <button type="submit" class="btn btn-gradient w-100 py-2 rounded-pill fw-bold">
                                <i class="fa-solid fa-check me-1"></i> Register Account
                            </button>
                        </div>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <p class="text-secondary small mb-0">
                        Already have an account? <a href="${pageContext.request.contextPath}/login" class="text-info fw-semibold text-decoration-none">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
