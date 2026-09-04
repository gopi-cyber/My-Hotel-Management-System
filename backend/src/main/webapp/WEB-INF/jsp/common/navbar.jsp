<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
    <div class="container-fluid px-lg-5">
        <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="${pageContext.request.contextPath}/">
            <span class="fs-4 text-primary"><i class="fa-solid fa-hotel"></i></span>
            <span class="bg-gradient bg-clip-text text-transparent" style="background: linear-gradient(135deg, #818cf8 0%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">LuxeStay</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-2">
                <li class="nav-item">
                    <a class="nav-link" href="${pageContext.request.contextPath}/"><i class="fa-solid fa-house me-1"></i> Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${pageContext.request.contextPath}/guest/rooms"><i class="fa-solid fa-bed me-1"></i> Rooms</a>
                </li>
                <c:if test="${sessionScope.userRole eq 'ADMIN'}">
                    <li class="nav-item">
                        <a class="nav-link text-warning fw-semibold" href="${pageContext.request.contextPath}/admin/dashboard">
                            <i class="fa-solid fa-gauge me-1"></i> Admin Panel
                        </a>
                    </li>
                </c:if>
                <c:if test="${sessionScope.userRole eq 'RECEPTIONIST' or sessionScope.userRole eq 'ADMIN'}">
                    <li class="nav-item">
                        <a class="nav-link text-info fw-semibold" href="${pageContext.request.contextPath}/receptionist/dashboard">
                            <i class="fa-solid fa-concierge-bell me-1"></i> Front Desk
                        </a>
                    </li>
                </c:if>
                <c:if test="${not empty sessionScope.currentUser}">
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/guest/dashboard"><i class="fa-solid fa-calendar-check me-1"></i> My Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/guest/services"><i class="fa-solid fa-bell-concierge me-1"></i> Request Services</a>
                    </li>
                </c:if>
            </ul>

            <div class="d-flex align-items-center gap-3">
                <a href="${pageContext.request.contextPath}/swagger-ui.html" target="_blank" class="btn btn-outline-light btn-sm rounded-pill px-3">
                    <i class="fa-solid fa-code me-1"></i> REST API Docs
                </a>
                <c:choose>
                    <c:when test="${not empty sessionScope.currentUser}">
                        <div class="dropdown">
                            <button class="btn btn-outline-primary btn-sm rounded-pill dropdown-toggle d-flex align-items-center gap-2 px-3 text-white" type="button" data-bs-toggle="dropdown">
                                <i class="fa-solid fa-circle-user text-info"></i>
                                <span>${sessionScope.userName}</span>
                                <span class="badge bg-secondary ms-1">${sessionScope.userRole}</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                                <li><a class="dropdown-item" href="${pageContext.request.contextPath}/guest/dashboard"><i class="fa-solid fa-user me-2"></i>Dashboard</a></li>
                                <li><a class="dropdown-item" href="${pageContext.request.contextPath}/guest/bookings"><i class="fa-solid fa-book-bookmark me-2"></i>My Bookings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="${pageContext.request.contextPath}/logout"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</a></li>
                            </ul>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageContext.request.contextPath}/login" class="btn btn-outline-light btn-sm rounded-pill px-3">
                            <i class="fa-solid fa-arrow-right-to-bracket me-1"></i> Sign In
                        </a>
                        <a href="${pageContext.request.contextPath}/register" class="btn btn-gradient btn-sm rounded-pill px-3">
                            <i class="fa-solid fa-user-plus me-1"></i> Register
                        </a>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
</nav>

<!-- Alerts container -->
<div class="container mt-3">
    <c:if test="${not empty success}">
        <div class="alert alert-success alert-dismissible fade show glass-card text-success" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i> ${success}
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
        </div>
    </c:if>
    <c:if test="${not empty error}">
        <div class="alert alert-danger alert-dismissible fade show glass-card text-danger" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i> ${error}
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
        </div>
    </c:if>
</div>
